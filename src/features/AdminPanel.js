import { createSlice } from "@reduxjs/toolkit";
const AdminPanelSlice=createSlice({
    name:"AdminPanel",
    initialState:{
        lawyers:[],
        selectedLawyer:{}
    },
    reducers:{
        setInitLawyers:(state,action)=>{
            state.lawyers=action.payload;
        },
        setSelectedLawyers:(state,action)=>{
            state.selectedLawyer=action.payload;
        },
        
    }
})

export const {setInitLawyers,setSelectedLawyers}=AdminPanelSlice.actions;
export default AdminPanelSlice.reducer