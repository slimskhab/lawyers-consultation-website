import { createSlice } from "@reduxjs/toolkit";

const messageSlice=createSlice({
    name:"authentification",
    initialState:{
       messages:[
      ],
       isLoadgin:false,
       chats:[],
       selectedChatId:0,
    },
    reducers:{
       initializeMessages:(state,action)=>{
        state.messages=[];
        state.messages=action.payload;
       },
       sendMessage:(state,action)=>{
        state.messages= [...state.messages,action.payload]
       },
       initializeChats:(state,action)=>{
         state.chats=action.payload
       },
       selectChat:(state,action)=>{
         state.selectedChatId=action.payload;
       }
    }
})

export const {initializeMessages,sendMessage,initializeChats,selectChat}=messageSlice.actions;
export default messageSlice.reducer