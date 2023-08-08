import api from '@/api';

export const addOrder = (data) => {
  return api.post('order', data);
};
