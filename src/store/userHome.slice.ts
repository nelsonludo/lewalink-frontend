import { createSlice } from "@reduxjs/toolkit";

export type userHomeInitialStateType = {
  displaySearchBar: boolean;
};

const initialState: userHomeInitialStateType = {
  displaySearchBar: false,
};

const userHome = createSlice({
  name: "userHome",
  initialState,
  reducers: {
    setdisplaySearchBar(state, action: { payload: boolean }) {
      state.displaySearchBar = action.payload;
    },
  },
});

export const { setdisplaySearchBar } = userHome.actions;

export default userHome.reducer;
