import React from 'react';
import "./SmallNavBar.css"
import { useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { logout } from '../../../features/Authentification';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
function SmallNavBar(props) {
    const navigate=useNavigate();
    const isLoggedIn=useSelector((state)=>state.authentificateStore.isLoggedIn);
    const dispatch=useDispatch();
    return (
        <nav className='small-navbar-style'>
            <img src="/logo.png" style={{ height: 83, width: 83,margin:20 }} onClick={()=>{
                navigate("/");
            }}></img>
{
    isLoggedIn?(<FontAwesomeIcon style={{ color: 'white', fontSize: '30px',cursor:"pointer" }} icon={faRightFromBracket} onClick={()=>{
        dispatch(logout());
        navigate("/")
    }}/>):(  <div className='d-flex text-white'>
    <ul className='small-header-bar'>
        <li className='small-nav-text-style' style={{ marginRight: "67px" }} onClick={()=>{
    navigate("/");
}}>Home</li>
        <li className='small-nav-text-style' style={{ marginRight: "67px" }} onClick={()=>{
    navigate("/login");
}}>Login</li>
        <li className='small-nav-text-style' onClick={()=>{
    navigate("/signup");
}}>Signup</li>
    </ul>
</div>)
}
          
        </nav>
    );
}

export default SmallNavBar;