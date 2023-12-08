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
import { ajax_or_login } from '../../ajax';
import { jwtDecode } from 'jwt-decode';

function User() {

    const navigate = useNavigate();
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
    });
    const [error, setError] = useState("");
    const { username } = useParams();

    const isShelter = jwtDecode(localStorage.getItem("access")).is_shelter;

    useEffect(() => {
        let link;
        if (isShelter) {
            link = `/accounts/shelters/${username}/`;
        } else {
            link = `/accounts/seekers/${username}/`;
        }
        ajax_or_login(link, { method: "GET" }, navigate)
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
    }, [navigate, username]);

    return <>
        <div className="page_container">
            <div className="content_wrap">
                <Header />
                <main>
                    <div className="container mt-5 mb-5">
                        <div className="row justify-content-center">
                            <div className="col-md-3 border-end">
                                <div className="d-flex flex-column align-items-center justify-content-center text-center">
                                    {user.user_avatar === null || user.user_avatar === "" ?
                                        <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor"
                                            className="bi bi-person" viewBox="0 0 16 16">
                                            <path
                                                d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
                                        </svg> :
                                        <img src={user.user_avatar} alt="user_avatar" className="rounded-circle" width="80" height="80"></img>}
                                    <h5 className="profile-username">{user.username}</h5>
                                    <div><button onClick={() => navigate(`/shelters/${user.username}`)} className="btn btn-primary" style={{ background: "orange", margin: "0.5rem"}}>Shelter</button></div>
                                </div>
                            </div>
                            <div className="col-md-7 border-end">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h4 className="profile-setting">User Profile</h4>
                                </div>
                                <form className="row g-3 form-update">
                                    <div className="col-md-6">
                                        <div className="form-floating">
                                            <input type="text" className="form-control" id="first_name" name="first_name"
                                                defaultValue={user.first_name} disabled required></input>
                                            <label htmlFor='first_name' className="update-labels">First Name</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-floating">
                                            <input type="text" className="form-control" id="last_name" name="last_name"
                                                defaultValue={user.last_name} disabled required></input>
                                            <label htmlFor='last_name' className="update-labels">Last Name</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-floating">
                                            <input type="text" className="form-control" id="email" name="email"
                                                defaultValue={user.email} disabled required></input>
                                            <label htmlFor='email' className="update-labels">Email</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-floating">
                                            <input type="text" className="form-control" id="username" name="username"
                                                defaultValue={user.username} disabled required></input>
                                            <label htmlFor='username' className="update-labels">Username</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-floating">
                                            <input type="text" className="form-control" id="phone_number" name="phone_number"
                                                defaultValue={user.phone_number} disabled></input>
                                            <label htmlFor='phone_number' className="update-labels">Phone number</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-floating">
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-floating">
                                            <input type="text" className="form-control" id="address" name="address"
                                                defaultValue={user.address} disabled></input>
                                            <label htmlFor="address" className="form-label">Address</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-floating">
                                            <input type="text" className="form-control" id="city" name="city" defaultValue={user.city} disabled></input>
                                            <label htmlFor="city" className="form-label">City</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-floating">
                                            <select id="province" name="province" className="form-select" disabled>
                                                <option defaultValue="0">{user.province}</option>
                                                {["NL", "PE", "NS", "NB", "QC", "ON", "MB", "SK", "AB", "BC"].map((province, index) => {
                                                    return province !== user.province ? <option key={index} value={province}>{province}</option> : ""
                                                })}
                                            </select>
                                            <label htmlFor="province" className="form-label" disabled>Province</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-floating">
                                            <input type="text" className="form-control" id="postal_code" name="postal_code" defaultValue={user.postal_code} disabled></input>
                                            <label htmlFor="postal_code" className="form-label">Postal Code</label>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="col-md-2"></div>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        </div>
    </>
};

export default User;