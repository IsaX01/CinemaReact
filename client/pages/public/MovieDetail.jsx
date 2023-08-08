import { Button } from '@/components/common/form';
import MovieBanner from '@/components/common/movie-banner/MovieBanner';
import {
  GenresList,
  Info,
  SelectDate,
  SelectHours,
} from '@/components/common/movie-info/MovieInfo';
import Select from '@/components/common/select/Select';
import useOrderStore from '@/stores/orderStore';
import history from '@/utils/history';
import { isAuthenticated } from '@/utils/jwtUtil';
import { CircularProgress } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Fragment, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const MAXIMUM_NUMBER_OF_TICKETS = 5;

const styles = () => ({
  iframe: {
    width: '100%',
    height: 400,
    border: '20px solid #000',
    borderRadius: 20,
  },
});

function MovieDetail({ classes }) {
  const isAuth = isAuthenticated();
  const [movie, setMovie] = useState();
  const { setOrderSchedule, setOrderTickets, setOrderMovie } = useOrderStore((state) => state);
  const [scheduleSelected, setScheduleSelected] = useState({
    date: '',
    scheduleIdSelected: '',
    hours: [],
  });
  const [tickets, setTickets] = useState({
    adult: 0,
    child: 0,
  });
  const { state } = useLocation();

  useEffect(() => {
    state ? setMovie(state.movie) : history.push({ pathname: '/' });
  }, []);

  const handleClick = (event) => {
    event.preventDefault();
    setOrderSchedule({
      ...scheduleSelected,
      hourSelected: scheduleSelected.hours.find(
        ({ scheduleId }) => scheduleId === scheduleSelected.scheduleIdSelected
      ),
    });
    setOrderTickets(tickets);
    setOrderMovie(movie);
    isAuth
      ? history.push({ pathname: '/seleccionar-asientos', state: { movie } })
      : history.push({ pathname: '/login' });
  };

  const isNotComplete = () => {
    return (
      !scheduleSelected.date ||
      !scheduleSelected.scheduleIdSelected ||
      (!tickets.adult && !tickets.child)
    );
  };

  return (
    <Container maxWidth="lg">
      {!movie ? (
        <CircularProgress />
      ) : (
        <Fragment>
          <MovieBanner description={movie.description} title={movie.name} />
          <div>
            <Grid container spacing={3}>
              <Grid item sx={12} md={7}>
                <iframe
                  className={classes.iframe}
                  src={movie.urlTrailer}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  frameBorder="0"
                />
              </Grid>
              <Grid item sx={12} md={5}>
                <Info title={'Géneros'}>
                  <GenresList genres={movie.genre} />
                </Info>
                <Info title={'Día'}>
                  <SelectDate
                    schedule={movie.schedule}
                    setScheduleSelected={setScheduleSelected}
                    scheduleSelected={scheduleSelected}
                  />
                </Info>
                {!!scheduleSelected.hours.length && (
                  <Info title={'Horas'}>
                    <SelectHours
                      setScheduleSelected={setScheduleSelected}
                      scheduleSelected={scheduleSelected}
                    />
                  </Info>
                )}

                <div style={{ width: '50%' }}>
                  {isAuth ? (
                    <Fragment>
                      <Info title={'Tickets'}>
                        <Select
                          category={{ label: 'Adulto', key: 'adult' }}
                          setNumber={setTickets}
                          number={tickets}
                          maximumNumber={MAXIMUM_NUMBER_OF_TICKETS}
                        />
                        <Select
                          category={{ label: 'Niños', key: 'child' }}
                          setNumber={setTickets}
                          number={tickets}
                          maximumNumber={MAXIMUM_NUMBER_OF_TICKETS}
                        />
                      </Info>
                      <Button variant={'outlined'} onClick={handleClick} disabled={isNotComplete()}>
                        COMPRAR BOLETOS
                      </Button>
                    </Fragment>
                  ) : (
                    <Button variant={'outlined'} onClick={handleClick}>
                      INICIA SESION PARA COMPRA BOLETOS
                    </Button>
                  )}
                </div>
              </Grid>
            </Grid>
          </div>
          {/* <Slider />*/}
        </Fragment>
      )}
    </Container>
  );
}

MovieDetail.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(MovieDetail);
