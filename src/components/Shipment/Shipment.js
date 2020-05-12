import React from 'react';
import { useForm } from 'react-hook-form';
import './Shipment.css';
import { useAuth } from '../Login/useAuth';

const Shipment = () => {
    const { register, handleSubmit, errors } = useForm();

    const onSubmit = data => { 
        console.log(data)
     };
    const auth=useAuth();
    console.log(auth);
    
  
    // console.log(watch('example')) 
    return (
      <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
       
            <input name="name" defaultValue={auth.user.name} ref={register({ required: true })} placeholder="Enter your Name" />
            {errors.name && <span  className="error">Name is required</span>}
            
         

            <input name="email" defaultValue={auth.user.email} ref={register({ required: true })} placeholder="Enter your Email" />
            {errors.email && <span className="error">Email is required</span>}

         
            <input name="addressline1" ref={register({ required: true })} placeholder="Enter your Address Line1" />
            {errors.addressline1 && <span className="error">Address is required</span>}

            <input name="addressline2" ref={register} placeholder="Enter your Address Line2"  />

            <input name="country" ref={register({ required: true })} placeholder="Enter your Country" />
            {errors.country && <span className="error">Country is required</span>}

            
            <input name="city" ref={register({ required: true })} placeholder="Enter your City" />
            {errors.city && <span className="error">City is required</span>}

            <input name="zipcode" ref={register({ required: true })} placeholder="Enter your Zip Code" />
            {errors.zipcode && <span className="error">Zipcode is required</span>}
            
            <input type="submit" />
      </form>
    )
};

export default Shipment;