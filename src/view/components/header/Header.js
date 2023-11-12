import React from 'react';
import "./Header.css"
import NavigationBar from './navigation/NavigationBar';
import SearchBar from './searchBar/SearchBar';
import { useNavigate } from 'react-router-dom';
function Header(props) {
    const navigate=useNavigate();
    return (
        <div className='header-container'>

            <NavigationBar />
            <h1 className='website-title'>
                Lawyers Consultation
            </h1>
            <p className="description-text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>

            <div className='buttons-container'>
                <div className='first-button' onClick={()=>{
                    navigate("/signup")
                }}>
                    <span className='button-text'>Sign up
                    </span></div>
                <div className='second-button' onClick={()=>{
                    navigate("/login")
                }}>
                    <span className='button-text'>Login
                    </span></div>
            </div>
            <SearchBar />



        </div>
    );
}

export default Header;