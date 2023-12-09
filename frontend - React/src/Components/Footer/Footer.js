import "./Footer.css";
import { Link } from "react-router-dom";

export default function Footer(){
    return(
        <>
            <div className="footer-container">
                <div className="footer-navigation">
                    <div className="footer-navigation-item"><Link to="/about" className="footer-navigation-item-link" style={{color: "#000000"}}>ABOUT</Link></div>
                    <div className="footer-navigation-item"><Link to="/values" className="footer-navigation-item-link" style={{color: "#000000"}}>VALUES</Link></div>
                    <div className="footer-navigation-item"><Link to="/contact" className="footer-navigation-item-link" style={{color: "#000000"}}>CONTACT</Link></div>
                    <div className="footer-navigation-item"><Link to="/about" className="footer-navigation-item-link" style={{color: "#000000"}}>POLICIES</Link></div>
                    <div className="footer-navigation-item"><Link to="/stocklist" className="footer-navigation-item-link" style={{color: "#000000"}}>STOCKLIST</Link></div>
                </div>
                <div className="footer-rights">© 2020 all rights reserved.</div>
            </div>
        </>
    );
}