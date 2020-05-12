import React from 'react';

const ReviewItem = (props) => {
    // console.log(props);
    const {name,quantity,key,price}=props.product;

    const itemStyle={
        borderBottom:'1px solid lightgray',
        marginBottom:'5px',
        paddingBottom:'5px',
        marginLeft:'200px'
    }

    return (
        <div style={itemStyle} className="reviewItem">
            <h4 className="productName">{name}</h4>
            <p>Quantity: {quantity}</p>
            <p><small>${price}</small></p>
            <br/>
            <button 
                className="mainButtton" 
                onClick={() =>props.handleRemoveProduct(key)}
            >Remove </button>
        </div>
    );
};

export default ReviewItem;