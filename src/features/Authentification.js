import { createSlice } from "@reduxjs/toolkit";

const authentificationSlice=createSlice({
    name:"authentification",
    initialState:{
        isLoading:false,
        user:{},
        isLoggedIn:false,
        isLawyer:true,
    },
    reducers:{
        authentificateLawyer:(state,action)=>{
            state.isLawyer=true;
            state.isLoggedIn=true;
            state.user=action.payload;
        },
        authentificateClient:(state,action)=>{
            state.isLawyer=false;
            state.isLoggedIn=true;
            state.user=action.payload;
        },
        logout:(state,action)=>{
            state.isLoggedIn=false;
            state.user={}
        }
    }
})

export const {authentificateClient,authentificateLawyer,logout}=authentificationSlice.actions;
export default authentificationSlice.reducer