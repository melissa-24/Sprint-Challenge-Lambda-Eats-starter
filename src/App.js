import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import PizzaForm from "./components/PizzaForm";
import PizzaHome from "./components/PizzaHome";
import Tracker from "./components/Tracker";

const App = () => {
  return (
    <>
      <h1>Lambda Eats</h1>
      <Switch>
        <Route path="/pizza-tracker">
          <Tracker />
        </Route>
        <Route path="/pizza-form">
          {" "}
          <PizzaForm />
        </Route>
        <Route path="/">
          <PizzaHome />
        </Route>
      </Switch>
    </>
  );
};
export default App;