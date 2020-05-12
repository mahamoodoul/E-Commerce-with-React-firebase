import React, { useState, useEffect } from 'react';
import fakeData from '../../fakeData';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart,getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';

const Shop = () => {
    // console.log( fakeData);

    const first10=fakeData.slice(0,10);
    const [products,setProducts]=useState(first10);
    const [cart,setCart]=useState([]);
    //console.log(cart);



    useEffect(() =>{
        const savedCart=getDatabaseCart();
        const productKeys=Object.keys(savedCart);
        const previousCart=productKeys.map(existingKey =>{
            const product =fakeData.find(pd =>pd.key ===existingKey);
            product.quantity=savedCart[existingKey];
            return product;
           
        })
        // console.log(previousCart);
        setCart(previousCart);

    },[]);


    const handleProduct=(product) =>{
        // console.log("producct added",product);
        const toBeaddedKey=product.key;
        const sameProduct=cart.find(pd => pd.key ===toBeaddedKey);
        let count =1;
        let newCart;
        if(sameProduct){
            
            count=sameProduct.quantity+1;
            sameProduct.quantity=count;
            const others =cart.filter(pd => pd.key !==toBeaddedKey);
            newCart=[...others,sameProduct]

        }
        else{
            product.quantity=1;
            newCart=[...cart,product];
        }
       
        setCart(newCart);
        
      
        addToDatabaseCart(product.key,count);
    }
    
    return (
        <div className="shopContainer">
            <div className="productContainer">
                        {
                            products.map(pd => <Product key={pd.key} showAddToCart={true} products={pd} handleProduct={handleProduct} ></Product>)
                        }  
            </div>
           
            <div className="cartContainer">
              <Cart cart={cart}>
                    <Link to="/orderReview">
                        <button className="mainButtton">Review Order</button>
                    </Link> 
              </Cart>
            </div>
        </div>
    );
};

export default Shop;