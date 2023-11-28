import React from 'react';
import SmallNavBar from '../../components/smallnavigationbar/SmallNavBar';
import Footer from '../../components/footer/Footer';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { authentificateClient, authentificateLawyer } from '../../../features/Authentification';
function Login(props) {
    const [isSelected, setIsSelected] = useState(true);
    const [loginError, setLoginError] = useState("");
    const passwordRef = useRef();
    const emailRef = useRef();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isLoggedIn = useSelector((state) => state.authentificateStore.isLoggedIn);

    useEffect(() => {

        if (isLoggedIn) {
            navigate('/');
        }
    }, [isLoggedIn]);

    const handleLogin = () => {
        if (isSelected) {
            if ((emailRef.current.value==="admin@website.com")&&(passwordRef.current.value==="123")){
                navigate("/admin-panel")
                return;
            }
            axios.post("http://localhost:6005/lawyer/login", {
                "email": emailRef.current.value,
                "password": passwordRef.current.value
            }).then((response) => {
                console.log(response);
                if (response.status === 200) {
                    dispatch(authentificateLawyer(response.data.lawyer))
                    navigate("/")
                }

            }).catch((e) => {
                if (e.response.status === 401) {
                    if(e.response.data.status==="veriffail"){
                        setLoginError('Account not verrified yet');

                    }else{
                        setLoginError('Email or password are wrong');

                    }
                }
                console.log(e);
            })
        } else {
            axios.post("http://localhost:6005/client/login", {
                "email": emailRef.current.value,
                "password": passwordRef.current.value
            }).then((response) => {
                console.log(response);
                if (response.status === 200) {
                    dispatch(authentificateClient(response.data.client))
                    navigate("/");
                }

            }).catch((e) => {
                if (e.response.status === 401) {
                    setLoginError('Email or password are wrong');
                }
                console.log(e);
            })
        }
    }

    const handleTest = () => {
        if (isSelected) {
            emailRef.current.value = "john@gmail.com";
            passwordRef.current.value = "123"

        } else {
            emailRef.current.value = "chaima@gmail.com";
            passwordRef.current.value = "123"
        }
    }
    return (
        <div>
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
                {loginError && <span className='error-message'>{loginError}</span>}

                <div style={{ display: "flex", justifyContent: "space-around", width: "100%" }}>
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "start", alignItems: "start", width: "100%" }}>
                        <h2 style={{ textAlign: "start" }}>
                            Email<sup>*</sup>
                        </h2>
                        <div className='input-box'>
                            <input className='input-style' placeholder='' ref={emailRef}></input>
                        </div>
                    </div>
                    <div style={{ display: "flex", marginLeft: "100px", flexDirection: "column", justifyContent: "start", alignItems: "start", width: "100%" }}>
                        <h2 style={{ textAlign: "start" }}>
                            Password<sup>*</sup>
                        </h2>
                        <div className='input-box'>
                            <input className='input-style' placeholder='' type='password' ref={passwordRef}></input>

                        </div>
                    </div>

                </div><br></br>
                <div className='d-flex'>
                    <div className='submit-button' onClick={handleLogin}>
                        Login
                    </div>
                    <div className='test-button' onClick={handleTest}>
                        Get Test Profile
                    </div>
                </div>


            </div>
            <Footer />

        </div>
    );
}

export default Login;