// Import Basic Libraries
import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { ajax_or_login } from '../../ajax.js';

// Import Components
import Header from '../../components/Header/Header.jsx';
import Footer from '../../components/Footer/Footer.jsx';

// Import CSS and Bootstrap
import '../../styles/search.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const AppDetail = () => {
  const { appID } = useParams();
  const location = useLocation();

  useEffect(() => {
    ajax_or_login(`/applications/${appID}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched data:', data);
      })
      .catch((error) => {
        console.error('Error fetching applications:', error);
      })
  }, [appID, location.search]);
}

export default AppDetail;