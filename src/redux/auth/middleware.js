import axios from "axios";
import { loginSuccess, loginFailure } from "./actions";

export default function authMiddleware(store) {
  return function (next) {
    return async function (action) {
      const result = next(action);

      if (action.type === "LOGIN_REQUEST") {
        try {
          const response = await axios.post("/api/auth/login", {
            email: action.email,
            password: action.password,
          });

          const accessToken = response.data.accessToken;
          const refreshToken = response.data.refreshToken;
          localStorage.setItem("accessToken", JSON.stringify(accessToken));
          localStorage.setItem("refreshToken", JSON.stringify(refreshToken));
          store.dispatch(loginSuccess(accessToken, refreshToken));
        } catch (error) {
          store.dispatch(loginFailure(error));
        }
      }

      return result;
    };
  };
}
