import React from 'react';
// import { useAuth } from '../Login/useAuth';

const Cart = (props) => {


    
    // const auth=useAuth();
    // console.log(auth);
    
    

    const cart=props.cart;

    //  const totalPrice=cart.reduce((total,pd) =>total+pd.price* pd.quantity,0);

     let totalPrice=0;
    for(let i=0;i<cart.length;i++){
        const product=cart[i];
        totalPrice=totalPrice+product.price* product.quantity;
        // debugger;
    }

    

    let shipping= 0 ;

    if(totalPrice>100){
        shipping=5.12;
    }
    else if(totalPrice>50){
        shipping=10.12;

    }
    else if(totalPrice>20){
        shipping=15.12;
    }
    else if (totalPrice>0) {
        shipping=10.12;
    }

    let discount= 0;
    if(totalPrice>500){
        discount=50;
    }
    else if(totalPrice>200){
        discount=30;
    }
    else if(totalPrice>100){
        discount=20;
    }
    const vat=totalPrice/5;
     
    const formatNumber =(num ) =>{
        const precision=num.toFixed(2);
        return Number(precision);
    }
    const grandTotal=(formatNumber(totalPrice)-discount+vat)+shipping;
    return (
        <div>
            <h1>Order Summery</h1>
            <p>Item ordered: {props.cart.length}</p>
            <p>Product Price: {formatNumber(totalPrice)}</p>
            <p><small>Shipping Cost: {formatNumber(shipping)}</small></p>
            <p><small>Total Discount: {formatNumber(discount)}</small></p>
            <p><small>Tax &VAT: {formatNumber(vat)}</small></p>
            <h1>Total :{formatNumber(grandTotal)}</h1>
            <br/>

            {
               props.children
            }
   
           
        </div>
    );
};

export default Cart;