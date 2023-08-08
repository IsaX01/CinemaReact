import { editFood, getFoodById, saveFood } from '@/api/food';
import {
  Button,
  DropDown,
  ImageDropZone,
  NumberField,
  TextAreaField,
  TextField,
} from '@/components/common/form';
import useMode from '@/hooks/useMode';
import useCategoryStore from '@/stores/categoryStore';
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

const FoodMaintenance = ({ classes }) => {
  const { title, submitLabel, handleSubmit, initialData } = useMode({
    type: 'Comidas',
    onAdd: saveFood,
    onEdit: editFood,
    fetchById: getFoodById,
    redirectTo: '/dashboard/kiosko',
  });
  const { categories, fetchAllCategories } = useCategoryStore((state) => state);

  useEffect(() => {
    fetchAllCategories();
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
            food: '',
            description: '',
            price: '',
            categories_id: '',
          }
        }
        validate={validateFood}
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
                <TextField label={'Título'} name={'food'} />
                <TextAreaField label={'Descripción'} name={'description'} />
                <br />
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <NumberField label={'Precio'} name={'price'} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <DropDown
                      label={'Categoría'}
                      name={'categories_id'}
                      items={categories}
                      shrink={true}
                    />
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

const validateFood = (values) => {
  const errors = {};
  const requiredFields = ['food', 'description', 'price', 'categories_id'];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = '(The ' + field + ' field is required.)';
    }
  });

  return errors;
};

FoodMaintenance.propTypes = {
  classes: PropTypes.object,
  handleSubmit: PropTypes.func,
  errorMessage: PropTypes.string,
};

export default withStyles(styles)(FoodMaintenance);
