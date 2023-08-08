import GridItem from '@/components/common/grid-item/GridItem';
import GridMaterialUI from '@material-ui/core/Grid';
import PropTypes from 'prop-types';

export default function Grid({ items, ItemComponent, otherProps }) {
  return (
    <GridMaterialUI container spacing={2}>
      {items.map((item) => {
        return (
          <GridMaterialUI item xs={12} md={6} lg={6} key={item.movieID || item.id}>
            <GridItem item={item} ItemComponent={ItemComponent} otherProps={otherProps} />
          </GridMaterialUI>
        );
      })}
    </GridMaterialUI>
  );
}

Grid.propTypes = {
  items: PropTypes.array,
  ItemComponent: PropTypes.any,
  otherProps: PropTypes.any,
};
