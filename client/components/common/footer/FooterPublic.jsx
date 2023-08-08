import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const styles = () => ({
  root: {},
  logo: {
    width: 91.43,
  },
  links: {
    all: 'unset',
    listStyle: 'none',
  },
  link: {
    color: '#ffffff',
    fontSize: 17,
    lineHeight: 2,
  },
  copyright: {
    marginTop: 80,
  },
  icon: {
    marginRight: 10,
    fontSize: 35,
    color: '#ffffff',
  },
});

const Copyright = (props) => {
  return (
    <Typography variant="subtitle1" {...props}>
      {`© Caribbean Cinema, ${new Date().getFullYear()}. Creado por LICEM 🔥`}
    </Typography>
  );
};

const socialMedia = [
  { Icon: FacebookIcon, link: 'https://www.facebook.com/caribbeancinemasrd/' },
  { Icon: InstagramIcon, link: 'https://www.instagram.com/' },
  { Icon: TwitterIcon, link: 'http://twitter.com/' },
];

const SocialMediaLinks = ({ classes }) => {
  return (
    <Grid item xs={6} sm={3}>
      <Typography variant="h6" gutterBottom>
        Síguenos
      </Typography>
      <div>
        {socialMedia.map(({ Icon, link }) => (
          <Link to={{ pathname: link }} key={link} target="_blank" rel="noopener noreferrer">
            <Icon className={classes.icon} />
          </Link>
        ))}
      </div>
    </Grid>
  );
};

const footers = [
  {
    title: 'Navega',
    links: [
      { title: 'Sobre nosotros', link: 'sobre-nosotros' },
      { title: 'Cartelera', link: 'peliculas' },
      { title: 'Kiosko', link: 'kiosko' },
    ],
  },
  {
    title: 'Ayuda',
    links: [
      { title: 'Contacto', link: 'contacto' },
      { title: 'Términos y Condiciones', link: 'terminos-y-condiciones' },
      { title: 'Política de Privacidad', link: 'politica-de-privacidad' },
    ],
  },
];

const FooterPublic = ({ classes }) => {
  return (
    <Container className={classes.root} maxWidth="lg" component="footer">
      <Grid container spacing={4} justifyContent="space-evenly" className={classes.items}>
        <Grid item xs={12} sm={3}>
          <img className={classes.logo} src="/img/logo.png" alt={'Logo'} />
          <Typography>¡El mejor entretenimiento en el mejor ambiente!</Typography>
        </Grid>
        {footers.map(({ title, links }) => (
          <Grid item xs={6} sm={3} key={title}>
            <Typography variant="h6" gutterBottom>
              {title}
            </Typography>
            <ul className={classes.links}>
              {links.map(({ title, link }) => (
                <li key={title}>
                  <Link to={link} className={classes.link}>
                    {title}
                  </Link>
                </li>
              ))}
            </ul>
          </Grid>
        ))}
        <SocialMediaLinks classes={classes} />
      </Grid>

      <Copyright className={classes.copyright} />
    </Container>
  );
};

FooterPublic.propTypes = {
  classes: PropTypes.object.isRequired,
};

SocialMediaLinks.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FooterPublic);
