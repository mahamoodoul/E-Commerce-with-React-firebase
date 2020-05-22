import React, { useState, useEffect } from 'react';
import { getDatabaseCart, removeFromDatabaseCart,  } from '../../utilities/databaseManager';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
// import imgPlaceOrder from '../../images/giphy.gif';
import { Link } from 'react-router-dom';
import { useAuth } from '../Login/useAuth';


const Review = () => {

    const [cart, setCart] = useState([]);
    // const [orderPlaced, setOrderPlaced] = useState(false);

    const auth = useAuth();
    // console.log(cart);

    useEffect(() => {

        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);

        fetch('http://localhost:4200/getProductsByKey',{

            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(productKeys)
        })
        .then(res =>res.json())
        .then(data =>{
            // console.log("Post Success",data);
            const cartProducts = productKeys.map(key => {
                const product = data.find(pd => pd.key === key);
                product.quantity = savedCart[key];
                return product;
            });
            setCart(cartProducts);
    
            //  console.log(cartProducts);
        })


       

    }, []);

    const handleRemoveProduct = (productKey) => {

        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
        console.log("clicked", productKey);
    }


    // const handlePlaceOrder = () => {
    //     console.log("clicked");
    //     setCart([]);
    //     setOrderPlaced(true);
    //     processOrder();

    // }


    // let thankyou;
    // if (orderPlaced) {
    //     thankyou = <img src={imgPlaceOrder} alt="happy" />
    // }

    return (
        <div className="shopContainer">
            <div className="productContainer">

                {
                    cart.map(pd => <ReviewItem key={pd.key} handleRemoveProduct={handleRemoveProduct} product={pd}></ReviewItem>)
                }
               

            </div>
            <div className="cartContainer">

                <Cart cart={cart}>
                    <Link to="/shipment">
                        {
                            auth.user ?
                                <button className="mainButtton">Proceed Checkout</button>

                                :
                                <button className="btnLogin">Proceed To Login</button>
                        }

                    </Link>

                </Cart>

            </div>

        </div>
    );
};

export default Review;