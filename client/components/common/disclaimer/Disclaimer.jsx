import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() => ({
  disclaimer: {
    textAlign: 'right',
    fontSize: '12px',
    margin: '25px auto',
  },
}));

export default function Disclaimer() {
  const classes = useStyles();

  return (
    <Typography className={classes.disclaimer}>
      * Al recoger tus boletos en el kiosko, también recoge tu recibo de Concesión y pasa directo al
      área de Pick Up.
    </Typography>
  );
}
