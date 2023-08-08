import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => ({
  thumbsContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16,
  },
  thumb: {
    width: '70%',
    margin: '0 auto',
    height: 'auto',
    maxHeight: '315px',
    display: 'inline-flex',
    borderRadius: '16px',
  },
  thumbInner: {
    width: '100%',
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden',
  },
  img: {
    display: 'block',
    width: '100%',
    height: '100%',
    borderRadius: '16px',
  },
}));

export default function Thumbnail({ file, urlImage }) {
  const classes = useStyles();

  return (
    <aside className={classes.thumbsContainer}>
      <div className={classes.thumb}>
        <div className={classes.thumbInner}>
          {file ? (
            <img
              src={file.preview}
              className={classes.img}
              onLoad={() => {
                URL.revokeObjectURL(file.preview);
              }}
              alt={'image'}
            />
          ) : (
            <img src={urlImage} className={classes.img} alt={'image'} />
          )}
        </div>
      </div>
    </aside>
  );
}

Thumbnail.propTypes = {
  file: PropTypes.object,
  urlImage: PropTypes.string,
};
