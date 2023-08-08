import { getData } from '@/api/get';
import { ITEM_SERVICE_CHARGE } from '@/utils/constant';
import create from 'zustand';
import { persist } from 'zustand/middleware';

const initialState = {
  items: [],
  cartItems: [],
  error: null,
  subTotal: 0,
};

const useShoppingCartStore = create(
  persist(
    (set, get) => ({
      ...initialState,
      fetchAllItems: async () => {
        try {
          if (get().items.length) return;
          const response = await getData('food-full-information');
          set({
            items: response.data.data,
            error: null,
          });
        } catch (error) {
          set((state) => ({
            ...state,
            error: error.message,
          }));
        }
      },
      getItemById: (itemId) => {
        return get().items.filter(({ id }) => id === itemId)[0];
      },
      addItem: (product) => {
        const exist = get().cartItems.find(({ id }) => id === product.id);
        if (exist) {
          const newItems = get().cartItems.map((item) =>
            item.id === product.id ? { ...exist, qty: exist.qty + 1 } : item
          );
          set((state) => ({ ...state, cartItems: newItems }));
        } else {
          set((state) => ({ ...state, cartItems: [...get().cartItems, { ...product, qty: 1 }] }));
        }
        get().calculateTotalPrice();
      },
      removeItem: (product) => {
        const exist = get().cartItems.find(({ id }) => id === product.id);
        const isOnlyOne = exist.qty === 1;
        if (isOnlyOne) {
          set((state) => ({
            ...state,
            cartItems: get().cartItems.filter(({ id }) => id !== product.id),
          }));
        } else {
          const newItems = get().cartItems.map((item) =>
            item.id === product.id ? { ...exist, qty: exist.qty - 1 } : item
          );
          set((state) => ({ ...state, cartItems: newItems }));
          get().calculateTotalPrice();
        }
      },
      calculateTotalPrice: () => {
        const subTotal =
          get().cartItems.reduce(
            (accumulator, currentItem) => accumulator + currentItem.qty * currentItem.price,
            0
          ) + ITEM_SERVICE_CHARGE;
        set((state) => ({ ...state, subTotal }));
      },
      calculateItemsQuantity: () =>
        get().cartItems.reduce((acc, currentItem) => acc + currentItem.qty, 0),
      reset: () => set(initialState),
    }),
    {
      name: 'shopping-cart-storage',
      getStorage: () => sessionStorage,
    }
  )
);

useShoppingCartStore.subscribe(console.log);

export default useShoppingCartStore;
