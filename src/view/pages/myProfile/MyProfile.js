import React from 'react';
import SmallNavBar from '../../components/smallnavigationbar/SmallNavBar';
import Footer from '../../components/footer/Footer';
import { useSelector } from 'react-redux';
import "./MyProfile.css"
import { useState } from 'react';
import { FormErrorMessage, FormHelperText, Input, FormLabel, FormControl, Radio, RadioGroup } from '@chakra-ui/react';
import { Stack } from 'react-bootstrap';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

function MyProfile(props) {
    const thisUser = useSelector((state) => state.authentificateStore.user);
    const isLawyer = useSelector((state) => state.authentificateStore.isLawyer);

    const [email, setEmail] = useState(thisUser.email)
    const [firstName, setFirstName] = useState(thisUser.firstName)
    const [lastName, setLastName] = useState(thisUser.lastName)
    const [value, setValue] =useState(thisUser.category);
    const [switchWindow,setSwitchWindow]=React.useState(false);
    const handleInputChange = (e) => setEmail(e.target.value);
    const [flipped,setFlipped]=useState(false);
    const isError = email === ''
    const isLoggedIn = useSelector((state) => state.authentificateStore.isLoggedIn);
    const navigate = useNavigate()
    useEffect(() => {

        if (!isLoggedIn) {
            navigate('/login');
        }
    }, [isLoggedIn]);


   

    return (
        <div style={{ background: "#EFF1F1", display: "flex", flexDirection: "column", alignItems: "center", color: "black" }}>
            <SmallNavBar />
            <div style={{ width: "100%" }}>
                <div className='user-card-myprofile'>
                    <img src={thisUser.profilePic ? thisUser.profilePic : "./user.png"} style={{ height: 150, width: 150, borderRadius: 150, alignSelf: "start" }}></img>
                    <div style={{ padding: 30 }}>
                        <h2>
                            {thisUser.firstName} {thisUser.lastName}
                        </h2>
                        <h2>
                            {thisUser.category ? thisUser.category : "No Category"}
                        </h2>
                    </div>
                </div>
            </div>

            <div className='edit-profile-container'>
                <div style={{ width: "20%" }}>
<div className='d-flex' style={{justifyContent:"space-between",alignItems:"center",cursor:"pointer"}} onClick={()=>{
    setSwitchWindow(false);
}}>
    <h2>
    Account Details
    </h2>
    <FontAwesomeIcon style={{ color: 'var(--main-color)', fontSize: '30px',cursor:"pointer" }} icon={faChevronRight}/>

</div>
<div className='d-flex' style={{justifyContent:"space-between",alignItems:"center",cursor:"pointer"}} onClick={()=>{
    setSwitchWindow(true)
}}>
    <h2>
    {isLawyer?"Widthdraw Methods":'Payement Methods'}

    </h2>
    <FontAwesomeIcon style={{ color: 'var(--main-color)', fontSize: '30px',cursor:"pointer" }} icon={faChevronRight}/>

</div>

                </div>
                <div style={{ width: "80%", display: "flex", justifyContent: "space-around" }}>
                    {
                        !switchWindow?<>
                        <div style={{ width: "45%" }}>
                            <FormControl isInvalid={isError} isRequired>
                                <FormLabel>First Name</FormLabel>
                                <Input type='text' value={firstName} onChange={(e) => {
                                    setFirstName(e.target.value)
                                }} />
                                {!isError ? (
                                    <FormHelperText>
                                        Enter your new first name
                                    </FormHelperText>
                                ) : (
                                    <FormErrorMessage>first name is required.</FormErrorMessage>
                                )}
                            </FormControl>
                            <FormControl isInvalid={isError} isRequired>
                                <FormLabel>Last Name</FormLabel>
                                <Input type='email' value={lastName} onChange={(e) => {
                                    setLastName(e.target.value)
                                }} />
                                {!isError ? (
                                    <FormHelperText>
                                        Enter your new last name
                                    </FormHelperText>
                                ) : (
                                    <FormErrorMessage>last name is required.</FormErrorMessage>
                                )}
                            </FormControl>
                        </div>
                        <div style={{ width: "45%" }}>
                            <FormControl isInvalid={isError} isRequired>
                                <FormLabel>Email</FormLabel>
                                <Input type='email' value={email} onChange={handleInputChange} />
                                {!isError ? (
                                    <FormHelperText>
                                        Enter your new email
                                    </FormHelperText>
                                ) : (
                                    <FormErrorMessage>Email is required.</FormErrorMessage>
                                )}
                            </FormControl>
                            <FormControl isInvalid={isError} isRequired>
                                <FormLabel>Category</FormLabel>
                                <RadioGroup onChange={setValue} value={value}>
                                    <Stack direction='row' className='radio-buttons'>
                                        <Radio value='Trainee'>Trainee Lawyer</Radio>
                                        <Radio value='Litigation'>Litigation Lawyer</Radio>
                                        <Radio value='Appeal'>Appeal Lawyer</Radio>
                                    </Stack>
                                </RadioGroup>
                                {!isError ? (
                                    <FormHelperText>
                                        Enter your category
                                    </FormHelperText>
                                ) : (
                                    <FormErrorMessage>Email is required.</FormErrorMessage>
                                )}
                            </FormControl>
    
                        </div>
                        </>:<div>
                        <div className="payment-title">
        <h1>Payment Information</h1>
    </div>
    <div className="container preload">
        <div className={`creditcard ${flipped ? 'flipped' : ''}`} onClick={()=>{
            setFlipped(!flipped)
        }}>
            <div className="front">
                <div id="ccsingle"></div>
                <svg version="1.1" id="cardfront" xmlns="http://www.w3.org/2000/svg" 
                    x="0px" y="0px" viewBox="0 0 750 471" style={{enableBackground:"new 0 0 750 471"}} >
                    <g id="Front">
                        <g id="CardBackground">
                            <g id="Page-1_1_">
                                <g id="amex_1_">
                                    <path id="Rectangle-1_1_" className="lightcolor grey" d="M40,0h670c22.1,0,40,17.9,40,40v391c0,22.1-17.9,40-40,40H40c-22.1,0-40-17.9-40-40V40
                            C0,17.9,17.9,0,40,0z" />
                                </g>
                            </g>
                            <path className="darkcolor greydark" d="M750,431V193.2c-217.6-57.5-556.4-13.5-750,24.9V431c0,22.1,17.9,40,40,40h670C732.1,471,750,453.1,750,431z" />
                        </g>
                        <text transform="matrix(1 0 0 1 60.106 295.0121)" id="svgnumber" className="st2 st3 st4">0123 4567 8910 1112</text>
                        <text transform="matrix(1 0 0 1 54.1064 428.1723)" id="svgname" className="st2 st5 st6">JOHN DOE</text>
                        <text transform="matrix(1 0 0 1 54.1074 389.8793)" className="st7 st5 st8">cardholder name</text>
                        <text transform="matrix(1 0 0 1 479.7754 388.8793)" className="st7 st5 st8">expiration</text>
                        <text transform="matrix(1 0 0 1 65.1054 241.5)" className="st7 st5 st8">card number</text>
                        <g>
                            <text transform="matrix(1 0 0 1 574.4219 433.8095)" id="svgexpire" className="st2 st5 st9">01/23</text>
                            <text transform="matrix(1 0 0 1 479.3848 417.0097)" className="st2 st10 st11">VALID</text>
                            <text transform="matrix(1 0 0 1 479.3848 435.6762)" className="st2 st10 st11">THRU</text>
                            <polygon className="st2" points="554.5,421 540.4,414.2 540.4,427.9 		" />
                        </g>
                        <g id="cchip">
                            <g>
                                <path className="st2" d="M168.1,143.6H82.9c-10.2,0-18.5-8.3-18.5-18.5V74.9c0-10.2,8.3-18.5,18.5-18.5h85.3
                        c10.2,0,18.5,8.3,18.5,18.5v50.2C186.6,135.3,178.3,143.6,168.1,143.6z" />
                            </g>
                            <g>
                                <g>
                                    <rect x="82" y="70" className="st12" width="1.5" height="60" />
                                </g>
                                <g>
                                    <rect x="167.4" y="70" className="st12" width="1.5" height="60" />
                                </g>
                                <g>
                                    <path className="st12" d="M125.5,130.8c-10.2,0-18.5-8.3-18.5-18.5c0-4.6,1.7-8.9,4.7-12.3c-3-3.4-4.7-7.7-4.7-12.3
                            c0-10.2,8.3-18.5,18.5-18.5s18.5,8.3,18.5,18.5c0,4.6-1.7,8.9-4.7,12.3c3,3.4,4.7,7.7,4.7,12.3
                            C143.9,122.5,135.7,130.8,125.5,130.8z M125.5,70.8c-9.3,0-16.9,7.6-16.9,16.9c0,4.4,1.7,8.6,4.8,11.8l0.5,0.5l-0.5,0.5
                            c-3.1,3.2-4.8,7.4-4.8,11.8c0,9.3,7.6,16.9,16.9,16.9s16.9-7.6,16.9-16.9c0-4.4-1.7-8.6-4.8-11.8l-0.5-0.5l0.5-0.5
                            c3.1-3.2,4.8-7.4,4.8-11.8C142.4,78.4,134.8,70.8,125.5,70.8z" />
                                </g>
                                <g>
                                    <rect x="82.8" y="82.1" className="st12" width="25.8" height="1.5" />
                                </g>
                                <g>
                                    <rect x="82.8" y="117.9" className="st12" width="26.1" height="1.5" />
                                </g>
                                <g>
                                    <rect x="142.4" y="82.1" className="st12" width="25.8" height="1.5" />
                                </g>
                                <g>
                                    <rect x="142" y="117.9" className="st12" width="26.2" height="1.5" />
                                </g>
                            </g>
                        </g>
                    </g>
                    <g id="Back">
                    </g>
                </svg>
            </div>
            <div className="back">
                <svg version="1.1" id="cardback" xmlns="http://www.w3.org/2000/svg" 
                    x="0px" y="0px" viewBox="0 0 750 471" style={{enableBackground:"new 0 0 750 471"}} >
                    <g id="Front">
                        <line className="st0" x1="35.3" y1="10.4" x2="36.7" y2="11" />
                    </g>
                    <g id="Back">
                        <g id="Page-1_2_">
                            <g id="amex_2_">
                                <path id="Rectangle-1_2_" className="darkcolor greydark" d="M40,0h670c22.1,0,40,17.9,40,40v391c0,22.1-17.9,40-40,40H40c-22.1,0-40-17.9-40-40V40
                        C0,17.9,17.9,0,40,0z" />
                            </g>
                        </g>
                        <rect y="61.6" className="st2" width="750" height="78" />
                        <g>
                            <path className="st3" d="M701.1,249.1H48.9c-3.3,0-6-2.7-6-6v-52.5c0-3.3,2.7-6,6-6h652.1c3.3,0,6,2.7,6,6v52.5
                    C707.1,246.4,704.4,249.1,701.1,249.1z" />
                            <rect x="42.9" y="198.6" className="st4" width="664.1" height="10.5" />
                            <rect x="42.9" y="224.5" className="st4" width="664.1" height="10.5" />
                            <path className="st5" d="M701.1,184.6H618h-8h-10v64.5h10h8h83.1c3.3,0,6-2.7,6-6v-52.5C707.1,187.3,704.4,184.6,701.1,184.6z" />
                        </g>
                        <text transform="matrix(1 0 0 1 621.999 227.2734)" id="svgsecurity" className="st6 st7">985</text>
                        <g className="st8">
                            <text transform="matrix(1 0 0 1 518.083 280.0879)" className="st9 st6 st10">security code</text>
                        </g>
                        <rect x="58.1" y="378.6" className="st11" width="375.5" height="13.5" />
                        <rect x="58.1" y="405.6" className="st11" width="421.7" height="13.5" />
                        <text transform="matrix(1 0 0 1 59.5073 228.6099)" id="svgnameback" className="st12 st13">John Doe</text>
                    </g>
                </svg>
            </div>
        </div>
    </div>
    <div className="form-container">
        <div className="field-container">
            <label for="name">Name</label>
            <input id="name" maxlength="20" type="text"></input>
        </div>
        <div className="field-container">
            <label for="cardnumber">Card Number</label><span id="generatecard">generate random</span>
            <input id="cardnumber" type="text" pattern="[0-9]*" inputmode="numeric"></input>
            <svg id="ccicon" className="ccicon" width="750" height="471" viewBox="0 0 750 471" version="1.1" xmlns="http://www.w3.org/2000/svg"
>

            </svg>
        </div>
        <div className="field-container">
            <label for="expirationdate">Expiration (mm/yy)</label>
            <input id="expirationdate" type="text" pattern="[0-9]*" inputmode="numeric"></input>
        </div>
        <div className="field-container">
            <label for="securitycode">Security Code</label>
            <input id="securitycode" type="text" pattern="[0-9]*" inputmode="numeric"></input>
        </div>
    </div>
                            </div>
                    }
                    
                </div>




            </div>
            <Footer />
        </div>
    );
}

export default MyProfile;