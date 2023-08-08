import { addMovie, editMovie, getMovieById } from '@/api/movie';
import {
  Button,
  Calendar,
  DropDown,
  ImageDropZone,
  LinkField,
  NumberField,
  TextAreaField,
  TextField,
} from '@/components/common/form';
import useMode from '@/hooks/useMode';
import useCountryStore from '@/stores/countryStore';
import useGenreStore from '@/stores/genreStore';
import useLanguageStore from '@/stores/languageStore';
import useRestrictionStore from '@/stores/restrictionStore';
import { Divider } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

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
});

const MovieMaintenance = ({ classes }) => {
  const { title, submitLabel, handleSubmit, initialData } = useMode({
    type: 'Película',
    onAdd: addMovie,
    onEdit: editMovie,
    fetchById: getMovieById,
    redirectTo: '/dashboard/pelicula',
  });

  const { genres, fetchAllGenres } = useGenreStore((state) => state);
  const { languages, fetchAllLanguages } = useLanguageStore((state) => state);
  const { countries, fetchAllCountries } = useCountryStore((state) => state);
  const { restrictions, fetchAllRestrictions } = useRestrictionStore((state) => state);

  useEffect(() => {
    fetchAllGenres();
    fetchAllLanguages();
    fetchAllCountries();
    fetchAllRestrictions();
  }, []);

  const urlImage = initialData ? initialData.url_image : '';

  return (
    <div className={classes.root}>
      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>
      <Divider className={classes.divider} />
      <Formik
        initialValues={
          initialData || {
            url_image: '',
            url_trailer: '',
            name: '',
            description: '',
            release_date: '',
            duration: '',
            countries_id: '',
            restriction_id: '',
            director: '',
            languages_id: '',
            genres_id: '',
            cast: '',
          }
        }
        validate={validateMovie}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        {({ isSubmitting }) => (
          <Form>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <ImageDropZone name="url_image" urlImage={urlImage} />
                <LinkField label={'Trailer Link'} name={'url_trailer'} />
                <Button name={'save'} type={'submit'} disabled={isSubmitting}>
                  {submitLabel}
                </Button>
              </Grid>
              <Grid item xs={12} md={8}>
                <TextField label={'Título'} name={'name'} />
                <TextAreaField label={'Sinapsis'} name={'description'} />
                <br />
                <Grid container spacing={3}>
                  <Grid item xs={12} md={3}>
                    <Calendar label={'Año'} name={'release_date'} />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <NumberField label={'Duración (min)'} name={'duration'} />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <DropDown
                      label={'País'}
                      name={'countries_id'}
                      items={countries}
                      shrink={true}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <DropDown
                      label={'Restricciones'}
                      name={'restriction_id'}
                      items={restrictions}
                      shrink={true}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <TextField label={'Director'} name={'director'} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <DropDown
                      label={'Idioma'}
                      name={'languages_id'}
                      items={languages}
                      shrink={true}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <DropDown
                      label={'Género(s)'}
                      name={'genres_id'}
                      items={genres}
                      shrink={true}
                      multiline={true}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField label={'Cast'} name={'cast'} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const validateMovie = (values) => {
  const errors = {};
  const requiredFields = [
    'url_trailer',
    'name',
    'description',
    'release_date',
    'duration',
    'countries_id',
    'restriction_id',
    'director',
    'languages_id',
    'genres_id',
    'cast',
  ];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = '(The ' + field + ' field is required.)';
    }
  });

  return errors;
};

MovieMaintenance.propTypes = {
  classes: PropTypes.object,
  handleSubmit: PropTypes.func,
  errorMessage: PropTypes.string,
};

export default withStyles(styles)(MovieMaintenance);
