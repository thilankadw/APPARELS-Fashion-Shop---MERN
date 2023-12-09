import "./LoginNRegister.css";
import Login from '../../Components/Login/Login';
import Register from '../../Components/Register/Register';
import { useState } from "react";

export default function LoginNRegister(){

    const [loginVisible, setLoginVisible] = useState(true);
    const [RegisterVisible, setRegisterVisible] = useState(false);

    const displayLogin = () => {
        setRegisterVisible(false);
        setLoginVisible(true);
    }
    const displayRegister = () => {
        setLoginVisible(false);
        setRegisterVisible(true);
    }

    return(
        <>
            <div class="login-page-container">
                <div class="login-section" style={{display: loginVisible ? "block" : "none"}}>
                    <Login />
                    <button onClick={displayRegister} className="display-section-btn">Don't have an account?</button>
                </div>
                <div class="reg-section" style={{display: RegisterVisible ? "block" : "none"}}>
                    <Register />
                    <button onClick={displayLogin} className="display-section-btn">Alreday have an account?</button>
                </div>
            </div>
        </>
    );
}