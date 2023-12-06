// page not found page

import React from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <div>
      <Header />
      <div className="container text-center mt-5">
      <h1 className="display-1">Oops!</h1>
      <p className="lead">Page Not Found!</p>
      <p className="lead">
        Go back to <Link to="/">home</Link>.
      </p>
      
      
    </div>
    
      
    <Footer />
    </div>
  );
}

export default Error;

