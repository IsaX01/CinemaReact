import { Info, SelectDate, SelectHours } from '@/components/common/movie-info/MovieInfo';
import MovieDetail from '@/components/common/movie-details/MovieDetails';
import Box from '@material-ui/core/Box';
import SeatingMap from '@/components/common/seating-map/SeatingMap';
import useOrderStore from '@/stores/orderStore';
import history from '@/utils/history';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { useState } from 'react';

const styles = (theme) => ({
  container: {
    margin: 15,
    overflow: 'auto',
  },
  time: {
    backgroundColor: 'unset',
    maxWidth: 170,
    margin: '0 auto',
    boxShadow: 'none',
  },
  timeBox: {
    textAlign: 'center',
    padding: 20,
    fontSize: 32,
    border: `1px solid ${theme.palette.text.secondary}`,
  },
});

const TicketBooking = ({ classes }) => {
  const { getMovieScheduleId, getTicketQuantity, movie, saveSeats, saveSeatIndices, schedule } =
    useOrderStore((state) => state);
  const tickets = getTicketQuantity();
  const [scheduleSelected, setScheduleSelected] = useState(schedule);

  const handleSubmit = (selectedSeats, selectedSeatIndices, nextPage) => {
    saveSeats(selectedSeats);
    saveSeatIndices(selectedSeatIndices);
    history.push(nextPage);
  };

  return (
    <Container style={{ backgroundColor: '#131720' }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4">{movie.name}</Typography>
        </Grid>
        <Grid container item xs={12} sm={8} md={5} className={classes.container}>
          <MovieDetail movie={movie} showTitle={false} />
          <Grid item xs={12}>
            <Info title={'Día'} variant={'body1'}>
              <SelectDate
                schedule={movie.schedule}
                setScheduleSelected={setScheduleSelected}
                scheduleSelected={scheduleSelected}
                disabled
              />
            </Info>
          </Grid>
          <Grid item xs={12}>
            {!!scheduleSelected.hours.length && (
              <Info title={'Horarios'} variant={'body1'}>
                <SelectHours
                  setScheduleSelected={setScheduleSelected}
                  scheduleSelected={scheduleSelected}
                  disabled
                />
              </Info>
            )}
          </Grid>
        </Grid>
        <Grid item xs={12} sm={8} md={6}>
          <Paper className={classes.time}>
            <Box className={classes.timeBox}>5:00 min</Box>
            <Typography style={{ fontSize: 24 }}>Para completar la compra</Typography>
          </Paper>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item>
          <Typography variant="h5">
            Selecciona donde quieres sentarte ({tickets} asientos como máximo)
          </Typography>
        </Grid>
        <Grid item style={{ overflow: 'auto' }}>
          <SeatingMap
            seatMax={tickets}
            movieScheduleId={getMovieScheduleId()}
            onSubmit={handleSubmit}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

TicketBooking.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TicketBooking);
