import React from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';
import fakeData from '../../fakeData';

const ProductDetail = () => {
    const {productKey}=useParams();
    const productDetail=fakeData.find(pd=> pd.key===productKey);
    console.log(productDetail);
    
    return (
        <div>
            <h1>{productKey} Product Details</h1>
            <Product products={productDetail} showAddToCart={false}></Product>
        </div>
    );
};

export default ProductDetail;