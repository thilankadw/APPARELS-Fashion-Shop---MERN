import "./Values.css";
import ValuesPageImage from "../../assets/values/valuespage-image.png";

export default function ValuesPage(){
    return(
        <>
            <div className="valuespage-container">
                <div className="valuespage-image"><img src={ValuesPageImage} alt="" /></div>
                <div className="valuespage-text">
                    <div className="valuespage-text-title">APARELS VALUES<br/><br/><br/></div>
                    <div className="valuespage-text-para">Our Obsidian fabric inherits its deep black color from being woven from fine, dark threads.<br/><br/>
                                                            Right from the extraction of the fibers and their transportation for processing and drying, great care is taken to preserve the environment and foster an eco-centric attitude towards the vulnerable surrounding nature.<br/><br/><br/></div>
                    <div className="valuespage-text-title">OUR PHILOSOPHY<br/><br/><br/></div>
                    <div className="valuespage-text-para">APAREls seeks to enhance a harmonious relationship between Bog Silk and humanity. The beauty of each of our dedicatedly worked-on pieces transcends our materialistic world. Our jewelry is passionately handcrafted by local artisans based in Belarus, with years of experience in traditional methods of craftsmanship and technical innovation.<br/><br/>
                                                            At APAREls, we believe in sustainability and ethical practices. We source our materials responsibly, ensuring that they are environmentally friendly and conflict-free. Our artisans are paid fair wages and work in safe and healthy conditions. We are committed to reducing our carbon footprint and minimizing waste in every aspect of our business.<br/><br/>
                                                            Our relics are dedicated to connecting with our world to promote true happiness that goes beyond what meets the eye and strives towards what you feel deep within your soul. We find beauty in the everyday routine - in talking, touching, kissing, listening, and creating.<br/><br/>
                                                            APAREls is not about us. It's about you and the world around you. It's a wearable history in which each piece captures your moment and imagination, embodying your desired and personalized concept.<br/><br/>
                    </div>
                    <div className="valuespgae-conclusion">We continue to work in making our environment and world a safer place to live in more than one way…</div>
                </div>
            </div>
        </>
    );
}