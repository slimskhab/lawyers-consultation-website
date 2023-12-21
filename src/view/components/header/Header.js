import React from 'react';
import "./Header.css"
import NavigationBar from './navigation/NavigationBar';
import SearchBar from './searchBar/SearchBar';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
function Header(props) {
    const navigate = useNavigate();
    var isLoggedIn = useSelector((store) => store.authentificateStore.isLoggedIn);
    return (
        <div className='header-container'>

            <NavigationBar />
            <h1 className='website-title'>
                Lawyers Consultation
            </h1>
            <p className="description-text">
                Get your consultation!
            </p>

{
    isLoggedIn? <div className='buttons-container'>
    <div className='first-button' onClick={() => {
        navigate("/lawyers")
    }}>
        <span className='button-text'>Browse Lawyers
        </span>
    </div>
    <div className='second-button' onClick={() => {
        navigate("/messages")
    }}>
        <span className='button-text'>Open Messages
        </span>
    </div>
</div>: <div className='buttons-container'>
    <div className='first-button' onClick={() => {
        navigate("/signup")
    }}>
        <span className='button-text'>Sign up
        </span>
    </div>
    <div className='second-button' onClick={() => {
        navigate("/login")
    }}>
        <span className='button-text'>Login
        </span>
    </div>
</div>
}
           
            <SearchBar />



        </div>
    );
}

export default Header;