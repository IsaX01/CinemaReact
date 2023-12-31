import ButtonMaterialUI from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
  },
  button: {
    margin: '10px auto',
    padding: '20px',
    height: '50px',
    borderRadius: '16px',
    backgroundColor: ({ variant }) => (variant === 'outlined' ? 'none' : '#2f80ed'),
    fontSize: '13px',
    color: ({ variant, color }) => {
      const newColor = color === 'primary' ? '#2f80ed' : '#f50057';

      return variant === 'outlined' ? newColor : '#ffffff';
    },
    width: '100%',
    '&:hover, &:focus': {
      transition: '0.5s',
      backgroundColor: ({ color }) => (color === 'primary' ? '#235ead' : 'rgba(245, 0, 87, 0.08)'),
      color: ({ variant }) => (variant === 'outlined' ? '#ffffff' : '#2f80ed'),
    },
  },
}));

export const Button = ({ children, variant, className, color = 'primary', ...props }) => {
  const classes = useStyles({ variant, color });

  return (
    <div className={classes.root}>
      <ButtonMaterialUI
        className={classNames(classes.button, className)}
        variant={variant}
        color={color}
        {...props}
      >
        {children}
      </ButtonMaterialUI>
    </div>
  );
};

// TODO: Verify what is the propTypes of className and children
Button.propTypes = {
  type: PropTypes.string,
  variant: PropTypes.string,
  color: PropTypes.string,
  disabled: PropTypes.bool,
  children: PropTypes.node,
  onClick: PropTypes.func,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};
