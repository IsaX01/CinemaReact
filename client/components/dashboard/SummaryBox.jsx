import { Card, CardContent, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = () => ({
  root: {
    padding: '5px 10px',
    marginLeft: 90,
    height: 80,
  },
  number: {
    display: 'block',
    fontSize: 18,
  },
  text: {
    fontSize: 20,
  },
  iconSpan: {
    float: 'left',
    height: 90,
    width: 90,
    textAlign: 'center',
  },
  icon: {
    height: 48,
    width: 48,
    marginTop: 20,
    maxWidth: '100%',
  },
});

const SummaryBox = (props) => {
  const { classes, color, title, value, Icon } = props;

  return (
    <Card style={{ backgroundColor: '#151f30' }}>
      <CardContent>
        <Grid container justifyContent="space-between">
          <Grid item>
            <span className={classes.iconSpan} style={{ backgroundColor: color }}>
              <Icon className={classes.icon} />
            </span>

            <div className={classes.root}>
              <span className={classes.text}>{title}</span>
              <span className={classes.number}>{value}</span>
            </div>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

SummaryBox.propTypes = {
  classes: PropTypes.object.isRequired,
  Icon: PropTypes.any,
  color: PropTypes.string,
  title: PropTypes.string,
  value: PropTypes.string,
};

export default withStyles(styles)(SummaryBox);
