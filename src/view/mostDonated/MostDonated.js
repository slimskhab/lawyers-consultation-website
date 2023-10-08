import React, { useEffect, useState } from 'react';
import "./MostDonated.css"
function MostDonated(props) {

    const [deviceWidth, setDeviceWidth] = useState(window.innerWidth);

    useEffect(() => {
      const handleResize = () => {
        setDeviceWidth(window.innerWidth);
        console.log(deviceWidth);
      };
  
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    });
  
    useEffect(() => {
      document.documentElement.style.setProperty('--device-width', `${deviceWidth}px`);
    }, [deviceWidth]);
    
    return (
        <div className='mostdonated-container'>
            <h1 className="title">Most Donated Athletes</h1>
            <p className='text-style'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>

            <div className='users-container'>
                <div className="user-card">
                    <img src="/user.png" alt="name"></img>
                    <div className='info-card'>
                        <h2 className='username-text'> Username</h2>
                        <span className='donation-text'> $152.259 Donations</span>
                        <span className='instagram-text'>@Slimskhab</span>
                        <div className='custom-button'>
                        <span className='button-text-profile'>
                            View Profile
                        </span>
                    </div>
                    </div>
                    
                </div>
                <div className="user-card">
                    <img src="/user.png" alt="name"></img>
                    <div className='info-card'>
                        <h2 className='username-text'> Username</h2>
                        <span className='donation-text'> $152.259 Donations</span>
                        <span className='instagram-text'>@Slimskhab</span>
                        <div className='custom-button'>
                        <span className='button-text-profile'>
                            View Profile
                        </span>
                    </div>
                    </div>
                    
                </div>
                <div className="user-card">
                    <img src="/user.png" alt="name"></img>
                    <div className='info-card'>
                        <h2 className='username-text'> Username</h2>
                        <span className='donation-text'> $152.259 Donations</span>
                        <span className='instagram-text'>@Slimskhab</span>
                        <div className='custom-button'>
                        <span className='button-text-profile'>
                            View Profile
                        </span>
                    </div>
                    </div>
                    
                </div>
            </div>
            <div className='users-container'>
                <div className="user-card">
                    <img src="/user.png" alt="name"></img>
                    <div className='info-card'>
                        <h2 className='username-text'> Username</h2>
                        <span className='donation-text'> $152.259 Donations</span>
                        <span className='instagram-text'>@Slimskhab</span>
                        <div className='custom-button'>
                        <span className='button-text-profile'>
                            View Profile
                        </span>
                    </div>
                    </div>
                    
                </div>
                <div className="user-card">
                    <img src="/user.png" alt="name"></img>
                    <div className='info-card'>
                        <h2 className='username-text'> Username</h2>
                        <span className='donation-text'> $152.259 Donations</span>
                        <span className='instagram-text'>@Slimskhab</span>
                        <div className='custom-button'>
                        <span className='button-text-profile'>
                            View Profile
                        </span>
                    </div>
                    </div>
                    
                </div>
                <div className="user-card">
                    <img src="/user.png" alt="name"></img>
                    <div className='info-card'>
                        <h2 className='username-text'> Username</h2>
                        <span className='donation-text'> $152.259 Donations</span>
                        <span className='instagram-text'>@Slimskhab</span>
                        <div className='custom-button'>
                        <span className='button-text-profile'>
                            View Profile
                        </span>
                    </div>
                    </div>
                    
                </div>
            </div>


        </div>
    );
}

export default MostDonated;