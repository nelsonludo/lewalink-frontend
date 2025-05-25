import { createRoot } from "react-dom/client";
import "./index.css";
import LewalinkApp from "./LewalinkApp.tsx";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import store from "./store/index.ts";
import { GoogleOAuthProvider } from "@react-oauth/google";
// import "@fontsource/inter"; // Defaults to weight 400
import "@fontsource/inter/500.css"; // Medium
import "@fontsource/inter/600.css"; // Semi-Bold
import "@fontsource/inter/700.css"; // Bold

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId="310823759335-k5eskag8mo8g8l1svhvo9rl87ea379ut.apps.googleusercontent.com">
      <ToastContainer />
      <LewalinkApp />
    </GoogleOAuthProvider>
  </Provider>
);
