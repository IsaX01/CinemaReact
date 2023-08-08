import api, { headerMultiPart } from '@/api';
import { generateFormData } from '@/utils/generateFormData';

export const addPromotion = (data) => {
  return api.post('promotion', generateFormData(data), headerMultiPart);
};

export const getPromotions = () => {
  return api.get('promotion');
};

export const editPromotion = (data, id) => {
  return api.put(`promotion/${id}`, generateFormData(data), headerMultiPart);
};

export const getPromotionById = (id) => {
  return api.get(`promotion/${id}`);
};

export const deletePromotion = (id) => {
  return api.delete(`promotion/${id}`);
};
