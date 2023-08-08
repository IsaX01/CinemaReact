import { addPromotion, editPromotion, getPromotionById } from '@/api/promotion';
import {
  Button,
  Calendar,
  DropDown,
  ImageDropZone,
  TextAreaField,
  TextField,
} from '@/components/common/form';
import useMode from '@/hooks/useMode';
import useStatusStore from '@/stores/statusStore';
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

const PromotionMaintenance = ({ classes }) => {
  const { title, submitLabel, handleSubmit, initialData } = useMode({
    type: 'Promociones',
    onAdd: addPromotion,
    onEdit: editPromotion,
    fetchById: getPromotionById,
    redirectTo: '/dashboard/promociones',
  });

  const { status, fetchAllStatus } = useStatusStore((state) => state);

  useEffect(() => {
    fetchAllStatus();
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
            name: '',
            description: '',
            status_prom: '',
            url_image: '',
            date_ini: '',
            date_end: '',
          }
        }
        validate={validatePromotion}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        {({ isSubmitting }) => (
          <Form>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <ImageDropZone name="url_image" urlImage={urlImage} />
                <Button name={'save'} type={'submit'} disabled={isSubmitting}>
                  {submitLabel}
                </Button>
              </Grid>
              <Grid item xs={12} md={8}>
                <TextField label={'Nombre de la empresa'} name={'name'} />
                <TextAreaField label={'Descripción de la promoción'} name={'description'} />
                <br />
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Calendar label={'Fecha de inicio'} name={'date_ini'} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Calendar label={'Fecha de finalización'} name={'date_end'} />
                  </Grid>
                </Grid>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <DropDown label={'Estado'} name={'status_prom'} items={status} shrink={true} />
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

const validatePromotion = (values) => {
  const errors = {};
  const requiredFields = ['name', 'description', 'status_prom', 'date_ini', 'date_end'];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = '(The ' + field + ' field is required.)';
    }
  });

  return errors;
};

PromotionMaintenance.propTypes = {
  classes: PropTypes.object,
  handleSubmit: PropTypes.func,
  errorMessage: PropTypes.string,
};

export default withStyles(styles)(PromotionMaintenance);
