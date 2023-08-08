import { getData } from '@/api/get';

import { addSchedule, deleteSchedule, editSchedule } from '@/api/schedule';
import { DATE_FORMAT } from '@/utils/constant';
import moment from 'moment';
import create from 'zustand';

const useScheduleStore = create((set, get) => ({
  schedules: [],
  error: null,
  isLoading: false,
  add: async (data) => {
    try {
      const response = await addSchedule({
        ...data,
        startDate: moment(data.startDate).format(DATE_FORMAT),
        endDate: moment(data.endDate).format(DATE_FORMAT),
      });

      return response.data.id;
    } catch (error) {
      set({
        schedules: [],
        error: error.message,
      });
    }
  },
  update: async (data, id) => {
    try {
      await editSchedule(
        {
          ...data,
          startDate: moment(data.startDate).format(DATE_FORMAT),
          endDate: moment(data.endDate).format(DATE_FORMAT),
        },
        id
      );
    } catch (error) {
      set((state) => ({
        ...state,
        error: error.message,
      }));
    }
  },
  fetchAllSchedules: async () => {
    try {
      if (get().schedules.length) return;
      set((state) => ({ ...state, isLoading: true }));
      const response = await getData('schedules');
      set({
        schedules:
          response.data.data.map((s) => ({
            ...s,
            startDate: new Date(s.start_date),
            endDate: new Date(s.end_date),
          })) || [],
        error: null,
        isLoading: false,
      });
    } catch (error) {
      set((state) => ({
        ...state,
        error: error.message,
        isLoading: false,
      }));
    }
  },
  delete: async (id) => {
    try {
      await deleteSchedule(id);
    } catch (error) {
      set((state) => ({
        ...state,
        error: error.message,
      }));
    }
  },
  isValidScheduleInterval: (startDate, endDate, newRoomId, newMovieId = '') => {
    const isValid = get().schedules.reduce((isAvailable, schedule) => {
      const {
        startDate: newStartDate,
        endDate: newEndDate,
        room_id: roomId,
        movie_id: movieId,
      } = schedule;
      const start = moment(newStartDate);
      const end = moment(newEndDate);
      const hasDateOverlap = start.isBefore(new Date(endDate)) && end.isAfter(new Date(startDate));

      if ((hasDateOverlap && roomId === newRoomId) || (hasDateOverlap && movieId === newMovieId)) {
        return false;
      }

      return isAvailable;
    }, true);

    return isValid;
  },
}));

useScheduleStore.subscribe(console.log);

export default useScheduleStore;
