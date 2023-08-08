import { getData } from '@/api/get';
import create from 'zustand';

const useGenreStore = create((set, get) => ({
  genres: [],
  error: null,
  fetchAllGenres: async () => {
    try {
      if (get().genres.length) return;
      const response = await getData('genre');
      set({
        genres: response.data.data,
        error: null,
      });
    } catch (error) {
      set((state) => ({
        ...state,
        error: error.message,
      }));
    }
  },
  getGenreById: (genreId) => {
    return get().genres.filter(({ id }) => id === genreId)[0];
  },
}));

useGenreStore.subscribe(console.log);

export default useGenreStore;
