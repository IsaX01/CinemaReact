import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import MovieDetail from '@/components/common/movie-details/MovieDetails';
import ScheduleInfo from '@/components/order/ScheduleInfo';
import PropTypes from 'prop-types';
import Ticket from '@/components/order/Ticket';
import useShoppingCartStore from '@/stores/shoppingCartStore';
import PaymentForm from '@/components/order/PaymentForm';
import { useState, useEffect } from 'react';
import useOrderStore from '@/stores/orderStore';
import { Notification } from '@/components/common/notificacion/Notificacion';
import history from '@/utils/history';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import usePaymentStore from '@/stores/paymentStore';

const stripePromise = loadStripe(process.env.SK_PUBLISH_KEY);

const styles = (theme) => ({
  formContainer: {
    maxWidth: 800,
    minHeight: 600,
    margin: '0 auto',
    backgroundColor: theme.palette.background.form,
  },
  item: {
    alignItems: 'center',
    display: 'flex',
    '&:first-child': {
      padding: 20,
    },
  },
  movieTitle: {
    width: '100%',
  },
});

const stripeAppearance = {
  theme: 'night',
  labels: 'floating',
  variables: {
    colorPrimary: '#2f80ed',
    colorBackground: '#151f30',
    colorDanger: '#f44336',
    borderRadius: '16px',
  },
};

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const FinishOrder = ({ classes }) => {
  const { getTicketQuantity, movie, seats, schedule, getTotal, placeOrder, reset } = useOrderStore(
    (state) => state
  );
  const { calculateItemsQuantity, reset: resetShopping } = useShoppingCartStore((state) => state);
  const {
    createPayment,
    clientSecret,
    error,
    cancelPayment,
    reset: resetPayment,
  } = usePaymentStore((state) => state);
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });
  const totalTickets = getTicketQuantity();
  const totalItems = calculateItemsQuantity();

  useEffect(() => {
    if (!clientSecret) {
      createPayment(getTotal());
    }
  }, []);

  useEffect(() => {
    if (error) {
      setNotify({
        isOpen: true,
        message: 'Ha ocurrido un error, por favor refresque la página o intente en unos minutos.',
        type: 'error',
      });
      console.error(error);
      resetPayment();
    }
  }, [error]);

  const handleSubmit = async (userId, setSubmitting) => {
    const response = await placeOrder(userId);

    if (response && response.data.success) {
      reset();
      resetShopping();
      resetPayment();
      history.push('/pedido-completado', { QRToken: response.data.token });
    } else {
      setNotify({
        isOpen: true,
        message: 'Ha ocurrido un error, intente nuevamente.',
        type: 'error',
      });
    }

    setSubmitting(false);
  };

  const handleCancel = async () => {
    // TODO: Set Confirmation Dialog
    reset();
    resetShopping();
    await cancelPayment();
    setNotify({
      isOpen: true,
      message: 'Orden cancelada. Redirigiendo al inicio en 3 segundos...',
      type: 'success',
    });
    await delay(3000);
    history.push('/');
  };

  const options = {
    clientSecret,
    locale: 'es-419',
    appearance: stripeAppearance,
  };

  return (
    <Container style={{ backgroundColor: '#131720' }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4">Realizar pago</Typography>
        </Grid>
        <Grid container item xs={12} sm={8}>
          <Typography variant="h6" className={classes.movieTitle}>
            {movie.name}
          </Typography>
          {Object.keys(movie).length > 0 ? <MovieDetail movie={movie} showTitle={false} /> : null}
          {Object.keys(schedule).length > 0 && totalTickets ? (
            <ScheduleInfo seats={seats} schedule={schedule} scheduleSelected={schedule} />
          ) : null}
        </Grid>
      </Grid>
      <Grid container className={classes.formContainer}>
        <Grid item xs={12} md={5} className={classes.item}>
          <Ticket totalTickets={totalTickets} totalItems={totalItems} totalImport={getTotal()} />
        </Grid>
        <Grid item xs={12} md={7} className={classes.item}>
          {!!clientSecret && (
            <Elements options={options} stripe={stripePromise}>
              <PaymentForm
                clientSecret={clientSecret}
                handleSubmit={handleSubmit}
                handleCancel={handleCancel}
                setNotify={setNotify}
              />
            </Elements>
          )}
        </Grid>
      </Grid>
      <Notification notify={notify} setNotify={setNotify} />
    </Container>
  );
};

FinishOrder.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FinishOrder);
