import React from 'react';
import "./SmallNavBar.css"
function SmallNavBar(props) {
    return (
        <nav className='small-navbar-style'>
            <img src="/logo.png" style={{ height: 83, width: 83,margin:20 }}></img>

            <div className='d-flex text-white'>
                <ul className='small-header-bar'>
                    <li className='small-nav-text-style' style={{ marginRight: "67px" }}>Home</li>
                    <li className='small-nav-text-style' style={{ marginRight: "67px" }}>How It Works</li>
                    <li className='small-nav-text-style'>Donations</li>
                </ul>
            </div>
        </nav>
    );
}

export default SmallNavBar;