import React, { useEffect, useState } from 'react';
import "./MostRated.css"
import {useNavigate } from 'react-router-dom';
import axios from 'axios';
import RatingStars from '../RatingStars';
import { useToast } from '@chakra-ui/toast';
function MostRated(props) {
    const navigate = useNavigate();
    const [deviceWidth, setDeviceWidth] = useState(window.innerWidth);
    const [lawyers,setLawyers]=useState();
    const toast=useToast()
    useEffect(() => {
        const handleResize = () => {
            setDeviceWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    });

    useEffect(() => {
        document.documentElement.style.setProperty('--device-width', `${deviceWidth}px`);
    }, [deviceWidth]);

    useEffect(()=>{
        axios.post(`${process.env.REACT_APP_HOSTURL}/lawyer/top`).then((response)=>{
            setLawyers(response.data.topLawyers)
        }).catch((e)=>{
            toast({
                title: "Server Error Search!",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
              });
        })
    },[])

    return (
        <div className='mostdonated-container'>
            <h1 className="title">Most Rated Lawyers</h1>
            <p className='text-style'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>

            <div className='users-container'>
            
                {lawyers&&
                    lawyers.map((user, index) => {
                        if (index < 3) {
                            return (
                                <div className="user-card" key={user.id}>

                                    <img src={user.profilePic?user.profilePic:"/user.png"} style={{height:250}} alt="name" onClick={() => {
                                        navigate(`/lawyer/${user.id}`);
                                    }}></img>
                                    <div className='info-card'>
                                        <h2 className='username-text'>{user.firstName} {user.lastName}</h2>
                                        <span className='donation-text'><RatingStars rating={user.averageStars} size="15px"/></span>
                                        <span className='instagram-text'></span>
                                        <div className='custom-button'>
                                            <span className='button-text-profile' onClick={() => {
                                                navigate(`/lawyer/${user.id}`);
                                            }}>
                                                View Profile
                                            </span>
                                        </div>
                                    </div>

                                </div>
                            )
                        }
                            return null;
                        

                    })
                }
            </div>
            <div className='users-container'>
                {lawyers&&
                    lawyers.map((user, index) => {
                        if (index >= 3) {
                            return (
                                <div className="user-card" key={user.id}>

                                    <img src={user.profilePic} style={{height:250}} alt={user.firstName} onClick={() => {
                                        navigate(`/lawyer/${user.id}`);
                                    }}></img>
                                    <div className='info-card'>
                                        <h2 className='username-text'>{user.firstName} {user.lastName}</h2>
                                        <span className='donation-text'><RatingStars rating={user.rating} size="15px"/></span>
                                        <div className='custom-button'>
                                            <span className='button-text-profile' onClick={() => {
                                                navigate(`/lawyer/${user.id}`);

                                            }}>
                                                View Profile
                                            </span>
                                        </div>
                                    </div>

                                </div>
                            )
                        }
                            return null;
                        

                    })
                }
            </div>


        </div>
    );
}

export default MostRated;