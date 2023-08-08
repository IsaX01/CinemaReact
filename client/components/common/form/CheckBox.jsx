import { useField } from 'formik';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { default as MaterialCheckBox } from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import classNames from 'classnames';

const useStyles = makeStyles((theme) => ({
  container: {
    marginBottom: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    color: theme.palette.text.primary,
  },
}));

const CheckBox = ({ label, labelClassName, ...props }) => {
  const [field, meta] = useField(props);
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <FormControlLabel
        className={classNames(classes.label, labelClassName)}
        control={
          <MaterialCheckBox
            {...field}
            checked={Boolean(field.value)}
            color="secondary"
            {...props}
          />
        }
        label={label}
      />
      {meta.touched && Boolean(meta.error) && (
        <FormHelperText error variant={'outlined'}>
          {meta.error}
        </FormHelperText>
      )}
    </div>
  );
};

CheckBox.propTypes = {
  label: PropTypes.string.isRequired,
  labelClassName: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export default CheckBox;
