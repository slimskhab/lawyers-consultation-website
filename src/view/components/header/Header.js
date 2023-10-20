import React from 'react';
import "./Header.css"
import NavigationBar from './navigation/NavigationBar';
import SearchBar from './searchBar/SearchBar';
function Header(props) {


    return (
        <div className='header-container'>

            <NavigationBar />
            <h1 className='website-title'>
                Natty Scan
            </h1>
            <p className="description-text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>

            <div className='buttons-container'>
                <div className='first-button'>
                    <span className='button-text'>Add New Profile
                    </span></div>
                <div className='second-button'>
                    <span className='button-text'>Detect With AI
                    </span></div>
            </div>
            <SearchBar />



        </div>
    );
}

export default Header;