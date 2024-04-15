import {LOGIN_ACTIONS} from '../../../constant';

const initialState = {
  auth: {},
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_ACTIONS.SET_AUTH_DETAILS: {
      return {
        ...state,
        auth: {...action.payload},
      };
    }
  }
  return state;
};

export default cartReducer;
