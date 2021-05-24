import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';

import ROUTES from '../../utils/routes';
import theme from '../../utils/theme';
import HomePage from '../pages/HomePage';
import CaesarShift from '../pages/CaesarShift';
import VigenereCipher from '../pages/VigenereCipher';
import TrithemiusCipher from '../pages/TrithemiusCipher';

import '../../assets/styles/app.scss';
import RSA from '../pages/RSA';
import GammaCipher from '../pages/GammaCipher';

const App: React.FC = () => (
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Switch>
          <Route component={HomePage} exact path={ROUTES.HOME} />
          <Route component={CaesarShift} exact path={ROUTES.CAESAR_SHIFT} />
          <Route
            component={TrithemiusCipher}
            exact
            path={ROUTES.TRITHEMIUS_CIPHER}
          />
          <Route
            component={VigenereCipher}
            exact
            path={ROUTES.VIGENERE_CIPHER}
          />
          <Route component={GammaCipher} exact path={ROUTES.GAMMA_CIPHER} />
          <Route component={RSA} exact path={ROUTES.RSA} />
        </Switch>
      </Router>
    </ThemeProvider>
  </React.StrictMode>
);

export default App;
