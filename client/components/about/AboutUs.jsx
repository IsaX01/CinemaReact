import * as React from 'react';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const tiers = [
  {
    title: 'Misión',
    description: [
      'Desarrollar un ambiente dinámico, innovador, seguro y de respeto que responda las necesidades de nuestros empleados, clientes y suplidores, asegurando el éxito de la organización.',
    ],
  },
  {
    title: 'Visión',
    description: [
      'Ser la principal alternativa de entretenimiento brindando las más diversas experiencias en el mejor ambiente.',
    ],
  },
  {
    title: 'Valores',
    description: [
      'Responsabilidad',
      'Honestidad',
      'Puntualidad',
      'Respeto',
      'Integración de equipo',
      'Colaboración',
    ],
  },
];
const useStyles = makeStyles((theme) => ({
  style: {
    margin: '0 auto',
    flexDirection: 'column',
    padding: 0,
    listStyle: 'none',
    justifyContent: 'center',
  },
  cards: {
    backgroundColor: 'rgba(21, 31, 48, 1)',
    height: '100%',
    borderRadius: '20px',
    width: '100%',
  },
  img: {
    display: 'block',
    margin: '0 auto',
    maxWidth: '100%',
    width: '90%',
    borderRadius: '14px',
  },
  cont: {
    marginBottom: '50px',
  },
  cardcont: {
    marginBottom: '30px',
  },
  write: {
    display: 'block',
    margin: '0 auto',
    maxWidth: '100%',
    width: '90%',
  },
}));

const AboutUs = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Container
        disableGutters
        maxWidth="lg"
        component="main"
        sx={{ pt: 8, pb: 6 }}
        className={classes.cont}
      >
        <Typography component="h1" variant="h3" align="left" color="white" gutterBottom>
          Historia
        </Typography>
        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <Typography
              font="Inter"
              size="19px"
              align="left"
              color="white"
              className={classes.write}
            >
              <p>
                Caribbean Cinema fue fundada en 1969 en Puerto Rico, exactamente en el Regency
                Theater de Santurce, hoy sede de las oficinas centrales para Puerto Rico y la
                mayoría de los territorios del Caribe, por el señor Victor Carrady, padre de Robert
                Carrady, su actual presidente.
              </p>
              <p>
                Diez años después la empresa abril su primer cine en la República Dominicana, el
                mismo que hoy existe en el malecón, frente a Playa Güibia, sede de las oficinas
                centrales en el paìs, y desde donde ha tenido un crecimiento vertiginoso, sobre todo
                en la última década, con Zumaya Cordero al frente.
              </p>
              <p>
                Otros territorios en el Caribe, incluyendo St. Thomas, St. Croix, Trinidad, St.
                Maarten, St. Lucia, St. Kitts, Antigua, Aruba y más reciente a Guadalupe y países de
                Centro y Suramérica como Guyana, Panamá y Bolivia, arrojan un total de 68 cines en
                14 países.
              </p>
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <img alt="" src="/img/Empresa.png" className={classes.img}></img>
          </Grid>
        </Grid>
      </Container>
      <Container
        disableGutters
        maxWidth="lg"
        component="main"
        sx={{ pt: 8, pb: 6 }}
        className={classes.cont}
      >
        <Typography component="h1" variant="h3" align="left" color="white" gutterBottom>
          Filosofía
        </Typography>

        <Container maxWidth="lg" component="main">
          <Grid container spacing={5} alignItems="stretch" height="100%" justifyContent="center">
            {tiers.map((tier) => (
              <Grid item key={tier.title} xs={12} md={4}>
                <Card className={classes.cards}>
                  <CardHeader
                    titleTypographyProps={{ align: 'center' }}
                    subheaderTypographyProps={{
                      align: 'center',
                    }}
                  />
                  <CardContent>
                    <Box
                      className={classes.cardcont}
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'stretch',
                      }}
                    >
                      <Typography component="h5" variant="h3" color="white" align="center">
                        {tier.title}
                      </Typography>
                    </Box>
                    {tier.description.map((line) => (
                      <Typography align="center">{line}</Typography>
                    ))}
                  </CardContent>
                  <CardActions></CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Container>
    </React.Fragment>
  );
};

export default AboutUs;
