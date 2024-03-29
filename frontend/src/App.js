import "./App.css";
import React, { useState  } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import WinesPage from "./pages/WinesPage";
import SignInPage from "./pages/SignInPage";
import ToggleBars from "./functions/toggle";
import Footer from "./components/Footer/Footer";
import WineDetailsPage from "./pages/WineDetailsPage";
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
import EditProductPage from "./pages/EditProductPage";
import AllAdsPage from "./pages/AllAdsPage";
import styled from "styled-components";
import AOS from "aos";
import "aos/dist/aos.css";

function App() {
  AOS.init({ once: true, offset: 0 });
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Container isFixed={isOpen}>
          <ToggleBars isOpen={isOpen} setIsOpen={setIsOpen} />
          <Switch>
            {/* :id? --> if user directly goes to cart (from WinesPage) */}
            <Route path="/cart/:id?" component={CartPage} />
            <Route path="/wines/:id" component={WineDetailsPage} />
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
            <Route path="/all_ads" component={AllAdsPage} />
            <Route path="/business_profile" component={BusinessProfilePage} />
            <Route path="/edit_product/:id" component={EditProductPage} />
          </Switch>
          <Footer />
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;

const Container = styled.div`
  /* ${({ isFixed }) => `
    position: ${isFixed ? "fixed" : ""};
  `} */
`;
