import { createSlice } from "@reduxjs/toolkit";

export type userHomeInitialStateType = {
  displaySearchBar: boolean;
  displayMenu: boolean;
  displayFilters: boolean;
};

const initialState: userHomeInitialStateType = {
  displaySearchBar: false,
  displayMenu: false,
  displayFilters: false,
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
  },
});

export const { setdisplaySearchBar, setdisplayMenu, setdisplayFilters } =
  userHome.actions;

export default userHome.reducer;
