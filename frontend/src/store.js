import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { cartReducer } from "./reducers/cartReducers";
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderMineListReducer,
} from "./reducers/orderReducers";
import {
  productDetailsReducer,
  productListReducer,
  productAddReducer,
  productMineListReducer,
} from "./reducers/productReducers";
import {
  userSignInReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
} from "./reducers/userReducer";

const initialState = {
  userSignIn: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },

  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingAddress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress"))
      : {},
    paymentMethod: localStorage.getItem("paymentMethod"),
  },
};
const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productAdd: productAddReducer,
  productMineList: productMineListReducer,
  cart: cartReducer,
  userSignIn: userSignInReducer,
  userRegister: userRegisterReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderMineList: orderMineListReducer,
  userUpdateProfile: userUpdateProfileReducer,
});

// add redux to chrome redux devtools
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// redux store that returns list of products in our data.js in frontend
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
