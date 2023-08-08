import { Button } from '@/components/common/form';
import MovieDetails from '@/components/common/movie-details/MovieDetails';
import ScheduleHours from '@/components/common/schedule-hours/ScheduleHours';
import { goToMovieDetail } from '@/utils/goToMovieDetail';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => ({}));

export default function MovieItem({ details }) {
  const classes = useStyles();

  return (
    <div className={classes.details}>
      <CardContent className={classes.content}>
        <MovieDetails movie={details} />
        <ScheduleHours schedule={details.schedule} />
        <Button
          variant={'outlined'}
          color={'primary'}
          onClick={(event) => goToMovieDetail({ event, movie: details })}
        >
          Comprar Boletos
        </Button>
      </CardContent>
    </div>
  );
}

MovieItem.propTypes = {
  details: PropTypes.object,
};
