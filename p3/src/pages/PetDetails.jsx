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
      <div style={{backgroundColor: '#f8f9fa'}}>
        <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
            <div className="me-5 d-none d-lg-block">
                <span>Get connected with us on social networks:</span>
            </div>
            <div>
                <a href="" className="me-4 text-reset">
                    <i className="fab fa-facebook-f"></i>
                </a>
                <a href="" className="me-4 text-reset">
                    <i className="fab fa-twitter"></i>
                </a>
                <a href="" className="me-4 text-reset">
                    <i className="fab fa-google"></i>
                </a>
                <a href="" className="me-4 text-reset">
                    <i className="fab fa-instagram"></i>
                </a>
                <a href="" className="me-4 text-reset">
                    <i className="fab fa-linkedin"></i>
                </a>
                <a href="" className="me-4 text-reset">
                    <i className="fab fa-github"></i>
                </a>
            </div>
        </section>
        <section className="">
            <div className="container text-center text-md-start mt-5">
                <div className="row mt-3">
                    <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                        <h6 className="text-uppercase fw-bold mb-4">
                            <i className="fas fa-gem me-3"></i>PetPal
                        </h6>
                        <p>
                        </p>
                    </div>
                    <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                        <h6 className="text-uppercase fw-bold mb-4">
                            Products
                        </h6>
                        <p>
                            <a href="#!" className="text-reset">Angular</a>
                        </p>
                        <p>
                            <a href="#!" className="text-reset">React</a>
                        </p>
                        <p>
                            <a href="#!" className="text-reset">Vue</a>
                        </p>
                        <p>
                            <a href="#!" className="text-reset">Laravel</a>
                        </p>
                    </div>
                    <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                        <h6 className="text-uppercase fw-bold mb-4">
                            Useful links
                        </h6>
                        <p>
                            <a href="#!" className="text-reset">Pricing</a>
                        </p>
                        <p>
                            <a href="#!" className="text-reset">Settings</a>
                        </p>
                        <p>
                            <a href="#!" className="text-reset">Orders</a>
                        </p>
                        <p>
                            <a href="#!" className="text-reset">Help</a>
                        </p>
                    </div>
                    <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                        <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                        <p><i className="fas fa-home me-3"></i> Toronto, ON, Canada</p>
                        <p>
                            <i className="fas fa-envelope me-3"></i>
                            utoronto.ca
                        </p>
                        <p><i className="fas fa-phone me-3"></i> + 01 234 567 88</p>
                        <p><i className="fas fa-print me-3"></i> + 01 234 567 89</p>
                    </div>
                </div>
            </div>
        </section>
        <div className="text-center p-4">
            © 2023 Copyright:
            <a className="text-reset fw-bold" href="https://PetPal.com/">PetPal.com</a>
        </div>
    </div>

    </div>
  )
}

export default PetDetails