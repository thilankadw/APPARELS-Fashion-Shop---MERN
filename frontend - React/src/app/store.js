import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import cartReducer from "./slice/cartSlice";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
};

const rootReducer = combineReducers({
    auth: authReducer,
    cart: cartReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,  // Use only persistedReducer here
})

export const persistor = persistStore(store);

export default store;
