import api from '@/api';

export const addSchedule = (data) => {
  return api.post('schedules', data);
};

export const addScheduleSeats = (id) => {
  return api.post(`schedules/seats/${id}`);
};

export const editSchedule = (data, id) => {
  return api.put(`schedules/${id}`, data);
};

export const deleteSchedule = (id) => {
  return api.delete(`schedules/${id}`);
};

export const getScheduleById = (id) => {
  return api.get(`schedules/${id}`);
};

export const getAllSchedules = () => {
  return api.get('schedules');
};

export const getAllSchedulesFullInformation = () => {
  return api.get('schedules-full-information');
};
