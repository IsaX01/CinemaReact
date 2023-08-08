/* eslint-disable camelcase */
import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';
import QRCode from 'qrcode';
import { v4 as uuidv4 } from 'uuid';
import { getQRUrl } from '../../shared/utils';
import { pool } from '../db';
import { QRCodeTemplate, transporter } from '../utils/email';
import { generateItemInvoices, generateTicketInvoices } from '../utils/generateInvoices';

const generateQRToken = (invoiceId) => {
  return jwt.sign(
    {
      invoiceId,
    },
    process.env.TOKEN_SECRET_KEY
  );
};

export const findInvoiceFullInformation = async (req, res) => {
  try {
    const [invoices] = await pool.query('SELECT * FROM view_invoice_full_information');
    res.json({
      error: false,
      data: invoices,
    });
  } catch (err) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      error: err.message,
    });
  }
};

export const store = async (req, res) => {
  try {
    const {
      scheduleId,
      roomId,
      tickets,
      ticketsTotal = 0,
      date,
      userId,
      items,
      itemsTotal = 0,
      shortDescription,
      longDescription,
    } = req.body;
    const invoiceId = uuidv4().slice(0, 15);
    const qrCode = generateQRToken(invoiceId);
    const hasTicketOrder = tickets && tickets.length && roomId && scheduleId;
    const hasItemOrder = items && items.length;
    const priceTotal = ticketsTotal + itemsTotal;
    let response = {};

    if (!hasTicketOrder && !hasItemOrder) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Insufficient order details in body.' });
    } else {
      const insert = `INSERT INTO invoices (id, date, price_total, url_code_qr, users_id, short_description, long_description)
      VALUES ('${invoiceId}', '${date}', '${priceTotal}', '${qrCode}', '${userId}', '${shortDescription.replace(
        /'/g,
        '"'
      )}', '${longDescription.replace(/'/g, '"')}');`;

      const [data] = await pool.query(insert);

      // Handle Ticket invoices
      if (hasTicketOrder) {
        const { seatRows, ticketRows, invoiceTicketRows } = await generateTicketInvoices(
          tickets,
          roomId,
          scheduleId,
          invoiceId
        );

        response = { ...response, seatRows, ticketRows, invoiceTicketRows };
      }

      // Handle Kiosco invoices
      if (hasItemOrder) {
        const invoiceFoodRows = await generateItemInvoices(items, invoiceId);

        response = { ...response, invoiceFoodRows };
      }

      // Send Email
      const [users] = await pool.query('SELECT email, user_name FROM users WHERE id = ?', [userId]);
      const [user] = users;
      const QRImage = await QRCode.toDataURL(getQRUrl(qrCode));
      const QRId = uuidv4();

      const mailOptions = {
        to: user.email,
        subject: `Detalles de orden de ${user.user_name}`,
        html: QRCodeTemplate({
          userName: user.user_name,
          QRUrl: `cid:${QRId}`,
          invoiceId,
          priceTotal,
          date,
          ticketsTotal,
          itemsTotal,
        }),
        attachments: [
          {
            filename: 'QRCode.png',
            path: QRImage,
            cid: QRId,
          },
        ],
      };

      await transporter.sendMail(mailOptions, (err) => {
        if (err) {
          console.error('Email not sent: ', err);
          res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
        } else {
          res.json({
            ...response,
            id: invoiceId,
            data,
            emailSent: true,
            token: qrCode,
            success: true,
          });
        }
      });
    }
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};
