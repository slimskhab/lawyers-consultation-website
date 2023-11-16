import React, { useEffect, useRef, useState } from 'react';
import "./Message.css"
import SmallNavBar from '../../components/smallnavigationbar/SmallNavBar';
import Footer from '../../components/footer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { initializeChats, initializeMessages, selectChat, sendMessage } from '../../../features/Message';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Spinner from 'react-bootstrap/Spinner';

import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { io } from 'socket.io-client';

const ENDPOINT = "http://localhost:6005"
var socket, selectedChatCompate;
function Message(props) {
    const user = useSelector((state) => state.authentificateStore.user)
    const chats = useSelector((state) => state.messageStore.chats)
    const selectedChatId = useSelector((state) => state.messageStore.selectedChatId)
    const messages = useSelector((state) => state.messageStore.messages)
    const isLawyer = useSelector((state) => state.authentificateStore.isLawyer)
    const dispatch = useDispatch();
    const inputRef = useRef();
    const [isLoading, setIsLoading] = useState(false);
    const [socketConnected, setSocketConnected] = useState(false);
    const [typing,setTyping]=useState(false);
    const [otherUserId,setOtherUserId]=useState();

    const [isTyping,setIsTyping]=useState(false);
    const [messageContent,setMessageContent]=useState("");
    useEffect(() => {
        socket = io(ENDPOINT);
        socket.emit("setup", user);
        const handleMessageReceived = (newMessage) => {
            console.log("message received with content:" + newMessage.content);
            dispatch(sendMessage(newMessage));
        };
    
        socket.on("connected", () => 
            setSocketConnected(true)
        )
        socket.on("message received",handleMessageReceived)
        socket.on("typing",()=>{
            setIsTyping(true)
        })
        socket.on("stop typing",()=>{
            setIsTyping(false)
        })
        return () => {
            socket.off("message received", handleMessageReceived);
        };
    }, [])



    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const response = await axios.post("http://localhost:6005/chat/all", {
                    userId: user.id
                });
                const chatsArray = response.data.chats;

                for (let index = 0; index < chatsArray.length; index++) {
                    var fullName;
                    if (isLawyer) {
                        const clientId = chatsArray[index].users.find(userId => userId !== user.id);
                        const clientResponse = await axios.get(`http://localhost:6005/client/find/${clientId}`);
                        fullName = `${clientResponse.data.client.firstName} ${clientResponse.data.client.lastName}`;
                    } else {
                        const lawyerId = chatsArray[index].users.find(userId => userId !== user.id);
                        const clientResponse = await axios.get(`http://localhost:6005/lawyer/find/${lawyerId}`);
                        fullName = `${clientResponse.data.lawyer.firstName} ${clientResponse.data.lawyer.lastName}`;
                    }


                    chatsArray[index] = { ...chatsArray[index], fullName };
                }
                setIsLoading(false);

                dispatch(initializeChats(chatsArray));
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [user.id, dispatch]);


    return (
        <div>
            <SmallNavBar />
            <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                <div className='big-chat-container'>
                    <div className='chats-container'>
                        <span className='chat-title'>My Chats</span>
                        {chats &&
                            chats.map((e, index) => {
                                return <div className='chat-container' onClick={() => {
                                    

setOtherUserId(e.users.find(userId => userId !== user.id))
                                    dispatch(selectChat(e.id));
                                    setIsLoading(true);

                                    axios.get(`http://localhost:6005/message/${e.id}`).then((response) => {
                                        socket.emit("join chat",selectedChatId)

                                        dispatch(initializeMessages(response.data))
                                        setIsLoading(false);

                                    })

                                }}>
                                    <p><span >{e.fullName}:</span> Message content</p>

                                </div>
                            })
                        }

                    </div>
                    <div className='singlechat-container'>
                        {
                            isLoading ? <Spinner animation="border" role="status" style={{ color: "var(--main-color)" }}>
                                <span className="visually-hidden">Loading...</span>
                            </Spinner> :
                                selectedChatId === 0 ? (<div style={{ display: "flex", justifyContent: "center", alignItems: "center", color: "var(--main-color)", height: "100%", fontSize: "50px" }}>Select chat please</div>) :
                                    (<div className='main-messages-container'>
                                        <div className='messages-content'>
                                            {messages &&
                                                messages.map((e, index) => {
                                                    if (e.senderId === user.id) {
                                                        return (<div style={{ width: "100%", paddingBottom: 10, display: "flex", justifyContent: "end" }}>
                                                            <div className='sent-message'>
                                                                {e.content}
                                                            </div>
                                                        </div>);
                                                    } else {
                                                        return (<div style={{ width: "100%", paddingBottom: 10, display: "flex", justifyContent: "start" }}>
                                                            <div className='received-message'>
                                                                {e.content}
                                                            </div>
                                                        </div>)
                                                    }
                                                })
                                            }




                                        </div>
                                        {isTyping&&<div style={{background:'red'}}>typing </div>}

                                        <div className='sending-message'>

                                            <div className='input-container'>
                                                <textarea className='input-style' placeholder='' ref={inputRef} onChange={(e)=>{
                                                    setMessageContent(e.target.value)
                                                    console.log("othe ruse id is ");
                                                    console.log(otherUserId);
                                                    if(!typing){
                                                        setTyping(true);
                                                        socket.emit("typing",otherUserId)
                                                    }

                                                    let lastTypingTime=new Date().getTime();
                                                    var timerLength=3000;
                                                    setTimeout(()=>{
                                                        var timeNow=new Date().getTime();
                                                        var timeDiff=timeNow-lastTypingTime;
                                                        if(timeDiff>=timerLength && typing){
                                                            socket.emit("stop typing",otherUserId)
                                                            setTyping(false)
                                                        }
                                                    },timerLength)
                                                }} onKeyDown={(e) => {
                                                    if (e.key === "Enter") {
                                                        e.preventDefault();
                                                        socket.emit("stop typing",otherUserId)
                                                        var messageContent = inputRef.current.value;
                                                        axios.post("http://localhost:6005/message/send", {
                                                            senderId: user.id,
                                                            chatId: selectedChatId,
                                                            content: messageContent
                                                        }).then((response) => {
                                                            socket.emit("new message",response.data.message)
                                                            dispatch(sendMessage(response.data.message));
                                                            inputRef.current.value = "";

                                                        })

                                                    }
                                                }}></textarea>                                    </div>
                                            <div className='sending-button' onClick={() => {
                                                var messageContent = inputRef.current.value;
                                                axios.post("http://localhost:6005/message/send", {
                                                    senderId: user.id,
                                                    chatId: selectedChatId,
                                                    content: messageContent
                                                }).then((response) => {
                                                    socket.emit("new message",response.data.message)
                                                    dispatch(sendMessage(response.data.message));
                                                    inputRef.current.value = "";

                                                })

                                            }}>
                                                <FontAwesomeIcon style={{ color: 'white', fontSize: '20px', cursor: "pointer", paddingRight: 10 }} icon={faPaperPlane} /> Send
                                            </div>
                                        </div>

                                    </div>)
                        }
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default Message;