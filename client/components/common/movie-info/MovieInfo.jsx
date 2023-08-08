import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import moment from 'moment';
import PropTypes from 'prop-types';

const TODAY = new Date();
const CURRENT_HOUR = moment(TODAY);
const useStyles = makeStyles(() => ({
  toggleButtonGroup: {},
  toggleButton: {
    color: 'white',
    margin: '10px 25px 10px 10px',
    borderRadius: '16px !important',
    border: 'none',
    backgroundColor: '#151f30',
    '&:hover, &:focus': {
      transition: '0.5s',
      backgroundColor: '#235ead',
      color: '#ffffff',
    },
  },
  infoContainer: {
    marginBottom: 25,
  },
  selectTickets: {
    display: 'flex',
    alignItems: 'flex-end',
  },
  input: {
    width: '50px',
    borderRadius: '16px',
    backgroundColor: '#151f30',
    alignItems: 'flex-end',
    '& :before': {
      borderBottom: 'none',
    },
  },
  category: {
    marginLeft: 20,
  },
}));

export const Info = ({ children, title, variant = 'h5' }) => {
  const classes = useStyles();

  return (
    <div className={classes.infoContainer}>
      <Typography variant={variant} style={{ marginTop: '10px' }}>
        {title}
      </Typography>
      {children}
    </div>
  );
};

export const GenresList = ({ genres }) => {
  const classes = useStyles();

  return (
    <ToggleButtonGroup size="medium">
      {[genres].map((genre) => (
        <ToggleButton key={genre} className={classes.toggleButton}>
          {genre}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

export const SingleButton = ({ label, disabled = false }) => {
  const classes = useStyles();

  return (
    <ToggleButton value={label} className={classes.toggleButton} disabled={disabled}>
      {label}
    </ToggleButton>
  );
};

export const SelectDate = ({
  schedule,
  scheduleSelected,
  setScheduleSelected,
  disabled = false,
}) => {
  const classes = useStyles();

  const handleChange = (event, newDate) => {
    if (!newDate) return;
    const { hours } = schedule.find(({ date }) => date === newDate);
    setScheduleSelected((prevState) => ({
      ...prevState,
      date: newDate,
      hours: [...new Set(hours)],
    }));
  };

  const control = {
    value: scheduleSelected.date,
    onChange: handleChange,
    exclusive: true,
  };

  return (
    <ToggleButtonGroup size="medium" {...control} className={classes.toggleButtonGroup}>
      {schedule.map(({ date }) => {
        const dateParsed = moment(date);
        const isCurrentDay = dateParsed.isSame(TODAY, 'day');
        const isPastDate = dateParsed.isBefore(TODAY, 'day');
        const label = isCurrentDay ? 'Hoy' : dateParsed.locale('es').format('DD MMM');

        return (
          <ToggleButton
            value={date}
            key={date}
            className={classes.toggleButton}
            disabled={isPastDate || disabled}
          >
            {label}
          </ToggleButton>
        );
      })}
    </ToggleButtonGroup>
  );
};

export const SelectHours = ({ scheduleSelected, setScheduleSelected, disabled = false }) => {
  const classes = useStyles();
  const handleChange = (_, scheduleIdSelected) => {
    setScheduleSelected((prevState) => ({
      ...prevState,
      scheduleIdSelected,
    }));
  };

  const control = {
    value: scheduleSelected.scheduleIdSelected,
    onChange: handleChange,
    exclusive: true,
  };

  return (
    <ToggleButtonGroup size="medium" {...control}>
      {scheduleSelected.hours.map((schedule) => {
        const hourParsed = moment(new Date(`${scheduleSelected.date} ${schedule.hour}`));
        const isPastHour = hourParsed.isBefore(CURRENT_HOUR);

        return (
          <ToggleButton
            key={schedule.scheduleId}
            value={schedule.scheduleId}
            className={classes.toggleButton}
            disabled={isPastHour || disabled}
          >
            {schedule.hour}
          </ToggleButton>
        );
      })}
    </ToggleButtonGroup>
  );
};

Info.propTypes = {
  children: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  variant: PropTypes.string,
};

SingleButton.propTypes = {
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

SelectDate.propTypes = {
  schedule: PropTypes.array.isRequired,
  setScheduleSelected: PropTypes.func.isRequired,
  scheduleSelected: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
};

SelectHours.propTypes = {
  setScheduleSelected: PropTypes.func.isRequired,
  scheduleSelected: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
};

GenresList.propTypes = {
  genres: PropTypes.string.isRequired,
};
