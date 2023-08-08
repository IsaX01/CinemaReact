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

const PrivacyPolicy = () => {
  const classes = useStyles();
  return (
    <Container disableGutters maxWidth="lg" component="main" className={classes.cont}>
      <Typography component="h1" variant="h3" align="left" color="white" gutterBottom>
        Declaración de Privacidad
      </Typography>
      <Grid container spacing={6}>
        <Grid item xs={12} md={12} className={classes.write}>
          <Container>
            <p>
              Su privacidad es importante para nosotros. Proporcionamos esta declaración para
              explicar nuestras prácticas y para informarle de sus opciones con respecto a la forma
              en que se recopila y utiliza su información en este sitio.
            </p>
            <p>RECOPILACIÓN Y USO DE LA INFORMACIÓN</p>
            <p>
              En el sitio de Caribbean Cinemas podrá unirse a nuestro club de cine, suscribirse a
              nuestro boletín y expresar una opinión. Los tipos de información de identificación
              personal que podemos recopilar en este sitio incluyen: nombre, sexo, dirección,
              dirección de correo electrónico, fecha de nacimiento, ocupación, número de teléfono,
              fax e información sobre su interés y uso de nuestros servicios. También puede enviar
              información sobre la dirección de correo electrónico de otras personas para
              informarles sobre este sitio.
            </p>
            <p>
              También podemos recopilar cierta información de identificación no personal cuando
              visita nuestro sitio, como el tipo de navegador y sistema operativo que está
              utilizando y el nombre de dominio de su proveedor de servicios de Internet.
            </p>
            <p>
              Utilizamos la información que nos proporciona para cumplir con sus solicitudes de
              nuestros productos y servicios, para responder a sus consultas sobre nuestras ofertas
              y para ofrecerle otros servicios que creemos que pueden ser de su interés. También
              podemos usar esta información para comunicarnos con usted, para cumplir con una
              solicitud suya de un boletín informativo en línea o para informarle sobre cualquier
              cambio en nuestros términos de uso. Utilizamos la información que usted proporciona
              sobre otros para ofrecerles nuestros servicios.
            </p>
            <p>
              Las reseñas de películas que envíe se utilizan para proporcionar una experiencia
              interactiva a los usuarios. Cuando envía este contenido para su publicación, podemos
              publicar su nombre de usuario y otra información que nos haya proporcionado.
            </p>
            <p>
              A veces utilizamos la información de identificación no personal que recopilamos para
              analizar y mejorar el uso del sitio y para permitirnos personalizar su experiencia.
            </p>
            <p>
              Podemos divulgar información de identificación personal en respuesta a un proceso
              legal, como una orden judicial o citación, o a una solicitud de una agencia de
              aplicación de la ley.
            </p>
            <p>
              Los empleados, agentes y contratistas de Caribbean Cinemas que tienen acceso a
              información de identificación personal están obligados a proteger esta información de
              manera consistente con esta Declaración de Privacidad. Aunque tomamos las medidas
              adecuadas para proteger su información, no podemos asegurarle que la información de
              identificación personal nunca se divulgará de una manera que nunca se use de una
              manera que sea inconsistente con esta Declaración de privacidad.
            </p>
            <p>RECOPILACIÓN DE INFORMACIÓN POR PARTE DE TERCEROS Y PATROCINADORES</p>
            <p>
              Compartiremos la información recopilada solo con nuestro proveedor de alojamiento web,
              que la utilizará para proporcionarle información sobre los servicios ofrecidos a
              través de próximos eventos y ofertas especiales.
            </p>
            <p>
              Nuestro sitio puede contener enlaces a otros sitios cuyas prácticas de información
              pueden ser diferentes a las nuestras. Los visitantes deben consultar los avisos de
              privacidad de otros sitios, ya que no tenemos control sobre la información enviada o
              recopilada por estos terceros.
            </p>
          </Container>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PrivacyPolicy;
