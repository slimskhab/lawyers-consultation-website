import React, { useEffect, useRef, useState } from 'react';
import "./Message.css"
import SmallNavBar from '../../components/smallnavigationbar/SmallNavBar';
import Footer from '../../components/footer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { initializeChats, initializeMessages, removeMessage, selectChat, sendMessage } from '../../../features/Message';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Spinner from 'react-bootstrap/Spinner';
import Lottie from 'react-lottie';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { io } from 'socket.io-client';
import animationData from "../../../animations/typing.json";
import ScrollableFeed from 'react-scrollable-feed';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { useToast } from '@chakra-ui/react';
import { useNavigate } from "react-router-dom"
const ENDPOINT = "http://localhost:6005"
var socket;
function Message(props) {
    const user = useSelector((state) => state.authentificateStore.user)
    const chats = useSelector((state) => state.messageStore.chats)
    const selectedChat = useSelector((state) => state.messageStore.selectedChat)
    const messages = useSelector((state) => state.messageStore.messages)
    const isLawyer = useSelector((state) => state.authentificateStore.isLawyer)
    const isLoggedIn = useSelector((state) => state.authentificateStore.isLoggedIn);
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const inputRef = useRef();
    const [isLoading, setIsLoading] = useState(false);
    const [typing, setTyping] = useState(false);
    const [otherUserId, setOtherUserId] = useState();
    const [otherUser, setOtherUser] = useState();
    const toast = useToast();
    const [isTyping, setIsTyping] = useState(false);
    const [messageContent, setMessageContent] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [nextDate, setNextDate] = useState(new Date());
    const feeRef = useRef();
    const signatureRef = useRef();


    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    useEffect(() => {

        if (!isLoggedIn) {
            navigate('/login');
        }
    }, [isLoggedIn]);

    useEffect(() => {
        socket = io(ENDPOINT);
        socket.emit("setup", user);
        const handleMessageReceived = (newMessage) => {
            dispatch(removeMessage(newMessage.id))
            dispatch(sendMessage(newMessage));
        };

        socket.on("connected", () => { }
        )
        socket.on("message received", handleMessageReceived)
        socket.on("typing", () => {
            setIsTyping(true)
        })
        socket.on("stop typing", () => {
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

    const handleContract = () => {
        var messageData = {
            isContract: true,
            senderId: user.id,
            contractStatus: 0,
            content: "Sent a contract",
            chatId: selectedChat.id
        }
        axios.post("http://localhost:6005/message/send", messageData).then((response) => {
            socket.emit("new message", response.data.message)
            dispatch(sendMessage(response.data.message));
        }).catch((e) => {
            console.log(e);
        })
    }
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
                                    var id = e.users.find(userId => userId !== user.id)
                                    setOtherUserId(id);

                                    if (!isLawyer) {
                                        axios.get(`http://localhost:6005/lawyer/${id}`).then((res) => {
                                            setOtherUser(res.data.lawyer);

                                        }).catch((e) => {
                                            console.log(e);
                                        })
                                    }
                                    dispatch(selectChat(e));
                                    setIsLoading(true);

                                    axios.get(`http://localhost:6005/message/${e.id}`).then((response) => {
                                        socket.emit("join chat", selectedChat.id)

                                        dispatch(initializeMessages(response.data))
                                        setIsLoading(false);

                                    })

                                }}>
                                    <p><span >{e.fullName}:</span> {e.latestMessage}</p>

                                </div>
                            })
                        }

                    </div>
                    <div className='singlechat-container'>
                        {
                            isLoading ? <Spinner animation="border" role="status" style={{ color: "var(--main-color)" }}>
                                <span className="visually-hidden">Loading...</span>
                            </Spinner> :
                                selectedChat.id === 0 ? (<div style={{ display: "flex", justifyContent: "center", alignItems: "center", color: "var(--main-color)", height: "100%", fontSize: "50px" }}>Select chat please</div>) :
                                    (<div className='main-messages-container'>
                                        <div className='current-chat'>
                                            <div className='d-flex'>{selectedChat.fullName}
                                                <div className='online-dot'></div>
                                            </div>
                                            {
                                                isLawyer &&<div className='d-flex'>
                                                    <div className='send-contract-button' onClick={handleContract} style={{marginRight:10}}>
                                                    Finish contract
                                                </div>
                                                     <div className='send-contract-button' onClick={handleContract}>
                                                    Send contract
                                                </div>
                                                </div>
                                            }
                                            


                                        </div>
                                        <ScrollableFeed className='scroll'>
                                            {messages &&
                                                messages.map((e, index, array) => {

                                                    if (e.senderId === user.id) {
                                                        if (e.isContract) {
                                                            if (e.contractStatus === 0) {
                                                                return (<div style={{ width: "100%", paddingBottom: 10, display: "flex", flexDirection: "column", alignItems: "end", justifyContent: "end" }}>
                                                                    <div className='contract-block'>
                                                                        <div className='d-flex' style={{ justifyContent: "space-between", paddingTop: "10px" }}>

                                                                            <div>
                                                                                <div style={{ display: "flex", flexDirection: "column" }}>
                                                                                    <span style={{ textAlign: "start" }}>Fee</span>
                                                                                    <input className='contract-input' ref={feeRef}></input>

                                                                                </div>
                                                                                <div style={{ display: "flex", flexDirection: "column" }}>
                                                                                    <span style={{ textAlign: "start" }}>Start date</span>
                                                                                    <div style={{ borderRadius: 20, background: "red" }}>
                                                                                        <DatePicker selected={startDate} onChange={(date) => {

                                                                                            var tomorrow = new Date();
                                                                                            tomorrow.setDate(date.getDate() + 1);
                                                                                            console.log(tomorrow);
                                                                                            setNextDate(tomorrow)
                                                                                            setStartDate(date)
                                                                                        }} minDate={new Date()} />
                                                                                    </div>

                                                                                </div>
                                                                                <div style={{ display: "flex", flexDirection: "column" }}>
                                                                                    <span style={{ textAlign: "start" }}>End Date</span>
                                                                                    <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} minDate={nextDate} />

                                                                                </div>
                                                                            </div>
                                                                            <div style={{ display: "flex", flexDirection: "column" }}>
                                                                                <span style={{ textAlign: "start" }}>Signature</span>
                                                                                <input className='contract-input' ref={signatureRef}></input>
                                                                                <span style={{ fontSize: 12, textAlign: "start" }}>Write your full name</span>
                                                                            </div>

                                                                        </div>
                                                                        <div style={{ display: "flex", justifyContent: "end" }}>
                                                                            <div style={{ background: "white", borderRadius: "10px", width: "min-content", color: "green", padding: "5px 20px 5px 20px", margin: 10, cursor: "pointer" }} onClick={() => {
                                                                                var fullName = `${user.firstName} ${user.lastName}`;
                                                                                if (signatureRef.current.value === fullName) {
                                                                                    var requestData = {
                                                                                        messageId: e.id,
                                                                                        contractStatus: 1,
                                                                                        contractStartDate: startDate,
                                                                                        contractEndDate: endDate,
                                                                                        contractFee: feeRef.current.value
                                                                                    }

                                                                                    axios.post("http://localhost:6005/message/update", requestData).then((response) => {
                                                                                        dispatch(removeMessage(e.id))
                                                                                        socket.emit("new message", response.data.message)
                                                                                        dispatch(sendMessage(response.data.message));
                                                                                        inputRef.current.value = "";
                                                                                        toast({
                                                                                            title: "Sent contract!",
                                                                                            status: "success",
                                                                                            duration: 5000,
                                                                                            isClosable: true,
                                                                                            position: "bottom",
                                                                                        });
                                                                                    }).catch((e) => {
                                                                                        console.log(e);
                                                                                    })
                                                                                } else {
                                                                                    toast({
                                                                                        title: "Wrong signature!",
                                                                                        status: "error",
                                                                                        duration: 5000,
                                                                                        isClosable: true,
                                                                                        position: "bottom",
                                                                                    });
                                                                                }


                                                                            }}>
                                                                                Submit
                                                                            </div>
                                                                        </div>



                                                                    </div>

                                                                </div>);
                                                            } else if (e.contractStatus === 1) {
                                                                return (<div style={{ width: "100%", paddingBottom: 10, display: "flex", flexDirection: "column", alignItems: "end", justifyContent: "end" }}>
                                                                    <div className='contract-block'>
                                                                        <div className='d-flex' style={{ justifyContent: "space-between", }}>

                                                                            <div>
                                                                                <div style={{ display: "flex", flexDirection: "column" }}>
                                                                                    <span style={{ textAlign: "start" }}>Fee</span>
                                                                                    <span style={{ textAlign: "start" }}>{e.contractFee}</span>

                                                                                </div>
                                                                                <div style={{ display: "flex", flexDirection: "column" }}>
                                                                                    <span style={{ textAlign: "start" }}>Start date</span>
                                                                                    <span style={{ textAlign: "start" }}>{e.contractStartDate}</span>


                                                                                </div>
                                                                                <div style={{ display: "flex", flexDirection: "column" }}>
                                                                                    <span style={{ textAlign: "start" }}>End Date</span>
                                                                                    <span style={{ textAlign: "start" }}>{e.contractEndDate}</span>

                                                                                </div>
                                                                            </div>
                                                                            <div style={{ display: "flex", flexDirection: "column" }}>
                                                                                <span style={{ textAlign: "start" }}>Waiting for client approval</span>

                                                                            </div>

                                                                        </div>




                                                                    </div>

                                                                </div>);
                                                            } else if (e.contractStatus === 2) {
                                                                return (<div style={{ width: "100%", paddingBottom: 10, display: "flex", flexDirection: "column", alignItems: "end", justifyContent: "end" }}>
                                                                    <div className='contract-block'>
                                                                        <div className='d-flex' style={{ justifyContent: "space-between", }}>

                                                                            <div>
                                                                                <div style={{ display: "flex", flexDirection: "column" }}>
                                                                                    <span style={{ textAlign: "start" }}>Fee</span>
                                                                                    <span style={{ textAlign: "start" }}>{e.contractFee}</span>

                                                                                </div>
                                                                                <div style={{ display: "flex", flexDirection: "column" }}>
                                                                                    <span style={{ textAlign: "start" }}>Start date</span>
                                                                                    <span style={{ textAlign: "start" }}>{e.contractStartDate}</span>


                                                                                </div>
                                                                                <div style={{ display: "flex", flexDirection: "column" }}>
                                                                                    <span style={{ textAlign: "start" }}>End Date</span>
                                                                                    <span style={{ textAlign: "start" }}>{e.contractEndDate}</span>

                                                                                </div>
                                                                            </div>
                                                                            <div style={{ display: "flex", flexDirection: "column" }}>
                                                                                <span style={{ textAlign: "start" }}>Approved by client</span>
                                                                            </div>

                                                                        </div>




                                                                    </div>

                                                                </div>);
                                                            }
                                                        }
                                                        else {
                                                            return (<div style={{ width: "100%", paddingBottom: 10, display: "flex", justifyContent: "end" }}>
                                                                <div className='sent-message'>
                                                                    {e.content}
                                                                </div>
                                                            </div>);
                                                        }

                                                    } else {
                                                        if (e.isContract) {
                                                            if (e.contractStatus === 1) {
                                                                return (<div style={{ width: "100%", paddingBottom: 10, display: "flex", flexDirection: "column", alignItems: "start", justifyContent: "end" }}>
                                                                    <div className='contract-block'>
                                                                        <div className='d-flex' style={{ justifyContent: "space-between", paddingTop: "10px" }}>

                                                                            <div>
                                                                                <div style={{ display: "flex", flexDirection: "column" }}>
                                                                                    <span style={{ textAlign: "start" }}>Fee</span>
                                                                                    <span style={{ textAlign: "start" }}>{e.contractFee} TND</span>

                                                                                </div>
                                                                                <div style={{ display: "flex", flexDirection: "column" }}>
                                                                                    <span style={{ textAlign: "start" }}>Start date</span>
                                                                                    <span style={{ textAlign: "start" }}>{e.contractStartDate}</span>

                                                                                </div>
                                                                                <div style={{ display: "flex", flexDirection: "column" }}>
                                                                                    <span style={{ textAlign: "start" }}>End Date</span>
                                                                                    <span style={{ textAlign: "start" }}>{e.contractEndDate}</span>

                                                                                </div>
                                                                            </div>
                                                                            <div style={{ display: "flex", flexDirection: "column" }}>
                                                                                <span style={{ textAlign: "start" }}>Signature</span>
                                                                                <input className='contract-input' ref={signatureRef}></input>
                                                                                <span style={{ fontSize: 12, textAlign: "start" }}>Write your full name</span>
                                                                            </div>

                                                                        </div>
                                                                        <div style={{ display: "flex", justifyContent: "end" }}>
                                                                            <div style={{ background: "white", borderRadius: "10px", width: "min-content", color: "green", padding: "5px 20px 5px 20px", margin: 10, cursor: "pointer" }} onClick={() => {
                                                                                var fullName = `${user.firstName} ${user.lastName}`;
                                                                                if (signatureRef.current.value === fullName) {
                                                                                    axios.post("http://localhost:6005/message/update", {
                                                                                        messageId: e.id,
                                                                                        contractStatus: 2
                                                                                    }).then((response) => {
                                                                                        socket.emit("new message", { ...response.data.message, senderId: user.id });
                                                                                        dispatch(removeMessage(e.id))

                                                                                        dispatch(sendMessage(response.data.message))
                                                                                        toast({
                                                                                            title: "Accepted contract!",
                                                                                            status: "success",
                                                                                            duration: 5000,
                                                                                            isClosable: true,
                                                                                            position: "bottom",
                                                                                        });
                                                                                    }).catch((e) => {
                                                                                        console.log(e);
                                                                                    })
                                                                                } else {
                                                                                    toast({
                                                                                        title: "Wrong signature!",
                                                                                        status: "error",
                                                                                        duration: 5000,
                                                                                        isClosable: true,
                                                                                        position: "bottom",
                                                                                    });
                                                                                }


                                                                            }}>
                                                                                Accept
                                                                            </div>
                                                                        </div>



                                                                    </div>

                                                                </div>);
                                                            } else if (e.contractStatus === 2) {
                                                                return (<div style={{ width: "100%", paddingBottom: 10, display: "flex", flexDirection: "column", alignItems: "start", justifyContent: "end" }}>
                                                                    <div className='contract-block'>
                                                                        <div className='d-flex' style={{ justifyContent: "space-between", paddingTop: "10px" }}>

                                                                            <div>
                                                                                <div style={{ display: "flex", flexDirection: "column" }}>
                                                                                    <span style={{ textAlign: "start" }}>Fee</span>
                                                                                    <span style={{ textAlign: "start" }}>{e.contractFee} TND</span>

                                                                                </div>
                                                                                <div style={{ display: "flex", flexDirection: "column" }}>
                                                                                    <span style={{ textAlign: "start" }}>Start date</span>
                                                                                    <span style={{ textAlign: "start" }}>{e.contractStartDate}</span>

                                                                                </div>
                                                                                <div style={{ display: "flex", flexDirection: "column" }}>
                                                                                    <span style={{ textAlign: "start" }}>End Date</span>
                                                                                    <span style={{ textAlign: "start" }}>{e.contractEndDate}</span>

                                                                                </div>
                                                                            </div>
                                                                            <div style={{ display: "flex", flexDirection: "column" }}>
                                                                                <span style={{ textAlign: "start" }}>Accepted By Client</span>
                                                                            </div>

                                                                        </div>




                                                                    </div>

                                                                </div>);
                                                            }

                                                        } else {

                                                            return (<div style={{ width: "100%", paddingBottom: 10, display: "flex", justifyContent: "start", alignItems: "center" }}>
                                                                {


                                                                    array[index + 1] ?

                                                                        array[index + 1].senderId === user.id ?

                                                                            !isLawyer && <img src={otherUser?.profilePic || "./user.png"}
                                                                                style={{ height: 40, width: 40, borderRadius: 40, marginRight: 10 }}>

                                                                            </img> : (!isLawyer) ? <div style={{ width: 50 }}></div> : <div></div>
                                                                        :

                                                                        !isLawyer && <img src={otherUser?.profilePic || "./user.png"}
                                                                            style={{ height: 40, width: 40, borderRadius: 40, marginRight: 10 }}>

                                                                        </img>
                                                                }
                                                                <div className='received-message'>
                                                                    {e.content}{isLawyer}
                                                                </div>
                                                            </div>)
                                                        }

                                                    }
                                                })
                                            }
                                        </ScrollableFeed>




                                        {isTyping &&
                                            <div style={{ width: "min-content", }}><Lottie
                                                options={defaultOptions}
                                                width={50}
                                                style={{ marginBottom: 15, marginLeft: 0, color: "grey" }}
                                            /></div>}

                                        <div className='sending-message'>

                                            <div className='input-container'>
                                                <textarea className='input-style' placeholder='' ref={inputRef} onChange={(e) => {
                                                    setMessageContent(e.target.value)

                                                    if (!typing) {
                                                        setTyping(true);
                                                        socket.emit("typing", otherUserId)
                                                    }

                                                    let lastTypingTime = new Date().getTime();
                                                    var timerLength = 3000;
                                                    setTimeout(() => {
                                                        var timeNow = new Date().getTime();
                                                        var timeDiff = timeNow - lastTypingTime;
                                                        if (timeDiff >= timerLength && typing) {
                                                            socket.emit("stop typing", otherUserId)
                                                            setTyping(false)
                                                        }
                                                    }, timerLength)
                                                }} onKeyDown={(e) => {
                                                    if (e.key === "Enter") {
                                                        e.preventDefault();
                                                        socket.emit("stop typing", otherUserId)
                                                        var messageContent = inputRef.current.value;
                                                        axios.post("http://localhost:6005/message/send", {
                                                            senderId: user.id,
                                                            chatId: selectedChat.id,
                                                            content: messageContent
                                                        }).then((response) => {
                                                            socket.emit("new message", response.data.message)
                                                            dispatch(sendMessage(response.data.message));
                                                            inputRef.current.value = "";

                                                        })

                                                    }
                                                }}></textarea>                                    </div>
                                            <div className='sending-button' onClick={() => {
                                                var messageContent = inputRef.current.value;
                                                axios.post("http://localhost:6005/message/send", {
                                                    senderId: user.id,
                                                    chatId: selectedChat.id,
                                                    content: messageContent
                                                }).then((response) => {
                                                    socket.emit("new message", response.data.message)
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