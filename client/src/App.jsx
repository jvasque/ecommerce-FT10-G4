import React, { Fragment } from "react";
import { Route, Switch } from "react-router";

import Home from "./components/Home/Home";
import Nav from "./components/Nav/Nav";
import ProductDetails from "./components/ProductDetails/ProductDetails";

import "./App.css";
import "./scss/_App.scss";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div className="App">
      <Fragment>
        <Route path="/" render={() => <Nav />} />
        <Route exact path="/" component={Home} />
        <Switch>
          <Route exact path="/:id" component={ProductDetails} />
        </Switch>

        <Route path='/' component={ Footer }/>
      </Fragment>
    </div>
  );
}

export default App;
