import React from 'react';


const Inventory = () => {

    const handleInventory = ()=>{
            
            // const product=fakeData[0];
            // console.log('before post',product);

            // fetch('http://localhost:4200/addProducts',{
            //     method: 'POST',
            //     headers: {
            //         'Content-Type' : 'application/json'
            //     },
            //     body : JSON.stringify(fakeData)
            // })
            // .then(res =>res.json())
            // .then(data =>{
            //     console.log("Post Success",data);
                
            // })
    }
    return (
        <div>
            <h1>inventory history comming soon.....</h1>
            <button onClick={handleInventory}> Inventory</button>
        </div>
    );
};

export default Inventory;