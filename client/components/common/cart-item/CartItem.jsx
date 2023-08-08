import { Button } from '@/components/common/form';
import { moneyFormatter } from 'shared/utils';
import { isAuthenticated } from '@/utils/jwtUtil';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { useState } from 'react';

export default function CartItem({ details, onAdd }) {
  const [isAuth] = useState(isAuthenticated());

  return (
    <CardContent>
      <Typography variant="h5">{details.name}</Typography>
      <Typography>Descripción: {details.description}</Typography>
      <Typography variant={'caption'}> Precio: {moneyFormatter(details.price)}</Typography>
      {isAuth && (
        <Button variant={'outlined'} onClick={() => onAdd(details)} color={'primary'}>
          AGREGAR AL CARRITO
        </Button>
      )}
    </CardContent>
  );
}

CartItem.propTypes = {
  details: PropTypes.object.isRequired,
  onAdd: PropTypes.func.isRequired,
};
