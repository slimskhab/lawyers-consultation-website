import { createSlice } from "@reduxjs/toolkit";

const paymentMethodsSlice=createSlice({
    name:"methods",
    initialState:{
        paymentMethods:[]
    },
    reducers:{
        initPayementMethods:(state,action)=>{
            state.paymentMethods=action.payload
        },
        removePaymentMethod:(state,action)=>{
            console.log(action.payload);
            state.paymentMethods=state.paymentMethods.filter((e,index)=>{
                console.log(e.id);
                return e.id!==action.payload;
            })
        },
        addPaymentMethod:(state,action)=>{
            state.paymentMethods.push(action.payload)
        }
        
    }
})

export const {removePaymentMethod,initPayementMethods,addPaymentMethod}=paymentMethodsSlice.actions;
export default paymentMethodsSlice.reducer