import { createSlice } from "@reduxjs/toolkit";
const InPageNav=createSlice({
    name:"navigation",
    initialState:{
        ref:null
    },
    reducers:{
        setContainerRef:(state,action)=>{
            state.ref=action.payload;
        },
        
    }
})

export const {setContainerRef}=InPageNav.actions;
export default InPageNav.reducer