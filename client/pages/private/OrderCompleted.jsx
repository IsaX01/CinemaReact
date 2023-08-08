import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Button } from '@/components/common/form/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { useLocation } from 'react-router-dom';
import { generateQRImage } from '@/utils/qrImage';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import history from '@/utils/history';

const useStyles = makeStyles({
  button: {
    textTransform: 'uppercase',
    padding: 20,
  },
});

const OrderCompleted = () => {
  const classes = useStyles();
  const {
    state: { QRToken = '' },
  } = useLocation();
  const [QRImage, setQRImage] = useState('');

  useEffect(async () => {
    if (!QRToken) {
      history.push('/');
    }

    try {
      const result = await generateQRImage(QRToken);
      setQRImage(result);
    } catch (error) {
      console.log('Error: ', error.message);
    }
  }, []);

  return (
    <Container style={{ backgroundColor: '#131720' }}>
      <Grid
        container
        spacing={3}
        direction={'column'}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Grid item xs={12}>
          <img src={QRImage} alt={'QR code'} />
        </Grid>
        <Grid item xs={12}>
          <Typography variant={'h3'}>!Compra realizada con éxito! ✅</Typography>
        </Grid>
        <Grid item xs={12}>
          <Button component={Link} to={'/usuario'} variant={'outlined'} className={classes.button}>
            Ir a mi perfil
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default OrderCompleted;
