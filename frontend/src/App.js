import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./pages";
import WinesPage from "./pages/wines";
import SignInPage from "./pages/sign_in";
import ToggleBars from "./features/toggle";
import Footer from "./components/Footer/Footer";
import WineProductPage from "./pages/wine_product";
import CartPage from "./pages/cart";

function App() {
  return (
    <Router>
      <ToggleBars />
      <Switch>
        {/* :id? --> if user directly goes to cart (from WinesPage) */}
        <Route path="/cart/:id?" component={CartPage} />
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
