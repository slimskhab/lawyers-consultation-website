import { createSlice } from "@reduxjs/toolkit";

const messageSlice=createSlice({
    name:"authentification",
    initialState:{
       messages:[
        {
          "_id": "6553f7ab442611637384e442",
          "id": 1,
          "senderId": 5,
          "content": "Hello world!",
          "chatId": 2,
          "createdAt": "2023-11-14T22:41:47.904Z",
          "updatedAt": "2023-11-14T22:41:47.904Z",
          "__v": 0
        },
        {
          "_id": "6553f7ab442611637384e442",
          "id": 1,
          "senderId": 5,
          "content": "Hello world!",
          "chatId": 2,
          "createdAt": "2023-11-14T22:41:47.904Z",
          "updatedAt": "2023-11-14T22:41:47.904Z",
          "__v": 0
        },
        {
          "_id": "6553f7ab442611637384e442",
          "id": 1,
          "senderId": 5,
          "content": "Hello world!",
          "chatId": 2,
          "createdAt": "2023-11-14T22:41:47.904Z",
          "updatedAt": "2023-11-14T22:41:47.904Z",
          "__v": 0
        },
        {
          "_id": "6553f7ab442611637384e442",
          "id": 1,
          "senderId": 5,
          "content": "Hello world!",
          "chatId": 2,
          "createdAt": "2023-11-14T22:41:47.904Z",
          "updatedAt": "2023-11-14T22:41:47.904Z",
          "__v": 0
        },
        {
          "_id": "6553f7ab442611637384e442",
          "id": 1,
          "senderId": 5,
          "content": "Hello world!",
          "chatId": 2,
          "createdAt": "2023-11-14T22:41:47.904Z",
          "updatedAt": "2023-11-14T22:41:47.904Z",
          "__v": 0
        },
        {
          "_id": "6553f7ab442611637384e442",
          "id": 1,
          "senderId": 5,
          "content": "Hello world!",
          "chatId": 2,
          "createdAt": "2023-11-14T22:41:47.904Z",
          "updatedAt": "2023-11-14T22:41:47.904Z",
          "__v": 0
        },
        {
          "_id": "6553f7ab442611637384e442",
          "id": 1,
          "senderId": 5,
          "content": "Hello world!",
          "chatId": 2,
          "createdAt": "2023-11-14T22:41:47.904Z",
          "updatedAt": "2023-11-14T22:41:47.904Z",
          "__v": 0
        },
        {
          "_id": "6553f7ab442611637384e442",
          "id": 1,
          "senderId": 5,
          "content": "Hello world!",
          "chatId": 2,
          "createdAt": "2023-11-14T22:41:47.904Z",
          "updatedAt": "2023-11-14T22:41:47.904Z",
          "__v": 0
        },
        {
          "_id": "6553f7ab442611637384e442",
          "id": 1,
          "senderId": 5,
          "content": "Hello world!",
          "chatId": 2,
          "createdAt": "2023-11-14T22:41:47.904Z",
          "updatedAt": "2023-11-14T22:41:47.904Z",
          "__v": 0
        },
        {
          "_id": "6553f7ab442611637384e442",
          "id": 1,
          "senderId": 5,
          "content": "Hello world!",
          "chatId": 2,
          "createdAt": "2023-11-14T22:41:47.904Z",
          "updatedAt": "2023-11-14T22:41:47.904Z",
          "__v": 0
        },
        {
          "_id": "6553f7eb442611637384e447",
          "id": 2,
          "senderId": 8,
          "content": "Hello bro!",
          "chatId": 2,
          "createdAt": "2023-11-14T22:42:51.239Z",
          "updatedAt": "2023-11-14T22:42:51.239Z",
          "__v": 0
        },
        {
          "_id": "655417a5f081717c726862aa",
          "id": 3,
          "senderId": 8,
          "content": "Hello bro!",
          "chatId": 2,
          "createdAt": "2023-11-15T00:58:13.244Z",
          "updatedAt": "2023-11-15T00:58:13.244Z",
          "__v": 0
        },
        {
          "_id": "655417bbafa199189954b8e3",
          "id": 4,
          "senderId": 8,
          "content": "Hello bro!",
          "chatId": 2,
          "createdAt": "2023-11-15T00:58:35.446Z",
          "updatedAt": "2023-11-15T00:58:35.446Z",
          "__v": 0
        }
      ],
       isLoadgin:false,
       chats:[],
       selectedChatId:0,
    },
    reducers:{
       initializeMessages:(state,action)=>{
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