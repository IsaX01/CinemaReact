import Carousel from '@/components/Carousel/CarouselPromotion';
import MovieGrid from '@/components/common/movie-grid/MovieGrid';
import Pricing from '@/components/common/pricing/Pricing';
import { isAuthenticated } from '@/utils/jwtUtil';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  content: {
    flex: '1 0 auto',
  },
}));

export default function HomePage() {
  const classes = useStyles();
  const [isAuth] = useState(isAuthenticated());

  return (
    <Container maxWidth="lg">
      <CardContent className={classes.content}>
        {isAuth && (
          <Link to={'/dashboard'}>
            <Typography component="h1" variant="h5">
              DASHBOARD
            </Typography>
          </Link>
        )}
      </CardContent>
      <Carousel />
      <MovieGrid />
      <Pricing />
    </Container>
  );
}
