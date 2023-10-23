import { createSlice } from "@reduxjs/toolkit";
const ImageSwapperSlice=createSlice({
    name:"search",
    initialState:{
        isLoading:false,
        data:[],
    },
    reducers:{
        setImages: (state, action) => {
            state.data=action.payload;
          },
        swapImageRight:(state)=>{
            const firstElement = state.data.shift();
            state.data.push(firstElement);
        },
        swapImageLeft:(state)=>{
            const lastElement = state.data.pop();
            state.data.unshift(lastElement);
        },
        selectImage:(state,action)=>{
            const index=action.payload;
            const elementToMove = state.data[index];
            const newArray = [...state.data.slice(0, index), ...state.data.slice(index + 1)];
          
            state.data= [elementToMove, ...newArray];
        }
    }
})

export const {setImages,swapImageLeft,swapImageRight,selectImage}=ImageSwapperSlice.actions;
export default ImageSwapperSlice.reducer