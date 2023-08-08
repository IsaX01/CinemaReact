import nodemailer from 'nodemailer';
import { moneyFormatter } from '../../shared/utils';

const newLineToBr = (str) => {
  return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + '<br>' + '$2');
};

const getEmailHtml = (content) => {
  return `
    <!doctype html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Caribbean Cinemas</title>
      </head>
      <body style="font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 16px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
        ${newLineToBr(content)}   
        <br>
        <footer>
            © Caribbean Cinema, ${new Date().getFullYear()}.
        </footer>
      </body>
    </html>
    `;
};

export const EMAIL = process.env.GM_EMAIL;

export const transporter = nodemailer.createTransport(
  {
    service: 'Gmail',
    auth: {
      user: EMAIL,
      pass: process.env.GM_PASSWORD,
    },
  },
  {
    from: `Caribbean Cinemas <${EMAIL}>`,
  }
);

export const QRCodeTemplate = (details) => {
  const { userName, QRUrl, invoiceId, priceTotal, date, ticketsTotal, itemsTotal } = details;

  // TODO: Show list with products
  return getEmailHtml(`
    <b>Hola <strong>${userName}</strong>,</b>
    🎉 Tu pedido ha sido completado!. Los detalles pueden ser encontrados abajo.
    
    Presenta el siguiente código QR a la hora de solicitar los boletos o artículos.
    
    <img src="${QRUrl}" alt="Código QR" width="244" height="244" border="0" style="border:0; outline:none; text-decoration:none; display:block;">
    
    <strong>DETALLES DEL PEDIDO</strong>:

    <b>Pedido ID</b>: ${invoiceId}
    <b>Fecha del pedido</b>: ${new Date(date).toLocaleString()}

    Subtotal por compra de boletas: ${moneyFormatter(ticketsTotal)}
    Subtotal por compra de artículos: ${moneyFormatter(itemsTotal)}

    <b>Total de la orden</b>: ${moneyFormatter(priceTotal, false)}
  `);
};
