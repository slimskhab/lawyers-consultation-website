import React, { useEffect, useState } from 'react';
import "./MostDonated.css"
import { Route, Routes, useNavigate } from 'react-router-dom';
import { userData } from '../../../Data';
import { setContainerRef } from '../../../features/InPageNav';
import { useDispatch } from 'react-redux';
function MostDonated(props) {
    const navigate = useNavigate();
    const [deviceWidth, setDeviceWidth] = useState(window.innerWidth);

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

    return (
        <div className='mostdonated-container'>
            <h1 className="title">Most Donated Athletes</h1>
            <p className='text-style'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>

            <div className='users-container'>
                {
                    userData.map((user, index) => {
                        if (index < 3) {
                            var igLink = `https://instagram.com/${user.ig}`;
                            return (
                                <div className="user-card" key={user.id}>

                                    <img src="/user.png" alt="name" onClick={() => {
                                        navigate(`/profile/${user.id}`);
                                    }}></img>
                                    <div className='info-card'>
                                        <h2 className='username-text'>{user.username}</h2>
                                        <span className='donation-text'> ${user.totalDonations} Donations</span>
                                        <a href={igLink} target="_blank"><span className='instagram-text'>@{user.ig}</span></a>
                                        <div className='custom-button'>
                                            <span className='button-text-profile' onClick={() => {
                                                navigate(`/profile/${user.id}`);
                                            }}>
                                                View Profile
                                            </span>
                                        </div>
                                    </div>

                                </div>
                            )
                        }

                    })
                }
            </div>
            <div className='users-container'>
            {
                    userData.map((user, index) => {
                        if (index >= 3) {
                            var igLink = `https://instagram.com/${user.ig}`;
                            return (
                                <div className="user-card" key={user.id}>

                                    <img src="/user.png" alt="name" onClick={() => {
                                        navigate(`/profile/${user.id}`);
                                    }}></img>
                                    <div className='info-card'>
                                        <h2 className='username-text'>{user.username}</h2>
                                        <span className='donation-text'> ${user.totalDonations} Donations</span>
                                        <a href={igLink} target="_blank"><span className='instagram-text'>@{user.ig}</span></a>
                                        <div className='custom-button'>
                                            <span className='button-text-profile' onClick={() => {
 navigate(`/profile/${user.id}`);

                                            }}>
                                                View Profile
                                            </span>
                                        </div>
                                    </div>

                                </div>
                            )
                        }

                    })
                }
            </div>


        </div>
    );
}

export default MostDonated;