import { getAllSchedulesFullInformation } from '@/api/schedule';
import Grid from '@/components/common/grid/Grid';
import MovieItem from '@/components/common/movie-item/MovieItem';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Fragment, useEffect, useState } from 'react';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
  },
}));

export default function MovieGrid() {
  const classes = useStyles();
  const [filterMovies, setFilterMovies] = useState([]);

  useEffect(() => {
    const getInformation = async () => {
      try {
        const movies = await getAllSchedulesFullInformation();
        setFilterMovies(movies.data.data);
      } catch (e) {
        console.log(e);
      }
    };
    getInformation();
  }, []);

  return (
    <Fragment>
      {!filterMovies.length ? (
        <CircularProgress />
      ) : (
        <Fragment>
          <Typography component="h1" variant="h4">
            Cartelera
          </Typography>
          <Grid
            items={filterMovies}
            className={classes.root}
            ItemComponent={MovieItem}
            otherProps={{ isAMovieItem: true }}
          />
        </Fragment>
      )}
    </Fragment>
  );
}
