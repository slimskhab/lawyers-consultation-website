import React, { useRef } from 'react';
import Footer from "../../components/footer/Footer"
import SmallNavBar from '../../components/smallnavigationbar/SmallNavBar';
import "./Profile.css"
import { useNavigate, useParams } from 'react-router-dom';
import { userData } from '../../../Data';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RatingStars from '../../components/RatingStars';
import { selectChat } from '../../../features/Message';
import { Heading, Stack, Text } from '@chakra-ui/layout';
import { Card, CardBody } from '@chakra-ui/card';
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, useDisclosure, useToast } from '@chakra-ui/react';
function Profile() {

    const params = useParams();
    const [user, setUser] = useState("");
    const myId = useSelector((state) => state.authentificateStore.user.id);
    const isLawyer = useSelector((state) => state.authentificateStore.isLawyer);
    const isLoggedIn = useSelector((state) => state.authentificateStore.isLoggedIn);
    const { isOpen, onOpen, onClose } = useDisclosure()
const toast=            useToast();
    const [rating, setRating] = useState(0)
    const [reviews, setReviews] = useState([])
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const reportContentRef=useRef();
    const handleReport=()=>{
        axios.post(`${process.env.REACT_APP_HOSTURL}/report/add`,{
            reportedId:params.id,
            reporterId:myId,
            reportContent:reportContentRef.current.value
        }).then((res)=>{
            toast({
                title: "Sent report",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
              });
        }).catch((e)=>{
            toast({
                title: "Server Error Search!",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
              });
        })
    }
    useEffect(() => {

        axios.get(`${process.env.REACT_APP_HOSTURL}/lawyer/${params.id}`).then((response) => {
            setUser(response.data.lawyer);
            axios.get(`${process.env.REACT_APP_HOSTURL}/review/avg/${params.id}`).then((res) => {
                const roundedRating = Math.round(res.data.averageStars);

                setRating(roundedRating);

            })

            axios.get(`${process.env.REACT_APP_HOSTURL}/review/${params.id}`).then((res) => {
                setReviews(res.data.reviews);
            })
        }).catch((e) => {
            console.log(e);
        })
    }, [params.id])


    return (
        <div>

            <SmallNavBar />
            <div className='main-profile-container'>
                <div className='profile-images-container'>


                    <div>

                        <div className='profile-main-image-container'>

                            <img src={user.profilePic ? user.profilePic : "../user.png"} alt="name" ></img>

                        </div>

                    </div>
                    <div style={{ width: 48 }}>


                    </div>

                </div>

                <div className='profile-info-container'>
                    <div style={{ width: "100%" }} className='d-flex justify-content-between'>

                        <div style={{ display: "flex" }}><h1 className='profile-title'>{user ? `${user.firstName} ${user.lastName}` : 'Loading...'}</h1><sup className='sup-text'>Trusted</sup>
                        </div>
                        {
                            !isLawyer && (<div className='claim-profile-button' onClick={() => {
                                axios.post(`${process.env.REACT_APP_HOSTURL}/chat`, {
                                    lawyerId: params.id,
                                    clientId: myId
                                }).then((response) => {
                                    console.log(response);
                                    dispatch(selectChat(response.data.chat))
                                    navigate("/messages")
                                })
                            }}>
                                Contact Lawyer
                            </div>)
                        }


                    </div>

                    <div className='additional-infos-container'>
                        <h1 className='profile-title' style={{ textAlign: "start" }}>Bio:</h1>
                        <p style={{ textAlign: "start", color: "black" }}>
                            {user.bio}
                        </p>
                    </div>


                </div>
            </div>
            <br></br>
            <div className='button-container' >
                <div className='vote-buttons' style={{color:"var(--main-color)"}}>
                    <span style={{ fontSize: "20px", color: 'var(--main-color)', fontWeight: "bold" }}>Rating : {rating}</span>

                    <RatingStars rating={rating} size={"30px"} />


                </div>
{
isLoggedIn&&                <div className='donate-button' onClick={()=>{
    onOpen();
}}>Report Lawyer</div>

}

            </div>

            <br></br>
            
            <div style={{padding:20}}>
            <h1 className='profile-title' style={{textAlign:"start"}}>
                Reviews:
            </h1>
                {
                    reviews.map((e, index) => {
                        return <Card
                            direction={{ base: 'column', sm: 'row' }}
                            overflow='hidden'
                            variant='outline'
                            style={{border:"1px black solid",marginBottom:10}}
                        >

                            <Stack>
                                <CardBody>
                                    <Heading size='md' style={{ display: "flex" }}><span style={{marginRight:20}}>Review Id: #{e.id}</span>             <RatingStars rating={e.stars} />
                                    </Heading>
                                    <Text py='2'>
                                        {e.comment}
                                    </Text>
                                </CardBody>


                            </Stack>
                        </Card>
                    })
                }
            </div>


            <AlertDialog
                isOpen={isOpen}
                //leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Report Lawyer
                        </AlertDialogHeader>

                        <AlertDialogBody>
Report content:
                        <textarea className='input-style' placeholder='' rows='5' style={{ resize: "none" }} ref={reportContentRef}></textarea >


                            
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button
                                //ref={cancelRef}
                                onClick={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme='red' ml={3} onClick={()=>{
                                handleReport();
                                onClose();
                            }}>
                                Report
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
            <Footer />
        </div>
    );
}

export default Profile;