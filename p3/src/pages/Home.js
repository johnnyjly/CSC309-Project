// Home.js
import React, { useEffect } from 'react';

import Header from '../components/Header/Header.jsx';
import '../styles/home.css'

const Home = () => {
  return (
    <div>
      <Header />
      <div id="about" class="about">
         <div class="container">
            <div class="row">
               <div class="col-md-6 offset-md-6">
                  <div class="titlepage text_align_right">
                     <h1>Find your companion.</h1>
                     <p>Embracing the transformative power of adoption, our platform serves as a bridge, connecting these precious souls with individuals and families ready to embark on a journey filled with tail wags, purrs, and countless shared memories. Join us in creating heartwarming tales of adoption, where every pet's story is a testament to the enduring bond between humans and their faithful companions. Adopt, love, and let the magic of companionship unfold.</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};
export default Home;