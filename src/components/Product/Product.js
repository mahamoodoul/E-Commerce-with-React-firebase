import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee,faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';


const Product = (props) => {
    const {img,name,seller,price,stock,key}=props.products;
//    console.log(props);
   
    return (
        <div className="product">
            <div>
                <img src={img} alt="pic" />
            </div>
            <div className="productDetails">
                <h4 className="productName"><Link to={"/product/"+key}>{name}</Link></h4>
                <br />
                <p><small>by {seller}</small></p>
                <p>${price}</p>
                <br />
                <p><small>Only {stock} left in stock --Order soon.</small></p>
                { props.showAddToCart===true && <button
                    className="mainButtton"
                    onClick={()=>props.handleProduct(props.products)}
                    ><FontAwesomeIcon icon={faShoppingCart} /> Add to Cart</button>}
            </div>

        </div>
    );
};

export default Product;