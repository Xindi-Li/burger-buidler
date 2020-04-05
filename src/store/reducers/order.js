import * as actionsTypes from "../actions/actionsTypes";

const initialState = {
  orders: [],
  loading: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionsTypes.PURCHASE_BURGER_START:
      return {};
    case actionsTypes.PURCHASE_BURGER_SUCCUESS:
      const newOrder = {
        ...action.orderData,
        id: action.orderId
      };
      return {
        ...state,
        loading: false,
        orders: state.orders.concat(newOrder)
      };
    case actionsTypes.PURCHASE_BURGER_FAILED:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};

export default reducer;
