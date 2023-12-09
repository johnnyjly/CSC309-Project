// Home.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '../components/Header/Header.jsx';
import Footer from '../components/Footer/Footer.jsx';

const Home = () => {
  const navigate = useNavigate();
  const authToken = localStorage.access;
  
  useEffect(() => {
    if (authToken != null) {
      navigate('/listings/');
    }
    else {
      navigate('/login/');
    }
  })

  return (
    <div>
        <Header />
        <Footer />
    </div>
  );
};

export default Home;