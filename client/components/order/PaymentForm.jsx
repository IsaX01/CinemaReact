import { makeStyles } from '@material-ui/core/styles';
import { TextField, CheckBox, Button } from '@/components/common/form';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { userStore as useUserStore } from '@/stores/authStore';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { HOST } from 'shared/utils';
import { savePaymentMethod } from '@/api/payment';
import usePaymentStore from '@/stores/paymentStore';

const PaymentSchema = Yup.object().shape({
  cardName: Yup.string().required('Requerido'),
});

const useStyles = makeStyles(() => ({
  root: {
    paddingTop: 20,
    minHeight: 440,
    display: 'flex',
    maxWidth: '90%',
    margin: '0 auto',
    alignItems: 'center',
    flexDirection: 'column',
  },
  form: {
    marginTop: 20,
  },
  btn: {
    textTransform: 'uppercase',
  },
  loader: {
    marginRight: 10,
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
  },
}));

const PaymentForm = ({ handleSubmit, handleCancel, setNotify }) => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const paymentId = usePaymentStore((state) => state.id);
  const stripe = useStripe();
  const { user, getFullName } = useUserStore((state) => state);
  const elements = useElements();

  const onSubmit = async (values, { setSubmitting }) => {
    if (!stripe || !elements) {
      return;
    }

    if (!user.id) {
      setNotify({
        isOpen: true,
        message: 'Por favor, vuelva a iniciar sesión para continuar.',
        type: 'warning',
      });
      setSubmitting(false);

      return;
    }

    await savePaymentMethod({ save: values.remindMe }, paymentId);

    const { paymentIntent, error } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required',
      confirmParams: {
        return_url: `${HOST}/finalizar-pedido`,
        payment_method_data: {
          billing_details: {
            name: values.cardName,
            email: user.email,
            phone: user.phone,
          },
        },
      },
    });

    if (error && (error.type === 'card_error' || error.type === 'validation_error')) {
      setNotify({
        isOpen: true,
        message: error.message,
        type: 'warning',
      });
    } else if (
      paymentIntent?.status &&
      (paymentIntent.status === 'succeeded' || paymentIntent.status === 'processing')
    ) {
      setNotify({
        isOpen: true,
        message: '¡Pago confirmado!, completando pedido...',
        type: 'success',
      });

      await handleSubmit(user.id, setSubmitting);
    } else {
      setNotify({
        isOpen: true,
        message: 'Algo and mal, por favor intente nuevamente.',
        type: 'warning',
      });

      setSubmitting(false);
    }
  };

  return (
    <div className={classes.root}>
      <img src={'/img/creditCard.png'} alt={'Sample credit card'} />
      <Formik
        initialValues={{ cardName: getFullName(), remindMe: false }}
        validationSchema={PaymentSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form className={classes.form}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <TextField
                  name="cardName"
                  label="Nombre"
                  fullWidth
                  shrink={false}
                  autoComplete="cc-name"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <PaymentElement
                  id="payment-element"
                  options={{
                    layout: 'tabs',
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <CheckBox name="remindMe" label="Guardar tarjeta de crédito" />
              </Grid>
              <Grid container item xs={12} spacing={2} className={classes.buttons}>
                <Button
                  className={classes.btn}
                  variant="outlined"
                  color="secondary"
                  disabled={isSubmitting || isLoading}
                  onClick={() => {
                    setIsLoading(true);
                    handleCancel();
                  }}
                >
                  Cancelar Pago
                </Button>
                <Button
                  className={classes.btn}
                  type="submit"
                  variant="outlined"
                  color="primary"
                  disabled={isSubmitting || isLoading}
                >
                  Realizar Pago
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </div>
  );
};

PaymentForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  setNotify: PropTypes.func.isRequired,
};

export default PaymentForm;
