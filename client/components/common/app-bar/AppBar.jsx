import { Button } from '@/components/common/form';
import { NavBarDesktop, NavBarMobile } from '@/components/common/nav-bar/NabBar';
import useAuthStore, { userStore } from '@/stores/authStore';
import history from '@/utils/history';
import { isAuthenticated } from '@/utils/jwtUtil';
import AppBarMaterialUI from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import PropTypes from 'prop-types';
import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

const styles = () => ({
  root: {
    height: 110,
    backgroundColor: 'inherit',
  },
  logo: {
    width: 91.43,
  },
  container: {
    marginTop: 20,
  },
  links: {
    margin: '0 30px',
  },
  user: {
    display: 'flex',
    alignItems: 'flex-end',
  },
  logOut: {
    transform: 'rotate(180deg)',
    color: '#2f80ed',
  },
});

const UserBox = ({ classes }) => {
  const [isAuth, setIsAuth] = useState(isAuthenticated());
  const logout = useAuthStore((state) => state.logout);
  const user = userStore((state) => state.user);

  const handleLogOut = (e) => {
    e.preventDefault();
    logout();
    setIsAuth(false);
  };

  const handleLogin = () => {
    history.push('/login');
  };

  const handleRegister = () => {
    history.push('/signup');
  };

  return (
    <Box className={classes.user}>
      {isAuth ? (
        <Fragment>
          <Typography variant="h6" gutterBottom>
            {user.userName}
          </Typography>
          <Tooltip title="Ir a configuraciones de usuario">
            <Link to={'/usuario'}>
              <IconButton>
                <AccountCircleOutlinedIcon />
              </IconButton>
            </Link>
          </Tooltip>
          <Tooltip title="Cerrar sesión">
            <IconButton onClick={handleLogOut} className={classes.logOut}>
              <ExitToAppOutlinedIcon />
            </IconButton>
          </Tooltip>
        </Fragment>
      ) : (
        <Fragment>
          <Button onClick={handleLogin}>Iniciar Sesión</Button>
          <Button variant="outlined" onClick={handleRegister}>
            Regístrate
          </Button>
        </Fragment>
      )}
    </Box>
  );
};

const AppBar = ({ classes }) => {
  return (
    <AppBarMaterialUI position="static" className={classes.root}>
      <Container maxWidth="lg" component="nav" className={classes.container}>
        <Toolbar disableGutters>
          <Link to="/">
            <img className={classes.logo} src="/img/logo.png" alt={'Logo'} />
          </Link>
          <NavBarMobile />
          <NavBarDesktop />
          <UserBox classes={classes} />
        </Toolbar>
      </Container>
    </AppBarMaterialUI>
  );
};

AppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

UserBox.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppBar);
