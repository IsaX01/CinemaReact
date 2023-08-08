import { getData } from '@/api/get';
import create from 'zustand';

const useLanguageStore = create((set, get) => ({
  languages: [],
  error: null,
  fetchAllLanguages: async () => {
    try {
      if (get().languages.length) return;
      const response = await getData('language');
      set({
        languages: response.data.data,
        error: null,
      });
    } catch (error) {
      set((state) => ({
        ...state,
        error: error.message,
      }));
    }
  },
  getLanguageById: (languageId) => {
    return get().languages.filter(({ id }) => id === languageId)[0];
  },
}));

useLanguageStore.subscribe(console.log);

export default useLanguageStore;
