import { Button } from '@/components/common/form';
import InfoCard from '@/components/common/info-card/InfoCard';
import { moneyFormatter } from 'shared/utils';
import history from '@/utils/history';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { Fragment } from 'react';

const useStyles = makeStyles(() => ({
  info: {
    fontSize: '15px',
  },
  divider: {
    margin: '10px auto',
  },
  subTotal: {
    fontSize: '30px',
  },
  span: {
    float: 'right',
  },
}));

export default function CheckoutCard({ subTotal, totalTicketPrice, isTotalPriceTicketsOnlyTaxes }) {
  const total = moneyFormatter(subTotal + totalTicketPrice, false);
  const classes = useStyles();

  const handleClick = () => history.push('/finalizar-pedido');

  return (
    <InfoCard>
      <br />
      {!isTotalPriceTicketsOnlyTaxes && (
        <Fragment>
          <Typography className={classes.info}>
            Subtotal de Taquilla
            <span className={classes.span}>{moneyFormatter(totalTicketPrice)}</span>
          </Typography>
          <Divider className={classes.divider} />
        </Fragment>
      )}
      <Typography className={classes.info}>
        Subtotal de Artículos <span className={classes.span}>{moneyFormatter(subTotal)}</span>
      </Typography>
      <Divider className={classes.divider} />
      <Typography>
        Total
        <span className={`${classes.subTotal} ${classes.span}`}>{total}</span>
      </Typography>
      <Button color={'primary'} variant={'outlined'} onClick={handleClick}>
        PROCEDER AL PAGO
      </Button>
    </InfoCard>
  );
}

CheckoutCard.propTypes = {
  subTotal: PropTypes.number.isRequired,
  totalTicketPrice: PropTypes.number.isRequired,
  isTotalPriceTicketsOnlyTaxes: PropTypes.bool.isRequired,
};
