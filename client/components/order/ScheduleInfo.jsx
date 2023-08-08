import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { SingleButton } from '@/components/common/movie-info/MovieInfo';
import PropTypes from 'prop-types';
import moment from 'moment';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    '& > p': {
      width: 64,
      marginRight: theme.spacing(1),
    },
  },
}));

const TODAY = new Date();

const ScheduleInfo = ({ seats, schedule, scheduleSelected }) => {
  const classes = useStyles();
  const dateParsed = moment(schedule.date);
  const dayLabel = dateParsed.isSame(TODAY, 'day')
    ? 'Hoy'
    : dateParsed.locale('es').format('DD MMM');

  return (
    <>
      <Grid container className={classes.container} item xs={12}>
        <Typography variant={'body1'}>Día</Typography>
        <SingleButton label={dayLabel}></SingleButton>
      </Grid>
      <Grid container className={classes.container} item xs={12}>
        <Typography variant={'body1'}>Horario</Typography>
        <SingleButton label={scheduleSelected.hourSelected.hour} />
      </Grid>
      <Grid container className={classes.container} item xs={12}>
        <Typography variant={'body1'}>Asientos</Typography>
        <SingleButton label={seats.map(({ seat }) => seat).join(', ')} />
      </Grid>
    </>
  );
};

ScheduleInfo.propTypes = {
  seats: PropTypes.array.isRequired,
  scheduleSelected: PropTypes.object.isRequired,
  schedule: PropTypes.object.isRequired,
};

export default ScheduleInfo;
