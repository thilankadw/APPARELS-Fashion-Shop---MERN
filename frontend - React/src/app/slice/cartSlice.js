import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isActive: false,
    isInActive: false,
    isLoading: false,
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        SET_CART_ACTIVE: (state, action) => {
            console.log('cart loaded')
            state.isActive = true;
            state.isInActive = false;
            state.isLoading = false;
        },
        SET_CART_INACTIVE: (state) => {
            state.isActive = false;
            state.isInActive = true;
            state.isLoading = false;
        },
        SET_CART_LOADING: (state) => {
            console.log('cart loading');
            state.isActive = false;
            state.isInActive = false;
            state.isLoading = true;
        }
    }
});

export const {SET_CART_ACTIVE, SET_CART_INACTIVE, SET_CART_LOADING} = cartSlice.actions

export const cartItemList = (state) => state.cart.cartItemList

export default cartSlice.reducer