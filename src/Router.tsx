import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Signin from "./pages/signin";
import Signup from "./pages/signup";
import NotFound from "./pages/notfound";
import ActivateAccount from "./pages/activate";
import Home from "./pages/home";

import OnlyPublic from "./protect-routes/OnlyPublic";
import Dashboard from "./pages/dashboard";
import OnlySuperUsers from "./protect-routes/OnlySuperUsers";
import CoursesList from "./pages/courses/pages/CoursesList";
import OnlyAdmins from "./protect-routes/OnlyAdmins";
import SingleCourse from "./pages/courses/pages/SingleCourse";
import NewCourse from "./pages/courses/pages/NewCourse";
import UpdateCourse from "./pages/courses/pages/UpdateCourse";
import ForgotPassword from "./pages/forgotPassword";
import ResetPassword from "./pages/resetPassword";
import ProgramsList from "./pages/programs/pages/ProgramsList";
import NewProgram from "./pages/programs/pages/NewProgram";
import SingleProgram from "./pages/programs/pages/SingleProgram";
import UpdateProgram from "./pages/programs/pages/UpdateProgram";
import UsersList from "./pages/users/pages/UsersList";
import NewSuperUser from "./pages/users/pages/NewSuperUser";
import SchoolsList from "./pages/school/pages/SchoolsList";
import NewSchool from "./pages/school/pages/NewSchool";
import UpdateSchool from "./pages/school/pages/UpdateSchool";
import SingleSchool from "./pages/school/pages/SingleSchool";
import Statistics from "./pages/statistics";

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
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

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
          <Route path="statistics" element={<Statistics />} />
          <Route path="users">
            <Route
              index
              element={
                <OnlyAdmins>
                  <UsersList />
                </OnlyAdmins>
              }
            />
            <Route
              path="new/:userType"
              element={
                <OnlyAdmins>
                  <NewSuperUser />
                </OnlyAdmins>
              }
            />
          </Route>
          <Route path="courses">
            <Route index element={<CoursesList />} />
            <Route path="new" element={<NewCourse />} />
            <Route path="update/:id" element={<UpdateCourse />} />
            <Route path=":id" element={<SingleCourse />} />
          </Route>
          <Route path="programs">
            <Route index element={<ProgramsList />} />
            <Route path="new" element={<NewProgram />} />
            <Route path="update/:id" element={<UpdateProgram />} />
            <Route path=":id" element={<SingleProgram />} />
          </Route>
          <Route path="schools">
            <Route index element={<SchoolsList />} />
            <Route path="new" element={<NewSchool />} />
            <Route path="update/:id" element={<UpdateSchool />} />
            <Route path=":id" element={<SingleSchool />} />
          </Route>
        </Route>

        {/* FALL BACK  */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
