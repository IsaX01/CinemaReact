import Grid from '@material-ui/core/Grid';
import Carousel from 'react-elastic-carousel';
import { makeStyles } from '@material-ui/core/styles';
import { useRef, useEffect, useState } from 'react';
import { getPromotions } from '@/api/promotion';

const useStyles = makeStyles(() => ({
  div: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '270px',
    color: '#fff',
    margin: '0 15px',
    fontSize: '4em',
    borderRadius: '2px',
  },
  container: {
    fontFamily: 'sans-serif',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    marginBottom: '40px',
  },
  slideImage: {
    width: '270px',
    height: '100%',
    fontSize: '15px',
  },
}));

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
];

const CarouselPromotion = () => {
  const classes = useStyles();
  const carouselRef = useRef(null);
  let resetTimeout;
  const [promotions, setPromotions] = useState([]);

  useEffect(() => {
    const callApi = async () => {
      try {
        const result = await getPromotions();
        setPromotions(result.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    callApi();
  }, []);

  return (
    <Grid container spacing={10} className={classes.container}>
      <Carousel
        breakPoints={breakPoints}
        ref={carouselRef}
        pagination={false}
        enableAutoPlay={true}
        showArrows={false}
        autoPlaySpeed={3000}
        isRTL={false}
        onNextEnd={({}) => {
          clearTimeout(resetTimeout);
          resetTimeout = setTimeout(() => {
            carouselRef?.current?.goTo(0);
          }, 4000);
        }}
      >
        {promotions.map((promotion) =>
          !promotion.url_image ? (
            <div>
              <span>Promocion sin imagen</span>
            </div>
          ) : (
            <div className={classes.div} key={promotion.id}>
              <img className={classes.slideImage} src={promotion.url_image} />
            </div>
          )
        )}
      </Carousel>
    </Grid>
  );
};

export default CarouselPromotion;
