import "./ContactPage.css";
import ContactPageImage from "../../assets/contact/contactpage-image.png";
import { useState } from "react";
import axiosInstance from "../../api";
import { useSelector } from "react-redux";

export default function ContactPage(){

    //userId
    const { userId, isLoggedIn } = useSelector((state) => state.auth);

    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [message, setMessage] = useState('');

    //empty details
    const [emptyContactInputs, setEmptyContactInputs] = useState(false);
    const [displayMsg, setDisplayMsg] = useState('');

    const submitContactForm = async (e) => {
        e.preventDefault();
        if(!userEmail || !message){
            setEmptyContactInputs(true);
            setDisplayMsg('Please fill all the required fields.');
        }else{
            const formData = { userName, userEmail, contactNumber, message};
            const response = await axiosInstance.post(`/inquiry/add/${userId}` ,formData);
            setDisplayMsg(response.data.message);
        }       
    }

    return(
        <>
            <div className={`${displayMsg ? 'open-update-container' : 'quantity-update-popup-container'}`} >
                <div className='update-quantity-title'>{displayMsg}</div>           
                <button class='quantity-update-close-btn' onClick={() => {setDisplayMsg(false);}}>OK</button>
            </div>
            <div className="contactpage-container">
                <img src={ContactPageImage} alt="" />
                <div className="contactform">
                    <div className="contactform-title">Contact us</div>
                    <form>
                        <div className="contactform-personaldetails">
                            <input   
                                type="text" 
                                placeholder="Name"  
                                onChange={(e) => {setUserName(e.target.value)}}/>
                            <input 
                                style={{'border-color': emptyContactInputs && !userEmail ? '#d40b11' : '#000000' }}
                                type="text" 
                                placeholder="Email" 
                                onChange={(e) => {setUserEmail(e.target.value)}}/>
                        </div>
                        <div className="contactform-contactnumber">
                            <input type="text" placeholder="Phone" onChange={(e) => {setContactNumber(e.target.value)}}/>
                        </div>
                        <div className="contactform-message">
                            <textarea 
                                style={{'border-color': emptyContactInputs && !message ? '#d40b11' : '#000000' }}
                                cols="30" 
                                rows="10" 
                                placeholder="Message" 
                                onChange={(e) => {setMessage(e.target.value)}}></textarea>
                        </div>
                        <input type="submit" value="Send" onClick={submitContactForm}/>
                    </form>
                </div>
            </div>
        </>
    );
}