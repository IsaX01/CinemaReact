import AboutUs from '@/components/about/AboutUs';
import EmptyLayout from '@/components/common/layout/EmptyLayout';
import MainLayout from '@/components/common/layout/MainLayout';
import PublicLayout from '@/components/common/layout/PublicLayout';
import NotFound from '@/components/error/NotFound';
import Page500 from '@/components/error/Page500';
import LoginContainer from '@/containers/auth/LoginContainer';
import SignUpContainer from '@/containers/auth/SignUpContainer';
import DashboardContainer from '@/containers/dashboard/DashboardContainer';
import FoodMaintenance from '@/pages/admin/food/FoodMaintenance';
import FoodTable from '@/pages/admin/food/FoodTable';
import MovieMaintenance from '@/pages/admin/movie/MovieMaintenance';
import MovieSchedule from '@/pages/admin/movie/MovieSchedule';
import MovieTable from '@/pages/admin/movie/MovieTable';
import PromotionMaintenance from '@/pages/admin/promotion/PromotionMaintenance';
import PromotionTable from '@/pages/admin/promotion/PromotionTable';
import RoomMaintenance from '@/pages/admin/room/RoomMaintenance';
import RoomTable from '@/pages/admin/room/RoomTable';
import InvoiceDetail from '@/pages/admin/shopping-history/InvoiceDetail';
import ShoppingHistoryTable from '@/pages/admin/shopping-history/ShoppingHistoryTable';
import UserMaintenance from '@/pages/admin/user/UserMaintenance';
import UserTable from '@/pages/admin/user/UserTable';
import FinishOrder from '@/pages/private/FinishOrder';
import OrderCompleted from '@/pages/private/OrderCompleted';
import TicketBooking from '@/pages/private/TicketBooking';
import VerifyToken from '@/pages/private/VerifyToken';
import Contact from '@/pages/public/Contact';
import HomePage from '@/pages/public/HomePage';
import MovieDetail from '@/pages/public/MovieDetail';
import ShoppingCart from '@/pages/public/ShoppingCart';
import PublicRoute from '@/routers/PublicRoute';
import { Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import RestrictRoute from './RestrictRoute';
import RecoverPass from '@/containers/auth/RecoverPass';
import ResetPass from '@/containers/auth/ResetPass';
import PrivacyPolicy from '@/pages/public/PrivacyPolicy';
import TermsAndConditions from '@/pages/public/TermsAndConditions';

const Router = () => (
  <Switch>
    <PublicRoute exact path="/error500" layout={EmptyLayout} component={Page500} />
    <PublicRoute exact path="/RecuperarContraseña" layout={EmptyLayout} component={RecoverPass} />
    <PublicRoute exact path="/ReiniciarContraseña" layout={EmptyLayout} component={ResetPass} />
    <RestrictRoute exact path="/login" layout={EmptyLayout} component={LoginContainer} />
    <PublicRoute exact path="/" layout={PublicLayout} component={HomePage} />
    <PublicRoute exact path="/contacto" layout={PublicLayout} component={Contact} />
    <PublicRoute exact path="/detalle-pelicula" layout={PublicLayout} component={MovieDetail} />
    <PrivateRoute
      exact
      path="/seleccionar-asientos"
      layout={PublicLayout}
      component={TicketBooking}
    />
    <PrivateRoute exact path="/finalizar-pedido" layout={PublicLayout} component={FinishOrder} />
    <PrivateRoute
      exact
      path="/pedido-completado"
      layout={PublicLayout}
      component={OrderCompleted}
    />
    <PrivateRoute exact path="/verificar" layout={PublicLayout} component={VerifyToken} />
    <RestrictRoute exact path="/signup" layout={EmptyLayout} component={SignUpContainer} />
    <PublicRoute exact path="/kiosko" layout={PublicLayout} component={ShoppingCart} />

    {/*  ADMIN */}
    <PrivateRoute exact path="/dashboard" layout={MainLayout} component={DashboardContainer} />

    <PrivateRoute
      exact
      path="/dashboard/sala/agregar"
      layout={MainLayout}
      component={RoomMaintenance}
    />
    <PrivateRoute
      exact
      path="/dashboard/sala/editar"
      layout={MainLayout}
      component={RoomMaintenance}
    />
    <PrivateRoute exact path="/dashboard/sala" layout={MainLayout} component={RoomTable} />

    <PrivateRoute
      exact
      path="/dashboard/promociones/agregar"
      layout={MainLayout}
      component={PromotionMaintenance}
    />
    <PrivateRoute
      exact
      path="/dashboard/promociones/editar"
      layout={MainLayout}
      component={PromotionMaintenance}
    />
    <PrivateRoute
      exact
      path="/dashboard/promociones"
      layout={MainLayout}
      component={PromotionTable}
    />

    <PrivateRoute exact path="/dashboard/pelicula" layout={MainLayout} component={MovieTable} />
    <PrivateRoute
      exact
      path="/dashboard/pelicula/agregar"
      layout={MainLayout}
      component={MovieMaintenance}
    />
    <PrivateRoute
      exact
      path="/dashboard/pelicula/editar"
      layout={MainLayout}
      component={MovieMaintenance}
    />

    <PrivateRoute
      exact
      path="/dashboard/usuario/agregar"
      layout={MainLayout}
      component={UserMaintenance}
    />
    <PrivateRoute
      exact
      path="/dashboard/usuario/editar"
      layout={MainLayout}
      component={UserMaintenance}
    />
    <PrivateRoute exact path="/dashboard/usuario" layout={MainLayout} component={UserTable} />

    <PrivateRoute exact path="/dashboard/kiosko" layout={MainLayout} component={FoodTable} />
    <PrivateRoute
      exact
      path="/dashboard/comida/editar"
      layout={MainLayout}
      component={FoodMaintenance}
    />
    <PrivateRoute
      exact
      path="/dashboard/comida/agregar"
      layout={MainLayout}
      component={FoodMaintenance}
    />

    <PrivateRoute exact path="/dashboard/agendar" layout={MainLayout} component={MovieSchedule} />
    <PrivateRoute
      exact
      path="/dashboard/venta"
      layout={MainLayout}
      component={ShoppingHistoryTable}
    />
    <PrivateRoute
      exact
      path="/dashboard/venta/detalle-de-factura"
      layout={MainLayout}
      component={InvoiceDetail}
    />

    <PublicRoute exact path="/sobre-nosotros" layout={PublicLayout} component={AboutUs} />
    <PublicRoute
      exact
      path="/politica-de-privacidad"
      layout={PublicLayout}
      component={PrivacyPolicy}
    />

    <PublicRoute
      exact
      path="/terminos-y-condiciones"
      layout={PublicLayout}
      component={TermsAndConditions}
    />

    <PublicRoute exact path="*" layout={EmptyLayout} component={NotFound} />
  </Switch>
);
export default Router;
