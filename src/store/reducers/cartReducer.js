import {LOGIN_ACTIONS, SET_PRODUCT_LIST_ACTIONS} from '../../../constant';
import {omit} from 'lodash';

const initialState = {
  auth: {},
  productList: {},
  cartItems: {},
  cartItemsAsObj: {},
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_ACTIONS.SET_AUTH_DETAILS: {
      return {
        ...state,
        auth: action.payload,
      };
    }
    case SET_PRODUCT_LIST_ACTIONS.SET_ITEMS: {
      return {
        ...state,
        productList: action.payload,
      };
    }
    case SET_PRODUCT_LIST_ACTIONS.SET_CART_ITEMS: {
      return {
        ...state,
        cartItems: Object.assign({}, state.cartItems, action.payload),
      };
    }
    case SET_PRODUCT_LIST_ACTIONS.SET_PRODUCTS_AS_OBJ: {
      return {
        ...state,
        cartItemsAsObj: action.payload,
      };
    }
    case SET_PRODUCT_LIST_ACTIONS.REMOVE_ITEM_FROM_CART: {
      return {
        ...state,
        cartItems: omit(state.cartItems, action.payload.idToRemove),
      };
    }
    case SET_PRODUCT_LIST_ACTIONS.CLEAR_CART: {
      return {
        ...state,
        cartItems: {},
      };
    }
  }

  return state;
};

export default cartReducer;
