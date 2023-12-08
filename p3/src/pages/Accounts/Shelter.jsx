// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

// import header and footer (better to use layout but just stick with this for now)
import Header from '../../components/Header/Header.jsx';
import Footer from '../../components/Footer/Footer.jsx';

// import the css file and other static files
import './style.css'

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// import other components
import { ajax_or_login } from '../../ajax.js';

// import blog and comments
import BlogList from '../Blog/BlogList.jsx';
import CommentList from '../Comment/CommentList.jsx';

function Shelter() {

    const navigate = useNavigate();
    const { username } = useParams();
    const [user, setUser] = useState({
        first_name: "",
        last_name: "",
        email: "",
        username: "",
        phone_number: "",
        address: "",
        city: "",
        province: "",
        postal_code: "",
        user_avatar: "",
        shelter_name: "",
        shelter_avatar: "",
        mission_statement: "",
    });

    const [error, setError] = useState("");

    useEffect(() => {
        ajax_or_login(`/accounts/shelters/${username}/`, { method: "GET" }, navigate)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw Error(response.statusText);
                }
            })
            .then(json => {
                setUser(json);
            })
            .catch(error => setError(error));
    }, [navigate, username, error]);

    return <>
        <div className="page_container">
            <div className="content_wrap">
                <Header />
                <main>
                    <div className="container mt-5 mb-5">
                        <div className="row justify-content-center">
                            <div className="col-md-2 border-end">
                                <div className="d-flex flex-column align-items-center justify-content-center text-center">
                                    {user.user_avatar === null || user.user_avatar === "" ?
                                        <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor"
                                            className="bi bi-person" viewBox="0 0 16 16">
                                            <path
                                                d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
                                        </svg> :
                                        <img src={user.user_avatar} alt="user_avatar" className="rounded-circle" width="80" height="80"></img>}
                                    <h5 className="profile-username" style={{margin: "1rem 0.5rem"}}>{user.username}</h5>
                                </div>
                            </div>
                            <div className="d-grid col-md-7 gap-3">
                                <div className="d-flex justify-content-between align-items-center mb-3 border-bottom">
                                    <h1 className="profile-setting" style={{ fontFamily: "Nexa Regular,arial,helvetica,sans-serif", WebkitFontSmoothing: "antialiased" }}>{user.shelter_name}</h1>
                                </div>
                                <div className="d-flex justify-content-evenly row-g-3">
                                    <div className="col-md-3">
                                        <p className="address"> {user.address} </p>
                                    </div>
                                    <div className="col-md-3">
                                        <p className="city-province" style={{ color: "gray", fontStyle: "italic", }}> {user.city + ", " + user.province}</p>
                                    </div>
                                </div>
                                <div className="row-g-3">
                                    <div className="d-flex justify-content-between align-items-center mb-3 border-bottom">
                                        <h5 className="profile-setting" style={{ fontFamily: "Nexa Regular,arial,helvetica,sans-serif", WebkitFontSmoothing: "antialiased" }}>Mission Statement</h5>
                                    </div>
                                    <p>{user.mission_statement}</p>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="d-flex justify-content-center align-items-center mb-3">
                                    <button className="btn btn-primary" style={{ padding: "0.5rem 4rem", margin: "1rem 0.5rem" }}>VIEW OUR PETS</button>
                                </div>
                                <div className="d-flex justify-content-center align-items-center mb-3 border-bottom">
                                    <h6>Email: {user.email}</h6>
                                </div>
                                <div className="d-flex justify-content-center align-items-center mb-3 border-bottom">
                                    <h6>Phone: {user.phone_number}</h6>
                                </div>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            {user.shelter_avatar !== null ? <img src={user.shelter_avatar} alt="shelter_avatar" height={630} width={1200}></img> : ""}
                        </div>
                    </div>
                    <BlogList username={username} />
                    <CommentList on={'shelter'} username={username} />
                </main>
                <Footer />
            </div>
        </div>
    </>
}

export default Shelter;