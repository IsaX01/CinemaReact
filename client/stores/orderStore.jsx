import { addOrder } from '@/api/order';
import shoppingCartStore from '@/stores/shoppingCartStore';
import {
  ADULT_TICKET_ID,
  ADULT_TICKET_PRICE,
  CHILD_TICKET_ID,
  CHILD_TICKET_PRICE,
  DATE_FORMAT,
  TICKET_SERVICE_CHARGE,
} from '@/utils/constant';
import { formatMovieScheduleId } from '@/utils/format';
import moment from 'moment';
import create from 'zustand';
import { persist } from 'zustand/middleware';

const generateOrderDescription = ({ movieInformation, cartInformation }) => {
  let longDescription = [];
  let shortDescription = [];
  const isAMovieBeenSelected = Object.prototype.hasOwnProperty.call(
    movieInformation.schedule,
    'hourSelected'
  );
  const isItemSelected = cartInformation.cartItems.length > 0;

  const formatter = new Intl.ListFormat('es', {
    style: 'long',
    type: 'conjunction',
  });

  if (isAMovieBeenSelected) {
    const {
      movie: { name },
      tickets: { adult, child },
    } = movieInformation;
    shortDescription.push(name);
    longDescription.push(
      `${adult} taquillas de adultos y ${child} taquillas de niños para ${name}`
    );
  }

  if (isItemSelected) {
    const { cartItems } = cartInformation;
    const itemsShortDescription = cartItems.map(({ name }) => name);
    const itemsLongDescription = cartItems.map(({ name, qty }) => `${qty} - ${name}`);
    shortDescription.push(itemsShortDescription);
    longDescription.push(itemsLongDescription);
  }

  return {
    longDescription: formatter.format(longDescription.flat()),
    shortDescription: formatter.format(shortDescription.flat()),
  };
};

const orderSelector = (state, cartState, userId) => {
  let { child } = state.tickets;
  let result = {};

  result.tickets = state.seats.map((seat) => {
    let ticketTypeId;

    if (child) {
      ticketTypeId = CHILD_TICKET_ID;
      child -= 1;
    } else {
      ticketTypeId = ADULT_TICKET_ID;
    }

    return { ticketTypeId, letterId: seat.id };
  });

  if (Object.prototype.hasOwnProperty.call(state.schedule, 'hourSelected')) {
    result.roomId = state.schedule.hourSelected.roomId;
    result.scheduleId = state.schedule.hourSelected.scheduleId;
    result.ticketsTotal = state.getTicketTotal();
  }

  if (cartState.cartItems.length > 0) {
    result.items = cartState.cartItems.map(({ price, qty, id }) => ({
      subTotal: price * qty,
      id,
      qty,
    }));
    result.itemsTotal = cartState.subTotal;
  }

  return {
    ...result,
    date: moment(new Date()).format(DATE_FORMAT),
    userId,
    ...generateOrderDescription({ movieInformation: state, cartInformation: cartState }),
  };
};

const initialState = {
  tickets: {
    adult: 0,
    child: 0,
  },
  seats: [],
  seatsIndices: [],
  movie: {},
  error: null,
  schedule: {},
};

const useOrderStore = create(
  persist(
    (set, get) => ({
      ...initialState,
      getMovieScheduleId: () =>
        formatMovieScheduleId(get().movie.name, get().schedule.scheduleIdSelected),
      getTicketQuantity: () => get().tickets.adult + get().tickets.child,
      getMovieName: () => get().movie.name,
      saveSeats: (selectedSeats) => set((state) => ({ ...state, seats: selectedSeats })),
      saveSeatIndices: (selectedSeatIndices) =>
        set((state) => ({ ...state, seatsIndices: selectedSeatIndices })),
      setOrderSchedule: (schedule) => set((state) => ({ ...state, schedule })),
      setOrderMovie: (movie) => set((state) => ({ ...state, movie })),
      setOrderTickets: (tickets) => set((state) => ({ ...state, tickets })),
      placeOrder: async (userId) => {
        const order = orderSelector(get(), shoppingCartStore.getState(), userId);

        try {
          const response = await addOrder(order);

          set((state) => ({
            ...state,
            error: null,
          }));

          return response;
        } catch (error) {
          set((state) => ({
            ...state,
            error: error.message,
          }));

          return false;
        }
      },
      getTicketTotal: () =>
        get().tickets.adult * ADULT_TICKET_PRICE +
        get().tickets.child * CHILD_TICKET_PRICE +
        TICKET_SERVICE_CHARGE,
      getTotal: () => get().getTicketTotal() + shoppingCartStore.getState().subTotal,
      reset: () => set(initialState),
    }),
    {
      name: 'order-storage',
      getStorage: () => sessionStorage,
    }
  )
);

useOrderStore.subscribe(console.log);

export default useOrderStore;
