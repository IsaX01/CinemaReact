import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(() => ({
  cont: {
    marginBottom: '50px',
  },
  write: {
    display: 'block',
    margin: '0 auto',
    maxWidth: '100%',
    width: '90%',
    fontFamily: 'Inter, sans-serif',
    fontSize: '19px',
    textAlign: 'left',
    color: 'white',
  },
}));

const TermsAndConditions = () => {
  const classes = useStyles();
  return (
    <Container disableGutters maxWidth="lg" component="main" className={classes.cont}>
      <Typography component="h1" variant="h3" align="left" color="white" gutterBottom>
        Condiciones de Uso
      </Typography>
      <Grid container spacing={6}>
        <Grid item xs={12} md={12} className={classes.write}>
          <Container>
            <p>
              A continuación se presentan los términos y condiciones de uso del sitio web de
              Caribbean Cinemas en caribbeancinemas.com.
            </p>
            <p>INTRODUCCIÓN Y DEFINICIONES</p>
            <p>
              Caribbean Cinemas Website o caribbeancinemas.com es el sitio web de Cinemas Management
              of P.R., Inc. (la Compañía) a través del cual los consumidores pueden obtener
              información sobre las películas que se proyectan en los cines participantes de
              Caribbean Cinemas, así como la calificación y los horarios de dichas películas. Los
              usuarios PRONTO también podrán comprar entradas de cine en caribbeancinemas.com,
              suscribirse al boletín de Caribbean Cinemas y expresar una opinión.
            </p>
            <p>
              El acuerdo se refiere a los términos y condiciones que se aplican al uso de
              caribbeancinemas.com por parte del Usuario. Al utilizar caribbeancinemas.com, el
              Usuario acepta cumplir con todos los términos y condiciones de este Acuerdo. La
              política de privacidad se incorpora por referencia, como si estuviera completamente
              establecida en este documento.
            </p>
            <p>CAMBIOS EN LOS TÉRMINOS Y CONDICIONES</p>
            <p>
              La Compañía se reserva el derecho de cambiar o descontinuar cualquier aspecto o
              característica de caribbeancinemas.com, incluidos, entre otros, el contenido, las
              horas de disponibilidad y el equipo necesario para el acceso o uso, en cualquier
              momento. La Compañía se reserva el derecho de cambiar o modificar los términos y
              condiciones aplicables al uso de caribbeancinemas.com por parte del Usuario, o
              cualquier parte de la misma, o de imponer nuevas condiciones, pero no limitadas a,
              publicar en caribbeancinemas.com, o por correo electrónico o convencional, o por
              cualquier otro medio por el cual el Usuario obtenga notificación de la misma.
              Cualquier uso de caribbeancinemas.com por parte del Usuario posterior a dicha
              notificación se considerará que constituye la aceptación por parte del Usuario de
              dichos cambios, modificaciones o adiciones.
            </p>
            <p>CONDUCTA DEL USUARIO</p>
            <p>
              El usuario participará y utilizará caribbeancinemas.com únicamente para fines lícitos.
              El Usuario no publicará ni transmitirá a través de caribbeancinemas.com ningún
              material que:
            </p>
            <ol type="I">
              <li> Viole o infrinja de cualquier manera los derechos de terceros.</li>
              <li>
                Sea ilegal, amenazante, abusivo, difamatorio, invasivo de los derechos de privacidad
                o publicidad, vulgar, obsceno, profano u objetable.
              </li>
              <li>
                Fomente conductas que constituyan un delito penal, den lugar a responsabilidad civil
                o violen cualquier ley.
              </li>
              <li>
                Contenga publicidad o cualquier solicitud con respecto a productos o servicios, a
                menos que la Compañía haya aprobado expresamente dicho material antes de su
                transmisión por escrito. Cualquier conducta de un Usuario que, en opinión exclusiva
                de la Compañía, restrinja o inhiba a cualquier otro Usuario de usar o disfrutar de
                caribbeancinemas.com está expresamente prohibida.
              </li>
            </ol>
            <p>RENUNCIAS</p>
            <p>El uso es bajo riesgo del usuario</p>
          </Container>
        </Grid>
      </Grid>
    </Container>
  );
};

export default TermsAndConditions;
