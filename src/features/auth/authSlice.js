import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    user: null
}

export const logout = createAsyncThunk('auth/logout', () => { 
    localStorage.removeItem('user');
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, action) => {
            state.user = action.payload;
        },
        logOut: () => {
            localStorage.removeItem('user');
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(logout.fulfilled, (state) => {
            state.user = null;
        })
    }
});

export const { setAuth } = authSlice.actions;
export default authSlice.reducer;