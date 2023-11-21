import { createSlice } from "@reduxjs/toolkit";

const messageSlice=createSlice({
    name:"authentification",
    initialState:{
       messages:[
      ],
       isLoadgin:false,
       chats:[],
       selectedChat:{id:0},
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
         state.selectedChat=action.payload;
       },
       removeMessage:(state,action)=>{
        state.messages=state.messages.filter((e,index)=>{
          return e.id!==action.payload
        })
       }
    }
})

export const {initializeMessages,sendMessage,initializeChats,selectChat,removeMessage}=messageSlice.actions;
export default messageSlice.reducer