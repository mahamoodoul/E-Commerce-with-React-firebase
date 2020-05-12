import React from 'react';
import './Login.css';
import Auth from './useAuth';

const Login = () => {



    const auth=Auth();
     console.log(auth.user);

    const handleSignIn= () =>{
        auth.signInWithGoogle()
        .then(res =>{
            console.log('redirected now');
            window.location.pathname='/orderReview';
        })
    }

    const handleSignOut=() =>{
        auth.signOut()
        .then(res =>{
           
            window.location.pathname='/';
        })
    }
    

    
    return (
        <div className="loginContainer">
            <h1>Join the Party</h1>
            {
                auth.user ?<button className="btnLogin" onClick={handleSignOut}>Sign Out</button>
                    :<button className="btnLogin" onClick={handleSignIn}>Sign in With Google</button>
            }
            
        </div>
    );
};

export default Login;