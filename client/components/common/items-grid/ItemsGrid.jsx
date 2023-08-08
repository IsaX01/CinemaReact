import CartItem from '@/components/common/cart-item/CartItem';
import Grid from '@/components/common/grid/Grid';
import useShoppingCartStore from '@/stores/shoppingCartStore';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Fragment, useEffect } from 'react';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
  },
}));

export default function ItemsGrid({ onAdd }) {
  const classes = useStyles();
  const { items, fetchAllItems } = useShoppingCartStore((state) => state);

  useEffect(() => {
    fetchAllItems();
  }, []);

  return (
    <Fragment>
      {!items.length ? (
        <CircularProgress />
      ) : (
        <Grid
          items={items}
          className={classes.root}
          ItemComponent={CartItem}
          otherProps={{ onAdd }}
        />
      )}
    </Fragment>
  );
}

ItemsGrid.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
