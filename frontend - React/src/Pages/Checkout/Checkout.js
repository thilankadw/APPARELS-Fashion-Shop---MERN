import "./Checkout.css";
import {Link, useNavigate} from 'react-router-dom';
import {useState, useEffect} from "react";
import axiosInstance from "../../api";
import { useSelector } from "react-redux";

export default function CheckoutPages() {

    const { userId } = useSelector((state) => state.auth);

    const [notifyMsgVisible, setNotifyMsgVisible] = useState(null);
    const [informationVisible, setInformationVisible] = useState(true);
    const [shippingVisible, setShippingVisible] = useState(false);
    const [paymentVisible, setPaymentVisible] = useState(false);
    const [contact, setContact] = useState();
    const [firstname, setFirstname] = useState();
    const [lastname, setLastname] = useState();
    const [apartment, setApartment] = useState();
    const [street, setStreet] = useState();
    const [city, setCity] = useState();
    const [country, setCountry] = useState();
    const [postalCode, setPostalCode] = useState();
    const [shippingMethod, setShippingMethod] = useState();
    const [cardNumber, setCardNumber] = useState();
    const [nameOnCard, setNameOnCard] = useState();
    const [cardExpirationDate, setCardExpirationDate] = useState();
    const [cardSecurityCode, setCardSecurityCode] = useState(); 
    const [shippingFee, setShippingFee] = useState(0.00);
    const [cartProducts, setCartProducts] = useState();
    const [inputMsg,setInputMsg] = useState(false);
    const [displayMsg, setDisplayMsg] = useState(false);
    const [emptyCard, setEmptyCard] = useState(false);
    const [securityCodeError, setSecurityCodeError] = useState(null);
    const [invalidPostalCode, setInvalidPostalCode] = useState(false);
    const navigate = useNavigate();

    const loadCartProducts = async () => {
        const response = await axiosInstance.get(`cart/view/cart_products/${userId}`);
        setCartProducts(response.data.cartItemList);
    } 

    useEffect(() => {   
        loadCartProducts();
    }, []);

    //checkout page navvigation functions
    const continueShipping = () => {
        if(!contact || !firstname || !apartment || !city || !country || !postalCode){
            setInformationVisible(true);
            setShippingVisible(false);
            setInputMsg(true);
            setDisplayMsg('Please fill all the required fields.');
        }else if(!validatePostalCode(postalCode)){
            setInvalidPostalCode(true);
            setDisplayMsg('Invalid Postal Code.');
        }else{
            setInformationVisible(false);
            setShippingVisible(true);
        }          
    }
    const backwardBilling = () => {
        setShippingVisible(false);
        setInformationVisible(true);
    }
    const continueBilling = () => {
        if(!shippingMethod){
            setShippingVisible(true);
            setPaymentVisible(false);   
            setDisplayMsg('Select a shipping method to continue.');
        }else{
            setShippingVisible(false);
            setPaymentVisible(true);
        }       
    }
    const backwardShipping = () => {
        setPaymentVisible(false);
        setShippingVisible(true);
    }
    

    //calculate subtotal
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

    //calculate total payable amount(products+shipping)  
    const total = subTotal + shippingFee;

    //validate postal code
    const validatePostalCode = (input) => {
        const postalCodeRegex = /^[0-9]+$/;
        return postalCodeRegex.test(input);
    };
    

    //validate card details
    const validateCardNumber = (input) => {
        const cardNumberRegex =  /^[0-9]{12}$/; 
        return cardNumberRegex.test(input);
    };
    const validateNameOnCard = (input) => {
        const nameOnCardRegex = /^[A-Za-z]+$/;
        return nameOnCardRegex.test(input);
    };
    const validateExpireDate = (input) => {
        const expireDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    
        if (!expireDateRegex.test(input)) {
            return false;
        }

        const [month, year] = input.split('/').map(part => parseInt(part, 10));
        const currentDate = new Date();
        const inputDate = new Date(2000 + year, month - 1);

        if (inputDate < currentDate) {
            return false;
        }
        return true;
    };
    const validateSecurityCode = (input) => {
        const securityCodeRegex = /^[0-9]{3}$/;
        return securityCodeRegex.test(input);
    };    

    const completePayment = async () => {
        if(!cardNumber || !nameOnCard || !cardExpirationDate || !cardSecurityCode){
            setEmptyCard(true);
            setDisplayMsg('Please fill all the required fields.');
        }else if(!validateCardNumber(cardNumber)){          
            setDisplayMsg('Invalid card number');
        }else if(!validateNameOnCard(nameOnCard)){          
            setDisplayMsg('Invalid name.');
        }else if(!validateExpireDate(cardExpirationDate)){          
            setDisplayMsg('Invalid expire date.');
        }else if(!validateSecurityCode(cardSecurityCode)){          
            setDisplayMsg('Please enter a valid security code.');
        }else{
            const cartProductList = cartProducts.map(product => ({
                productId: product.productId,
                productName: product.productName,
                productQuantity: product.productQuantity,
                productSize: product.productSize,
                productPrice: product.productPrice,
            }));
            const orderData = {
                userId: userId, 
                shippingEmail: contact,
                shippingDetails: {
                    firstName: firstname,
                    lastName: lastname,
                    apartment: apartment,
                    street: street,
                    city: city,
                    country: country,
                    postalCode: postalCode
                },
                productList: cartProductList,
                shippingMethod: shippingMethod,
                totalAmount: total,
            };

            const response = await axiosInstance.post('order/create-order',  orderData)

            if(response.data.isSuccess){
                setNotifyMsgVisible(response.data.message);                
            }
        }
    }

    //notification 
    const hideNotifyMsg = async () => {
        setNotifyMsgVisible(null);
        navigate("/catalogue");
    }

    return(
        <>
            <div className={`${displayMsg ? 'open-update-container' : 'quantity-update-popup-container'}`} >
                <div className='update-quantity-title'>{displayMsg}</div>           
                <button class='quantity-update-close-btn' onClick={() => {setDisplayMsg(false);}}>OK</button>
            </div>

            <div className={`${notifyMsgVisible ? 'open-update-container' : 'quantity-update-popup-container'}`} >
                <div className='update-quantity-title'>{notifyMsgVisible}</div>           
                <button class='quantity-update-close-btn' onClick={hideNotifyMsg}>OK</button>
            </div>

            <div className="checkoutpage-container">
                <div className="checkoutpage-left">
                    <div className="checkoutpage-left-header">
                        <div className="checkoutpage-header-cart">Cart</div>
                        <div className="checkoutpage-header-information" style={{fontWeight: informationVisible ? "700" : "400"}}>Information</div>
                        <div className="checkoutpage-header-shipping" style={{fontWeight: shippingVisible ? "700" : "400"}}>Shipping</div>
                        <div className="checkoutpage-header-payment" style={{fontWeight: paymentVisible ? "700" : "400"}}>Payment</div>
                    </div>

                    <div className="checkoutpage-information" style={{display: informationVisible ? "block" : "none"}}>

                        <div className="checkoutpage-information-contact">
                            <div className="checkoutpage-labels">Contact information</div>
                            <input 
                                style={{'border-color': inputMsg && !contact ? '#d40b11' : '#000000' }}
                                type="text" 
                                placeholder="Email or Mobile Phone Number" 
                                className="checkout-information-inputs-1"
                                value={contact}
                                onChange={(e) => {setContact(e.target.value);}}/>
                        </div>

                        <div className="checkoutpage-information-shipping">
                            <div className="checkoutpage-labels">Shipping Address</div>
                            <div className="checkoutpage-information-shipping-names">
                                <input 
                                    style={{'border-color': inputMsg && !firstname ? '#d40b11' : '#000000' }}
                                    type="text" 
                                    placeholder="First Name" 
                                    className="checkout-information-inputs-2"
                                    value={firstname}
                                    onChange={(e) => {setFirstname(e.target.value);}}/>
                                <input 
                                    type="text" 
                                    placeholder="Last Name" 
                                    className="checkout-information-inputs-2"
                                    value={lastname}
                                    onChange={(e) => {setLastname(e.target.value);}}/>
                            </div>
                            <input 
                                style={{'border-color': inputMsg && !apartment ? '#d40b11' : '#000000' }}
                                type="text" 
                                placeholder="Apartment" 
                                className="checkout-information-inputs-1"
                                value={apartment}
                                onChange={(e) => {setApartment(e.target.value);}}/>
                            <input 
                                type="text" 
                                placeholder="Street" 
                                className="checkout-information-inputs-1"
                                value={street}
                                onChange={(e) => {setStreet(e.target.value);}}/>
                            <input 
                                style={{'border-color': inputMsg && !city ? '#d40b11' : '#000000' }}
                                type="text" 
                                placeholder="City" 
                                className="checkout-information-inputs-1"
                                value={city}
                                onChange={(e) => {setCity(e.target.value);}}/>
                            <div className="checkoutpage-information-shipping-country">
                                <input 
                                    style={{'border-color': inputMsg && !country ? '#d40b11' : '#000000' }}
                                    type="text" 
                                    placeholder="Country" 
                                    className="checkout-information-inputs-2"
                                    value={country}
                                    onChange={(e) => {setCountry(e.target.value);}}/>
                                <input 
                                    style={{'border-color': (inputMsg && !postalCode) || (invalidPostalCode) ? '#d40b11' : '#000000' }}
                                    type="text" 
                                    placeholder="Postal Code" 
                                    className="checkout-information-inputs-2"
                                    value={postalCode}
                                    onChange={(e) => {setPostalCode(e.target.value);}}/>
                            </div>      
                        </div>
                        <div className="checkoutpage-information-footer">
                            <div><Link to="/basket" className="checkoutpage-information-footer-cartlink">Return To Cart</Link></div>
                            <button className="checkoutpage-information-footer-continue" id="continue-shipping" onClick={continueShipping}>Continue to shipping</button>
                        </div>                  
                    </div>

                    <div className="checkoutpage-information" style={{display: shippingVisible ? "block" : "none"}}>

                        <div className="checkoutpage-shipping-contactdetails">
                            <div id="shippingpart-contactemail">
                                <div>Contact</div>
                                <div>{contact}</div>
                            </div>
                            <div>
                                <div>Ship To</div>
                                <div>{firstname} {lastname} {apartment} {street} {city} {postalCode} {country}</div>
                            </div>
                        </div>
                        
                        <div className="checkoutpage-shipping-method">                       
                                <div id="shipping-method-1">
                                    <button className="shipping-methods">
                                        <input
                                            type="radio" 
                                            name="shippingmethod" 
                                            className="shippingmethod-select-input" 
                                            value="normal"
                                            onChange={(e) => {setShippingMethod(e.target.value); setShippingFee(9.68);}}/>
                                        <div className="shippingmethod-details">
                                            <div className="shippingmethod-names">
                                                <div>Canada Post Small Packet International Surface</div>
                                                <div>28 to 84 business days</div>
                                            </div>
                                            <div>$9.68</div>
                                        </div>
                                    </button>
                                </div>
                                <div>
                                    <button className="shipping-methods">
                                        <input 
                                            type="radio" 
                                            name="shippingmethod" 
                                            className="shippingmethod-select-input"
                                            value="express"
                                            onChange={(e) => {setShippingMethod(e.target.value); setShippingFee(20.63);}}/>
                                        <div className="shippingmethod-details">
                                            <div className="shippingmethod-names">
                                                <div>Canada Post Small Packet International Air</div>
                                                <div>6 to 10 business days</div>
                                            </div>
                                            <div>$20.63</div>
                                        </div>
                                    </button>
                                </div>
                        </div>

                        <div className="checkoutpage-information-footer">
                            <button className="checkoutpage-information-footer-backward-btn" onClick={backwardBilling}>Return To Billing</button>
                            <button className="checkoutpage-information-footer-continue" onClick={continueBilling}>Continue To Payment</button>
                        </div> 
                    </div>

                    <div className="checkoutpage-information" style={{display: paymentVisible ? "block" : "none"}}>
                        
                        <div className="checkoutpage-shipping-contactdetails">
                            <div id="shippingpart-contactemail">
                                <div>Contact</div>
                                <div>{contact}</div>
                            </div>
                            <div>
                                <div>Ship To</div>
                                <div>{firstname} {lastname}, {apartment}, {street}, {city} {postalCode}, {country}</div>
                            </div>
                        </div>

                        <div className="checkoutpage-payment-carddetails">
                            <div className="checkoutpage-payment-carddetails-title">Credit Card</div>
                            <div>
                                <input 
                                    style={{'border-color': emptyCard && !cardNumber ? '#d40b11' : '#000000' }}
                                    type="text" 
                                    placeholder="Card Number"
                                    onChange={(e) => {setCardNumber(e.target.value);}}/>
                                <input 
                                    style={{'border-color': emptyCard && !nameOnCard ? '#d40b11' : '#000000' }}
                                    type="text" 
                                    placeholder="Name On Card"
                                    onChange={(e) => {setNameOnCard(e.target.value);}}/>
                                <div>
                                    <input 
                                        style={{'border-color': emptyCard && !cardExpirationDate ? '#d40b11' : '#000000' }}
                                        type="text" 
                                        placeholder="Expiration Date(MM/YY)"
                                        onChange={(e) => {setCardExpirationDate(e.target.value);}}/>
                                    <input
                                        style={{'border-color': (emptyCard && !cardSecurityCode) || (securityCodeError && !emptyCard) ? '#d40b11' : '#000000' }} 
                                        type="text" 
                                        placeholder="Security Code" 
                                        maxLength={3}
                                        onChange={(e) => {setCardSecurityCode(e.target.value); }}/>
                                </div>
                            </div>                                                                          
                        </div>

                        <div className="checkoutpage-information-footer">
                            <button className="checkoutpage-information-footer-backward-btn" onClick={backwardShipping}>Return To Shipping</button>
                            <button className="checkoutpage-information-footer-continue" onClick={completePayment}>Continue To Payment</button>
                        </div> 

                    </div>

                </div>

                <div className="checkoutpage-centerline"></div>

                <div className="checkoutpage-right">
                    {cartProducts && cartProducts.map((product) => (
                        <div className="checkoutpage-images-section">
                            <div className="checkoutpage-images">
                                <img src={product.productImage} alt="" className="checkoutpage-images-container"/>
                                <div className="checkout-product-name">{product.productName}</div>
                                <div className="checkout-product-price">${product.productPrice}</div>
                            </div>
                        </div>
                    ))}              
                    <div className="checkoutpage-subtotal">
                        <div className="checkoutpage-subtotal-subtotal"><div>Subtotal</div><div>${subTotal}</div></div>
                        <div className="checkoutpage-subtotal-shipping"><div>Shipping</div><div>${shippingFee}</div></div>
                    </div>
                    <div className="checkoutpage-total">
                        <div className="checkoutpage-total-total">
                            <div>Total</div>
                            <div>${total}</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}