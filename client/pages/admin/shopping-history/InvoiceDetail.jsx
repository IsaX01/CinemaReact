import { TextAreaField, TextField } from '@/components/common/form';
import useShoppingHistoryStore from '@/stores/shoppingHistoryStore';
import { formatData } from '@/utils/format';
import history from '@/utils/history';
import { generateQRImage } from '@/utils/qrImage';
import { Divider, makeStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { moneyFormatter } from 'shared/utils';

const useStyles = makeStyles(() => ({
  qrImage: {
    width: '100%',
    padding: '30px',
    borderRadius: '16px',
    margin: 'auto',
  },
  wrapperImage: {
    display: 'flex',
    borderRadius: '16px',
    width: '100%',
    backgroundColor: '#151f30',
  },
  divider: {
    margin: '30px auto',
  },
}));

export default function InvoiceDetail() {
  const classes = useStyles();
  const [invoice, setInvoice] = useState({
    qrImage: '',
  });
  const { state } = useLocation();

  const { getInvoiceById } = useShoppingHistoryStore((state) => state);

  useEffect(() => {
    if (state) {
      const setData = async () => {
        const invoice = getInvoiceById(state.id);
        const totalPrice = moneyFormatter(invoice.totalPrice, false);
        const date = formatData({ value: invoice.date, key: 'date' });
        const qrImage = await generateQRImage(invoice.urlCodeQR);
        setInvoice({ ...invoice, qrImage, totalPrice, date });
      };

      setData();
    } else {
      history.push({ pathname: '/dashboard/venta' });
    }
  }, []);

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Factura
      </Typography>
      <Divider className={classes.divider} />
      <Formik initialValues={invoice} enableReinitialize={true}>
        {() => (
          <Form>
            <Grid container spacing={3} maxWidth={'lg'}>
              <Grid item xs={12} md={4}>
                <div className={classes.wrapperImage}>
                  <img src={`${invoice.qrImage}`} className={classes.qrImage} alt={'Código QR'} />
                </div>
              </Grid>
              <Grid item xs={12} md={8}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <TextField label={'Usuario'} name={'userName'} disabled />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField label={'Nombre Completo'} name={'fullName'} disabled />
                  </Grid>
                </Grid>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextAreaField label={'Descripción'} name={'longDescription'} disabled />
                  </Grid>
                </Grid>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <TextField label={'Precio total'} name={'totalPrice'} disabled />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField label={'Fecha'} name={'date'} disabled />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Container>
  );
}
