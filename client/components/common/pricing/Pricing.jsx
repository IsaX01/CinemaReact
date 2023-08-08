import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const tiers = [
  {
    title: 'Niños',
    price: '200.00',
    description: [
      'Entrada regular de Jueves a Domingo',
      'Niños (2-10)',
      'Especial de los martes mantiene este costo',
    ],
    buttonText: 'Elegir pelicula',
    buttonVariant: 'contained',
  },
  {
    title: 'Adultos',
    price: '300.00',
    description: [
      'Entrada regular de Jueves a Domingo',
      'Especial de los martes tienen un costo de: $200.00',
      '           ',
    ],
    buttonText: 'Elegir pelicula',
    buttonVariant: 'contained',
  },
  {
    title: 'Salas 3D',
    price: '325.00/$175.00',
    description: [
      'Entrada regular de Jueves a Domingo',
      'Costo de boletas Adultos: $325.00',
      'Costo de boletas Niños (2-10): $175.00',
    ],
    buttonText: 'Elegir pelicula',
    buttonVariant: 'contained',
  },
];

const useStyles = makeStyles(() => ({
  root: {
    margin: '50px auto',
  },
  cards: {
    backgroundColor: 'rgba(21, 31, 48, 1)',
    height: '100%',
    borderRadius: '20px',
  },
}));

export default function Pricing() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container disableGutters maxWidth="lg">
        <Typography component="h1" variant="h4" align="left" gutterBottom>
          Precio de boletas
        </Typography>
      </Container>
      <br></br>
      <Container maxWidth="lg" component="main">
        <Grid container spacing={5} alignItems="stretch" height="100%">
          {tiers.map((tier) => (
            <Grid item key={tier.title} xs={12} sm={tier.title === 'Salas 3D' ? 12 : 6} md={4}>
              <Card className={classes.cards}>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: 'center' }}
                  subheaderTypographyProps={{
                    align: 'center',
                  }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'stretch',
                    }}
                  >
                    <Typography component="h2" variant="h4" align="center">
                      ${tier.price}
                    </Typography>
                  </Box>
                  <br></br>
                  {tier.description.map((line) => (
                    <Typography align="center" key={line}>
                      <br></br>
                      {line}
                    </Typography>
                  ))}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <br></br>
        <Typography align="left" component="p">
          Excepto películas Dominicanas y 3D, algunas películas no aplican en su 1ra o 2da semana de
          estreno.
        </Typography>
      </Container>
    </div>
  );
}
