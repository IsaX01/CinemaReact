import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Drawer from '@material-ui/core/Drawer';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import ConfirmationNumberOutlinedIcon from '@material-ui/icons/ConfirmationNumberOutlined';
import FastfoodOutlinedIcon from '@material-ui/icons/FastfoodOutlined';
import HomeIcon from '@material-ui/icons/Home';
import MeetingRoomOutlinedIcon from '@material-ui/icons/MeetingRoomOutlined';
import MovieCreationOutlinedIcon from '@material-ui/icons/MovieCreationOutlined';
import CalendarViewDayOutlinedIcon from '@material-ui/icons/CalendarViewDayOutlined';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';

const drawerWidth = 250;

const styles = (theme) => ({
  drawerPaper: {
    position: 'relative',
    height: '100%',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    width: 60,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  drawerInner: {
    // Make the items inside not wrap when transitioning:
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    height: 56,
    [theme.breakpoints.up('sm')]: {
      height: 64,
    },
  },
  avatar: {
    margin: 10,
  },
  bigAvatar: {
    width: 60,
    height: 60,
  },
});

const MiniDrawer = (props) => {
  let { navDrawerOpen, classes } = props;

  const links = [
    {
      label: 'Panel General',
      link: '/',
      icon: <HomeIcon />,
    },
    {
      label: 'Película',
      link: '/pelicula',
      icon: <MovieCreationOutlinedIcon />,
    },
    {
      label: 'Salas',
      link: '/sala',
      icon: <MeetingRoomOutlinedIcon />,
    },
    {
      label: 'Kiosko',
      link: '/kiosko',
      icon: <FastfoodOutlinedIcon />,
    },
    {
      label: 'Usuario',
      link: '/usuario',
      icon: <AccountCircleOutlinedIcon />,
    },
    {
      label: 'Venta',
      link: '/venta',
      icon: <ConfirmationNumberOutlinedIcon />,
    },
    {
      label: 'Promociones',
      link: '/promociones',
      icon: <LocalOfferIcon />,
    },
    {
      label: 'Agendar a cartelera',
      link: '/agendar',
      icon: <CalendarViewDayOutlinedIcon />,
    },
  ];

  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: classNames(classes.drawerPaper, !navDrawerOpen && classes.drawerPaperClose),
      }}
      open={navDrawerOpen}
    >
      <div className={classes.drawerHeader} />

      <div className={classes.root}>
        <Avatar
          alt="User"
          src="/img/avatar5.png"
          className={classNames(classes.avatar, classes.bigAvatar)}
        />
        <Typography component="p" className={classes.avatar}>
          John Doe
        </Typography>
        <Typography component="span" className={classes.avatar}>
          john.doe@example.com
        </Typography>
      </div>
      <div className="box" style={{ padding: '8px 16px' }}>
        MAIN NAVIGATION
      </div>

      <List>
        {links.map(({ label, link, icon }) => (
          <ListItem component={Link} to={`/dashboard${link}`} key={link} button>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={label} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

MiniDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  navDrawerOpen: PropTypes.bool,
};

export default withStyles(styles)(MiniDrawer);
