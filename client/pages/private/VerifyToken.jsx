import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Button } from '@/components/common/form/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useLocation } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const useStyles = makeStyles({
  button: {
    textTransform: 'uppercase',
    padding: 20,
  },
});

const VerifyToken = () => {
  const classes = useStyles();
  const [verified, setVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { search } = useLocation();
  const params = new URLSearchParams(search);

  useEffect(async () => {
    if (!params.get('token')) {
      setIsLoading(false);

      return;
    }

    try {
      const result = await jwtDecode(params.get('token'));
      if (Object.prototype.hasOwnProperty.call(result, 'invoiceId')) {
        setVerified(true);
      }
    } catch (error) {
      setVerified(false);
    }

    setIsLoading(false);
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
        {isLoading ? (
          <Grid item xs={12}>
            <CircularProgress />
          </Grid>
        ) : (
          <>
            <Grid item xs={12}>
              <Typography variant={'h3'}>
                {verified ? '!Pedido verificado y válido! ✅' : 'Pedido inválido o expirado ❌'}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Button component={Link} to={'/'} variant={'outlined'} className={classes.button}>
                Ir a al inicio
              </Button>
            </Grid>
          </>
        )}
      </Grid>
    </Container>
  );
};

export default VerifyToken;
