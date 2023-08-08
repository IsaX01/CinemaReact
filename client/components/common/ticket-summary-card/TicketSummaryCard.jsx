import InfoCard from '@/components/common/info-card/InfoCard';
import useOrderStore from '@/stores/orderStore';
import { TICKET_SERVICE_CHARGE } from '@/utils/constant';
import { moneyFormatter } from 'shared/utils';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => ({
  title: {
    textAlign: 'center',
    margin: '10px auto',
    fontSize: '20px',
  },
  info: {
    fontSize: '15px',
  },
  subTotal: {
    fontSize: '30px',
  },
  divider: {
    margin: '10px auto',
  },
  span: {
    float: 'right',
  },
}));

export default function TicketSummaryCard({ totalTicketPrice }) {
  const { getTicketQuantity, getMovieName } = useOrderStore((state) => state);
  const ticketQuantity = getTicketQuantity();
  const movieName = getMovieName();
  const total = moneyFormatter(totalTicketPrice, false);
  const classes = useStyles();

  return (
    <InfoCard>
      <Typography className={classes.title}>Taquillas</Typography>
      <Typography className={classes.info}>
        Película: <span className={classes.span}>{movieName}</span>
      </Typography>
      <Typography className={classes.info}>
        Cantidad: <span className={classes.span}>{ticketQuantity}</span>
      </Typography>
      <Divider className={classes.divider} />
      <Typography className={classes.info}>
        Cargo serv. Taquilla:
        <span className={classes.span}>{moneyFormatter(TICKET_SERVICE_CHARGE)}</span>
      </Typography>
      <Divider className={classes.divider} />
      <Typography>
        Subtotal <span className={`${classes.subTotal} ${classes.span}`}>{total}</span>
      </Typography>
    </InfoCard>
  );
}

TicketSummaryCard.propTypes = {
  totalTicketPrice: PropTypes.number,
};
