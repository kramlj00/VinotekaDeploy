import "./App.css";
import React from "react";
//import Footer from "./components/Footer";
//import Home from "./components/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./pages";
import WinesPage from "./pages/wines";
import SignInPage from "./pages/sign_in";
import ToggleBars from "./features/toggle";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <Router>
      <ToggleBars />
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/wines" exact component={WinesPage} />
        <Route path="/sign-in" exact component={SignInPage} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
