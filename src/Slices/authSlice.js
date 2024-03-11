import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    token: localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null,
    loading:false,
    signupFormData:null,
}

const authSlice = createSlice({
    name:"auth",
    initialState:initialState,
    reducers:{
        setToken(state,value){
            state.token =  value.payload;
        },
        setLoading(state,value){
            state.loading = value.payload
        },
        setSignupFormData(state,value){
            state.signupFormData = value.payload
        }
    },
})

export const {setToken, setLoading,setSignupFormData} = authSlice.actions;
export default authSlice.reducer;