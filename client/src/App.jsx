import React, { Fragment } from "react";
import { Route, Switch } from "react-router";

import Home from "./components/Home/Home";
import Nav from "./components/Nav/Nav";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import ProductForm from "./components/product_form/product_form";
import ProductFormCreate from "./components/product_form/product_form_create";
import ProductFormQuery from "./components/product_form/product_form_query";
import ProductFormUpdate from "./components/product_form/product_form_update";
import ProductFormDelete from "./components/product_form/product_form_delete";

//import "./App.css";
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
        
        <Route exact path="/admin/product/form" component={ProductForm} />
        <Route exact path="/admin/product/form/create" component={ProductFormCreate} />
        <Route exact path="/admin/product/form/query" component={ProductFormQuery} />
        <Route exact path="/admin/product/form/update" component={ProductFormUpdate} />
        <Route exact path="/admin/product/form/delete" component={ProductFormDelete} />
        
        <Route path='/' component={ Footer }/>
      </Fragment>
    </div>
  );
}

export default App;
