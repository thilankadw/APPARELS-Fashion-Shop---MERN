import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    userId: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        SET_ACTIVE_USER: (state, action) => {
            state.isLoggedIn = true;
            state.userId = action.payload.userId;
        },
        REMOVE_ACTIVE_USER: (state) => {
            state.isLoggedIn = false;
            state.userId = null;
        }
    }
});

export const {SET_ACTIVE_USER, REMOVE_ACTIVE_USER} = authSlice.actions

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn
export const selectUserId = (state) => state.auth.userId

export default authSlice.reducer;