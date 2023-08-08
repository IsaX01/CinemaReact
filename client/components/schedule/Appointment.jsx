import PropTypes from 'prop-types';
import moment from 'moment';
import useMovieStore from '@/stores/movieStore';
import { Typography } from '@material-ui/core';

const Appointment = ({ data }) => {
  const getMovieById = useMovieStore((state) => state.getMovieById);

  const { targetedAppointmentData } = data;

  const movieData = getMovieById(targetedAppointmentData.movie_id) || {};

  return (
    <div className="showtime-preview">
      <Typography>{movieData.name}</Typography>
      <Typography>Descripción: {movieData.description}</Typography>
      <Typography bold>
        {moment(targetedAppointmentData.displayStartDate).format('h:mm a')}
        {' - '}
        {moment(targetedAppointmentData.displayEndDate).format('h:mm a')}
      </Typography>
    </div>
  );
};

Appointment.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Appointment;
