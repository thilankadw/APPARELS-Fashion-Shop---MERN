import "./CatalogProduct.css";
import {Link} from "react-router-dom";

export default function CatalogProduct(props){

    const {productId, productName, productPrice, productImage} = props;

    return(
        <>
            <div className="catalog-product-container">
                <Link to={`/product/${productId}`} className="link">
                    <div className="catalog-product-image">
                        <img src={productImage} alt="" />
                    </div>
                    <div className="catalog-product-name">{productName}</div>
                    <div className="catalog-product-price">{`$ ${productPrice}`}</div>
                </Link>
            </div>
        </>
    );
}