import {
  Button,
  Calendar,
  CheckBox,
  DropDown,
  EmailField,
  PasswordField,
  PhoneField,
  TextField,
} from '@/components/common/form';
import CustomizedSnackbar from '@/components/common/snakebar/CustomizedSnackbar';
import { Card, CardContent, CardHeader } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
  first_name: Yup.string()
    .min(3, 'Inserte un mínimo de 3 caracteres')
    .max(20, 'Inserte un máximo de 20 caracteres')
    .required('Requerido'),
  last_name: Yup.string()
    .min(3, 'Inserte un mínimo de 3 caracteres')
    .max(30, 'Inserte un máximo de 30 caracteres')
    .required('Requerido'),
  user_name: Yup.string()
    .min(3, 'Inserte un mínimo de 3 caracteres')
    .max(15, 'Inserte un máximo de 15 caracteres')
    .required('Requerido'),
  birthday: Yup.date(),
  email: Yup.string().email('Email invalido').required('Requerido'),
  phone: Yup.string()
    .matches(
      /^((\+|)1)*( )*(?![0-9]{3}\))(\((?=[0-9]{3}\)))*[0-9]{3}\)*( |-)?[0-9]{3}( |-)?[0-9]{4}\b/,
      'Formato invalido'
    )
    .required('Requerido'),
  password: Yup.string()
    .required('Por favor, ingresa tu contraseña')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,16}$/,
      'La contraseña debe contener mínimo seis caracteres y máximo dieciséis caracteres, al menos una letra y un número'
    ),
  sex_id: Yup.mixed().oneOf([1, 2]).isRequired,
  passwordConfirmation: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Las contraseñas deben coincidir'
  ),
  terms: Yup.bool().required('Debe aceptar las políticas de privacidad'),
});

const SexList = [
  { value: 1, label: 'Masculino' },
  { value: 2, label: 'Femenino' },
];

const styles = (theme) => ({
  root: {
    minWidth: 320,
    maxWidth: 706,
    height: 'auto',
    position: 'relative',
    justifyContent: 'center',
    padding: '10% 0',
    margin: 'auto',
    borderRadius: 16,
  },
  card: {
    backgroundColor: theme.palette.background.default,
    padding: 20,
    overflow: 'auto',
    borderRadius: 16,
  },
  cardHeader: {
    textAlign: 'center',
  },
  headerImg: {
    width: 91.43,
    height: 67.84,
  },
  checkbox: {
    justifyContent: 'center',
  },
  btnDiv: {
    textAlign: 'center',
  },
  link: {
    color: '#2f80ed',
  },
  btn: {
    marginTop: 21,
  },
});

const SignUpForm = ({ handleSubmit, classes, errorMessage }) => {
  return (
    <Grid container className={classes.root}>
      <Card className={classes.card}>
        <CardHeader
          className={classes.cardHeader}
          title={<img className={classes.headerImg} src="/img/logo.png" />}
        />
        {errorMessage ? (
          <CustomizedSnackbar variant="error" className={classes.margin} message={errorMessage} />
        ) : null}
        <CardContent>
          <Formik
            initialValues={{
              first_name: '',
              last_name: '',
              user_name: '',
              email: '',
              birthday: '',
              password: '',
              passwordConfirmation: '',
              terms: false,
              phone: '',
              sex_id: 1,
              roles_id: '1',
            }}
            validationSchema={SignupSchema}
            // eslint-disable-next-line no-unused-vars
            onSubmit={({ passwordConfirmation, terms, ...values }, { setSubmitting }) =>
              handleSubmit(values, setSubmitting)
            }
          >
            {({ isSubmitting }) => (
              <Form>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <TextField type="text" name="first_name" label="Nombre" />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField type="text" name="last_name" label="Apellido" />
                  </Grid>
                </Grid>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <EmailField name="email" label="Email" />
                  </Grid>
                </Grid>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <TextField type="text" name="user_name" label="Usuario" />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Calendar name="birthday" label="Fecha de nacimiento" />
                  </Grid>
                </Grid>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <PhoneField name="phone" label="Teléfono" />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <DropDown name="sex_id" items={SexList} label="Genero" />
                  </Grid>
                </Grid>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <PasswordField name="password" label="Contraseña" />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <PasswordField name="passwordConfirmation" label="Confirmar Contraseña" />
                  </Grid>
                </Grid>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <CheckBox
                      labelClassName={classes.checkbox}
                      name="terms"
                      label="Acepto las Políticas de privacidad"
                    />
                  </Grid>
                </Grid>
                <div className={classes.btnDiv}>
                  <Button className={classes.btn} type="submit" disabled={isSubmitting}>
                    Registrarse
                  </Button>
                  <p>
                    ¿Ya posees una cuenta?{' '}
                    <Link className={classes.link} to={'/login'}>
                      Iniciar Sesión
                    </Link>
                  </p>
                </div>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </Grid>
  );
};

SignUpForm.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
};

export default withStyles(styles)(SignUpForm);
