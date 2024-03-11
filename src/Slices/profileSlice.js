import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    user:localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    loading:false,
    additionalDetails:null,
}

const profileSlice = createSlice({
    name:"Profile",
    initialState:initialState,
    reducers:{
        setUser(state,value){
            state.user = value.payload;
        },
        setLoading(state,value){
            state.loading = value.payload;
        },
        setAdditionalDetails(state,value){
            state.additionalDetails = value.payload;
        }
    }
})

export const { setUser, setLoading,setAdditionalDetails} = profileSlice.actions;
export default profileSlice.reducer;