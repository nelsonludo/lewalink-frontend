import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import LewalinkApp from "./LewalinkApp.tsx";
import { Provider } from "react-redux";
import store from "./store/index.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <LewalinkApp />
    </Provider>
  </StrictMode>
);
