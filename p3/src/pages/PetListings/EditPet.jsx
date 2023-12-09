import React from 'react'
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode';
import { useEffect } from 'react';
import { Link } from 'react-router-dom'

import Header from "../../components/Header/Header.jsx";
import Footer from '../../components/Footer/Footer.jsx';
import { ajax } from '../../ajax.js';

import './new-pet.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';



const EditPet = () => {
  const navigate = useNavigate();
  const authToken = localStorage.access;
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: location.state.name || '',
    age: location.state.age || '',
    breed: location.state.breed || '',
    color: location.state.color || '',
    description: location.state.description || '',
    gender: location.state.gender || '',
    size: location.state.size || '',
    status: location.state.status || '',
  });
  
  const [loggedIn, setLoggedIn] = useState(false);
  const [shelterName, setShelterName] = useState("");

  let decoded;

  useEffect(() => {
    try {
      decoded = jwtDecode(authToken);
      setLoggedIn(true);
      setShelterName(decoded.username);


    } catch (e) {
      decoded = null;
    }
  }, [authToken, decoded]);

  const [errors, setErrors] = useState({ nameError: "", ageError: "", breedError: "", genderError: "", descriptionError: "", colorError: "", sizeError: "", imageError: "", statusError: "", shelterError: "", otherErrors: "" });

  const [status, setStatus] = useState("available");

  function handleSubmit(event) {
    event.preventDefault();
    console.log(formData);
    let data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });
    console.log(data);
    ajax(`/petlistings/${location.state.id}/`, {
      method: "PUT",
      body: data,
      headers: {
        Authorization: `Bearer ${authToken}`,
      }
      
    }).then(request => {
      if (request.status === 200) {
        navigate(`/listings?page=1&status=Available&shelter=${shelterName}`);
      } else {
        let json = request.json();
        json.then(json => {
          setErrors({
            nameError: json.name ? "**" + json.name[0] : "",
            ageError: json.age ? "**" + json.age[0] : "",
            breedError: json.breed ? "**" + json.breed[0] : "",
            descriptionError: json.description ? "**" + json.description[0] : "",
            colorError: json.color ? "**" + json.color[0] : "",
            sizeError: json.size ? "**" + json.size[0] : "",
            
            statusError: json.status ? "**" + json.status[0] : "",
            shelterError: json.shelter ? "**" + json.shelter[0] : "",
            otherErrors: "",
          })
        })
      }
    }).catch(error => {
      setErrors({ ...errors, otherErrors: error });
    }
    );

    
    
  }

  function handleChange(event, key) {
    setFormData({ ...formData, [key]: event.target.value });

  }

  function handleStatusChange(event) {
    setFormData({ ...formData, status: event.target.value });
  }

  return (
    <>
      <div className="page_container">
        <div className="content_wrap">
          <Header />
          <main>
            <div className="container">
              <div className="row justify-content-center">
                <form className="row g-3 form-signup" onSubmit={handleSubmit}>
                  <h1 className="form-title">Edit your pet</h1>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input type="text" className="form-control" id="name" onChange={(event) => setFormData({...formData, name: event.target.value})} name="name" value={formData.name} required></input>
                      <label htmlFor='name' className="form-label"  >Pet Name</label>
                      <small id="name-fail" className="form-text">{errors.nameError}</small>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input type="number" className="form-control" onChange={(event) => setFormData({...formData, age: event.target.value})} id="age" name="age" value={formData.age} required></input>
                      <label htmlFor='age' className="form-label">Pet Age</label>
                      <small id="age-fail" className="form-text">{errors.ageError}</small>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input type="text" value={formData.breed} onChange={(event) => setFormData({...formData, breed: event.target.value})} className="form-control" id="breed" name="breed" required></input>
                      <label htmlFor='breed' className="form-label">Breed</label>
                      <small id="breed-fail" className="form-text">{errors.breedError}</small>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input type="text" value={formData.gender} onChange={(event) => setFormData({...formData, gender: event.target.value})} className="form-control" id="gender" name="gender" required ></input>
                      <label htmlFor='gender' className="form-label">Pet Gender</label>
                      <small id="gender-fail" className="form-text">{errors.genderError}</small>
                    </div>
                  </div>
                  
                  <div className="col-md-12 row-span-2">
                    <div className="form-floating">
                      <input type="text" className="form-control" value={formData.description} onChange={(event) => setFormData({...formData, description: event.target.value})}id="description" name="description" required></input>
                      <label htmlFor='description' className="form-label">Description</label>
                      <small id="description-fail" className="form-text">{errors.descriptionError}</small>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-floating">
                      <input type="text" className="form-control" onChange={(event) => setFormData({...formData, color: event.target.value})} value={formData.color} id="color" name="color" required></input>
                      <label htmlFor='color' className="form-label">Pet Color</label>
                      <small id="color-fail" className="form-text">{errors.colorError}</small>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-floating">
                      <input type="number" onChange={(event) => setFormData({...formData, size: event.target.value})} className="form-control" value={formData.size} id="size" name="size" required></input>
                      <label htmlFor='size' className="form-label">Pet Size (in kg)</label>
                      <small id="size-fail" className="form-text">{errors.sizeError}</small>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-floating">
                      <input type="file" className="form-control" id="image" name="image"  onChange={(event) => setFormData({...formData, image: event.target.files[0]})}></input>
                      <label htmlFor='image' className="form-label">Pet Image</label>
                      <small id="image-fail" className="form-text">{errors.imageError}</small>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-floating">
                      
                      <select
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleStatusChange}
                        className="form-select"
                        required
                      >
                        <option value="available">Available</option>
                        <option value="pending">Pending</option>
                        <option value="adopted">Adopted</option>
                      </select>
                      <label htmlFor="status" className="form-label">Pet Status</label>
                      <small id="size-fail" className="form-text">{errors.statusError}</small>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-floating">
                      <input type="text" className="form-control" id="shelter" name="shelter" required disabled value={shelterName}></input>
                      <label htmlFor='shelter' className="form-label">Shelter Name</label>
                      <small id="shelter-fail" className="form-text">{errors.shelterError}</small>
                    </div>
                  </div>





                  <div className="d-grid gap-2 col-6 mx-auto">
                    <button type="submit" className="btn btn-primary">Edit your pet</button>
                    <small id="add-fail" className="form-text"></small>
                  </div>
                </form>
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </>
  )
}

export default EditPet;