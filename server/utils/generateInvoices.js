import { v4 as uuidv4 } from 'uuid';
import { bulkInsert } from './bulks';

const SEAT_TAKEN = 2;

export const generateTicketInvoices = async (tickets, roomId, scheduleId, invoiceId) => {
  const seats = tickets.map(({ letterId }) => [
    uuidv4().slice(0, 15),
    parseInt(letterId),
    SEAT_TAKEN,
    roomId,
    letterId,
  ]);

  const newTickets = tickets.map(({ ticketTypeId }, idx) => [
    uuidv4().slice(0, 15),
    ticketTypeId,
    scheduleId,
    seats[idx][0],
  ]);

  const invoices = newTickets.map((ticket) => {
    const [id] = ticket;

    return [invoiceId, id];
  });

  const seatRows = await bulkInsert(
    'seat',
    'id, number, seat_statuses_id, room_id, letter_id',
    seats
  );

  const ticketRows = await bulkInsert(
    'ticket',
    'id, ticket_types_id, schedule_id, seat_id',
    newTickets
  );

  const invoiceTicketRows = await bulkInsert('invoice_ticket', 'invoices_id, ticket_id', invoices);

  return { seatRows, ticketRows, invoiceTicketRows };
};

export const generateItemInvoices = async (items, invoiceId) => {
  const newItems = items.map(({ subTotal, id, qty }) => [qty, subTotal, invoiceId, id]);

  const invoiceItemRows = await bulkInsert(
    'invoices_food',
    'amount, sub_total, invoices_id, foods_id',
    newItems
  );

  return invoiceItemRows;
};
