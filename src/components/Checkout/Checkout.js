import React from 'react';
import ReactDOM from 'react-dom';
import { loadStripe } from '@stripe/stripe-js';
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { useState } from 'react';

const CheckoutForm = (props) => {

  const [paymentError, setPaymentError] = useState(null);
  const [paymentMethodFinished, setPaymentMethodFinished] = useState(null);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {

    event.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });
    if (error) {
      setPaymentError(error.message);
      setPaymentMethodFinished(null);
    }
    else {
      setPaymentMethodFinished(paymentMethod);
      const payment = { id: paymentMethod.id, last4: paymentMethod.card.last4 }
      props.handlePlaceOrder(payment);
      setPaymentError(null);
    }
    console.log('stripe integreted', error, paymentMethod);

  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
      {
        paymentError && <p style={{ color: 'red' }}>{paymentError}</p>
      }
      {
        paymentMethodFinished && <p style={{ color: 'green' }}>Payment Successfull</p>
      }
    </form>
  );
};

export default CheckoutForm;