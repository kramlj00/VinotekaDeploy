import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import WinesPage from "./pages/WinesPage";
import SignInPage from "./pages/SignInPage";
import ToggleBars from "./functions/toggle";
import Footer from "./components/Footer/Footer";
import WineProductPage from "./pages/WineDetailsPage";
import CartPage from "./pages/CartPage";
import AdvertiseProductPage from "./pages/AdvertiseProductPage";
import ShippingAddressPage from "./pages/ShippingAddressPage";
import PaymentPage from "./pages/PaymentPage";
import PlaceOrderPage from "./pages/PlaceOrderPage";
import OrderHistoryPage from "./pages/OrderHistoryPage";
import OrderPage from "./pages/OrderDetailsPage";
import MineAdsPage from "./pages/MineAdsPage";
import MyProfilePage from "./pages/MyProfilePage";
import BusinessProfilePage from "./pages/BusinessProfilePage";
import { theme } from "./themes/defaultTheme";
import { ThemeProvider } from "styled-components";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <ToggleBars />
        <Switch>
          {/* :id? --> if user directly goes to cart (from WinesPage) */}
          <Route path="/cart/:id?" component={CartPage} />
          <Route path="/wines/:id" component={WineProductPage} />
          <Route path="/" component={HomePage} exact />
          <Route path="/wines" component={WinesPage} exact />
          <Route
            path="/advertise_product"
            component={AdvertiseProductPage}
            exact
          />
          <Route path="/sign-in" component={SignInPage} exact />
          <Route path="/shipping" component={ShippingAddressPage} />
          <Route path="/payment" component={PaymentPage} />
          <Route path="/placeorder" component={PlaceOrderPage} />
          <Route path="/order_history" component={OrderHistoryPage} />
          <Route path="/order/:id" component={OrderPage} />
          <Route path="/mine_ads" component={MineAdsPage} />
          <Route path="/my_profile" component={MyProfilePage} />
          <Route path="/business_profile" component={BusinessProfilePage} />
        </Switch>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;
