import { CART_ADD_ITEM } from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      // item that will be added to the cart
      const item = action.payload;
      // check if there is already a product with item id in the cart
      const existItem = state.cartItems.find((x) => x.product === item.product);

      if (existItem) {
        // replace existing item with item because it is newer
        return {
          ...state, // state property won't change
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ), // x is a previous value
        };
      } else {
        // if product does not exist in cart
        return { ...state, cartItems: [...state.cartItems, item] };
      }
    default:
      return state;
  }
};
