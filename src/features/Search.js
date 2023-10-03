import { createSlice } from "@reduxjs/toolkit";
import { userData } from "../Data"; 
const searchSlice=createSlice({
    name:"search",
    initialState:{
        isLoading:false,
        data:[],
    },
    reducers:{
        filterList:(state,action)=>{
            state.data=userData.filter((e,index)=>{
                return e.name.toLowerCase().includes(action.payload)
            })
        },
        clearList:(state,action)=>{
            state.data=[];
        }
    }
})

export const {filterList,clearList}=searchSlice.actions;
export default searchSlice.reducer