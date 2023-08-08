import Card from '@/components/common/card/Card';
import { goToMovieDetail } from '@/utils/goToMovieDetail';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    backgroundColor: '#151f30',
  },
  cover: {
    width: 200,
    cursor: ({ isAMovieItem }) => (isAMovieItem ? 'pointer' : ''),
  },
}));

export default function GridItem({ item, ItemComponent, otherProps }) {
  const classes = useStyles({ isAMovieItem: otherProps.isAMovieItem });
  const handleClick = (event) => {
    if (otherProps.isAMovieItem) goToMovieDetail({ event, movie: item });
  };

  return (
    <Card isFlex={true}>
      <CardMedia
        className={classes.cover}
        image={item.urlImage || item.image}
        title={`Imagen de ${item.name}`}
        onClick={handleClick}
      />
      <ItemComponent details={item} {...otherProps} />
    </Card>
  );
}

GridItem.propTypes = {
  item: PropTypes.object,
  ItemComponent: PropTypes.any.isRequired,
  otherProps: PropTypes.any,
};
