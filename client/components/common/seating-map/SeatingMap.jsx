import { Button } from '@/components/common/form';
import { Typography } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/styles';
import firebase from 'firebase/app';
import 'firebase/database';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import firebaseConfig from './config';
import Seat from './Seat.jsx';
import SeatSvg from './SeatSvg';

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

const useStyles = makeStyles(() => ({
  button: {
    textTransform: 'uppercase',
    marginBottom: 35,
    marginTop: 50,
  },
  letters: {
    marginTop: 50,
    display: 'flex',
    flexDirection: 'column',
    '& span': {
      height: 32,
      textAlign: 'center',
      lineHeight: '32px',
      marginBottom: 5,
    },
  },
  trapezoid: {
    height: 40,
    borderLeft: '20px solid transparent',
    borderRight: '20px solid transparent',
    borderTop: '25px solid #d8d8d8',
    minWidth: 438,
    maxWidth: 438,
  },
  seats: {
    minWidth: 438,
    maxWidth: 438,
    marginTop: 10,
  },
  seatsContainer: {
    overflow: 'auto',
  },
  legend: { display: 'flex', alignItems: 'center' },
}));

const SEAT_LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
const AUX_REF_ID = 'miPelicula-1525';

const SeatingMap = ({ seatMax = 5, movieScheduleId, onSubmit }) => {
  const [seats, setSeats] = useState([]);
  const [seatsSelected, setSeatsSelected] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refId, setRefId] = useState(movieScheduleId);
  const classes = useStyles();

  console.log('Movie Schedule ID: ', movieScheduleId);

  useEffect(() => {
    const mapRef = firebase.database().ref();
    mapRef.on('value', (snapshot) => {
      const seats = [];

      const allSchedules = snapshot.val();
      console.log({ allSchedules });

      if (!Object.prototype.hasOwnProperty.call(allSchedules, refId)) {
        console.log('Schedule seats not found');
        setRefId(AUX_REF_ID);

        return;
      }

      const currentSchedule = snapshot.val()[refId];
      seats.push(...currentSchedule);

      setSeats(() => [...seats]);

      setIsLoading(false);
    });
  }, [refId]);

  useEffect(() => {
    if (seats.length) {
      const filteredSeats = seatsSelected.filter((index) => seats[index].chosen === false);
      if (seatsSelected.length !== filteredSeats.length) {
        setSeatsSelected(filteredSeats);
      }
    }
  }, [JSON.stringify(seats)]);

  const handleSubmit = (pendingSeats, goToCandy = false) => {
    const _seatsSelectedData = [];

    pendingSeats.forEach((index) => {
      const seatRef = firebase.database().ref(`/${refId}/` + index);

      seatRef.once('value', (snapshot) => {
        const chosenSeat = snapshot.val();
        chosenSeat.chosen = true;
        chosenSeat.identifier = `${refId}_${index}_${chosenSeat.seat}`;
        seatRef.set(chosenSeat);
        _seatsSelectedData.push(chosenSeat);
      });
    });

    if (onSubmit) {
      onSubmit(_seatsSelectedData, seatsSelected, goToCandy ? '/kiosko' : '/finalizar-pedido');
    }
  };

  const updateStyle = (index) => {
    setSeatsSelected((prev) => {
      const pos = prev.indexOf(index);
      if (pos > -1) {
        prev.splice(pos, 1);
      } else {
        prev.length + 1 > seatMax ? console.log('Limite de asientos alcanzado.') : prev.push(index);
      }

      return [...prev];
    });
  };

  const isSeatSelected = (index) => {
    return seatsSelected.indexOf(index) > -1;
  };

  return (
    <div>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={3}>
          <Grid className={classes.letters} item xs={2} md={3}>
            {SEAT_LETTERS.map((letter) => (
              <span key={letter}>{letter}</span>
            ))}
          </Grid>
          <Grid container item xs={10} md={9} className={classes.seatsContainer} direction="column">
            <div className={classes.trapezoid} />
            <Grid item className={classes.seats}>
              {seats.map((s, index) => (
                <Seat
                  key={s.seat}
                  isSelected={isSeatSelected}
                  seat={s}
                  index={index}
                  updateStyle={updateStyle}
                />
              ))}
            </Grid>
          </Grid>
          <Grid container item xs={12} md={3} align="center" justifyContent="center">
            <Typography>Leyenda: </Typography>
          </Grid>
          <Grid container item xs={12} md={9} direction="row" spacing={3}>
            <Grid item className={classes.legend}>
              <SeatSvg fill="#ff0000" width="2rem" />
              <Typography>Ocupado</Typography>
            </Grid>
            <Grid item className={classes.legend}>
              <SeatSvg fill="#2f80ed" width="2rem" />
              <Typography>Disponible</Typography>
            </Grid>
          </Grid>
        </Grid>
      )}
      <Grid container justifyContent="flex-end" className={classes.button}>
        <Button
          variant={'outlined'}
          color={'primary'}
          type={'submit'}
          disabled={seatsSelected.length !== seatMax}
          onClick={() => handleSubmit(seatsSelected, true)}
        >
          Ir al kiosko
        </Button>
        <Button
          variant={'outlined'}
          color={'primary'}
          type={'submit'}
          disabled={seatsSelected.length !== seatMax}
          onClick={() => handleSubmit(seatsSelected)}
        >
          Finalizar Compra
        </Button>
      </Grid>
    </div>
  );
};

SeatingMap.propTypes = {
  seatMax: PropTypes.number,
  movieScheduleId: PropTypes.string.isRequired,
  onSubmit: PropTypes.func,
};

export default SeatingMap;
