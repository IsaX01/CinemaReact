import { getData } from '@/api/get';
import create from 'zustand';

const useCountryStore = create((set, get) => ({
  countries: [],
  error: null,
  fetchAllCountries: async () => {
    try {
      if (get().countries.length) return;
      const response = await getData('country');
      set({
        countries: response.data.data,
        error: null,
      });
    } catch (error) {
      set((state) => ({
        ...state,
        error: error.message,
      }));
    }
  },
  getCountryById: (countryId) => {
    return get().countries.filter(({ id }) => id === countryId)[0];
  },
}));

useCountryStore.subscribe(console.log);

export default useCountryStore;
