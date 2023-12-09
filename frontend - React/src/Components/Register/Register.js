import "./Register.css";
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axiosInstance from '../../api';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useDispatch } from "react-redux";
import { SET_ACTIVE_USER } from "../../app/slice/authSlice";

export default function Register() {

    const[firstname, setFirstname] = useState("");
    const[lastname, setLastname] = useState("");
    const[email, setEmail] = useState("");
    const[contactNumber, setContactNumber] = useState("");
    const[address, setAddress] = useState("");
    const[password, setPassword] = useState("");
    const[confirmPassword, setConfirmPassword] = useState("");
    const[inputMsg,setInputMsg] = useState(false);
    const[passwordMismatch, setPasswordMismatch] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const registerSubmit = async (e) => {
        e.preventDefault();
        
        try{

            if(!firstname || !email || !address || !password || !confirmPassword){
                setInputMsg(true);
            }else if(!(password===confirmPassword)){
                setPasswordMismatch(true);
            }else{
                const regData = { firstname, lastname, email, contactNumber, address, password };

                const response = await axios.post('http://localhost:3080/api/user/signup', regData);

                const message = response.data.message;
                const userId = response.data.userId;
                const accessToken = response.data.accessToken;
                const refreshToken = response.data.refreshToken;
                
                if (response.data.isRegistersuccess) {
                    
                    Cookies.set('accessToken', accessToken, { expires: 7 }); 
                    Cookies.set('refreshToken', refreshToken, { expires: 30 }); 
                
                    dispatch(SET_ACTIVE_USER({userId: userId,}))

                    navigate('/');
                }
            }
        }catch(error){
            console.error('Error submitting form:', error);
        }
    }

    
    return(
        <> 
            <div className="register-page-container">
                <div className="register-page-header">Register</div>
                <form className="register-form">
                    <div className="regiter-form-input-field">
                        <label className="register-form-label">First Name</label>
                        <input 
                            style={{'border-color': inputMsg && !firstname ? '#d40b11' : '#000000' }}
                            type="text"
                            name="firstname"
                            onChange={(e) => {setFirstname(e.target.value);}}
                            placeholder="Enter your first name"                           
                            className="register-form-input"/>
                        <div style={{display: inputMsg && !firstname ?  'block': 'none'}} className="empty-inputs-msg">First name is Required.</div>
                    </div>
                    <div className="regiter-form-input-field">
                        <label className="register-form-label">Last Name</label>
                        <input
                            type="text"
                            name="lastname"
                            onChange={(e) => {setLastname(e.target.value);}}
                            placeholder="Enter your last name"                          
                            className="register-form-input"/>
                    </div>
                    <div className="regiter-form-input-field">
                        <label className="register-form-label">Email</label>
                        <input 
                            style={{'border-color': inputMsg && !email ? '#d40b11' : '#000000' }}
                            type="email" 
                            name="email"
                            onChange={(e) => {setEmail(e.target.value); }}
                            placeholder="Enter your email"                           
                            className="register-form-input"/>
                        <div style={{display: inputMsg && !email ?  'block': 'none'}} className="empty-inputs-msg">Email is Required.</div>
                    </div>
                    <div className="regiter-form-input-field">
                        <label className="register-form-label">Contact Number</label>
                        <input
                            type="text"
                            name="contactnumber"
                            onChange={(e) => {setContactNumber(e.target.value);}}
                            placeholder="Enter your contact number"                           
                            className="register-form-input"/>
                    </div>
                    <div className="regiter-form-input-field">
                        <label className="register-form-label">Address</label>
                        <input
                            style={{'border-color': inputMsg && !address ? '#d40b11' : '#000000' }}
                            type="text"
                            name="address"
                            onChange={(e) => {setAddress(e.target.value);}}
                            placeholder="Enter your address"                            
                            className="register-form-input"/>
                        <div style={{display: inputMsg && !address ?  'block': 'none'}} className="empty-inputs-msg">Address is Required.</div>
                    </div>
                    <div className="regiter-form-input-field">
                        <label className="register-form-label">Password</label>
                        <input
                            style={{'border-color': inputMsg && !password || passwordMismatch ? '#d40b11' : '#000000' }}
                            type="password"
                            name="password"
                            onChange={(e) => {setPassword(e.target.value);}}
                            placeholder="Enter your password"      
                            className="register-form-input"/>
                        <div style={{display: inputMsg && !password ?  'block': 'none'}} className="empty-inputs-msg">Password is Required.</div>
                    </div>
                    <div className="regiter-form-input-field">
                        <label className="register-form-label">Confirm Password</label>
                        <input
                            style={{'border-color': inputMsg && !confirmPassword || passwordMismatch ? '#d40b11' : '#000000' }}
                            type="password"
                            name="password"
                            onChange={(e) => {setConfirmPassword(e.target.value);}}
                            placeholder="Enter your password"      
                            className="register-form-input"/>
                        <div style={{display: inputMsg && !confirmPassword ?  'block': 'none'}} className="empty-inputs-msg">Confirm password is Required.</div>              
                    </div>
                    <div className="regiter-form-input-field-submit">
                        <input 
                            type="submit" 
                            className="register-form-input" 
                            id="reg-form-submit"
                            onClick={registerSubmit}/>
                    </div>
                </form>
            </div>
        </>
    );
}