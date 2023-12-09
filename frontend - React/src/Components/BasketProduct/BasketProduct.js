import "./BasketProduct.css";
import {useState} from "react";
import axiosInstance from "../../api";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';


export default function Basket(props) {

    const [productQuantity, setProductQuantity] = useState(props.quantity || 1);
    const [quantityUpdateVisible, setQuantityUpdateVisible] = useState(false);
    const [notifyMsgVisible, setNotifyMsgVisible] = useState(null);

    const quantityDecrement = () => {
        if(!(productQuantity <= 1)){
            setProductQuantity(productQuantity-1);
        }
    };

    const quantityIncrement = () => {
        setProductQuantity(productQuantity+1);
    }

    const removeCartProduct = async () => {
        const response = await axiosInstance.delete(`cart/delete/cart_products/${props.productId}`);

        if(response.data.isSuccess){
            setNotifyMsgVisible(response.data.message);           
        }
    }

    const hideNotifyMsg = async () => {
        setNotifyMsgVisible(null);
        window.location.reload();
    }

    const updateQuantity = async () => {
        const productQuantityData = { productQuantity };
        const response = await axiosInstance.put(`cart/update/quantity/${props.productId}` ,productQuantityData);
        setQuantityUpdateVisible(false);
        if(response.data){
            setNotifyMsgVisible(response.data.message);
        }else{
            setNotifyMsgVisible("Couldn't update quantity");
        }       
    }

    //icons
    icon({name: 'pen-to-square', style: 'regular'});
    icon({name: 'trash', style: 'solid'});
    icon({name: 'plus', style: 'solid'});
    icon({name: 'minus', style: 'solid'});

    return(
        <>
            <div className={`${notifyMsgVisible ? 'open-update-container' : 'quantity-update-popup-container'}`} >
                <div className='update-quantity-title'>{notifyMsgVisible}</div>           
                <button class='quantity-update-close-btn' onClick={hideNotifyMsg}>OK</button>
            </div>

            <div className={`${quantityUpdateVisible ? 'open-update-container' : 'quantity-update-popup-container'}`} >
                <div className='update-quantity-title'>Update Quantity</div>           
                <div className="basket-product-quantity-update-btn-container">
                    <input type='number' value={productQuantity} class='update-quantity-input'></input>
                    <div className="basket-product-quantity-update-btn">
                        <button onClick={quantityIncrement} className="basket-quantity-setters">
                            <FontAwesomeIcon icon={icon({name: 'plus'})} />
                        </button>
                        <button onClick={quantityDecrement} className="basket-quantity-setters">
                        <FontAwesomeIcon icon={icon({name: 'minus'})} />
                        </button>
                    </div>
                </div>
                <button class='quantity-update-close-btn' onClick={updateQuantity}>Update Quantity</button>
            </div>
            <div className="basket-product-container">
                <div className="basket-product-image">
                    <img src={props.Image} alt="" class='basket-product-image-container'/>
                    <div className="basket-product-remove">
                        <div className="basket-product-name">{props.productName}</div>
                        <button className="basket-product-remove-btn" onClick={removeCartProduct}>
                            <FontAwesomeIcon icon={icon({name: 'trash'})} />
                        </button>
                    </div>
                </div>
                <div className="basket-product-price">${props.productPrice}</div>
                <div className="basktet-product-quantity-section">
                    <div className="basket-product-quantity">{props.quantity}</div>
                    <div className="basket-product-quantity-btn">
                        <button onClick={() => {setQuantityUpdateVisible(true)}} className="basket-quantity-setters">
                            <FontAwesomeIcon icon={icon({name: 'pen-to-square'})} />
                        </button>
                    </div>
                </div>
                <div className="basket-product-total">${props.totalValue}</div>
            </div>
        </>
    );
}