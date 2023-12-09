import "./Login.css";
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Cookies from 'js-cookie';
import { useDispatch } from "react-redux";
import { SET_ACTIVE_USER } from "../../app/slice/authSlice";

export default function Login() {

    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[inputMsg,setInputMsg] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const loginSubmit = async (e) => {
        e.preventDefault();

        try{
            if(!email || !password){
                setInputMsg(true);
            }else {
                const loginData = { email, password };

                const response = await axios.post('http://localhost:3080/api/user/login', loginData);

                const userId = response.data.userId;
                const accessToken = response.data.accessToken;
                const refreshToken = response.data.refreshToken;
                
                if (response.data.isSuccess) {

                    Cookies.set('accessToken', accessToken, { expires: 7 }); 
                    Cookies.set('refreshToken', refreshToken, { expires: 30 }); 

                    dispatch(SET_ACTIVE_USER({userId: userId}));

                    navigate('/');
                }
            }
        }catch(error){
            console.error('Error submitting form:', error);
        }
    };

    return(
        <>
            <div className="register-page-container">
                <div className="register-page-header">Login</div>
                <form className="register-form" >
                    <div className="regiter-form-input-field">
                        <label className="register-form-label">Email</label>
                        <input 
                            style={{'border-color': inputMsg && !email ? '#d40b11' : '#000000' }}
                            type="email"
                            name="email"
                            onChange={(e) => {setEmail(e.target.value);}}
                            className="register-form-input"/>
                        <div style={{display: inputMsg && !email ?  'block': 'none'}} className="empty-inputs-msg">Email is Required.</div>
                    </div>
                    <div className="regiter-form-input-field">
                        <label className="register-form-label">Password</label>
                        <input 
                            style={{'border-color': inputMsg && !password ? '#d40b11' : '#000000' }}
                            type="password"
                            name="password"
                            onChange={(e) => {setPassword(e.target.value);}}
                            className="register-form-input"/>
                        <div style={{display: inputMsg && !password ?  'block': 'none'}} className="empty-inputs-msg">Password is Required.</div>
                    </div>
                    <div className="regiter-form-input-field-submit">
                        <input 
                            type="submit" 
                            value="Submit" 
                            className="register-form-input" 
                            id="login-form-submit"
                            onClick={loginSubmit} />
                    </div>
                </form>
                
            </div>
        </>
    );
}