import React, { useEffect, useRef, useState } from 'react';
import "./Message.css"
import SmallNavBar from '../../components/smallnavigationbar/SmallNavBar';
import Footer from '../../components/footer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { initContracts, initThisContract, initializeChats, initializeMessages, removeMessage, selectChat, sendMessage } from '../../../features/Message';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Spinner from 'react-bootstrap/Spinner';
import Lottie from 'react-lottie';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { io } from 'socket.io-client';
import animationData from "../../../animations/typing.json";
import ScrollableFeed from 'react-scrollable-feed';
import DatePicker from "react-datepicker";
import { FaStar } from "react-icons/fa";

import "react-datepicker/dist/react-datepicker.css";
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, Select, useDisclosure, useToast } from '@chakra-ui/react';
import { useNavigate } from "react-router-dom"
const ENDPOINT = process.env.REACT_APP_HOSTURL
var socket;

function Message(props) {
    const commentRef = useRef();
    const user = useSelector((state) => state.authentificateStore.user)
    const chats = useSelector((state) => state.messageStore.chats)
    const selectedChat = useSelector((state) => state.messageStore.selectedChat)
    const messages = useSelector((state) => state.messageStore.messages)
    const isLawyer = useSelector((state) => state.authentificateStore.isLawyer)
    const isLoggedIn = useSelector((state) => state.authentificateStore.isLoggedIn);
    const contracts = useSelector((state) => state.messageStore.contracts);
    const contract = useSelector((state) => state.messageStore.thisContract);

    const navigate = useNavigate()
    const dispatch = useDispatch();
    const inputRef = useRef();
    const [isLoading, setIsLoading] = useState(false);
    const [typing, setTyping] = useState(false);
    const [otherUserId, setOtherUserId] = useState();
    const [otherUser, setOtherUser] = useState();
    const toast = useToast();
    const [isTyping, setIsTyping] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [nextDate, setNextDate] = useState(new Date());

    const feeRef = useRef();
    const signatureRef = useRef();

    const { isOpen, onOpen, onClose } = useDisclosure()

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


    function formatDate(isoDate) {
        const date = new Date(isoDate);
        const formattedDate = date.toLocaleDateString(); // Format date as 'MM/DD/YYYY'
        const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Format time as 'HH:MM'
        return `${formattedDate} ${formattedTime}`;
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const response = await axios.post(`${process.env.REACT_APP_HOSTURL}/chat/all`, {
                    userId: user.id
                });
                const chatsArray = response.data.chats;

                for (let index = 0; index < chatsArray.length; index++) {
                    var fullName;
                    if (isLawyer) {
                        const clientId = chatsArray[index].users.find(userId => userId !== user.id);
                        const clientResponse = await axios.get(`${process.env.REACT_APP_HOSTURL}/client/find/${clientId}`);
                        fullName = `${clientResponse.data.client.firstName} ${clientResponse.data.client.lastName}`;
                    } else {
                        const lawyerId = chatsArray[index].users.find(userId => userId !== user.id);
                        const clientResponse = await axios.get(`${process.env.REACT_APP_HOSTURL}/lawyer/find/${lawyerId}`);
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
    const [currentValue, setCurrentValue] = useState(0);
    const [hoverValue, setHoverValue] = useState(undefined);
    const stars = Array(5).fill(0)

    const handleClick = value => {
        setCurrentValue(value)
    }

    const handleMouseOver = newHoverValue => {
        setHoverValue(newHoverValue)
    };

    const handleMouseLeave = () => {
        setHoverValue(undefined)
    }
    const handleContract = () => {
        var messageData = {
            isContract: true,
            senderId: user.id,
            contractStatus: 0,
            content: "Sent a contract",
            chatId: selectedChat.id
        }
        axios.post(`${process.env.REACT_APP_HOSTURL}/message/send`, messageData).then((response) => {
            socket.emit("new message", response.data.message)
            dispatch(sendMessage(response.data.message));
            onClose();
        }).catch((e) => {
            console.log(e);
        })
    }

    const handleContractFinish = () => {
        var requestData = {
            messageId: contract.id,
            contractStatus: 3
        }
        axios.post(`${process.env.REACT_APP_HOSTURL}/message/update`, requestData).then((response) => {
            dispatch(removeMessage(contract.id))
            socket.emit("new message", response.data.message)
            dispatch(sendMessage(response.data.message));
            inputRef.current.value = "";
            onClose();
            toast({
                title: "Sent finish contract request!",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
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
                                        axios.get(`${process.env.REACT_APP_HOSTURL}/lawyer/${id}`).then((res) => {
                                            setOtherUser(res.data.lawyer);

                                        }).catch((e) => {
                                            console.log(e);
                                        })
                                    }
                                    dispatch(selectChat(e));

                                    axios.get(`${process.env.REACT_APP_HOSTURL}/message/contract/${selectedChat.id}`).then((res) => {
                                        dispatch(initContracts(res.data.contracts))
                                    })
                                    setIsLoading(true);

                                    axios.get(`${process.env.REACT_APP_HOSTURL}/message/${e.id}`).then((response) => {
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
                                                isLawyer && <div className='d-flex'>
                                                    {
                                                        contracts.length >= 1 && <Button colorScheme='green' onClick={() => {
                                                            axios.get(`${process.env.REACT_APP_HOSTURL}/message/contract/${selectedChat.id}`).then((res) => {
                                                                dispatch(initContracts(res.data.contracts));
                                                                onOpen()

                                                            })
                                                        }} style={{ marginRight: 10 }}>
                                                            Finish contract
                                                        </Button>
                                                    }

                                                    <Button colorScheme='green' onClick={handleContract}>
                                                        Send contract
                                                    </Button>
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
                                                                                    <div style={{ borderRadius: 10, }}>
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
                                                                            <Button colorScheme='teal' variant='outline' onClick={() => {
                                                                                var fullName = `${user.firstName} ${user.lastName}`;
                                                                                if (signatureRef.current.value === fullName) {
                                                                                    var requestData = {
                                                                                        messageId: e.id,
                                                                                        contractStatus: 1,
                                                                                        contractStartDate: startDate,
                                                                                        contractEndDate: endDate,
                                                                                        contractFee: feeRef.current.value
                                                                                    }

                                                                                    axios.post(`${process.env.REACT_APP_HOSTURL}/message/update`, requestData).then((response) => {
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
                                                                            </Button>
                                                                        </div>



                                                                    </div>

                                                                </div>);
                                                            } else if (e.contractStatus === 1) {
                                                                return (<div style={{ width: "100%", paddingBottom: 10, display: "flex", flexDirection: "column", alignItems: "end", justifyContent: "end" }}>
                                                                    <div className='contract-block'>
                                                                        <div className='d-flex' style={{ justifyContent: "space-between", }}>

                                                                            <div>
                                                                                <div style={{ display: "flex", flexDirection: "column" }}>
                                                                                    <span style={{ textAlign: "start" }}>Contract Id: #{e.id}</span>
                                                                                </div>
                                                                                <div style={{ display: "flex", flexDirection: "column" }}>
                                                                                    <span style={{ textAlign: "start" }}>Fee: {e.contractFee}</span>
                                                                                </div>
                                                                                <div style={{ display: "flex", flexDirection: "column" }}>
                                                                                    <span style={{ textAlign: "start" }}>Start date: {formatDate(e.contractStartDate)}</span>


                                                                                </div>
                                                                                <div style={{ display: "flex", flexDirection: "column" }}>
                                                                                    <span style={{ textAlign: "start" }}>End Date: {formatDate(e.contractEndDate)}</span>

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
                                                                                    <span style={{ textAlign: "start" }}>Contract ID: #{e.id}</span>

                                                                                </div>
                                                                                <div style={{ display: "flex", flexDirection: "column" }}>
                                                                                    <span style={{ textAlign: "start" }}>Fee: {e.contractFee} TND</span>

                                                                                </div>
                                                                                <div style={{ display: "flex", flexDirection: "column" }}>
                                                                                    <span style={{ textAlign: "start" }}>Start date: {formatDate(e.contractStartDate)}</span>
 

                                                                                </div>
                                                                                <div style={{ display: "flex", flexDirection: "column" }}>
                                                                                    <span style={{ textAlign: "start" }}>End Date: {formatDate(e.contractEndDate)}</span>

                                                                                </div>
                                                                            </div>
                                                                            <div style={{ display: "flex", flexDirection: "column" }}>
                                                                                <span style={{ textAlign: "start" }}>Approved by client</span>
                                                                            </div>

                                                                        </div>




                                                                    </div>

                                                                </div>);
                                                            } else if (e.contractStatus === 3) {
                                                                return (<div style={{ width: "100%", paddingBottom: 10, display: "flex", flexDirection: "column", alignItems: "end", justifyContent: "end" }}>
                                                                    <div className='contract-block' style={{ border: "2px red solid" }}>
                                                                        <div className='d-flex' style={{ justifyContent: "space-between", }}>

                                                                            <div>
                                                                                <div style={{ display: "flex", flexDirection: "column" }}>
                                                                                    <span style={{ textAlign: "start" }}>Contract ID: #{e.id}</span>

                                                                                </div>
                                                                                <div style={{ display: "flex", flexDirection: "column" }}>
                                                                                    <span style={{ textAlign: "start" }}>Fee: {e.contractFee}</span>

                                                                                </div>
                                                                                <div style={{ display: "flex", flexDirection: "column" }}>
                                                                                    <span style={{ textAlign: "start" }}>Start date: {formatDate(e.contractStartDate)}</span>

                                                                                </div>
                                                                                <div style={{ display: "flex", flexDirection: "column" }}>
                                                                                    <span style={{ textAlign: "start" }}>End Date: {formatDate(e.contractEndDate)}</span>
                                                                                </div>
                                                                            </div>
                                                                            <div style={{ display: "flex", flexDirection: "column" }}>
                                                                                <span style={{ textAlign: "start" }}>Waiting for client approval to finish contract</span>
                                                                            </div>
                                                                        </div>




                                                                    </div>

                                                                </div>);
                                                            } else if (e.contractStatus === 4) {
                                                                return (<div style={{ width: "100%", paddingBottom: 10, display: "flex", flexDirection: "column", alignItems: "end", justifyContent: "end" }}>
                                                                    <div className='contract-block' style={{ border: "2px red solid" }}>
                                                                        <div className='d-flex' style={{ justifyContent: "space-between", }}>

                                                                            <div>
                                                                                <div style={{ display: "flex", flexDirection: "column" }}>
                                                                                    <span style={{ textAlign: "start" }}>Contract ID: #{e.id}</span>

                                                                                </div>
                                                                                <div style={{ display: "flex", flexDirection: "column" }}>
                                                                                    <span style={{ textAlign: "start" }}>Fee: {e.contractFee}</span>

                                                                                </div>
                                                                                <div style={{ display: "flex", flexDirection: "column" }}>
                                                                                    <span style={{ textAlign: "start" }}>Start date: {formatDate(e.contractStartDate)}</span>

                                                                                </div>
                                                                                <div style={{ display: "flex", flexDirection: "column" }}>
                                                                                    <span style={{ textAlign: "start" }}>End Date: {formatDate(e.contractEndDate)}</span>
                                                                                </div>
                                                                            </div>
                                                                            <div style={{ display: "flex", flexDirection: "column" }}>
                                                                                <span style={{ textAlign: "start" }}>Contract Finished</span>
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
                                                                                    <span style={{ textAlign: "start" }}>Contract ID: #{e.id}</span>
                                                                                </div>
                                                                                <div style={{ display: "flex", flexDirection: "column" }}>
                                                                                    <span style={{ textAlign: "start" }}>Fee: {e.contractFee} TND</span>
                                                                                </div>
                                                                                <div style={{ display: "flex", flexDirection: "column" }}>
                                                                                    <span style={{ textAlign: "start" }}>Start date: {formatDate(e.contractStartDate)}</span>


                                                                                </div>
                                                                                <div style={{ display: "flex", flexDirection: "column" }}>
                                                                                    <span style={{ textAlign: "start" }}>End Date: {formatDate(e.contractEndDate)}</span>
                                                                                    <span style={{ textAlign: "start" }}></span>

                                                                                </div>
                                                                            </div>
                                                                            <div style={{ display: "flex", flexDirection: "column" }}>
                                                                                <span style={{ textAlign: "start" }}>Signature</span>
                                                                                <input className='contract-input' ref={signatureRef}></input>
                                                                                <span style={{ fontSize: 12, textAlign: "start" }}>Write your full name</span>
                                                                            </div>

                                                                        </div>
                                                                        <div style={{ display: "flex", justifyContent: "end" }}>
                                                                            <Button colorScheme='teal' variant='outline' onClick={() => {
                                                                                var fullName = `${user.firstName} ${user.lastName}`;
                                                                                if (signatureRef.current.value === fullName) {
                                                                                    axios.get(`${process.env.REACT_APP_HOSTURL}/client/find/${user.id}`).then((res) => {
                                                                                        if (res.data.client.funds >= e.contractFee) {
                                                                                            axios.put(`${process.env.REACT_APP_HOSTURL}/client/update`, {
                                                                                                userId: user.id,
                                                                                                funds: res.data.client.funds - e.contractFee
                                                                                            }).then((res) => {

                                                                                                axios.post(`${process.env.REACT_APP_HOSTURL}/message/update`, {
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
                                                                                            })

                                                                                        } else {
                                                                                            toast({
                                                                                                title: "Not enough funds!",
                                                                                                status: "error",
                                                                                                duration: 5000,
                                                                                                isClosable: true,
                                                                                                position: "bottom",
                                                                                            });
                                                                                        }
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
                                                                            </Button>
                                                                        </div>



                                                                    </div>

                                                                </div>);
                                                            } else if (e.contractStatus === 2) {
                                                                return (<div style={{ width: "100%", paddingBottom: 10, display: "flex", flexDirection: "column", alignItems: "start", justifyContent: "end" }}>
                                                                    <div className='contract-block'>
                                                                        <div className='d-flex' style={{ justifyContent: "space-between", paddingTop: "10px" }}>

                                                                            <div>
                                                                                <div style={{ display: "flex", flexDirection: "column" }}>
                                                                                    <span style={{ textAlign: "start" }}>Contract ID: #{e.id}</span>

                                                                                </div>
                                                                                <div style={{ display: "flex", flexDirection: "column" }}>
                                                                                    <span style={{ textAlign: "start" }}>Fee: {e.contractFee} TND</span>

                                                                                </div>
                                                                                <div style={{ display: "flex", flexDirection: "column" }}>
                                                                                    <span style={{ textAlign: "start" }}>Start date: {formatDate(e.contractStartDate)}</span>

                                                                                </div>
                                                                                <div style={{ display: "flex", flexDirection: "column" }}>
                                                                                    <span style={{ textAlign: "start" }}>End Date: {formatDate(e.contractEndDate)}</span>

                                                                                </div>
                                                                            </div>
                                                                            <div style={{ display: "flex", flexDirection: "column" }}>
                                                                                <span style={{ textAlign: "start" }}>Accepted By Client</span>
                                                                            </div>

                                                                        </div>




                                                                    </div>

                                                                </div>);
                                                            } else if (e.contractStatus === 3) {
                                                                return (<div style={{ width: "100%", paddingBottom: 10, display: "flex", flexDirection: "column", alignItems: "start", justifyContent: "end" }}>
                                                                    <div className='contract-block' style={{ border: "2px red solid" }}>
                                                                        <div className='d-flex' style={{ justifyContent: "space-between", paddingTop: "10px", width: "100%" }}>

                                                                            <div>
                                                                                <div style={{ display: "flex", flexDirection: "column" }}>
                                                                                    <span style={{ textAlign: "start" }}>Contract ID: #{e.id}</span>

                                                                                </div>
                                                                                <div style={{ display: "flex", flexDirection: "column" }}>
                                                                                    <span style={{ textAlign: "start" }}>Fee: {e.contractFee}</span>

                                                                                </div>
                                                                                <div style={{ display: "flex", flexDirection: "column" }}>
                                                                                    <span style={{ textAlign: "start" }}>Start date: {formatDate(e.contractStartDate)}</span>

                                                                                </div>
                                                                                <div style={{ display: "flex", flexDirection: "column" }}>
                                                                                    <span style={{ textAlign: "start" }}>End Date: {formatDate(e.contractEndDate)}</span>
                                                                                </div>
                                                                            </div>
                                                                            <div>
                                                                                <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                                                                    <span style={{ textAlign: "start" }}>Review:</span>
                                                                                    <div style={{ display: "flex", flexDirection: "row", marginLeft: 10 }}>
                                                                                        {stars.map((_, index) => {
                                                                                            return (
                                                                                                <FaStar
                                                                                                    key={index}
                                                                                                    size={18}
                                                                                                    onClick={() => handleClick(index + 1)}
                                                                                                    onMouseOver={() => handleMouseOver(index + 1)}
                                                                                                    onMouseLeave={handleMouseLeave}
                                                                                                    color={(hoverValue || currentValue) > index ? "#FFBA5A" : "#a9a9a9"}
                                                                                                    style={{
                                                                                                        marginRight: 5,
                                                                                                        cursor: "pointer"
                                                                                                    }}
                                                                                                />
                                                                                            )
                                                                                        })}
                                                                                    </div>
                                                                                </div>
                                                                                <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                                                                    <span style={{ textAlign: "start" }}>Comment:</span>
                                                                                    <div className='comment-box'>
                                                                                        <textarea className='input-style' placeholder='' rows='5' style={{ resize: "none", fontSize: 18, borderRadius: 20 }} ref={commentRef}></textarea >

                                                                                    </div>
                                                                                </div>
                                                                            </div>

                                                                        </div>
                                                                        <br></br>
                                                                        <div style={{ display: "flex", justifyContent: "end" }}>
                                                                            <Button colorScheme='red' variant='outline' onClick={() => {
                                                                                axios.post(`${process.env.REACT_APP_HOSTURL}/message/update`, {
                                                                                    messageId: e.id,
                                                                                    contractStatus: 4
                                                                                }).then((response) => {
                                                                                    socket.emit("new message", { ...response.data.message, senderId: user.id });
                                                                                    dispatch(removeMessage(e.id))
                                                                                    dispatch(sendMessage(response.data.message))
                                                                                    axios.post(`${process.env.REACT_APP_HOSTURL}/review/add`, {
                                                                                            lawyerId: otherUserId,
                                                                                            clientId: user.id,
                                                                                            comment: commentRef.current.value,
                                                                                            stars: currentValue
                                                                                        }).then((res) => {
                                                                                            toast({
                                                                                                title: "Added review!",
                                                                                                status: "success",
                                                                                                duration: 5000,
                                                                                                isClosable: true,
                                                                                                position: "bottom",
                                                                                            });
                                                                                        })
                                                                                    axios.put(`${process.env.REACT_APP_HOSTURL}/lawyer/funds/${otherUserId}`, {
                                                                                        funds: response.data.message.contractFee
                                                                                    }).then((res) => {
                                                                                        toast({
                                                                                            title: "Finished contract!",
                                                                                            status: "success",
                                                                                            duration: 5000,
                                                                                            isClosable: true,
                                                                                            position: "bottom",
                                                                                        });
                                                                                    }).catch((e) => {
                                                                                        toast({
                                                                                            title: "Server error!",
                                                                                            status: "error",
                                                                                            duration: 5000,
                                                                                            isClosable: true,
                                                                                            position: "bottom",
                                                                                        });
                                                                                    })

                                                                                }).catch((e) => {
                                                                                    console.log(e);
                                                                                })
                                                                            }}>
                                                                                Finish Contract
                                                                            </Button>
                                                                        </div>



                                                                    </div>

                                                                </div>);
                                                            } else if (e.contractStatus === 4) {
                                                                return (<div style={{ width: "100%", paddingBottom: 10, display: "flex", flexDirection: "column", alignItems: "end", justifyContent: "end" }}>
                                                                    <div className='contract-block' style={{ border: "2px red solid" }}>
                                                                        <div className='d-flex' style={{ justifyContent: "space-between", }}>

                                                                            <div>
                                                                                <div style={{ display: "flex", flexDirection: "column" }}>
                                                                                    <span style={{ textAlign: "start" }}>Contract ID: #{e.id}</span>

                                                                                </div>
                                                                                <div style={{ display: "flex", flexDirection: "column" }}>
                                                                                    <span style={{ textAlign: "start" }}>Fee: {e.contractFee}</span>

                                                                                </div>
                                                                                <div style={{ display: "flex", flexDirection: "column" }}>
                                                                                    <span style={{ textAlign: "start" }}>Start date: {formatDate(e.contractStartDate)}</span>

                                                                                </div>
                                                                                <div style={{ display: "flex", flexDirection: "column" }}>
                                                                                    <span style={{ textAlign: "start" }}>End Date: {formatDate(e.contractEndDate)}</span>
                                                                                </div>
                                                                            </div>
                                                                            <div style={{ display: "flex", flexDirection: "column" }}>
                                                                                <span style={{ textAlign: "start" }}>Contract Finished</span>
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
                                                        axios.post(`${process.env.REACT_APP_HOSTURL}/message/send`, {
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
                                                axios.post(`${process.env.REACT_APP_HOSTURL}/message/send`, {
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
            <AlertDialog
                isOpen={isOpen}
                //leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Delete Customer
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Choose which contract you want to finish
                            <Select placeholder='Select contract' onChange={(e) => {
                                var thisContract = contracts.find((item) => item.id === Number(e.target.value))
                                dispatch(initThisContract(thisContract))
                            }}>
                                {
                                    contracts.map((e,) => {
                                        return <option value={e.id}>Contract ID:{e.id}</option>
                                    })
                                }


                            </Select>
                            {
                                contract !== -1 && <div>
                                    <h3>Contract ID:{contract.id} </h3>
                                    <h3>Contract Start Date: {formatDate(contract.contractStartDate)}</h3>
                                    <h3>Contract End Date: {formatDate(contract.contractEndDate)}</h3>
                                    <h3>Contract Fee: {contract.contractFee}</h3>

                                </div>
                            }
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button
                                //ref={cancelRef}
                                onClick={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme='red' onClick={handleContractFinish} ml={3}>
                                Finish
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
            <Footer />
        </div>
    );
}

export default Message;