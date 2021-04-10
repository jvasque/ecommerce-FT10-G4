import React, { Fragment } from "react";
import { Route, Switch } from "react-router";

import Home from "./components/Home/Home";
import Nav from "./components/Nav/Nav";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import Form from "./components/formCategories/Form";
// import AdminMenu from "./components/Nav/AdminMenu";


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
          
        </Switch>
         <Route path="/categorias" component ={Form}/>
        <Route path='/' component={ Footer }/>
        
        
      </Fragment>
    </div>
  );
}

export default App;
