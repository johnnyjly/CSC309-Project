// Import Basic Libraries
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate  } from 'react-router-dom';
import { ajax_or_login } from '../../ajax.js';
import { jwtDecode } from 'jwt-decode';

// Import Components
import Header from '../../components/Header/Header.jsx';
import Footer from '../../components/Footer/Footer.jsx';

// Import CSS and Bootstrap
import '../../styles/apply.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const AppApply = () => {
  const { petID } = useParams();
  const [petData, setPetData] = useState({
      "id": 0,
      "shelter": "",
      "name": "",
      "age": 0,
      "breed": "",
      "gender": "",
      "description": "",
      "publication_date": "",
      "color": "",
      "size": "",
      "image": null,
      "status": "invalid"
  });
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const authToken = localStorage.access;
  let decoded;
  useEffect(() => {
    try {
      decoded = jwtDecode(authToken);
      if (decoded.is_shelter === true) {
        navigate('/error');
      }
      setUsername(decoded.username);
    } catch (e) {
      decoded = null;
    }
  }, [authToken, decoded]);

  useEffect(() => {
    ajax_or_login(`/petlistings/${petID}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.detail == "Not found.") {
        navigate('/error');
      } else {
        setPetData(data);
        if (data.image == null) {
          data.image = "/add-image.png"
        }
      }
    })
    .catch((error) => {
      console.error('Error fetching applications:', error);
    })
  }, []);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function handleSubmit(event) {
    event.preventDefault();
    ajax_or_login(`/applications/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
    .then((response) => response.json())
    .then((data) => {
      console.log('Fetched data:', data);
      const matchingApplication = data.results.find(
        (app) => app.animal === petData.name && app.applicant === username
      );

      if (matchingApplication) {
        alert("You already applied for this pet!")
        navigate('/applications');
      } else {
        let formData = new FormData(event.target);
        let bodyData = {
          self_desc: "N/A",
          exp_pets: "N/A",
          diff_owners: "N/A",
          food_check: false,
          water_check: false,
          shelter_check: false,
          animal: petData.name,
          shelter: petData.shelter,
          applicant: username,
          status: 'pending'
        }
        const checkboxKeys = ['food_check', 'water_check', 'shelter_check'];
        formData.forEach((value, key) => {
          if (key === 'self_desc' || key === 'exp_pets' || key === 'diff_owners') {
            if (value != "") {
              bodyData[key] = value;
            }
          }
          if (checkboxKeys.includes(key)) {
            bodyData[key] = formData.has(key) ? true : false;
          }
        });
        ajax_or_login(`/applications/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(bodyData),
          credentials: 'include',
        })
        .then((response) => response.json())
        .then((appdata) => {
          let notifBody = {
            "message": appdata.applicant + " submitted an application for " + petData.name + "!",
            "is_read": "false",
            "recipient": petData.shelter,
            "type": "application",
            "pk": appdata.ID
          }
          ajax_or_login(`/notifications/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(notifBody),
            credentials: 'include',
          })
          .then((response) => response.json())
          .then((data) => {
            alert("Applied successfully!");
            navigate("/applications/")
          })
          .catch((error) => {
            console.error('Error sending notification:', error);
          });
        })
        .catch((error) => {
          console.error('Error submitting application:', error);
        });
      }
    })
    .catch((error) => {
      console.error('Error fetching applications:', error);
    });
  }

  return (
    <div>
      <div className="page_container">
        <div className="content_wrap">
          <Header />
          <section className="py-5">
            <div className="container">
              <div className="row gx-5">
                <aside className="col-lg-6">
                  <h2 className="subtitle text-dark">{capitalizeFirstLetter(petData.name)}</h2>
                  <div className="border rounded-4 mb-3 d-flex justify-content-center">
                    <a
                      data-fslightbox="mygalley"
                      className="rounded-4"
                      target="_blank"
                      data-type="image"
                      href="/assets/img/geralt-1.png"
                    >
                      <img
                        className="rounded-4 fit"
                        src={petData.image}
                        alt="Interest Form Image"
                      />
                    </a>
                  </div>
                </aside>
                <main className="col-lg-6">
                  <div className="ps-lg-3">
                    <h2 className="title text-dark">Interest Form</h2>
  
                    <p>
                      Fill out and submit the following form to send to the
                      Adoption Shelter.
                    </p>
  
                    <form onSubmit={handleSubmit}>
                      <div className="form-group mb-3">
                        <label htmlFor="Describe">Describe yourself!</label>
                        <textarea
                          className="form-control"
                          id="self_desc"
                          rows="3"
                          name="self_desc"
                        ></textarea>
                      </div>
                      <div className="form-group mb-3">
                        <label htmlFor="HandlingPets">
                          How much experience do you have with handling pets?
                        </label>
                        <textarea
                          className="form-control"
                          id="exp_pets"
                          rows="3"
                          name="exp_pets"
                        ></textarea>
                      </div>
                      <div className="form-group mb-3">
                        <label htmlFor="Owners">
                          What sets you apart from other owners?
                        </label>
                        <textarea
                          className="form-control"
                          id="diff_owners"
                          rows="3"
                          name="diff_owners"
                        ></textarea>
                      </div>
                      <div className="form-check mb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="food_check"
                          name="food_check"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="food_check"
                        >
                          I have access to Food for the Pet.
                        </label>
                      </div>
                      <div className="form-check mb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="water_check"
                          name="water_check"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="water_check"
                        >
                          I have access to Water for the Pet.
                        </label>
                      </div>
                      <div className="form-check mb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="shelter_check"
                          name="shelter_check"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="shelter_check"
                        >
                          I have access to Shelter for the Pet.
                        </label>
                      </div>
                      <button type="submit" className="btn btn-primary shadow-0">
                        Submit
                      </button>
                    </form>
                  </div>
                </main>
              </div>
            </div>
          </section>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default AppApply;