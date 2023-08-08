import { getData } from '@/api/get';
import create from 'zustand';

const useRestrictionStore = create((set, get) => ({
  restrictions: [],
  error: null,
  fetchAllRestrictions: async () => {
    try {
      if (get().restrictions.length) return;
      const response = await getData('restriction');
      set({
        restrictions: response.data.data,
        error: null,
      });
    } catch (error) {
      set((state) => ({
        ...state,
        error: error.message,
      }));
    }
  },
  getRestrictionById: (restrictionId) => {
    return get().restrictions.filter(({ id }) => id === restrictionId)[0];
  },
}));

useRestrictionStore.subscribe(console.log);

export default useRestrictionStore;
