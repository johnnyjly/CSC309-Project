import React from 'react'
import Header from "../components/Header/Header.jsx";
import Footer from '../components/Footer/Footer.jsx';
import { useLocation } from 'react-router-dom'
import Image from 'react-bootstrap/Image'

import './pet-details.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const PetDetails = () => {
  const location = useLocation()
  console.log(location.state)

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function renderSwitch(param) {
    switch (param) {
      case 'available':
        return <button type="button" className="btn btn-success">Available</button>;
      case 'adopted':
        return <button type="button" disabled className="btn btn-danger">Adopted</button>;
      case 'pending':
        return <button type="button" disabled className="btn btn-warning">Pending</button>;
      default:
        return <button type="button" disabled className="btn btn-dark">Unknown</button>;
    }
  }

  return (
    <div>
      <Header />
      <div className='pet-details-wrapper'>
        <Image src={location.state.image} rounded style={{ width: 512, height: 288 }} />
        <div className='text-container' style={{ maxWidth: 700 }}>
          <div className='detail-title'>{capitalizeFirstLetter(location.state.name)}, {location.state.age} years old</div>
          <div className='detail-subtitle'>Status: {capitalizeFirstLetter(location.state.status)} </div>
          <hr></hr>
          <div className='detail-paragraph display-4'>{location.state.description}</div>
          <hr></hr>

          <div className="specs-container">
            <div className="detail-specs display-4 first">
              Age: {location.state.age} years old <br></br>
              Weight: {location.state.size} kg <br></br>
              Gender: {location.state.gender} <br></br>

            </div>

            <div className="detail-specs display-4 second">
              Breed: {location.state.breed} <br></br>
              Shelter: {capitalizeFirstLetter(location.state.shelter)} <br></br>
              Status: {capitalizeFirstLetter(location.state.status)}
            </div>
            <div className="button-container" style={{marginTop: -30}}>
              {renderSwitch(location.state.status)}


              <div className="detail-specs display-4 date"> Last Updated: {new Date(location.state.date).toLocaleDateString()}</div>
            </div>

          </div>


        </div>


      </div>

    </div>
  )
}

export default PetDetails