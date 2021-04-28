
import React, {Fragment} from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

//PRUEBA MUI
import { ThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { getCatalog } from './redux/catalogReducer/catalogActions';
import { getCategories } from './redux/categoryFilterReducer/categoryFilterActions';
import store from './redux/store';
import { addRecommended } from './redux/wishlistReducer/wishlistActions';

store.dispatch(getCatalog());
store.dispatch(getCategories());
store.dispatch(addRecommended());

const theme = createMuiTheme({
  palette: {
    primary: {
      main: green[500],
    },
    secondary: {
      main: red[500],
    },
  },
});


ReactDOM.render(
  <Fragment> 
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </Fragment>,
  document.getElementById("root")

);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
