import { Grid } from '@material-ui/core';

import { cyan, orange, pink, purple } from '@material-ui/core/colors';
import { AddShoppingCart, Assessment, Face, ThumbUp } from '@material-ui/icons';
import Product from './Product';

import SummaryBox from './SummaryBox';

const products = [
  {
    id: 1,
    title: 'Avatar',
    text: 'A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.',
  },
  {
    id: 2,
    title: 'The Avengers',
    text: "Earth's mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.",
  },
  {
    id: 3,
    title: 'Jurassic World',
    text: 'Four years after the destruction of Isla Nublar, Biosyn operatives attempt to track down Maisie Lockwood, while Dr Ellie Sattler investigates a genetically engineered swarm of giant insects.',
  },
  {
    id: 4,
    title: 'Alice in Wonderland',
    text: "Nineteen-year-old Alice returns to the magical world from her childhood adventure, where she reunites with her old friends and learns of her true destiny: to end the Red Queen's reign of terror.",
  },
];

const Dashboard = () => {
  return (
    <div>
      <h2 style={{ paddingBottom: '15px' }}>Panel General</h2>

      <Grid container spacing={4} style={{ marginBottom: '15px' }}>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <SummaryBox
            Icon={AddShoppingCart}
            color={pink[600]}
            title="Boletas vendidas este mes"
            value="1500k"
          />
        </Grid>

        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <SummaryBox Icon={ThumbUp} color={cyan[600]} title="Nuevos Usuarios" value="4231" />
        </Grid>

        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <SummaryBox
            Icon={Assessment}
            color={purple[600]}
            title="Películas registradas este mes"
            value="460"
          />
        </Grid>

        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <SummaryBox Icon={Face} color={orange[600]} title="Películas en el sistema" value="248" />
        </Grid>
      </Grid>

      <Grid container spacing={10} style={{ marginBottom: '15px' }}>
        <Grid item xs>
          <Product data={products} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
