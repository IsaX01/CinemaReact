import { getData } from '@/api/get';
import create from 'zustand';

const useSexStore = create((set, get) => ({
  sex: [],
  error: null,
  fetchAllSex: async () => {
    if (get().sex.length) return;
    try {
      const response = await getData('sex');
      set({
        sex: response.data.data,
        error: null,
      });
    } catch (error) {
      set((state) => ({
        ...state,
        error: error.message,
      }));
    }
  },
  getSexById: (sexId) => {
    return get().sex.filter(({ id }) => id === sexId)[0];
  },
}));

useSexStore.subscribe(console.log);

export default useSexStore;
