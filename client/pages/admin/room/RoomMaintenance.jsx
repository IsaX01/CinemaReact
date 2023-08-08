import { editRoom, getRoomById, saveRoom } from '@/api/room';
import {
  Button,
  DropDown,
  ImageDropZone,
  NumberField,
  TextAreaField,
  TextField,
} from '@/components/common/form';
import useMode from '@/hooks/useMode';
import { ROOM_CATEGORY_VIP_OR_NOT } from '@/utils/constant';
import { Divider } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Form, Formik } from 'formik';
import PropTypes from 'prop-types';

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

const RoomMaintenance = ({ classes }) => {
  const { title, submitLabel, handleSubmit, initialData } = useMode({
    type: 'Salas',
    onAdd: saveRoom,
    onEdit: editRoom,
    fetchById: getRoomById,
    redirectTo: '/dashboard/sala',
  });

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
            name: '',
            location: '',
            seats: '',
            is_vip: '',
          }
        }
        validate={validateRoom}
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
                <TextField label={'Nombre'} name={'name'} />
                <TextAreaField label={'Descripción'} name={'location'} />
                <br />
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <NumberField label={'Número de asientos'} name={'seats'} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <DropDown
                      label={'¿Es VIP?'}
                      name={'is_vip'}
                      items={ROOM_CATEGORY_VIP_OR_NOT.Status}
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

const validateRoom = (values) => {
  const errors = {};
  const requiredFields = ['url_image', 'name', 'location', 'seats', 'is_vip'];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = '(The ' + field + ' field is required.)';
    }
  });

  return errors;
};

RoomMaintenance.propTypes = {
  classes: PropTypes.object,
  handleSubmit: PropTypes.func,
  errorMessage: PropTypes.string,
};

export default withStyles(styles)(RoomMaintenance);
