import React, { Fragment } from "react";
import { Route, Switch } from "react-router";

import Home from "./components/Home/Home";
import Nav from "./components/Nav/Nav";
import Form from "./components/formCategories/Form"




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
          
        </Switch>
         <Route path="/categorias" component ={Form}/>
        <Route path='/' component={ Footer }/>
        
        
      </Fragment>
     
    </div>
  );
}

export default App;
