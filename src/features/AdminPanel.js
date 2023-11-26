import { createSlice } from "@reduxjs/toolkit";
const AdminPanelSlice=createSlice({
    name:"AdminPanel",
    initialState:{
        lawyers:[],
        selectedLawyer:0
    },
    reducers:{
        setInitLawyers:(state,action)=>{
            state.lawyers=action.payload;
        },
        setSelectedLawyers:(state,action)=>{
            state.selectedLawyer=action.payload;
        },
        updatedUser:(state)=>{
            state.selectedLawyer=0;
        }
        
    }
})

export const {setInitLawyers,setSelectedLawyers,updatedUser}=AdminPanelSlice.actions;
export default AdminPanelSlice.reducer