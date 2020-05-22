import React from 'react';
import { useForm } from 'react-hook-form';
import './Shipment.css';
import { useAuth } from '../Login/useAuth';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../Checkout/Checkout';
import { useState } from 'react';

const Shipment = () => {


  const { register, handleSubmit, errors } = useForm();

  const [shipInfo, setShipInfo] = useState(null);
  const [orderId, setOrderId] = useState(null);

  const auth = useAuth();
  // console.log(auth);
  const stripePromise = loadStripe('pk_test_hzAOqcMkqrUNkVutbLJYHrUT00nhXvanXe');

  const onSubmit = data => {

    // move to payment option  is here
    setShipInfo(data);
  }

  const handlePlaceOrder = (payment) => {
    const savedCart = getDatabaseCart();
    const orderDetails = {
      email: auth.user.email,
      cart: savedCart,
      shipment: shipInfo,
      payment: payment
    };

    fetch('http://localhost:4200/placeOrder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderDetails)
    })
      .then(res => res.json())
      .then(order => {
        console.log("Order successfully placed", order);
        setOrderId(order._id);
        processOrder(); //from local storage
        // alert("Succesfully placed your order..Id is : " + orderData._id);

      })

  };



  // console.log(watch('example')) 
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6" style={{ display: shipInfo && 'none' }}>

          <h3>Shipment Information</h3>
          <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>

            <input name="name" defaultValue={auth.user.name} ref={register({ required: true })} placeholder="Enter your Name" />
            {errors.name && <span className="error">Name is required</span>}



            <input name="email" defaultValue={auth.user.email} ref={register({ required: true })} placeholder="Enter your Email" />
            {errors.email && <span className="error">Email is required</span>}


            <input name="addressline1" ref={register({ required: true })} placeholder="Enter your Address Line1" />
            {errors.addressline1 && <span className="error">Address is required</span>}

            <input name="phone" ref={register} placeholder="Enter your Phone Number" />
            {errors.phone && <span className="error">Address is required</span>}

            <input name="country" ref={register({ required: true })} placeholder="Enter your Country" />
            {errors.country && <span className="error">Country is required</span>}


            <input name="city" ref={register({ required: true })} placeholder="Enter your City" />
            {errors.city && <span className="error">City is required</span>}

            <input name="zipcode" ref={register({ required: true })} placeholder="Enter your Zip Code" />
            {errors.zipcode && <span className="error">Zipcode is required</span>}

            <input type="submit" />
          </form>

        </div>
        <div className="col-md-6" style={{ marginTop: '200px', display: shipInfo ? 'block' : 'none' }} >
          <h3>Payment Information</h3>
          <Elements stripe={stripePromise}>
            <CheckoutForm handlePlaceOrder={handlePlaceOrder} />
          </Elements>
          <br />
          {
            orderId && <div>
              <h3>Thank you for shopping with us</h3>
              <p>Your order id is: {orderId}</p>
            </div>
          }
        </div>

      </div>
    </div>
  )
};


export default Shipment;