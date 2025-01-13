import { BrowserRouter, Route, Routes } from "react-router-dom";

import Signin from "./pages/signin";
import Signup from "./pages/signup";
import NotFound from "./pages/notfound";
import ActivateAccount from "./pages/activate";
import Home from "./pages/home";

import OnlyPublic from "./protect-routes/OnlyPublic";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* ONLY LOGGED OUT ROUTES  */}
        <Route
          path="/signup"
          element={
            <OnlyPublic>
              <Signup />
            </OnlyPublic>
          }
        />

        {/* PUBLIC ROUTES  */}
        <Route path="/signin" element={<Signin />} />
        <Route path="/activate" element={<ActivateAccount />} />
        <Route path="/home" element={<Home />} />

        {/* PROTECTED ROUTES  */}

        {/* SUPER USER ROUTES */}

        {/* ADMIN ROUTES */}

        {/* FALL BACK  */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
