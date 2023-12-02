import React, { useRef, useState, useEffect } from 'react';
import SmallNavBar from '../../components/smallnavigationbar/SmallNavBar';
import Footer from '../../components/footer/Footer';
import "./Signup.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { authentificate, authentificateClient, authentificateLawyer } from '../../../features/Authentification';
import { useDispatch, useSelector } from 'react-redux';
import { Radio, RadioGroup, Stack, useToast } from '@chakra-ui/react';
import { Spinner } from 'react-bootstrap';
function Signup(props) {
    const [isSelected, setIsSelected] = useState(true);
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const passwordRef = useRef();
    const bioRef = useRef();
    const emailRef = useRef();
    const dispatch = useDispatch();
    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [bioError, setBioError] = useState('');
    const [picError, setPicError] = useState('');
    const [certifError, setCertifError] = useState('');

    const [loading, setPicLoading] = useState(false);
    const [certifLoading, setCertifLoading] = useState(false);



    const [pic, setPic] = useState();
    const [certif, setCertif] = useState();

    const toast = useToast();
    const navigate = useNavigate();
    const [value, setValue] = useState('Trainee')
    const isLoggedIn = useSelector((state) => state.authentificateStore.isLoggedIn);

    useEffect(() => {

        if (isLoggedIn) {
            navigate('/');
        }
    }, [isLoggedIn]);

    const handleSubmitClick = () => {

        let isValid = true;

        if (isSelected) {
            if (firstNameRef.current.value.trim() === '') {
                setFirstNameError('First Name is required');
                isValid = false;
            } else {
                setFirstNameError('');
            }

            if (lastNameRef.current.value.trim() === '') {
                setLastNameError('Last Name is required');
                isValid = false;
            } else {
                setLastNameError('');
            }

            if (emailRef.current.value.trim() === '') {
                setEmailError('Email is required');
                isValid = false;
            } else {
                setEmailError('');
            }

            if (passwordRef.current.value.trim() === '') {
                setPasswordError('Password is required');
                isValid = false;
            } else {
                setPasswordError('');
            }

            if (bioRef.current.value.trim() === '') {
                setBioError('Bio is required');
                isValid = false;
            } else {
                setBioError('');
            }

            if (!pic) {
                setPicError('Profile Picture is required');
                isValid = false;
            } else {
                setPicError('');
            }

            if (!certif) {
                setCertifError('Certificate is required');
                isValid = false;
            } else {
                setCertifError('');
            }
            if (isValid) {
                var requestData = {
                    firstName: firstNameRef.current.value,
                    lastName: lastNameRef.current.value,
                    password: passwordRef.current.value,
                    email: emailRef.current.value,
                    bio: bioRef.current.value,
                    profilePic: pic,
                    category: value,
                    certifPic:certif
                }
                axios.post("http://localhost:6005/lawyer/signup", requestData).then((response) => {
                    //dispatch(authentificateLawyer(response.data.lawyer))

                    navigate('/');
                }).catch((e) => {
                    console.log(e);
                });

            }
        } else {
            if (firstNameRef.current.value.trim() === '') {
                setFirstNameError('First Name is required');
                isValid = false;
            } else {
                setFirstNameError('');
            }

            if (lastNameRef.current.value.trim() === '') {
                setLastNameError('Last Name is required');
                isValid = false;
            } else {
                setLastNameError('');
            }

            if (emailRef.current.value.trim() === '') {
                setEmailError('Email is required');
                isValid = false;
            } else {
                setEmailError('');
            }

            if (passwordRef.current.value.trim() === '') {
                setPasswordError('Password is required');
                isValid = false;
            } else {
                setPasswordError('');
            }

            if (isValid) {
                requestData = {
                    firstName: firstNameRef.current.value,
                    lastName: lastNameRef.current.value,
                    password: passwordRef.current.value,
                    email: emailRef.current.value,
                }
                axios.post("http://localhost:6005/client", requestData).then((response) => {
                    console.log(response.data);
                    dispatch(authentificateClient(response.data.client))
                    navigate('/');

                }).catch((e) => {
                    console.log(e);
                });

            }

        }


    }
    const picRef = useRef();
    const certifRef = useRef();

    const postDetails = (pics) => {
        setPicLoading(true);
        setPicError("")
        if (pics === undefined) {
            toast({
                title: "Please Select an Image!",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }
        if (pics.type === "image/jpeg" || pics.type === "image/png") {
            const data = new FormData();
            data.append("file", pics);
            data.append("upload_preset", "lawyer-consultation");
            data.append("cloud_name", "slimskhab");
            axios.post("https://api.cloudinary.com/v1_1/slimskhab/image/upload", data).then((res) => {
                setPic(res.data.url)
                setPicLoading(false);

            }).catch((err) => {
                setPicLoading(false);
            });


        } else {
            toast({
                title: "Please Select an Image!",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setPicLoading(false);
            return;
        }

    }

    const handleCertifUpload = (pics) => {
        setCertifError("")
        if (pics === undefined) {
            toast({
                title: "Please Select an Image!",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }
        if (pics.type === "image/jpeg" || pics.type === "image/png") {
            const data = new FormData();
            data.append("file", pics);
            data.append("upload_preset", "lawyer-consultation");
            data.append("cloud_name", "slimskhab");
            setCertifLoading(true);

            axios.post("https://api.cloudinary.com/v1_1/slimskhab/image/upload", data).then((res) => {
                setCertif(res.data.url)
                setCertifLoading(false);

            }).catch((err) => {
                setCertifLoading(false);
            });


        } else {
            toast({
                title: "Please Select an Image!",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setCertifLoading(false);
            return;
        }

    }
    return (
        <div >
            <SmallNavBar />
            <div style={{ padding: "50px", display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
                <div className='d-flex'>
                    <div className={isSelected ? 'isselected-button' : 'isnotselected-button'} onClick={() => {
                        setIsSelected(true);
                    }}>
                        As Lawyer
                    </div>
                    <div className={isSelected ? 'isnotselected-button' : 'isselected-button'} onClick={() => {
                        setIsSelected(false);
                    }}>
                        As Client
                    </div>
                </div>
                <br></br>
                {
                    isSelected && (<div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
                        <h2>
                            Profile Picture<sup>*</sup>
                        </h2>
                        <div className='profile-image-container' style={{border:picError?"1px solid red":"1px solid var(--main-color)"}} onClick={() => {
                            picRef.current.click()
                        }}>
                            {

                                loading ? <Spinner animation="border" role="status" style={{ color: "var(--main-color)" }}>
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner> :
                                    pic ? <img src={pic} className='profile-image-container'></img> :
                                        <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 70 70" fill="none">
                                            <path d="M56.651 39.9929C55.7672 39.9929 54.9196 40.3441 54.2947 40.9694C53.6697 41.5947 53.3186 42.4427 53.3186 43.327V44.594L48.3866 39.6595C46.6452 37.9309 44.2915 36.9609 41.8384 36.9609C39.3854 36.9609 37.0317 37.9309 35.2903 39.6595L32.9576 41.9933L24.6932 33.7247C22.9274 32.043 20.5829 31.105 18.145 31.105C15.7071 31.105 13.3626 32.043 11.5968 33.7247L6.66483 38.6592V19.9881C6.66483 19.1039 7.01592 18.2558 7.64087 17.6305C8.26582 17.0053 9.11343 16.654 9.99724 16.654H33.3241C34.2079 16.654 35.0556 16.3027 35.6805 15.6775C36.3055 15.0522 36.6565 14.2041 36.6565 13.3199C36.6565 12.4356 36.3055 11.5876 35.6805 10.9623C35.0556 10.337 34.2079 9.98575 33.3241 9.98575H9.99724C7.34581 9.98575 4.80297 11.0396 2.92812 12.9154C1.05328 14.7912 0 17.3353 0 19.9881V59.9976C0 62.6504 1.05328 65.1946 2.92812 67.0704C4.80297 68.9462 7.34581 70 9.99724 70H49.9862C52.6376 70 55.1805 68.9462 57.0553 67.0704C58.9302 65.1946 59.9834 62.6504 59.9834 59.9976V43.327C59.9834 42.4427 59.6323 41.5947 59.0074 40.9694C58.3825 40.3441 57.5348 39.9929 56.651 39.9929ZM9.99724 63.3317C9.11343 63.3317 8.26582 62.9805 7.64087 62.3552C7.01592 61.7299 6.66483 60.8819 6.66483 59.9976V48.0948L16.3288 38.4258C16.8184 37.9591 17.4687 37.6987 18.145 37.6987C18.8213 37.6987 19.4716 37.9591 19.9612 38.4258L30.5249 48.995L44.8543 63.3317H9.99724ZM53.3186 59.9976C53.3138 60.6359 53.1035 61.2556 52.7188 61.7647L37.6896 46.6611L40.0223 44.3272C40.2612 44.0833 40.5464 43.8895 40.8611 43.7571C41.1758 43.6248 41.5137 43.5567 41.8551 43.5567C42.1965 43.5567 42.5344 43.6248 42.8491 43.7571C43.1639 43.8895 43.449 44.0833 43.6879 44.3272L53.3186 54.0295V59.9976ZM69.0143 10.9526L59.017 0.95027C58.7001 0.64673 58.3264 0.40879 57.9173 0.250104C57.106 -0.0833681 56.196 -0.0833681 55.3847 0.250104C54.9757 0.40879 54.6019 0.64673 54.285 0.95027L44.2878 10.9526C43.6603 11.5805 43.3077 12.432 43.3077 13.3199C43.3077 14.2078 43.6603 15.0593 44.2878 15.6871C44.9153 16.3149 45.7664 16.6676 46.6538 16.6676C47.5412 16.6676 48.3923 16.3149 49.0198 15.6871L53.3186 11.3527V29.9905C53.3186 30.8748 53.6697 31.7228 54.2947 32.3481C54.9196 32.9733 55.7672 33.3246 56.651 33.3246C57.5348 33.3246 58.3825 32.9733 59.0074 32.3481C59.6323 31.7228 59.9834 30.8748 59.9834 29.9905V11.3527L64.2823 15.6871C64.592 15.9996 64.9606 16.2476 65.3667 16.4169C65.7728 16.5862 66.2083 16.6733 66.6483 16.6733C67.0882 16.6733 67.5238 16.5862 67.9298 16.4169C68.3359 16.2476 68.7045 15.9996 69.0143 15.6871C69.3266 15.3772 69.5745 15.0084 69.7437 14.6021C69.9129 14.1958 70 13.76 70 13.3199C70 12.8797 69.9129 12.4439 69.7437 12.0376C69.5745 11.6314 69.3266 11.2626 69.0143 10.9526Z" fill={picError?"red":"#001F3F"} />
                                        </svg>
                            }

                        </div>
                        {
                            picError && <span className='error-message'>{picError}</span>
                        }
                        <input type='file' style={{ visibility: "hidden" }} ref={picRef} onChange={(e) => postDetails(e.target.files[0])}></input>

                    </div>)
                }

                <div style={{ display: "flex", justifyContent: "space-around", width: "100%" }}>
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "start", alignItems: "start", width: "100%" }}>
                        <h2 style={{ textAlign: "start" }}>
                            First Name<sup>*</sup>
                        </h2>
                        <div className='input-box' style={{ border: firstNameError === "" ? "1px solid var(--main-color)" : "1px red solid" }}>
                            <input className='input-style' placeholder='' ref={firstNameRef} onChange={(e) => {
                                if (firstNameRef.current.value.trim() === "") {
                                    setFirstNameError("First Name is required")
                                } else {
                                    setFirstNameError("");

                                }
                            }}></input>
                            {firstNameError && <span className='error-message'>{firstNameError}</span>}

                        </div>
                    </div>
                    <div style={{ display: "flex", marginLeft: "100px", flexDirection: "column", justifyContent: "start", alignItems: "start", width: "100%" }}>
                        <h2 style={{ textAlign: "start" }}>
                            Last Name<sup>*</sup>
                        </h2>
                        <div className='input-box' style={{ border: lastNameError === "" ? "1px solid var(--main-color)" : "1px red solid" }}>
                            <input className='input-style' placeholder='' ref={lastNameRef} onChange={(e) => {
                                if (lastNameRef.current.value.trim() === "") {
                                    setLastNameError("Last Name is required")
                                } else {
                                    setLastNameError("");

                                }
                            }}></input>
                            {lastNameError && <span className='error-message'>{lastNameError}</span>}

                        </div>
                    </div>
                </div>
                <br></br>
                <div style={{ display: "flex", justifyContent: "space-around", width: "100%" }}>
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "start", alignItems: "start", width: "100%" }}>
                        <h2 style={{ textAlign: "start" }}>
                            Email<sup>*</sup>
                        </h2>
                        <div className='input-box' style={{ border: emailError === "" ? "1px solid var(--main-color)" : "1px red solid" }}>
                            <input className='input-style' placeholder='' ref={emailRef} onChange={(e) => {
                                if (emailRef.current.value.trim() === "") {
                                    setEmailError("Email is required")
                                } else {
                                    setEmailError("");

                                }
                            }}></input>
                            {emailError && <span className='error-message'>{emailError}</span>}

                        </div>
                    </div>
                    <div style={{ display: "flex", marginLeft: "100px", flexDirection: "column", justifyContent: "start", alignItems: "start", width: "100%" }}>
                        <h2 style={{ textAlign: "start" }}>
                            Password<sup>*</sup>
                        </h2>
                        <div className='input-box' style={{ border: passwordError === "" ? "1px solid var(--main-color)" : "1px red solid" }}>
                            <input className='input-style' placeholder='' type='password' onChange={(e) => {
                                if (passwordRef.current.value.trim() === "") {
                                    setPasswordError("Password is required")
                                } else {
                                    setPasswordError("");

                                }
                            }} ref={passwordRef}></input>
                            {passwordError && <span className='error-message'>{passwordError}</span>}

                        </div>
                    </div>

                </div>
                <br></br>
                {
                    isSelected && <div style={{ display: "flex", justifyContent: "space-around", width: "100%" }}>
                        <div style={{ display: "flex", flexDirection: "column", justifyContent: "start", alignItems: "start", width: "100%" }}>
                            <h2 style={{ textAlign: "start" }}>
                                Category<sup>*</sup>
                            </h2>
                            <RadioGroup onChange={setValue} value={value}>
                                <Stack direction='row' className='radio-buttons'>
                                    <Radio value='Trainee'>Trainee Lawyer</Radio>
                                    <Radio value='Litigation'>Litigation Lawyer</Radio>
                                    <Radio value='Appeal'>Appeal Lawyer</Radio>
                                </Stack>
                            </RadioGroup>
                        </div>

                    </div>
                }

                <br>
                </br>
                {
                    isSelected && (
                        <div style={{ display: "flex", flexDirection: "column", justifyContent: "start", alignItems: "start", width: "100%" }}>
                            <h2 style={{ textAlign: "start" }}>
                                Bio<sup>*</sup>
                            </h2>
                            <div className='input-box' style={{ height: "195px", padding: 10, border: bioError === "" ? "1px solid var(--main-color)" : "1px red solid" }}>
                                <textarea className='input-style' placeholder='' rows='5' style={{ resize: "none" }} ref={bioRef} onChange={(e) => {
                                    if (bioRef.current.value.trim() === "") {
                                        setBioError("Bio is required")
                                    } else {
                                        setBioError("");

                                    }
                                }}></textarea >

                            </div>
                            {bioError && <span className='error-message'>{bioError}</span>}

                        </div>
                    )
                }
                <br></br>
                {
                    isSelected && (<div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
                        <div style={{ display: "flex", flexDirection: "column", justifyContent: "start", alignItems: "start", width: "100%" }}>
                            <h2 style={{ textAlign: "start" }}>
                                Add Your Law Degree<sup>*</sup>
                            </h2>

                        </div>
                        {
                            certif?<img src={certif} style={{height:200,width:200,alignSelf:"center"}} onClick={()=>{
                                setCertif();
                                certifRef.current.click();
                            }}>
                            </img>:  <div className="degree-container" style={{ alignSelf: "center",border:certifError?"4px dashed red":" 4px dashed #003C73" }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="71" height="71" viewBox="0 0 71 71" fill="none">
                                <path d="M47.3332 47.3333L35.4998 35.5L23.6665 47.3333" stroke="black" stroke-opacity="0.4" stroke-width="2" strokeLinecap="round" stroke-linejoin="round" />
                                <path d="M35.5 35.5V62.125" stroke="#003C73" stroke-width="5" strokeLinecap="round" stroke-linejoin="round" />
                                <path d="M60.3202 54.4038C63.2056 52.8308 65.485 50.3417 66.7986 47.3293C68.1122 44.317 68.3853 40.9529 67.5747 37.7682C66.7641 34.5834 64.916 31.7593 62.3221 29.7415C59.7281 27.7237 56.5361 26.6272 53.2498 26.6251H49.5223C48.6269 23.1616 46.9579 19.9461 44.6409 17.2205C42.3239 14.4949 39.4192 12.3299 36.145 10.8885C32.8709 9.44709 29.3126 8.76666 25.7377 8.89837C22.1627 9.03009 18.6641 9.97053 15.505 11.649C12.3458 13.3274 9.60822 15.7002 7.49808 18.589C5.38793 21.4777 3.96011 24.8073 3.32197 28.3273C2.68383 31.8473 2.85197 35.4661 3.81374 38.9118C4.77552 42.3574 6.50591 45.5402 8.87482 48.2209" stroke="#003C73" stroke-width="5" strokeLinecap="round" stroke-linejoin="round" />
                                <path d="M47.3332 47.3333L35.4998 35.5L23.6665 47.3333" stroke="#003C73" stroke-width="5" strokeLinecap="round" stroke-linejoin="round" />
                            </svg>
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "start" }}>
                                <p className='select-file-text' style={{color:certifError?"red":"black"}}>Select a file or drag and drop here</p>
                                <p className='file-types-text'>JPG, PNG or PDF, file size no more than 10MB</p>
                            </div>
                            <div className="select-button" onClick={()=>{
                                certifRef.current.click();
                            }}>
                                {
                                    certifLoading?<Spinner animation="border" role="status" style={{ color: "var(--main-color)" }}>
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner>:<div>Select File
                                        </div>
                                }
                            </div>
                            
                        </div>
                        
                        }
                      {
                            certifError && <span className='error-message'>{certifError}</span>
                        }
                        <input type='file' style={{ visibility: "hidden" }} ref={certifRef} onChange={(e) => handleCertifUpload(e.target.files[0])}></input>

                    </div>)
                }
                <br></br>
                <div className='submit-button' onClick={handleSubmitClick}>
                    Submit
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Signup;