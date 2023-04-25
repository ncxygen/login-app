import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: null,
    name: null,
    email: null,
    photoUrl: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.photoUrl = action.payload.photoUrl;
        },
    },    
});   

export const { setUser } = userSlice.actions;
export default userSlice.reducer;

