import "./Product.css";
import {useState, useEffect} from "react";
import {Link, useParams } from "react-router-dom";
import axiosInstance from '../../api';
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';

export default function Product(){

    const { userId } = useSelector((state) => state.auth);

    const [productSize, setProductSize] = useState("M");
    const [productQuantity, setProductQuantity] = useState(1);
    const [sizeVisible, setSizeVisible] = useState(false);
    const [product, setProduct] = useState({});
    const {productId} = useParams();
    const [productName, setProductName] = useState(null);
    const [productPrice, setProductPrice] = useState(null);
    const [displayMsg, setDisplayMsg] = useState(null);

    const loadProductDetails = async () => {
        try {
          const response = await axiosInstance.get(`/product/details/${productId}`);
          setProduct(response.data);
          setProductName(response.data.productName);
          setProductPrice(response.data.productRegularPrice);          
        } catch (err) {
          console.error(err);
        }
    };

    const handleClickOutsideSelection = (e) => {
        if (
          !e.target.closest(".product-details-size-section") &&
          !e.target.closest(".size-selection")
        ) {
          setSizeVisible(false);
        }
    };

    useEffect(() => {
        loadProductDetails();
    }, []);

    useEffect(() => {
        window.addEventListener("click", handleClickOutsideSelection);

        return () => {
          window.removeEventListener("click", handleClickOutsideSelection);
        };
    }, []);

    const quantityDecrement = () => {
        if(!(productQuantity <= 1)){
            setProductQuantity(productQuantity-1);
        }
    };
    const quantityIncrement = () => {
        if(productQuantity < product.productAvailableQuantity){
            setProductQuantity(productQuantity+1);
        }else{
            setProductQuantity(productQuantity);
        }
        
    }

    const displaySizeSelection = () => {
        setSizeVisible(!sizeVisible);
    }

    const addToCart = async (e) => {
        e.preventDefault();  

        try{
            const formData = { userId, productId, productName, productSize, productQuantity, productPrice };           
            const response = await axiosInstance.post('cart/add', formData);
             if(response.data.isSuccess){
                setDisplayMsg(response.data.message);
             }else if(response.data.isAlreadyAdded) {
                setDisplayMsg(response.data.message);
             }   
        }catch(error){
            console.error('Error submitting form:', error);
        }
    }

    //icons
    icon({name: 'plus', style: 'solid'});
    icon({name: 'minus', style: 'solid'});

    return(
        <>
            <div className={`${displayMsg ? 'open-update-container' : 'quantity-update-popup-container'}`} >
                <div className='update-quantity-title'>{displayMsg}</div>           
                <button class='quantity-update-close-btn' onClick={() => {setDisplayMsg(null);}}>OK</button>
            </div>
            <div className="product-container">
                <div className="product-images">
                    {product && product.productImages && product.productImages.map((image, index) => (
                        <img key={index} src={image} alt={`Product ${index + 1}`} class='product-container-product-image-container'/>
                    ))}
                </div>
                <div className="product-details">
                    <div className="product-details-name">{product.productName}</div>
                    <div className="product-details-color">{product.productColor}</div>
                    <div className="product-details-size-section">
                        <div className="product-details-size-label">Size</div>
                        <button className="product-details-size" onClick={displaySizeSelection}>{productSize}</button>
                    </div>                   
                    <div className="size-selection" style={{ display: sizeVisible ? "block" : "none" }}>
                        {product && product.productSizes && product.productSizes.map((productSize) => (
                            <button key={productSize} className="size-select-btn" onClick={() => { setProductSize(productSize) }}>
                                {productSize}
                            </button>
                        ))}
                    </div>
                    <div className="product-details-quantity-section">
                        <div className="product-details-quantity-label">Quantity</div>
                        <button className="quantity-decrement" onClick={quantityDecrement}>
                            <FontAwesomeIcon icon={icon({name: 'minus'})} />
                        </button>
                        <div className="product-details-quantity">{productQuantity}</div>
                        <button className="quantity-increment" onClick={quantityIncrement}>
                            <FontAwesomeIcon icon={icon({name: 'plus'})} />
                        </button>
                    </div>
                    <div className="product-details-price">$ {product.productRegularPrice}</div>
                    <button className="product-details-addtocart-btn" onClick={addToCart}>Add To Cart</button>
                    <div className="product-details-footer">
                        <div className="product-details-footer-label">Need Help?</div>
                        <Link to="/contact" className="product-details-footer-contact-page-link">Contact Us</Link>
                    </div>
                </div>
            </div>
        </>
    );
}