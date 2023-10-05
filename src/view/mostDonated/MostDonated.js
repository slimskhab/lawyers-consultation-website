import React, { useEffect, useState } from 'react';
import "./MostDonated.css"
function MostDonated(props) {

    const [deviceWidth, setDeviceWidth] = useState(window.innerWidth);

    // Update deviceWidth when the window is resized
    useEffect(() => {
      const handleResize = () => {
        setDeviceWidth(window.innerWidth);
        console.log(deviceWidth);
      };
  
      window.addEventListener('resize', handleResize);
  
      // Clean up the event listener when the component unmounts
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
  
    // Set the CSS variable value when deviceWidth changes
    useEffect(() => {
      document.documentElement.style.setProperty('--device-width', `${deviceWidth}px`);
      console.log(deviceWidth)
    }, [deviceWidth]);
    
    return (
        <div className='mostdonated-container'>
            <h1 className="title">Most Donated Athletes</h1>
            <p className='text-style'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>

            <div className='users-container'>
                <div className="user-card">
                    <img src="/user.png"></img>
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
                    <img src="/user.png"></img>
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
                    <img src="/user.png"></img>
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
                    <img src="/user.png"></img>
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
                    <img src="/user.png"></img>
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
                    <img src="/user.png"></img>
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


            {/*<div className='users-container'>
                <div className="user-card">
                    <img src="/user.png"></img>
                    <div className='info-card'>
                        <h2 className='username-text'> Username</h2>
                        <span className='donation-text'> $152.259 Donations</span>
                        <span className='instagram-text'>@Slimskhab</span>
                    </div>
                    <div className='custom-button'>
                        <span className='button-text-profile'>
                        View Profile
                        </span>
                    </div>
                </div>
                <div className="user-card">
                    <img src="/user.png"></img>
                    <div className='info-card'>
                        <h2 className='username-text'> Username</h2>
                        <span className='donation-text'> $152.259 Donations</span>
                        <span className='instagram-text'>@Slimskhab</span>
                    </div>
                    <div className='custom-button'>
                        <span className='button-text-profile'>
                        View Profile
                        </span>
                    </div>
                </div>
                <div className="user-card">
                    <img src="/user.png"></img>
                    <div className='info-card'>
                        <h2 className='username-text'> Username</h2>
                        <span className='donation-text'> $152.259 Donations</span>
                        <span className='instagram-text'>@Slimskhab</span>
                    </div>
                    <div className='custom-button'>
                        <span className='button-text-profile'>
                        View Profile
                        </span>
                    </div>
                </div>
              
                <div className="user-card">
                    <img src="/user.png"></img>
                    <div className='info-card'>
                        <h2 className='username-text'> Username</h2>
                        <span className='donation-text'> $152.259 Donations</span>
                        <span className='instagram-text'>@Slimskhab</span>
                    </div>
                    <div className='custom-button'>
                        <span className='button-text-profile'>
                        View Profile
                        </span>
                    </div>
                </div>
                <div className="user-card">
                    <img src="/user.png"></img>
                    <div className='info-card'>
                        <h2 className='username-text'> Username</h2>
                        <span className='donation-text'> $152.259 Donations</span>
                        <span className='instagram-text'>@Slimskhab</span>
                    </div>
                    <div className='custom-button'>
                        <span className='button-text-profile'>
                        View Profile
                        </span>
                    </div>
                </div>
                <div className="user-card">
                    <img src="/user.png"></img>
                    <div className='info-card'>
                        <h2 className='username-text'> Username</h2>
                        <span className='donation-text'> $152.259 Donations</span>
                        <span className='instagram-text'>@Slimskhab</span>
                    </div>
                    <div className='custom-button'>
                        <span className='button-text-profile'>
                        View Profile
                        </span>
                    </div>
                </div>
                
            </div>  */}

        </div>
    );
}

export default MostDonated;