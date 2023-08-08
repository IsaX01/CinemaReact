import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import SelectMaterialUI from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => ({
  selectTickets: {
    marginLeft: '15px',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
  },
  category: {
    marginLeft: '10px',
  },
}));

export default function Select({ category, setNumber, number, maximumNumber }) {
  const classes = useStyles();

  const handleChange = (event) => {
    setNumber((prevState) => ({
      ...prevState,
      [category.key]: event.target.value,
    }));
  };

  return (
    <div className={classes.selectTickets}>
      <FormControl>
        <SelectMaterialUI value={number[category.key]} onChange={handleChange} defaultValue={0}>
          {Array.from(Array(maximumNumber + 1).keys()).map((index) => (
            <MenuItem key={index} value={index}>
              {index}
            </MenuItem>
          ))}
        </SelectMaterialUI>
      </FormControl>
      <Typography className={classes.category}>{category.label}</Typography>
    </div>
  );
}

Select.propTypes = {
  category: PropTypes.object.isRequired,
  number: PropTypes.object.isRequired,
  setNumber: PropTypes.func.isRequired,
  maximumNumber: PropTypes.number.isRequired,
};
