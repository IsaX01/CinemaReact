import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import Wallpaper from '@material-ui/icons/Wallpaper';

const styles = () => ({
  root: {
    paddingTop: 0,
  },
  subheader: {
    fontSize: 24,
    color: '#FFFFFF',
  },
  actions: {
    justifyContent: 'flex-end',
  },
});

const Product = (props) => {
  const products = props.data;

  return (
    <Card style={{ backgroundColor: '#151F30' }}>
      <CardHeader title="Recent Movies" />
      <Divider />
      <CardContent>
        <List>
          {products.map((item, i) => (
            <ListItem divider={i < products.length - 1} key={item.id}>
              <ListItemIcon>
                <Avatar>
                  <Wallpaper />
                </Avatar>
              </ListItemIcon>
              <ListItemText primary={item.title} secondary={item.text} />
            </ListItem>
          ))}
        </List>
      </CardContent>
      <Divider />
    </Card>
  );
};

Product.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.array,
};

export default withStyles(styles)(Product);
