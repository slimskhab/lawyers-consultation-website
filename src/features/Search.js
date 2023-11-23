import { createSlice } from "@reduxjs/toolkit";
const searchSlice=createSlice({
    name:"search",
    initialState:{
        isLoading:false,
        lawyers:[],
        filteredList:[],
    },
    reducers:{
        filterList: (state, action) => {
            state.filteredList = state.lawyers.filter((e, index) => {
                var fullName=`${e.firstName} ${e.lastName}`;
              return fullName.toLowerCase().includes(action.payload);
            }); 
        
          },
        clearList:(state,action)=>{
            state.filteredList=[];
        },
        setList:(state,action)=>{
            state.lawyers=action.payload
        }
    }
})

export const {filterList,clearList,setList}=searchSlice.actions;
export default searchSlice.reducer