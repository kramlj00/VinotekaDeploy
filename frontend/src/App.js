import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./pages";
import WinesPage from "./pages/wines";
import SignInPage from "./pages/sign_in";
import ToggleBars from "./features/toggle";
import Footer from "./components/Footer/Footer";
import WineProductPage from "./pages/wine_product";

function App() {
  return (
    <Router>
      <ToggleBars />
      <Switch>
        <Route path="/wine/:id" component={WineProductPage} />
        <Route path="/" component={HomePage} exact />
        <Route path="/wines" component={WinesPage} exact />
        <Route path="/sign-in" component={SignInPage} exact />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
