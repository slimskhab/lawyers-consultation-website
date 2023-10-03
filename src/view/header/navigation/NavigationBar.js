import React from 'react';
import "./NavigationBar.css"

function NavigationBar(props) {
    return (
        <nav className='navbar-style'>
<img src="https://picsum.photos/200" style={{height:83,width:83}}></img>

<div className='d-flex text-white'>
    <ul>
        <li className='nav-text-style'>Home</li>
        <li className='nav-text-style'>How It Works</li>
        <li className='nav-text-style'>Donations</li>
    </ul>
</div>
        </nav>
    );
}

export default NavigationBar;