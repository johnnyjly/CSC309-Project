// Import Basic Libraries
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ajax_or_login } from '../../ajax.js';
import { jwtDecode } from 'jwt-decode';

// Import Components
import Header from '../../components/Header/Header.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import CommentList from '../Comment/CommentList.jsx'

// Import CSS and Bootstrap
import '../../styles/applications.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const AppDetail = () => {
  const { appID } = useParams();
  const [appData, setAppData] = useState({
    "ID": 0,
    "shelter": "",
    "applicant": "",
    "animal": "",
    "self_desc": "",
    "exp_pets": "",
    "diff_owners": "",
    "food_check": false,
    "water_check": false,
    "shelter_check": false,
    "update_time": "",
    "creation_time": "",
    "status": "invalid"
  });
  const navigate = useNavigate();

  const [isShelter, setIsShelter] = useState(false);
  const authToken = localStorage.access;
  let decoded;
  useEffect(() => {
    try {
      decoded = jwtDecode(authToken);
      if (decoded.is_shelter === true) {
        setIsShelter(true);
      }
    } catch (e) {
      decoded = null;
    }
  }, [authToken, decoded]);

  useEffect(() => {
    ajax_or_login(`/applications/${appID}/`, {
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
          setAppData(data);
        }
      })
      .catch((error) => {
        console.error('Error fetching applications:', error);
      })
  }, []);

  function handleWithdraw() {
    ajax_or_login(`/applications/${appID}/`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'status': 'withdrawn'
        }),
    }, navigate)
    .then((response) => response.json())
    .then(data => {
        alert("Withdrawn successfully!")
        window.location.reload();
    })
    .catch((error) => {
      console.error('Error fetching applications:', error);
    })
  }

  function handleAccept() {
    ajax_or_login(`/applications/${appID}/`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'status': 'accepted'
        }),
    }, navigate)
    .then((response) => response.json())
    .then(data => {
        alert("Accepted successfully!")
        window.location.reload();
    })
    .catch((error) => {
      console.error('Error fetching applications:', error);
    })
  }

  function handleReject() {
    ajax_or_login(`/applications/${appID}/`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'status': 'rejected'
        }),
    }, navigate)
    .then((response) => response.json())
    .then(data => {
      alert("Rejected successfully!")
      window.location.reload();
    })
    .catch((error) => {
      console.error('Error fetching applications:', error);
    })
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  console.log(appData);
  return (
    <div>
      <div className="page_container">
        <div className="content_wrap">
          <Header />
          <section className="py-5">
            <div className="container">
              <div className="row gx-5">
                <aside className="col-md-6">
                  <h2 className="title text-dark">
                    <span>
                      <Link to={`/users/${appData.applicant}/seeker/`}>
                        {capitalizeFirstLetter(appData.applicant)}
                      </Link>
                    </span>
                    's Form for{' '}{capitalizeFirstLetter(appData.animal)}
                  </h2>
                  <CommentList on={'application'} pk={appID} />
                </aside>
                <main className="col-md-6 col-12">
                  <div className="ps-lg-3">
                    
                    <div className="form-group mb-3">
                      <h2 className="subsubtitle text-dark">Describe yourself!</h2>
                      <p>{appData.self_desc}</p>
                    </div>
                    <div className="form-group mb-3">
                      <h2 className="subsubtitle text-dark">
                        How much experience do you have with handling pets?
                      </h2>
                      <p>{appData.exp_pets}</p>
                    </div>
                    <div className="form-group mb-3">
                      <h2 className="subsubtitle text-dark">
                        What sets you apart from other owners?
                      </h2>
                      <p>{appData.diff_owners}</p>
                    </div>
                    <div className="form-check mb-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault1"
                        checked={appData.food_check}
                        disabled
                      />
                      <p className="subsubsubtitle">I have access to Food for the Pet.</p>
                    </div>
                    <div className="form-check mb-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault2"
                        checked={appData.water_check}
                        disabled
                      />
                      <p className="subsubsubtitle">I have access to Water for the Pet.</p>
                    </div>
                    <div className="form-check mb-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault3"
                        checked={appData.shelter_check}
                        disabled
                      />
                      <p className="subsubsubtitle">I have access to Shelter for the Pet.</p>
                    </div>
                    <h2 className="subsubtitle text-dark">Status: {capitalizeFirstLetter(appData.status)}</h2>
                    {isShelter && appData.status == 'pending' && (
                      <>
                        <a href="#" className="btn btn-success shadow-0" onClick={handleAccept}>
                          Accept
                        </a>
                        <a href="#" className="btn btn-danger shadow-0 btn2" onClick={handleReject}>
                          Reject
                        </a>
                      </>
                    )}
                    {!isShelter && appData.status == 'pending' && (
                      <>
                        <a className="btn btn-danger shadow-0" onClick={handleWithdraw}>
                          Withdraw
                        </a>
                      </>
                    )}
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

export default AppDetail;