import { createRoot } from "react-dom/client";
import "./index.css";
import LewalinkApp from "./LewalinkApp.tsx";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import store from "./store/index.ts";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId="310823759335-k5eskag8mo8g8l1svhvo9rl87ea379ut.apps.googleusercontent.com">
    <Provider store={store}>
      <ToastContainer />
      <LewalinkApp />
    </Provider>
  </GoogleOAuthProvider>
);
