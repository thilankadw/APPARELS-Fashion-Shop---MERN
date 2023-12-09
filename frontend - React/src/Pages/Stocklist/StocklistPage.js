import "./StocklistPage.css";
import StocklistPageImage from "../../assets/stocklist/stocklistpage-image.png";

export default function StocklistPage(){
    return(
        <>
            <div className="stocklistpage-container">
                <img src={StocklistPageImage} alt="" />
                <div className="stocklist-countries">
                    <div className="stocklist-title">Stockists</div>
                    <div className="stocklist-country-name"><button className="stocklist-country-name">UNITED KINGDOM</button></div>
                    <div className="stocklist-country-name"><button className="stocklist-country-name">CANADA</button></div>                    
                </div>
            </div>
        </>
    );
}