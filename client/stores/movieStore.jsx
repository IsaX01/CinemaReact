import { getData } from '@/api/get';
import create from 'zustand';

const useMovieStore = create((set, get) => ({
  movies: [],
  error: null,
  fetchAllMovies: async () => {
    try {
      if (get().movies.length) return;
      const response = await getData('movie');
      set({
        movies: response.data.data,
        error: null,
      });
    } catch (error) {
      set((state) => ({
        ...state,
        error: error.message,
      }));
    }
  },
  getMovieById: (movieId) => {
    return get().movies.filter(({ id }) => id === movieId)[0];
  },
}));

useMovieStore.subscribe(console.log);

export default useMovieStore;
