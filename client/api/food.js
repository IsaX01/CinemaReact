import api, { headerMultiPart } from '@/api';
import { generateFormData } from '@/utils/generateFormData';

export const saveFood = (data) => {
  return api.post('food', generateFormData(data), headerMultiPart);
};

export const getFoods = () => {
  return api.get('food');
};

export const editFood = (data, id) => {
  return api.put(`food/${id}`, generateFormData(data), headerMultiPart);
};

export const deleteFood = (id) => {
  return api.delete(`food/${id}`);
};

export const getFoodById = (id) => {
  return api.get(`food/${id}`);
};
