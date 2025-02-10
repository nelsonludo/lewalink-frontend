import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Signin from "./pages/signin";
import Signup from "./pages/signup";
import NotFound from "./pages/notfound";
import ActivateAccount from "./pages/activate";
import Home from "./pages/home";

import OnlyPublic from "./protect-routes/OnlyPublic";
import Dashboard from "./pages/dashboard";
import OnlySuperUsers from "./protect-routes/OnlySuperUsers";
import CourseList from "./pages/courses/pages/CourseList";
import OnlyAdmins from "./protect-routes/OnlyAdmins";
import SingleCourse from "./pages/courses/pages/SingleCourse";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC ROUTES  */}
        <Route path="/signin" element={<Signin />} />
        <Route path="/activate" element={<ActivateAccount />} />
        <Route path="/home" element={<Home />} />
        <Route path="/unauthorized" element={<h1>Unauthorized</h1>} />
        <Route path="/" element={<Navigate to={"/home"} />} />

        {/* ONLY LOGGED OUT ROUTES  */}
        <Route
          path="/signup"
          element={
            <OnlyPublic>
              <Signup />
            </OnlyPublic>
          }
        />

        {/* SUPER USER ROUTES */}
        <Route
          path="/dashboard"
          element={
            <OnlySuperUsers>
              <Dashboard />
            </OnlySuperUsers>
          }
        >
          <Route path="statistics" element={<h1>Statistices page</h1>} />
          <Route
            path="users"
            element={
              <OnlyAdmins>
                <h1>Users page</h1>
              </OnlyAdmins>
            }
          />
          <Route path="courses">
            <Route index element={<CourseList />} />
            <Route path="new" element={<h1>New course</h1>} />
            <Route path="update/:id" element={<h1>Update course </h1>} />
            <Route path=":id" element={<SingleCourse />} />
          </Route>
          <Route path="programs" element={<h1>Programs page</h1>} />
          <Route path="schools" element={<h1>Schools page</h1>} />
        </Route>

        {/* FALL BACK  */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
