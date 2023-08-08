import api, { headerMultiPart } from '@/api';
import { generateFormData } from '@/utils/generateFormData';

export const saveRoom = (data) => {
  return api.post('room', generateFormData(data), headerMultiPart);
};

export const getRoom = () => {
  return api.get('room');
};

export const editRoom = (data, id) => {
  return api.put(`room/${id}`, generateFormData(data), headerMultiPart);
};

export const deleteRoom = (id) => {
  return api.delete(`room/${id}`);
};

export const getRoomById = (id) => {
  return api.get(`room/${id}`);
};
