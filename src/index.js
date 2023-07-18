import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter, RouterProvider} from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from './context/AuthContextProvider';
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";
import store from './store'
import {RecoilRoot} from "recoil";
import router from "./router/Router";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
      <AuthContextProvider>
          <RecoilRoot>
            <CookiesProvider>
              <Provider store={store}>
                <RouterProvider router={ router }>
                  <App />
                </RouterProvider>
              </Provider>
            </CookiesProvider>
          </RecoilRoot>
      </AuthContextProvider>
  </>
);

reportWebVitals();
