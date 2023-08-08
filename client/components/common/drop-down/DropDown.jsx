import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined';
import PropTypes from 'prop-types';
import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

const styles = () => ({
  menu: {
    marginTop: 50,
  },
  link: {
    color: '#ffffff',
  },
  button: {
    padding: '6px 15px',
  },
});

const DropDown = ({ classes }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState();

  const pages = [
    { title: 'Contacto', link: 'contacto' },
    { title: 'Términos y Condiciones', link: 'terminos-y-condiciones' },
    { title: 'Política de Privacidad', link: 'politica-de-privacidad' },
  ];

  const recordButtonPosition = (event) => {
    setAnchorEl(event.currentTarget);
    setMenuOpen(true);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <Fragment>
      <Button onClick={recordButtonPosition} className={classes.button}>
        Ver Más <ExpandMoreOutlinedIcon />
      </Button>
      <Menu anchorEl={anchorEl} open={menuOpen} onClose={closeMenu} className={classes.menu}>
        {pages.map(({ link, title }) => {
          return (
            <MenuItem key={link} onClick={closeMenu}>
              <Link to={link} className={classes.link}>
                {title}
              </Link>
            </MenuItem>
          );
        })}
      </Menu>
    </Fragment>
  );
};

DropDown.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DropDown);
