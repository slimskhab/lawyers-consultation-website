import React from 'react';
import Footer from "../../components/footer/Footer"
import SmallNavBar from '../../components/smallnavigationbar/SmallNavBar';
import "./Profile.css"
import { useParams } from 'react-router-dom';
import { userData } from '../../../Data';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
function Profile() {

    const params = useParams();
    const [user,setUser]=useState("");

    var firstImageLink = "https://images.unsplash.com/photo-1481349518771-20055b2a7b24?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmFuZG9tfGVufDB8fDB8fHww"

    
useEffect(()=>{
    axios.get(`http://localhost:6005/lawyer/${params.id}`).then((response)=>{
        setUser(response.data.lawyer);
        console.log(user);
    }).catch((e)=>{
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

                            <img src={firstImageLink} alt="name" ></img>

                        </div>

                    </div>
                    <div style={{ width: 48 }}>


                    </div>

                </div>

                <div className='profile-info-container'>
                    <div style={{ width: "100%" }} className='d-flex justify-content-between'>

                        <div style={{ display: "flex" }}><h1 className='profile-title'>{user ? `${user.firstName} ${user.lastName}` : 'Loading...'}</h1><sup className='sup-text'>Trusted</sup>
                        </div>
                        <div className='claim-profile-button'>
                            Contact Lawyer
                        </div>

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
            <div className='button-container'>
                <div className='vote-buttons'>
                    <div className='vote-buttons-compact'>
                        <div style={{ width: 48, opacity: 0 }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                                <path d="M30 12L18 24L30 36" stroke="#001F3F" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <div className='vote-button natty'>
                            <span className='vote-button-text'>Natty</span>
                            <span className='vote-button-number'>200 Votes</span>
                        </div>
                        <div className='vote-button enhanced'>
                            <span className='vote-button-text'>Enhanced</span>
                            <span className='vote-button-number'>200 Votes</span>
                        </div>
                        <div style={{ width: 48, opacity: 0 }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                                <path d="M30 12L18 24L30 36" stroke="#001F3F" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </div>


                </div>

                <div className='donate-button'>Donate</div>

            </div>

            <br></br>




            <Footer />
        </div>
    );
}

export default Profile;