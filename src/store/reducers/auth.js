import * as actionTypes from "../actions/actionsTypes";

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  authRedirectPath: "/"
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return {
        ...state,
        loading: true,
        error: null
      };
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        token: action.idToken,
        userId: action.userId,
        error: null
      };
    case actionTypes.AUTH_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error
      };

    case actionTypes.AUTH_LOGOUT:
      return {
        ...state,
        token: null,
        userId: null
      };

    case actionTypes.SET_AUTH_REDIRECT_PATH:
      return {
        ...state,
        authRedirectPath: action.path
      };
    default:
      return state;
  }
};

export default reducer;
