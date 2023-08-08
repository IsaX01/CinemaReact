import { getData } from '@/api/get';
import create from 'zustand';

const useStatusStore = create((set, get) => ({
  status: [],
  error: null,
  fetchAllStatus: async () => {
    if (get().status.length) return;
    try {
      const response = await getData('status');
      set({
        status: response.data.data,
        error: null,
      });
    } catch (error) {
      set((state) => ({
        ...state,
        error: error.message,
      }));
    }
  },
  getStatusById: (statusId) => {
    return get().status.filter(({ id }) => id === statusId)[0];
  },
}));

useStatusStore.subscribe(console.log);

export default useStatusStore;
