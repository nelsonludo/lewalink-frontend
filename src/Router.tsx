import { BrowserRouter, Route, Routes } from "react-router-dom";

import Signin from "./pages/Signin";
import CreateAccount from "./pages/CreateAccount";
import NotFound from "./pages/NotFound";
import OnlyPublic from "./protect-routes/OnlyPublic";
import ActivateAccount from "./pages/ActivateAccount";
import Home from "./pages/Home";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC ROUTES  */}
        <Route path="/signin" element={<Signin />} />
        <Route path="/activate" element={<ActivateAccount />} />
        <Route path="/home" element={<Home />} />

        {/* ONLY LOGGED OUT ROUTES  */}
        <Route
          path="/create"
          element={
            <OnlyPublic>
              <CreateAccount />
            </OnlyPublic>
          }
        />

        {/* PROTECTED ROUTES  */}

        {/* FALL BACK  */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
