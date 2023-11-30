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
        },
        updateFunds:(state,action)=>{
            state.user.funds=state.user.funds+action.payload
        },
        withdrawFunds:(state,action)=>{
            state.user.funds=state.user.funds-action.payload
        }
    }
})

export const {authentificateClient,authentificateLawyer,logout,updateFunds,withdrawFunds}=authentificationSlice.actions;
export default authentificationSlice.reducer