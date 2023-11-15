import React from 'react';
import "./NavigationBar.css"
import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../../features/Authentification';
function NavigationBar(props) {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const state=useSelector((state)=>state.authentificateStore)
    return (
        <nav className='navbar-style'>
<img src="/logo.png" style={{height:83,width:83,cursor:"pointer"}} onClick={()=>{
                navigate("/");
            }}></img>
            {
                state.isLoggedIn&&(state.isLawyer?<p>Lawyer</p>:<p>Client</p>)
            }
            {state.isLoggedIn&&<FontAwesomeIcon style={{ color: 'white', fontSize: '30px',cursor:"pointer" }} icon={faRightFromBracket} onClick={()=>{
    dispatch(logout());
    navigate("/")
}}/>}


        </nav>
    );
}

export default NavigationBar;