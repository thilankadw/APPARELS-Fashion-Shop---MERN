import "./Basket.css";
import BasketProduct from '../../Components/BasketProduct/BasketProduct';
import {Link} from 'react-router-dom';
import { useEffect, useState } from "react";
import axiosInstance from "../../api";
import { useSelector } from "react-redux";

export default function Basket(){

    const { userId } = useSelector((state) => state.auth);

    const [ cartProducts, setCartProducts ] = useState([]);
    const { cartItemList } = useSelector((state) => state.cart);

    const loadCartProducts = async () => {
        const response = await axiosInstance.get(`cart/view/cart_products/${userId}`);       
        setCartProducts(response.data.cartItemList);
    } 

    let subTotal = 0 ;
    const calculateSubTotal = () => {
        if(cartProducts){
            cartProducts.forEach((product) => {
                const total = product.productQuantity * product.productPrice;
                subTotal += total;
            });
        }       
    };
    calculateSubTotal();

    useEffect(() => {        
        loadCartProducts();
    }, [])
    
    return(
        <>
            {cartProducts ? (
                <div className="basket-container">
                    <div className="basket-header">
                        <div className="basket-product">Product</div>
                        <div className="basket-price">Price</div>
                        <div className="basket-quantity">Quantity</div>
                        <div className="basket-total">Total</div>
                    </div>
                    <div className="basket-products">
                        {cartProducts.map((product) => (
                            <BasketProduct 
                                productId={product._id}
                                Image={product.productImage}
                                productName={product.productName} 
                                productPrice={product.productPrice} 
                                quantity={product.productQuantity}
                                totalValue={product.productQuantity * product.productPrice}
                            />
                        ))}
                    </div>
                    <div className="basket-footer">
                        <div className="basket-backto-shopping-link"><Link to="/catalogue" className="basket-links">Back To Shopping</Link></div>
                        <div className="basket-checkout-section">
                            <div className="basket-subtotal">Subtotal - ${subTotal} USD</div>
                            <div className="basket-tax-note">Taxes and shipping calculated at checkout</div>
                            <div className="basket-checkout"><Link to="/checkout" className="basket-links">CHECK OUT</Link></div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className='empty-cart-container'>
                    <div className='empty-cart-container-msg-section'>
                        <div className='empty-cart-msg'>Your cart  is empty.</div>
                            <Link to='/catalogue' className="empty-cart-shop-link">SHOP</Link>
                            <Link to='/' className="empty-cart-shop-link">HOME</Link>                       
                    </div>
                </div>                
            )}     
        </>
    );
}