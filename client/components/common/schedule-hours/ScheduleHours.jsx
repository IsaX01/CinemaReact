import { makeStyles } from '@material-ui/core/styles';
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
}));

export default function ScheduleHours({ schedule }) {
  const classes = useStyles();
  const mapped = schedule.map(({ hours }) => hours.map(({ hour }) => hour));
  const hours = [...new Set(mapped.flat())];

  return (
    <Fragment>
      <Typography variant="h5" style={{ marginTop: '10px' }}>
        Horarios
      </Typography>
      <div className={classes.info}>
        {hours.map((hour) => (
          <Typography key={hour} variant="body2">
            {hour}
          </Typography>
        ))}
      </div>
    </Fragment>
  );
}

ScheduleHours.propTypes = {
  schedule: PropTypes.array,
};
