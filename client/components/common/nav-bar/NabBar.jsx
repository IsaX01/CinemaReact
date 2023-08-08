import DropDown from '@/components/common/drop-down/DropDown';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const pages = [
  { link: '/', title: 'Inicio' },
  { link: 'peliculas', title: 'Cartelera' },
  { link: 'kiosko', title: 'Kiosko' },
];

const useStyles = makeStyles({
  link: {
    margin: ({ isMobile }) => (isMobile ? '' : '0 30px'),
    color: 'white',
  },
});

export const NavBarDesktop = () => {
  const classes = useStyles();

  return (
    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
      {pages.map(({ link, title }) => (
        <Link key={link} to={link} className={classes.link}>
          <Button sx={{ my: 2, color: 'white', display: 'block' }}>{title}</Button>
        </Link>
      ))}
      <DropDown />
    </Box>
  );
};

export const NavBarMobile = () => {
  const classes = useStyles({ isMobile: true });
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
      <IconButton
        size="medium"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleOpenNavMenu}
        color="inherit"
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorElNav}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        open={Boolean(anchorElNav)}
        onClose={handleCloseNavMenu}
        sx={{
          display: { xs: 'block', md: 'none' },
        }}
      >
        {pages.map(({ link, title }) => (
          <MenuItem key={title} onClick={handleCloseNavMenu}>
            <Link to={link} className={classes.link}>
              <Typography>{title}</Typography>
            </Link>
          </MenuItem>
        ))}
        <DropDown />
      </Menu>
    </Box>
  );
};
