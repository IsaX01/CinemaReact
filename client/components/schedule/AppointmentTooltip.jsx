import useMovieStore from '@/stores/movieStore';
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  makeStyles,
  Typography,
} from '@material-ui/core';
import DeleteOutlineRounded from '@material-ui/icons/DeleteOutlineRounded';
import moment from 'moment';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

const useStyles = makeStyles(() => ({
  image: {
    height: 127,
  },
}));

const AppointmentTooltip = ({ data, deleteAppointment }) => {
  const getMovieById = useMovieStore((state) => state.getMovieById);
  const [movieData, setMovieData] = useState({});
  const classes = useStyles();

  useEffect(() => {
    if (data.appointmentData.movie_id) {
      setMovieData(getMovieById(data.appointmentData.movie_id));
    }
  }, [data.appointmentData.movie_id]);

  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    deleteAppointment(data.appointmentData);
  };

  return (
    <Card>
      <CardHeader title={`${movieData.name} (${moment(movieData.release).year()})`} />
      <CardContent>
        <Grid container>
          <Grid item xs={4}>
            <img className={classes.image} src={movieData.url_image} alt={movieData.name} />
          </Grid>
          <Grid item xs={8}>
            <Typography>Director: {movieData.director}</Typography>
            <Typography>Duration: {movieData.duration} minutes</Typography>
            <br />
            <IconButton onClick={handleDelete} aria-label="delete">
              <DeleteOutlineRounded />
            </IconButton>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

AppointmentTooltip.propTypes = {
  data: PropTypes.object.isRequired,
  deleteAppointment: PropTypes.func.isRequired,
};

export default AppointmentTooltip;
