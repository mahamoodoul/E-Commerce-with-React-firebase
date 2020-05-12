import React, { useContext } from 'react';
import logo from '../../images/logo.png';
import './Header.css';
import { UserContext } from '../../App';
import { useAuth } from '../Login/useAuth';

const Header = () => {
    // const user=useContext(UserContext);
    const auth=useAuth();
    return (
        <div className="headerContainer">
            <img src={logo} alt="logo"/>
            <nav>
                <a href="shop">Shop</a>
                <a href="orderReview">Order Reeview</a>
                <a href="manage">Manage Inventory</a>
                <a href="/inventory">Order Details</a>
              {
                  auth.user &&
                  <span style={{color:"yellow"}}>Welcome {auth.user.name}</span>
              }
              {
                  auth.user ?<a href="/login">Sign out</a>
                  :<a href="/login">Sign in</a>
              }
            </nav>
        </div>
    );
};

export default Header;