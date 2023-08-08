import App from '@/containers/app/AppContainer';

import history from '@/utils/history';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';

const mountNode = document.getElementById('root');

const theme = createTheme({
  palette: {
    type: 'dark',
    background: {
      default: '#131720',
      form: '#151f30',
    },
    text: {
      primary: '#ffffff',
      secondary: '#2f80ed',
    },
  },
});

ReactDOM.render(
  <Suspense fallback={<div>Error! Please refresh the page</div>}>
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Router history={history}>
        <App />
      </Router>
    </MuiThemeProvider>
  </Suspense>,
  mountNode
);
