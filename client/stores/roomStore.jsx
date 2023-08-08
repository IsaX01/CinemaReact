import { getData } from '@/api/get';
import create from 'zustand';

const useRoomStore = create((set, get) => ({
  rooms: [],
  error: null,
  fetchAllRooms: async () => {
    try {
      if (get().rooms.length) return;
      const response = await getData('room');
      set({
        rooms: response.data.data,
        error: null,
      });
    } catch (error) {
      set((state) => ({
        ...state,
        error: error.message,
      }));
    }
  },
  getRoomById: (roomId) => {
    return get().rooms.filter(({ id }) => id === roomId)[0];
  },
}));

useRoomStore.subscribe(console.log);

export default useRoomStore;
