import React, { Fragment } from "react";
import { Route, Switch } from "react-router";

import Home from "./components/Home/Home";
import Nav from "./components/Nav/Nav";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import Catalog from './components/Catalog/Catalog.jsx'
import Form from "./components/formCategories/Form";
import "./scss/_App.scss";
import Footer from "./components/Footer/Footer";


function App() {
  return (
    <div className="App">
      <Fragment>
        <Route path="/" render={() => <Nav />} />
        <Route exact path="/" component={Home} />
        <Route exact path="/categorias" component={Form} />
        <Switch>
          <Route path='/catalog' component={Catalog}/>
          <Route path="/:id" component={ProductDetails} />
        </Switch>
        <Route path='/' component={ Footer }/>  
      </Fragment>
    </div>
  );
}

export default App;
