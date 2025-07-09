import { createSlice } from "@reduxjs/toolkit";
import { School } from "../types/entities/school";
import { SchoolProgram } from "../types/entities/school-program";
import { ProgramCourse } from "../types/entities/program-course";

export type userHomeInitialStateType = {
  displaySearchBar: boolean;
  displayMenu: boolean;
  displayFilters: boolean;
  schools: School[];
  currentSchoolPrograms: SchoolProgram[];
  currentSchoolProgramCourses?: ProgramCourse[];
};

const initialState: userHomeInitialStateType = {
  displaySearchBar: false,
  displayMenu: false,
  displayFilters: false,
  schools: [],
  currentSchoolPrograms: [],
  currentSchoolProgramCourses: [],
};

const userHome = createSlice({
  name: "userHome",
  initialState,
  reducers: {
    setdisplaySearchBar(state, action: { payload: boolean }) {
      state.displaySearchBar = action.payload;
    },
    setdisplayMenu(state, action: { payload: boolean }) {
      state.displayMenu = action.payload;
    },
    setdisplayFilters(state, action: { payload: boolean }) {
      state.displayFilters = action.payload;
    },
    setSchools(state, action: { payload: School[] }) {
      state.schools = action.payload;
    },
    setCurrentSchoolPrograms(state, action: { payload: SchoolProgram[] }) {
      state.currentSchoolPrograms = action.payload;
    },
    setCurrentSchoolProgramCourses(
      state,
      action: { payload: ProgramCourse[] }
    ) {
      state.currentSchoolProgramCourses = action.payload;
    },
  },
});

export const {
  setdisplaySearchBar,
  setdisplayMenu,
  setdisplayFilters,
  setSchools,
  setCurrentSchoolPrograms,
  setCurrentSchoolProgramCourses,
} = userHome.actions;

export default userHome.reducer;
