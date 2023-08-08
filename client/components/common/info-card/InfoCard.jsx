import Card from '@/components/common/card/Card';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => ({
  infoCard: {
    marginBottom: '15px',
  },
}));

export default function InfoCard({ children }) {
  const classes = useStyles();

  return (
    <div className={classes.infoCard}>
      <Card isFlex={false}>
        <Container>{children}</Container>
      </Card>
    </div>
  );
}

InfoCard.propTypes = {
  children: PropTypes.any.isRequired,
};
