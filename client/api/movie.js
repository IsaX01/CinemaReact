import api, { headerMultiPart } from '@/api';
import { generateFormData } from '@/utils/generateFormData';

export const addMovie = (data) => {
  return api.post('movie', generateFormData(data), headerMultiPart);
};

export const getMovies = () => {
  return api.get('movie');
};

export const editMovie = (data, id) => {
  return api.put(`movie/${id}`, generateFormData(data), headerMultiPart);
};

export const getMovieById = (id) => {
  return api.get(`movie/${id}`);
};

export const deleteMovie = (id) => {
  return api.delete(`movie/${id}`);
};
