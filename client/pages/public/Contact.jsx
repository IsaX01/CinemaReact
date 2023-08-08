import { Button, TextAreaField, TextField } from '@/components/common/form';
import React, { useRef, useState } from 'react';
import { Divider } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Form, Formik, ErrorMessage } from 'formik';
import PropTypes from 'prop-types';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import { Link } from 'react-router-dom';
import emailjs from 'emailjs-com';
import { Notification } from '@/components/common/notificacion/Notificacion';
const SERVICE_ID = process.env.SERVICE_ID;
const TEMPLATE_ID = process.env.TEMPLATE_ID;
const PUBLIC_KEY = process.env.PUBLIC_KEY;

const styles = () => ({
  root: {
    width: '80%',
    height: 'auto',
    top: '15%',
    margin: '0 auto',
  },
  divider: {
    margin: '20px auto',
  },
  icon: {
    marginRight: 10,
    fontSize: 25,
    color: '#ffffff',
  },
  link: {
    color: '#ffffff',
    fontSize: 17,
    lineHeight: 2,
  },
  error: {
    color: '#e92b2d',
    fontWeight: 600,
    fontSize: 12,
  },
  href: {
    color: 'white',
    '&:hover': { textDecoration: 'none', color: '#2f80ed' },
    fontSize: 15,
  },
  margintop: {
    marginTop: '35px',
  },
});
const socialMedia = [
  { Icon: FacebookIcon, link: 'https://www.facebook.com/caribbeancinemasrd/' },
  { Icon: InstagramIcon, link: 'https://www.instagram.com/' },
  { Icon: TwitterIcon, link: 'http://twitter.com/' },
];

const SocialMediaLinks = ({ classes }) => {
  return (
    <Grid item xs={6} sm={3}>
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

const Contact = ({ classes }) => {
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });
  function enviarEmail(values) {
    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, values, PUBLIC_KEY).then((res) => {
      setNotify({
        isOpen: true,
        message: 'Se ha enviado el correco correctamente!',
        type: 'success',
      });
    });
  }
  const form = useRef();
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Contacto
      </Typography>
      <Divider className={classes.divider} />

      <Grid container spacing={3}>
        <Grid item xs={8}>
          <Formik
            initialValues={{
              name: '',
              email: '',
              affair: '',
              message: '',
            }}
            validate={(values) => {
              let errores = {};
              const validateName = !/^[a-zA-ZÀ-ÿ\s]{1,40}$/;
              const validateEmail = !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

              if (!values.name) {
                errores.name = 'Por favor ingresa un nombre';
              } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.name)) {
                errores.name = 'El nombre solo puede contener letras y espacios';
              }

              if (!values.email) {
                errores.email = 'Por favor ingresa un correo electronico';
              } else if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(values.email)) {
                errores.email =
                  'El correo solo puede contener letras, numeros, puntos, guiones y guion bajo.';
              }

              if (!values.email) {
                errores.affair = 'Por favor ingresa un asunto';
              }

              if (!values.email) {
                errores.message = 'Por favor ingresa un mensaje';
              }
              return errores;
            }}
            onSubmit={(values, { resetForm }) => {
              enviarEmail(form.current);
              resetForm();
            }}
            enableReinitialize={true}
          >
            {({ isSubmitting, errors }) => (
              <Form ref={form}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <TextField label={'Nombre'} name={'name'} />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField label={'Correo Electronico'} name={'email'} />
                  </Grid>

                  <Grid item xs={12} md={12}>
                    <TextField label={'Asunto'} name={'affair'} />
                    <TextAreaField label={'Mensaje'} name={'message'} />
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <Button name={'save'} type="submit" disabled={isSubmitting}>
                      Enviar
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Grid>
        <Grid item xs={4}>
          <Grid item xs={12} md={8}>
            <Typography variant="h4" gutterBottom>
              Info
            </Typography>
            <p>
              Si tiene alguna pregunta o comentario sobre nuestra pagina favor enviarla a:
              <a href="mailto:servicios@caribbeancinemasrd.com" className={classes.href}>
                {' '}
                servicios@caribbeancinemasrd.com
              </a>
            </p>
            <p className={classes.margintop}>
              <strong>
                <a href="tel:+18092341178" className={classes.href}>
                  +1809-234-1178
                </a>
              </strong>
            </p>
            <p>
              <a href="hpena@caribbeancinemasrd.com" className={classes.href}>
                hpena@caribbeancinemasrd.com
              </a>
            </p>

            <SocialMediaLinks classes={classes} />
          </Grid>
        </Grid>
      </Grid>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
};

Contact.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(Contact);
