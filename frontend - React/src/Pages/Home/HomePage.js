import "./HomePage.css";
import HomePageImage from "../../assets/home/hero_image.jpeg";

export default function HomePage(){
    return(
        <>
            <div className="homepage-container">
                <img src={HomePageImage} alt="" />
            </div>
        </>
    );
}