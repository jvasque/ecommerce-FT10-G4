import React from "react";
import { Route, Switch } from "react-router";

import Home from "./components/Home/Home";
import Nav from "./components/Nav/Nav";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import ProductForm from "./components/product_form/product_form";
import ProductFormCreate from "./components/product_form/product_form_create";
import ProductFormQuery from "./components/product_form/product_form_query";
import ProductFormUpdate from "./components/product_form/product_form_update";
import ProductFormDelete from "./components/product_form/product_form_delete";
import OrderHistory from "./components/OrderHistory/OrderHistory"
//import "./App.css";
import Catalog from "./components/Catalog/Catalog.jsx";
import Form from "./components/formCategories/Form";
import "./scss/_App.scss";
import Footer from "./components/Footer/Footer";
import Signup from "./components/Signup/Signup";
import Cart from "./components/Cart/Cart"

function App() {
  return (
    <div className="App">

        <Route path="/" component={Nav} />
        <Switch>
          <Route exact path="/product/cart" component={Cart}/>
          <Route exact path="/" component={Home} />
          <Route exact path="/admin/categories" component={Form} />
          <Route exact path="/catalog" component={Catalog} />
          <Route exact path="/:id" component={ProductDetails} />
          <Route exact path="/admin/product/form" component={ProductForm} />
          <Route exact path="/admin/product/form/create" component={ProductFormCreate} />
          <Route exact path="/admin/product/form/query" component={ProductFormQuery} />
          <Route exact path="/admin/product/form/update" component={ProductFormUpdate} />
          <Route exact path="/admin/product/form/delete" component={ProductFormDelete} />
          <Route exact path="/user/signup/form/create" component={Signup}/>
          <Route exact path='/user/orders' component={OrderHistory}/>
        </Switch>
        <Route path="/" component={Footer} />
    </div>
  );
}

export default App;
