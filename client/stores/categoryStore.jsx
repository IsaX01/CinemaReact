import { getData } from '@/api/get';
import create from 'zustand';

const useCategoryStore = create((set, get) => ({
  categories: [],
  error: null,
  fetchAllCategories: async () => {
    try {
      if (get().categories.length) return;
      const response = await getData('category');
      set({
        categories: response.data.data,
        error: null,
      });
    } catch (error) {
      set((state) => ({
        ...state,
        error: error.message,
      }));
    }
  },
  getCategoryById: (categoryId) => {
    return get().categories.filter(({ id }) => id === categoryId)[0];
  },
}));

useCategoryStore.subscribe(console.log);

export default useCategoryStore;
