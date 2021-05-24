import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link, useLocation } from 'react-router-dom';

import ROUTES from '../../utils/routes';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerContainer: {
      overflow: 'auto',
    },
    content: {
      flexGrow: 1,
      marginTop: 64,
      padding: theme.spacing(3),
    },
  }),
);

const routes = {
  [ROUTES.HOME]: 'Home',
  [ROUTES.CAESAR_SHIFT]: 'Caesar Shift',
  [ROUTES.TRITHEMIUS_CIPHER]: 'Trithemius Cipher',
  [ROUTES.VIGENERE_CIPHER]: 'Vigenere Cipher',
  [ROUTES.GAMMA_CIPHER]: 'Gamma Cipher',
  [ROUTES.RSA]: 'RSA',
};

const Page: React.FC = ({ children }) => {
  const classes = useStyles();
  const { pathname } = useLocation();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Cryptology
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            {Object.entries(routes).map(([link, text]) => (
              <ListItem
                selected={pathname === link}
                button
                to={link}
                key={text}
                component={Link}
              >
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
      <main className={classes.content}>{children}</main>
    </div>
  );
};

export default Page;
