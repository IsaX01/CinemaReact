import { moneyFormatter } from 'shared/utils';
import { Card, CardContent, makeStyles, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';

// TODO: Extract this data from a high order constant file
const INFO = {
  organization: { name: 'Caribbean Cinemas' },
};

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 20,
    minHeight: 440,
    borderRadius: 25,
    backgroundColor: theme.palette.background.default,
  },
  item: {
    display: 'flex',
    height: 20,
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: theme.palette.text.secondary,
    width: '100%',
    borderRadius: 0,
  },
  cardContent: {
    display: 'flex',
    alignItems: 'center',
    padding: 0,
    height: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    '&:first-child': {
      marginLeft: -16,
    },
    '&:last-child': {
      marginRight: -16,
      paddingBottom: 0,
    },
  },
  circle: {
    width: 37,
    height: 23,
    borderRadius: '50%',
    backgroundColor: theme.palette.background.default,
  },
  totalContainer: {
    padding: 7.5,
    borderTop: '2px solid white',
    borderBottom: '2px solid white',
  },
}));

const Ticket = ({ totalTickets = 0, totalItems = 0, totalImport }) => {
  const classes = useStyles();

  return (
    <Grid container item className={classes.root}>
      <Grid item xs={12}>
        <Typography variant="body2">Comercio: {INFO.organization.name}</Typography>
        <Typography variant="body2">Procesado: En Linea</Typography>
        <Typography variant="body2">Fecha: {new Date().toLocaleDateString()}</Typography>
      </Grid>
      <Grid container item xs={12} style={{ display: 'block' }}>
        <Grid item xs={12} className={classes.item}>
          <Typography variant="body2">Descripción: </Typography>
          <Typography variant="body2">Cantidad </Typography>
        </Grid>
        {totalTickets ? (
          <Grid item xs={12} className={classes.item}>
            <Typography variant="body2">Compra de taquillas </Typography>
            <Typography variant="body2">{totalTickets}</Typography>
          </Grid>
        ) : null}
        {totalItems ? (
          <Grid item xs={12} className={classes.item}>
            <Typography variant="body2">Compra de artículos </Typography>
            <Typography variant="body2">{totalItems}</Typography>
          </Grid>
        ) : null}
      </Grid>
      <Grid container item xs={12}>
        <Typography variant="h6">Importe: </Typography>
        <Card className={classes.card}>
          <CardContent className={classes.cardContent}>
            <div className={classes.circle} />
            <div className={classes.totalContainer}>
              <Typography variant="h4">{moneyFormatter(totalImport, false)}</Typography>
            </div>
            <div className={classes.circle} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

Ticket.propTypes = {
  totalTickets: PropTypes.number,
  totalItems: PropTypes.number,
  totalImport: PropTypes.number.isRequired,
};

export default Ticket;
