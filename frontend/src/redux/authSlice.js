// file dam nhan login, logout, register
import {createSlice} from "@reduxjs/toolkit"

const authSlice = createSlice({
    name: "auth",
    // chua nhung properties minh mun trong login
    initialState:{
        login:{
            currentUser: null,
            isFetching: false,
            error: false,
        },
        register:{
            isFetching: false,
            error: false,
            success: false,
        },
        
    },
    reducers:{
        // bat dau dang nhap
        loginStart: (state) => {
            state.login.isFetching = true;
        },
        loginSuccess: (state, action) => {
            state.login.isFetching = false;
            state.login.currentUser = action.payload;
            state.login.error = false;
        },
        loginFailed: (state) => {
            state.login.isFetching = false;
            state.login.error = true;
        },

        // bat dau dang ki
        registerStart: (state) => {
            state.register.isFetching = true;
        },
        registerSuccess: (state) => {
            state.register.isFetching = false;
            state.register.error = false;
            state.register.success = true
        },
        registerFailed: (state) => {
            state.register.isFetching = false;
            state.register.error = true;
            state.register.success = false
        },    
        
        // DANG XUAT
        logOutSuccess: (state) => {
            state.login.isFetching = false;
            state.login.currentUser = null;
            state.login.error = false;
        },
        logOutFailed: (state) => {
            state.login.isFetching = false;
            state.login.error = true;
        },
        logOutStart: (state) => {
            state.login.isFetching = true;
            
        },
    }
})

export const {
    loginStart,
    loginSuccess,
    loginFailed,
    registerStart,
    registerSuccess,
    registerFailed,
    logOutStart,
    logOutSuccess,
    logOutFailed,
} = authSlice.actions;

export default authSlice.reducer;