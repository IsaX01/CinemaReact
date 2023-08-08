import CheckoutCard from '@/components/common/checkout-card/CheckoutCard';
import Disclaimer from '@/components/common/disclaimer/Disclaimer';
import ItemsGrid from '@/components/common/items-grid/ItemsGrid';
import ItemsSelectedCard from '@/components/common/items-selected-card/ItemSelectedCard';
import TicketSummaryCard from '@/components/common/ticket-summary-card/TicketSummaryCard';
import useOrderStore from '@/stores/orderStore';
import useShoppingCartStore from '@/stores/shoppingCartStore';
import { ITEM_SERVICE_CHARGE, TICKET_SERVICE_CHARGE } from '@/utils/constant';
import { isAuthenticated } from '@/utils/jwtUtil';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useState } from 'react';

export default function ShoppingCart() {
  const [isAuth] = useState(isAuthenticated());
  const {
    subTotal,
    cartItems,
    addItem: onAdd,
    removeItem: onRemove,
  } = useShoppingCartStore((state) => state);
  const getTicketTotal = useOrderStore((state) => state.getTicketTotal);
  const totalTicketPrice = getTicketTotal();

  const isOnlyTaxes = subTotal === ITEM_SERVICE_CHARGE;
  const isTotalPriceTicketsOnlyTaxes = totalTicketPrice === TICKET_SERVICE_CHARGE;

  return (
    <Container maxWidth="lg">
      <Typography variant="h4">Kiosko</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={isAuth ? 9 : 12}>
          <ItemsGrid onAdd={onAdd} />
        </Grid>
        {isAuth && (
          <Grid item xs={12} md={3}>
            {!isTotalPriceTicketsOnlyTaxes && (
              <TicketSummaryCard totalTicketPrice={totalTicketPrice} />
            )}
            <ItemsSelectedCard
              items={cartItems}
              onAdd={onAdd}
              onRemove={onRemove}
              subTotal={subTotal}
            />
            <Disclaimer />
            <CheckoutCard
              subTotal={isOnlyTaxes ? 0 : subTotal}
              totalTicketPrice={isTotalPriceTicketsOnlyTaxes ? 0 : totalTicketPrice}
              isTotalPriceTicketsOnlyTaxes={isTotalPriceTicketsOnlyTaxes}
            />
          </Grid>
        )}
      </Grid>
    </Container>
  );
}
