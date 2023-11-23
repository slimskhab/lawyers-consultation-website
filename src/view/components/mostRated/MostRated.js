import React, { useEffect, useState } from 'react';
import "./MostRated.css"
import {useNavigate } from 'react-router-dom';
import axios from 'axios';
import RatingStars from '../RatingStars';
function MostRated(props) {
    const navigate = useNavigate();
    const [deviceWidth, setDeviceWidth] = useState(window.innerWidth);
    const [lawyers,setLawyers]=useState();
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
        axios.post("http://localhost:6005/lawyer",{
            limit:6
        }).then((response)=>{
            setLawyers(response.data.lawyers)
        }).catch((e)=>{
            console.log(e);
        })
    },[lawyers])

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
                                        <span className='donation-text'><RatingStars rating={user.rating} size="15px"/></span>
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
                        }else{
                            return ;
                        }

                    })
                }
            </div>
            <div className='users-container'>
                {lawyers&&
                    lawyers.map((user, index) => {
                        if (index >= 3) {
                            return (
                                <div className="user-card" key={user.id}>

                                    <img src={user.profilePic} style={{height:250}} alt="name" onClick={() => {
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
                        }else{
                            return ;
                        }

                    })
                }
            </div>


        </div>
    );
}

export default MostRated;