import React from 'react';
import "./NavigationBar.css"

function NavigationBar(props) {
    return (
        <nav className='navbar-style'>
<img src="/logo.png" style={{height:83,width:83}}></img>

<div className='d-flex text-white'>
    <ul className='header-bar'>
        <li className='nav-text-style' style={{marginRight:"67px"}}>Home</li>
        <li className='nav-text-style'style={{marginRight:"67px"}}>How It Works</li>
        <li className='nav-text-style'>Donations</li>
    </ul>
</div>
        </nav>
    );
}

export default NavigationBar;