// page not found page

import React from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { Link } from 'react-router-dom';

const ErrorNotLoggedIn = () => {
  return (
    <div>
      <Header />
      <div className="container text-center mt-5">
      <h1 className="display-1">Oops!</h1>
      <p className="lead">Please log in in order to access our services.</p>
      <p className="lead">
        <Link to="/Login">Log In</Link>, or <Link to="/Signup">Sign up</Link>.
      </p>
      
      
    </div>
    
      
    <Footer />
    </div>
  );
}

export default ErrorNotLoggedIn;

