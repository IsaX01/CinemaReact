import { getData } from '@/api/get';
import create from 'zustand';
import { persist } from 'zustand/middleware';

const useShoppingHistoryStore = create(
  persist(
    (set, get) => ({
      invoices: [],
      error: null,
      fetchAllInvoices: async () => {
        try {
          if (get().invoices.length) return;
          const response = await getData('invoice-full-information');
          set({
            invoices: response.data.data,
            error: null,
          });
        } catch (error) {
          set((state) => ({
            ...state,
            error: error.message,
          }));
        }
      },
      getInvoiceById: (invoiceId) => {
        return get().invoices.filter(({ id }) => id === invoiceId)[0];
      },
    }),
    {
      name: 'invoice-storage',
      getStorage: () => sessionStorage,
    }
  )
);

useShoppingHistoryStore.subscribe(console.log);

export default useShoppingHistoryStore;
