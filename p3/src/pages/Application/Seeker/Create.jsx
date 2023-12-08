// Import Basic Libraries
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate  } from 'react-router-dom';
import { ajax_or_login } from '../../../ajax.js';

// Import Components
import Header from '../../../components/Header/Header.jsx';
import Footer from '../../../components/Footer/Footer.jsx';

// Import CSS and Bootstrap
import '../../../styles/apply.css'
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

  console.log(petData)
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
  
                    <form>
                      <div className="form-group mb-3">
                        <label htmlFor="Describe">Describe yourself!</label>
                        <textarea
                          className="form-control"
                          id="exampleFormControlTextarea1"
                          rows="3"
                        ></textarea>
                      </div>
                      <div className="form-group mb-3">
                        <label htmlFor="HandlingPets">
                          How much experience do you have with handling pets?
                        </label>
                        <textarea
                          className="form-control"
                          id="exampleFormControlTextarea1"
                          rows="3"
                        ></textarea>
                      </div>
                      <div className="form-group mb-3">
                        <label htmlFor="Owners">
                          What sets you apart from other owners?
                        </label>
                        <textarea
                          className="form-control"
                          id="exampleFormControlTextarea1"
                          rows="3"
                        ></textarea>
                      </div>
                      <div className="form-check mb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckDefault1"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckDefault1"
                        >
                          I have access to Food for the Pet.
                        </label>
                      </div>
                      <div className="form-check mb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckDefault2"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckDefault2"
                        >
                          I have access to Water for the Pet.
                        </label>
                      </div>
                      <div className="form-check mb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckDefault3"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckDefault3"
                        >
                          I have access to Shelter for the Pet.
                        </label>
                      </div>
                      <div className="form-check mb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckDefault4"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckDefault4"
                        >
                          I promise to treat the Pet with love.
                        </label>
                      </div>
                    </form>

                    <a href="#" className="btn btn-primary shadow-0">
                      Submit
                    </a>
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