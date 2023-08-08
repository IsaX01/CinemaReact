import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from 'client/components/common/slider/carrusel';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
}));

export const MovieItem = () => {
  const classes = useStyles();
  const [isAuth] = useState(isAuth());

  return (
    <Card className={classes.root}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          {isAuth ? (
            <Link to={'/dashboard'}>
              <Typography component="h1" variant="h5">
                DASHBOARD
              </Typography>
            </Link>
          ) : (
            <Slider />
          )}
        </CardContent>
      </div>
    </Card>
  );
};
