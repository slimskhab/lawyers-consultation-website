import React from 'react';
import "./NavigationBar.css"
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setContainerRef } from '../../../../features/InPageNav';

function NavigationBar(props) {
    const navigate=useNavigate();
const dispatch=useDispatch();
    return (
        <nav className='navbar-style'>
<img src="/logo.png" style={{height:83,width:83,cursor:"pointer"}} onClick={()=>{
                navigate("/");
            }}></img>


        </nav>
    );
}

export default NavigationBar;