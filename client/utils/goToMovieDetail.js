import history from '@/utils/history';

export const goToMovieDetail = ({ event, movie }) => {
  if (event) event.preventDefault();
  history.push({ pathname: '/detalle-pelicula', state: { movie } });
};
