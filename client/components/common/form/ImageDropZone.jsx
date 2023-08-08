import Thumbnail from '@/components/common/thumbnail/Thumbnail';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { useField } from 'formik';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';

const useStyles = makeStyles((theme) => ({
  dropzone: {
    margin: theme.spacing(1),
    height: '440px',
    padding: '20px',
    marginBottom: '20px',
    borderRadius: '16px',
    backgroundColor: theme.palette.background.form,
    color: '#e0e0e0',
    outline: 'none',
    transition: 'border .24s ease-in-out',
    '&:hover, &:focus': {
      cursor: 'pointer',
    },
  },
}));

export const ImageDropZone = ({ ...props }) => {
  const classes = useStyles();
  const [field, meta] = useField(props);
  const [file, setFile] = useState();
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/jpeg': [],
      'image/png': [],
    },
    maxFiles: 1,
    onDrop: (value) => {
      const file = value[0];
      field.onChange({ target: { value: file, name: field.name } });
      setFile(
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
    },
  });

  return (
    <section className={classes.dropzone}>
      <div {...getRootProps({ className: 'dropzone' })}>
        <TextField
          {...getInputProps()}
          {...props}
          variant={'outlined'}
          type={'file'}
          error={meta.touched && Boolean(meta.error)}
          helperText={meta.touched && meta.error}
        />
        <p>Drag and drop some files here, or click to select files</p>
        <em>(Only *.jpeg and *.png images will be accepted)</em>
      </div>
      {(file || props.urlImage) && <Thumbnail file={file} urlImage={props.urlImage} />}
    </section>
  );
};

ImageDropZone.propTypes = {
  props: PropTypes.any,
  urlImage: PropTypes.string,
};
