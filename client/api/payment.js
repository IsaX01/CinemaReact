import api from '@/api';

export const createPaymentIntent = (data) => {
  return api.post('create-payment-intent', data);
};

export const cancelPaymentIntent = (id) => {
  return api.post(`cancel-payment-intent/${id}`);
};

export const savePaymentMethod = (data, id) => {
  return api.post(`save-payment-method/${id}`, data);
};
