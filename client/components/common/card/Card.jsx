import CardMaterialUI from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: '#151f30',
    borderRadius: '16px',
    display: ({ isFlex }) => (isFlex ? 'flex' : 'block'),
  },
}));

export default function Card({ children, isFlex = true }) {
  const classes = useStyles({ isFlex });

  return <CardMaterialUI className={classes.root}>{children}</CardMaterialUI>;
}

Card.propTypes = {
  children: PropTypes.any.isRequired,
  isFlex: PropTypes.bool,
};
