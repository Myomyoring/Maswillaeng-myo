import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from "./actions";

const initialState = {
  accessToken: null,
  refreshToken: null,
  isLoading: false,
  error: null,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        accessToken: action.accessToken,
        refreshToken: action.refreshToken,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
}
