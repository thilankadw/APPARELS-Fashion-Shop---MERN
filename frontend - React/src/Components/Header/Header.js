import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo.jpg";
import Cookies from 'js-cookie';
import { REMOVE_ACTIVE_USER } from "../../app/slice/authSlice";
import { useDispatch } from "react-redux";
import ShowOnLogin, { ShowOnLogOut } from "../HiddenLinks/HiddenLink";

export default function Header(){

    const navigate = useNavigate();
    const dispatch = useDispatch();                                                                 

    const logout = async () => {

        Cookies.remove('accessToken'); 
        Cookies.remove('refreshToken'); 
        
        dispatch(REMOVE_ACTIVE_USER());
        
        navigate('/');
    };

    return(
        <>
        <div className="header">
            <div className="header-container">
                <div className="header-logo"><Link to="/" className="header-navigation-item-link"><img src={Logo} alt="" /></Link></div>
                <div className="header-naviation">
                    <div className="header-navigation-item"><Link to="/catalogue" className="header-navigation-item-link" style={{color: "#000000"}}>SHOP</Link></div>                                    
                    <div className="header-navigation-item"><Link to="/about" className="header-navigation-item-link" style={{color: "#000000"}}>ABOUT</Link></div>                                    
                    <ShowOnLogin>
                        <div className="header-navigation-item"><Link to="/basket" className="header-navigation-item-link" style={{color: "#000000"}}>CART</Link></div>  
                        <div className="header-navigation-item"><button className="header-cart-btn" onClick={() => {logout()}}>LOGOUT</button></div>                           
                    </ShowOnLogin>
                    <ShowOnLogOut>
                        <div className="header-navigation-item"><Link to="/login" className="header-navigation-item-link" style={{color: "#000000"}}>LOGIN</Link></div>     
                    </ShowOnLogOut>                                 
                </div>
            </div>  
        </div>
        
        </>
    );
}

