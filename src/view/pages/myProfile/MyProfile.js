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
import CreditCard from '../../components/creditCard/CreditCard';

function MyProfile(props) {
    const thisUser = useSelector((state) => state.authentificateStore.user);
    const isLawyer = useSelector((state) => state.authentificateStore.isLawyer);

    const [email, setEmail] = useState(thisUser.email)
    const [firstName, setFirstName] = useState(thisUser.firstName)
    const [lastName, setLastName] = useState(thisUser.lastName)
    const [value, setValue] = useState(thisUser.category);
    const [switchWindow, setSwitchWindow] = React.useState(false);
    const handleInputChange = (e) => setEmail(e.target.value);
    const isError = email === ''
    const isLoggedIn = useSelector((state) => state.authentificateStore.isLoggedIn);


    const [flipped, setFlipped] = useState(false);
    const [cardHolder, setCardHolder] = useState(`${thisUser.firstName} ${thisUser.lastName}`);
    const [cardNumber, setCardNumber] = useState("0123 4567 8901 2345");
    const [ccv2, setCcv2] = useState("985");
    const [expirationDate, setExpirationDate] = useState("01/23");
    const [cardTopColor, setCardTopColor] = useState("grey");
    const [cardBottomColor, setCardBottomColor] = useState("greydark");



    const navigate = useNavigate()
    useEffect(() => {

        if (!isLoggedIn) {
            navigate('/login');
        }
    }, [isLoggedIn]);

const handleCardNumberChange=(e) => {
    const input = e.target.value.replace(/\D/g, ''); // Remove non-digit characters
    let formattedInput = input
        .slice(0, 16)
        .replace(/(\d{4})/g, '$1 ');

    if (formattedInput.length > 0 && formattedInput[formattedInput.length - 1] === ' ') {
        formattedInput = formattedInput.slice(0, formattedInput.length - 1);
    }

    setCardNumber(formattedInput);

    const firstDigit = input.length > 0 ? input[0] : '';
    const firstTwoDigits = input.length > 1 ? input.slice(0, 2) : '';

    if (firstDigit === '5') {
        setCardTopColor('lightblue');
        setCardBottomColor("lightbluedark")
    } else if (firstDigit === '4') {
        setCardTopColor('lime');
        setCardBottomColor("limedark")
    } else if (firstTwoDigits === '62') {
        setCardTopColor('cyan');
        setCardBottomColor("cyandark")
    } else {
        setCardTopColor('grey');
        setCardBottomColor("greydark")
    }
}

const handleExpireDateChange=(e) => {
    const input = e.target.value.replace(/\D/g, ''); 

    if (e.nativeEvent.inputType === 'deleteContentBackward') {
        const formattedInput = input.slice(0, -1).replace(/(\d{2})(\d{0,2})/, '$1/$2');
        setExpirationDate(formattedInput);
    } else {
        const limitedInput = input.slice(0, 4); 
        const formattedInput = limitedInput.replace(/^([2-9]|1[3-9])$/, '0$1');

        const formattedExpiration = formattedInput.replace(/(\d{2})(\d{0,2})/, '$1/$2');

        setExpirationDate(formattedExpiration);
    }
}

const handleFlip=()=>{
    setFlipped(!flipped)
}


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
                    <div className='d-flex' style={{ justifyContent: "space-between", alignItems: "center", cursor: "pointer" }} onClick={() => {
                        setSwitchWindow(false);
                    }}>
                        <h2>
                            Account Details
                        </h2>
                        <FontAwesomeIcon style={{ color: 'var(--main-color)', fontSize: '30px', cursor: "pointer" }} icon={faChevronRight} />

                    </div>
                    <div className='d-flex' style={{ justifyContent: "space-between", alignItems: "center", cursor: "pointer" }} onClick={() => {
                        setSwitchWindow(true)
                    }}>
                        <h2>
                            {isLawyer ? "Widthdraw Methods" : 'Payement Methods'}

                        </h2>
                        <FontAwesomeIcon style={{ color: 'var(--main-color)', fontSize: '30px', cursor: "pointer" }} icon={faChevronRight} />

                    </div>

                </div>
                <div style={{ width: "80%", display: "flex", justifyContent: "space-around" }}>
                    {
                        !switchWindow ? <>
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
                        </> :
                            <div style={{ width: "100%" }}>
                                <div className="payment-title">
                                    <h1>Payment Information</h1>
                                </div>
                                <div style={{ display: "flex", width: "100%" }}>


                                    <div className="form-container">
                                        <div className="field-container">
                                            <label for="name">Name</label>
                                            <input id="name" maxlength="20" type="text" onFocus={() => {
                                                setFlipped(false);
                                            }} onChange={(e) => {
                                                setCardHolder(e.target.value)
                                            }}></input>
                                        </div>
                                        <div className="field-container">
                                            <label for="cardnumber">Card Number</label>
                                            <input id="cardnumber" type="text" pattern="[0-9]*" inputmode="numeric" onFocus={() => {
                                                setFlipped(false);
                                            }} value={cardNumber} onChange={handleCardNumberChange}></input>
                                            <svg id="ccicon" className="ccicon" width="750" height="471" viewBox="0 0 750 471" version="1.1" xmlns="http://www.w3.org/2000/svg"
                                            >

                                            </svg>
                                        </div>
                                        <div className="field-container">
                                            <label for="expirationdate">Expiration (mm/yy)</label>
                                            <input id="expirationdate" type="text" pattern="[0-9]*" onFocus={() => {
                                                setFlipped(false);
                                            }} inputmode="numeric" value={expirationDate} onChange={handleExpireDateChange}></input>
                                        </div>
                                        <div className="field-container">
                                            <label for="securitycode">Security Code</label>
                                            <input id="securitycode" type="text" pattern="[0-9]*" inputmode="numeric" onFocus={() => {
                                                setFlipped(true);
                                            }} value={ccv2} onChange={(e) => {
                                                const input = e.target.value.replace(/\D/g, ''); // Remove non-digit characters
                                                const limitedInput = input.slice(0, 3); // Limit the input to 3 digits

                                                setCcv2(limitedInput);
                                            }}></input>
                                        </div>
                                    </div>
                                    <CreditCard cardHolder={cardHolder} cardBottomColor={cardBottomColor} cardNumber={cardNumber} cardTopColor={cardTopColor} expirationDate={expirationDate} ccv2={ccv2} flipped={flipped} handleFlip={handleFlip}/>

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