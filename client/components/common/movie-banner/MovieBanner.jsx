import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

const styles = () => ({
  cover: {
    width: '100%',
    display: 'block',
    marginBottom: 30,
  },
  text: {
    position: 'relative',
    top: '-190px',
    left: '20px',
  },
});

function MovieBanner({ classes, description, title }) {
  return (
    <div>
      <Box
        component="img"
        alt="The house from the offer."
        className={classes.cover}
        src={'/img/banner.jpg'}
      />
      <div className={classes.text}>
        <Typography variant={'h4'}>{title}</Typography>
        <Typography>{description}</Typography>
      </div>
    </div>
  );
}

MovieBanner.propTypes = {
  classes: PropTypes.object.isRequired,
  description: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default withStyles(styles)(MovieBanner);
