import React, { createContext } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Review from './components/Review/Review';
import Inventory from './components/Inventory/Inventory';
import NotFound from './components/NotFound/NotFound';
import ProductDetail from './components/ProductDetail/ProductDetail';
import Login from './components/Login/Login';
import { AuthContextProvider,PrivateRoute} from './components/Login/useAuth';
import Shipment from './components/Shipment/Shipment';
export const UserContext= createContext();

function App() {
  const user={name:"shakil",email:"shakil@gmail.com"};
  return (
    <div className="App">
      <AuthContextProvider>
       <Header></Header>
       <Router>
         <Switch>
           <Route path="/shop">
             <Shop></Shop>
           </Route>
           <Route path="/orderReview">
             <Review></Review>
           </Route>
           <Route path="/manage">
             <Inventory></Inventory>
           </Route>
           <Route exact path="/">
              <Shop></Shop>
           </Route>
           <Route path="/product/:productKey">
             <ProductDetail></ProductDetail>
           </Route>
           <Route  path="/login">
              <Login></Login>
           </Route>
           <PrivateRoute  path="/shipment">
              <Shipment></Shipment>
           </PrivateRoute>
           <Route path="*">
              <NotFound></NotFound>
           </Route>
         </Switch>
       </Router>
      </AuthContextProvider>
      
    </div>
  );
}

export default App;
