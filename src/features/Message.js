import { createSlice } from "@reduxjs/toolkit";
const initState={
  messages:[
 ],
  isLoading:false,
  chats:[],
  selectedChat:{id:0},
  contracts:[],
  thisContract:{},
}
const messageSlice=createSlice({
    name:"authentification",
    initialState:initState,
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
       },
       initContracts:(state,action)=>{
        state.contracts=action.payload;
       },

       initThisContract:(state,action)=>{
        state.thisContract=action.payload
       },
       messageLogout:(state)=>{
        state.contracts=[];
        state.thisContract=-1;
       }
    }
})

export const {initializeMessages,sendMessage,initializeChats,selectChat,removeMessage,initContracts,messageLogout,initThisContract}=messageSlice.actions;
export default messageSlice.reducer