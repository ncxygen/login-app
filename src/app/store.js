import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/auth/authRx';
import userReducer from '../features/user/userRx';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
    },
})