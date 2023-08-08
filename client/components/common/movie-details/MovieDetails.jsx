import { formatData } from '@/utils/format';
import { goToMovieDetail } from '@/utils/goToMovieDetail';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { Fragment } from 'react';

const useStyles = makeStyles(() => ({
  info: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    '& > *': {
      marginRight: '30px',
    },
  },
  tooltip: {
    fontSize: '1rem',
  },
  title: {
    transition: '0.5s',
    cursor: 'pointer',
    '&:hover': {
      transition: '0.5s',
      color: '#2f80ed',
    },
  },
}));

export default function MovieDetails({ movie, showTitle = true }) {
  const classes = useStyles();
  const year = new Date(movie.releaseDate).getFullYear();
  const duration = formatData({ value: movie.duration, key: 'duration' });

  const handleClick = (event) => {
    goToMovieDetail({ event, movie });
  };

  return (
    <Fragment>
      {!!showTitle && (
        <Typography variant="h5" onClick={handleClick} className={classes.title}>
          {movie.name}
        </Typography>
      )}
      <div className={classes.info}>
        <Typography variant="body2">{movie.language}</Typography>
        <Typography variant="body2">{year}</Typography>
        <Typography variant="body2">{duration}</Typography>
        <Typography variant="body2">
          <Tooltip title={movie.restrictionDescription} classes={{ tooltip: classes.tooltip }}>
            <span>{movie.restrictionLabel}</span>
          </Tooltip>
        </Typography>
        <Typography variant="body2">{movie.genre}</Typography>
      </div>
    </Fragment>
  );
}

MovieDetails.propTypes = {
  movie: PropTypes.object.isRequired,
  showTitle: PropTypes.bool,
};
