import React from 'react';
import "./SmallNavBar.css"
import { useNavigate } from 'react-router-dom';
function SmallNavBar(props) {
    const navigate=useNavigate();
    return (
        <nav className='small-navbar-style'>
            <img src="/logo.png" style={{ height: 83, width: 83,margin:20 }} onClick={()=>{
                navigate("/");
            }}></img>

            <div className='d-flex text-white'>
                <ul className='small-header-bar'>
                    <li className='small-nav-text-style' style={{ marginRight: "67px" }} onClick={()=>{
                navigate("/");
            }}>Home</li>
                    <li className='small-nav-text-style' style={{ marginRight: "67px" }} onClick={()=>{
                navigate("/");
            }}>Login</li>
                    <li className='small-nav-text-style' onClick={()=>{
                navigate("/");
            }}>Signup</li>
                </ul>
            </div>
        </nav>
    );
}

export default SmallNavBar;