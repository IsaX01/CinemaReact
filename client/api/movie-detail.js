import api from '@/api';

export const getGenres = () => {
  return api.get('genre');
};

export const getGenreById = (id) => {
  return api.get(`genre/${id}`);
};

export const getRooms = () => {
  return api.get('room');
};

export const getRoomsById = (id) => {
  return api.get(`room/${id}`);
};
