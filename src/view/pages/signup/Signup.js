import React from 'react';
import SmallNavBar from '../../components/smallnavigationbar/SmallNavBar';
import Footer from '../../components/footer/Footer';
import "./Signup.css"
function Signup(props) {
    return (
        <div >
            <SmallNavBar />
            <div style={{ padding: "50px",display:"flex",flexDirection:"column",alignItems:"center",width:"100%" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center",width:"100%" }}>
                    <h2>
                        Profile Picture<sup>*</sup>
                    </h2>
                    <div className='profile-image-container'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 70 70" fill="none">
                            <path d="M56.651 39.9929C55.7672 39.9929 54.9196 40.3441 54.2947 40.9694C53.6697 41.5947 53.3186 42.4427 53.3186 43.327V44.594L48.3866 39.6595C46.6452 37.9309 44.2915 36.9609 41.8384 36.9609C39.3854 36.9609 37.0317 37.9309 35.2903 39.6595L32.9576 41.9933L24.6932 33.7247C22.9274 32.043 20.5829 31.105 18.145 31.105C15.7071 31.105 13.3626 32.043 11.5968 33.7247L6.66483 38.6592V19.9881C6.66483 19.1039 7.01592 18.2558 7.64087 17.6305C8.26582 17.0053 9.11343 16.654 9.99724 16.654H33.3241C34.2079 16.654 35.0556 16.3027 35.6805 15.6775C36.3055 15.0522 36.6565 14.2041 36.6565 13.3199C36.6565 12.4356 36.3055 11.5876 35.6805 10.9623C35.0556 10.337 34.2079 9.98575 33.3241 9.98575H9.99724C7.34581 9.98575 4.80297 11.0396 2.92812 12.9154C1.05328 14.7912 0 17.3353 0 19.9881V59.9976C0 62.6504 1.05328 65.1946 2.92812 67.0704C4.80297 68.9462 7.34581 70 9.99724 70H49.9862C52.6376 70 55.1805 68.9462 57.0553 67.0704C58.9302 65.1946 59.9834 62.6504 59.9834 59.9976V43.327C59.9834 42.4427 59.6323 41.5947 59.0074 40.9694C58.3825 40.3441 57.5348 39.9929 56.651 39.9929ZM9.99724 63.3317C9.11343 63.3317 8.26582 62.9805 7.64087 62.3552C7.01592 61.7299 6.66483 60.8819 6.66483 59.9976V48.0948L16.3288 38.4258C16.8184 37.9591 17.4687 37.6987 18.145 37.6987C18.8213 37.6987 19.4716 37.9591 19.9612 38.4258L30.5249 48.995L44.8543 63.3317H9.99724ZM53.3186 59.9976C53.3138 60.6359 53.1035 61.2556 52.7188 61.7647L37.6896 46.6611L40.0223 44.3272C40.2612 44.0833 40.5464 43.8895 40.8611 43.7571C41.1758 43.6248 41.5137 43.5567 41.8551 43.5567C42.1965 43.5567 42.5344 43.6248 42.8491 43.7571C43.1639 43.8895 43.449 44.0833 43.6879 44.3272L53.3186 54.0295V59.9976ZM69.0143 10.9526L59.017 0.95027C58.7001 0.64673 58.3264 0.40879 57.9173 0.250104C57.106 -0.0833681 56.196 -0.0833681 55.3847 0.250104C54.9757 0.40879 54.6019 0.64673 54.285 0.95027L44.2878 10.9526C43.6603 11.5805 43.3077 12.432 43.3077 13.3199C43.3077 14.2078 43.6603 15.0593 44.2878 15.6871C44.9153 16.3149 45.7664 16.6676 46.6538 16.6676C47.5412 16.6676 48.3923 16.3149 49.0198 15.6871L53.3186 11.3527V29.9905C53.3186 30.8748 53.6697 31.7228 54.2947 32.3481C54.9196 32.9733 55.7672 33.3246 56.651 33.3246C57.5348 33.3246 58.3825 32.9733 59.0074 32.3481C59.6323 31.7228 59.9834 30.8748 59.9834 29.9905V11.3527L64.2823 15.6871C64.592 15.9996 64.9606 16.2476 65.3667 16.4169C65.7728 16.5862 66.2083 16.6733 66.6483 16.6733C67.0882 16.6733 67.5238 16.5862 67.9298 16.4169C68.3359 16.2476 68.7045 15.9996 69.0143 15.6871C69.3266 15.3772 69.5745 15.0084 69.7437 14.6021C69.9129 14.1958 70 13.76 70 13.3199C70 12.8797 69.9129 12.4439 69.7437 12.0376C69.5745 11.6314 69.3266 11.2626 69.0143 10.9526Z" fill="#001F3F" />
                        </svg>
                    </div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-around",width:"100%" }}>
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "start", alignItems: "start", width: "100%" }}>
                        <h2 style={{ textAlign: "start" }}>
                            First Name<sup>*</sup>
                        </h2>
                        <div className='input-box'>
                            <input className='input-style' placeholder=''></input>

                        </div>
                    </div>
                    <div style={{ display: "flex", marginLeft: "100px", flexDirection: "column", justifyContent: "start", alignItems: "start", width: "100%" }}>
                        <h2 style={{ textAlign: "start" }}>
                            Last Name<sup>*</sup>
                        </h2>
                        <div className='input-box'>
                            <input className='input-style' placeholder=''></input>
                        </div>
                    </div>
                </div>
                <br></br>
                <div style={{ display: "flex", justifyContent: "space-around",width:"100%" }}>
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "start", alignItems: "start", width: "100%" }}>
                        <h2 style={{ textAlign: "start" }}>
                            Email<sup>*</sup>
                        </h2>
                        <div className='input-box'>
                            <input className='input-style' placeholder=''></input>

                        </div>
                    </div>
                    <div style={{ display: "flex", marginLeft: "100px", flexDirection: "column", justifyContent: "start", alignItems: "start", width: "100%" }}>
                        <h2 style={{ textAlign: "start" }}>
                            Password<sup>*</sup>
                        </h2>
                        <div className='input-box'>
                            <input className='input-style' placeholder='' type='password'></input>
                        </div>
                    </div>

                </div>
                <br></br>

                <div style={{ display: "flex", flexDirection: "column", justifyContent: "start", alignItems: "start", width: "100%" }}>
                    <h2 style={{ textAlign: "start" }}>
                        Bio<sup>*</sup>
                    </h2>
                    <div className='input-box' style={{height:"195px",padding:10}}>
                        <textarea  className='input-style' placeholder='' rows='5' style={{resize:"none"}} ></textarea >

                    </div>
                </div>
                <br></br>
                <div className='submit-button'>
                    Submit
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Signup;