import React, { useEffect, useRef } from 'react';
import "./Message.css"
import SmallNavBar from '../../components/smallnavigationbar/SmallNavBar';
import Footer from '../../components/footer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { initializeChats, selectChat, sendMessage } from '../../../features/Message';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
function Message(props) {
    const user = useSelector((state) => state.authentificateStore.user)
    const chats = useSelector((state) => state.messageStore.chats)
    const selectedChatId = useSelector((state) => state.messageStore.selectedChatId)
    const messages = useSelector((state) => state.messageStore.messages)
    const dispatch = useDispatch();
    const inputRef=useRef();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post("http://localhost:6005/chat/all", {
                    userId: user.id
                });

                const chatsArray = response.data.chats;

                for (let index = 0; index < chatsArray.length; index++) {
                    const clientId = chatsArray[index].users.find(userId => userId !== user.id);

                    const clientResponse = await axios.post(`http://localhost:6005/client/find/${clientId}`);
                    const fullName = `${clientResponse.data.client.firstName} ${clientResponse.data.client.lastName}`;
                    console.log(fullName);

                    chatsArray[index] = { ...chatsArray[index], fullName };
                }

                console.log(chatsArray);
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
            <div style={{ width: "100%", display: "flex", justifyContent: "center" }}> <div className='big-chat-container'>
                <div className='chats-container'>
                    <span className='chat-title'>My Chats</span>
                    {chats &&
                        chats.map((e, index) => {
                            return <div className='chat-container' onClick={() => {
                                dispatch(selectChat(e.id));
                            }}>
                                <p><span >{e.fullName}:</span> Message content</p>

                            </div>
                        })
                    }

                </div>
                <div className='singlechat-container'>
                    {
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
                                <div className='sending-message'>
                                    <div className='input-container'>
                                        <textarea className='input-style' placeholder='' ref={inputRef}></textarea>                                    </div>
                                    <div className='sending-button' onClick={()=>{
                                        var messageContent=inputRef.current.value;
                                        dispatch(sendMessage({content:messageContent,senderId:user.id}))
                                    }}>
                                        <FontAwesomeIcon style={{ color: 'white', fontSize: '20px', cursor: "pointer", paddingRight: 10 }} icon={faPaperPlane} /> Send
                                    </div>
                                </div>

                            </div>)
                    }
                </div>
            </div></div>

            <Footer />
        </div>
    );
}

export default Message;