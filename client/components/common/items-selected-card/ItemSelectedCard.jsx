import InfoCard from '@/components/common/info-card/InfoCard';
import { ITEM_SERVICE_CHARGE } from '@/utils/constant';
import { moneyFormatter } from 'shared/utils';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { Fragment } from 'react';

const useStyles = makeStyles(() => ({
  title: {
    textAlign: 'center',
    margin: '10px auto',
    fontSize: '20px',
  },
  info: {
    fontSize: '15px',
  },
  item: {
    marginBottom: '10px',
  },
  span: {
    float: 'right',
  },
  divider: {
    margin: '10px auto',
  },
  subTotal: {
    fontSize: '30px',
  },
  button: {
    cursor: 'pointer',
    borderRadius: '50%',
  },
}));

export default function ItemsSelectedCard({ items, onAdd, onRemove, subTotal }) {
  const classes = useStyles();

  return (
    <InfoCard>
      <Typography className={classes.title}>Tus Artículos</Typography>
      {!items.length ? (
        <Typography className={classes.info}>No haz seleccionado ningún artículo</Typography>
      ) : (
        items.map((item) => (
          <Grid container key={item.id} className={`${classes.info} ${classes.item}`} xs={12}>
            <Grid item xs={4}>
              {item.name}
            </Grid>
            <Grid item xs={4}>
              <span className={classes.span}>
                <button className={classes.button} onClick={() => onAdd(item)}>
                  +
                </button>
                <button className={classes.button} onClick={() => onRemove(item)}>
                  -
                </button>
              </span>
            </Grid>
            <Grid item xs={4}>
              <span className={classes.span}>
                {item.qty} x {moneyFormatter(item.price)}
              </span>
            </Grid>
          </Grid>
        ))
      )}
      <Divider className={classes.divider} />
      {!!items.length && (
        <Fragment>
          <Typography className={classes.info}>
            Cargo serv. Snacks:
            <span className={classes.span}>{moneyFormatter(ITEM_SERVICE_CHARGE)}</span>
          </Typography>
          <Divider className={classes.divider} />
          <Typography>
            Subtotal
            <span className={`${classes.subTotal} ${classes.span}`}>
              {moneyFormatter(subTotal, false)}
            </span>
          </Typography>
        </Fragment>
      )}
    </InfoCard>
  );
}

ItemsSelectedCard.propTypes = {
  items: PropTypes.array.isRequired,
  onAdd: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  subTotal: PropTypes.number.isRequired,
};
