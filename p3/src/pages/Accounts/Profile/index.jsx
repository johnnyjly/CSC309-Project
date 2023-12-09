// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

// import header and footer (better to use layout but just stick with this for now)
import Header from '../../../components/Header/Header.jsx';
import Footer from '../../../components/Footer/Footer.jsx';

// import the css file and other static files
import '../style.css'

// import react-related stuff
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";

// import other components
import { ajax_or_login } from '../../../ajax';

const Profile = () => {
    const navigate = useNavigate();
    const [errors, setErrors] = useState({ emailError: "", usernameError: "", phoneError: "", passwordError: "", otherErrors: "" });

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
        receive_communications: false,
        receive_news: false,
        shelter_name: "",
        shelter_avatar: "",
        mission_statement: "",
    });

    const [is_shelter, setIsShelter] = useState(false);

    useEffect(() => {
        ajax_or_login(`/accounts/${username}/profile/`, { method: "PUT" }, navigate)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw Error(response.statusText);
                }
            })
            .then(json => {
                // Check if the user is a shelter
                if ("shelter_name" in json) {
                    setIsShelter(true);
                }
                setUser(json);
            })
            .catch(error => setErrors({ ...errors, otherErrors: error }));
    }, [navigate, username]);

    function handle_profile_submit(event) {
        let data = new FormData(event.target);
        ajax_or_login(`/accounts/${username}/profile/`, {
            method: "PUT",
            body: data,
        }, navigate)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    let json = response.json();
                    // Some error messages are not returned in a dictionary
                    // Need to handle them separately
                    json.then(json => {
                        setErrors({
                            ...errors,
                            emailError: json.email ? "**" + json.email  : "",
                            phoneError: json.phone_number ? "**" + json.phone_number : "",
                            usernameError: json.username ? "**" + json.username : "",
                            otherErrors: ""
                        });
                    }
                    )
                    throw Error(response.statusText);
                }
            })
            .then(json => {
                // Reset the error messages
                setErrors({
                    ...errors,
                    emailError: "",
                    phoneError: "",
                    usernameError: "",
                    otherErrors: ""
                });
                setUser(json);
                
                if (user.username !== json.username) {
                    localStorage.removeItem("access");
                    localStorage.removeItem("username");
                    alert("Username is changed. Please log in again.");
                    navigate('/login');
                } else {
                    alert("Profile updated successfully!")
                }
            })
            .catch(error => setErrors({ ...errors, otherErrors: error }));
        event.preventDefault();
    }

    function handle_password_submit(event) {
        let data = new FormData(event.target);
        ajax_or_login(`/accounts/${username}/profile/`, {
            method: "PUT",
            body: data,
        }, navigate)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    let json = response.json();
                    // Some error messages are not returned in a dictionary
                    // Need to handle them separately
                    json.then(json => {
                        setErrors({
                            ...errors,
                            passwordError: json.password ? "**" + json.password : "",
                            otherErrors: ""
                        });
                    }
                    )
                    throw Error(response.statusText);
                }
            })
            .then(json => {
                // Reset the error messages
                setErrors({
                    ...errors,
                    passwordError: "",
                    otherErrors: ""
                });
                alert("Password updated successfully!")
            })
            .catch(error => setErrors({ ...errors, otherErrors: error }));
        event.preventDefault();
    }

    function handle_delete(event) {
        ajax_or_login(`/accounts/${username}/deletion/`, {
            method: "DELETE",
        }, navigate)
            .then(response => {
                if (response.ok) {
                    localStorage.removeItem("access");
                    localStorage.removeItem("username");
                    alert("Account deleted successfully!");
                    navigate("/");
                } else {
                    throw Error(response.statusText);
                }
            })
            .catch(error => setErrors({ ...errors, otherErrors: error }));
        event.preventDefault();
    }

    function handle_logout(event) {
        localStorage.removeItem("access");
        localStorage.removeItem("username");
        alert("Logged out successfully!");
        navigate("/");
        event.preventDefault();
    }

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
                                    <div>
                                    <button onClick={handle_logout} className="btn btn-primary" style={{ background: "orange", margin: "0.5rem"}}>Log out</button>
                                    <button onClick={handle_delete} className="btn btn-primary" style={{ background: "red", margin: "0.5rem"}}>Delete</button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-5 border-end">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h4 className="profile-setting">Profile Settings</h4>
                                </div>
                                <form className="row g-3 form-update" onSubmit={handle_profile_submit}>
                                    <div className="col-md-6">
                                        <div className="form-floating">
                                            <input type="text" className="form-control" id="first_name" name="first_name"
                                                defaultValue={user.first_name} required></input>
                                            <label htmlFor='first_name' className="update-labels">First Name</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-floating">
                                            <input type="text" className="form-control" id="last_name" name="last_name"
                                                defaultValue={user.last_name} required></input>
                                            <label htmlFor='last_name' className="update-labels">Last Name</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-floating">
                                            <input type="text" className="form-control" id="email" name="email"
                                                defaultValue={user.email} required></input>
                                            <label htmlFor='email' className="update-labels">Email</label>
                                            <small id="login-fail" className="form-text">{errors.emailError}</small>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-floating">
                                            <input type="text" className="form-control" id="username" name="username"
                                                defaultValue={user.username} required></input>
                                            <label htmlFor='username' className="update-labels">Username</label>
                                            <small id="login-fail" className="form-text">{errors.usernameError}</small>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-floating">
                                            <input type="text" className="form-control" id="phone_number" name="phone_number"
                                                defaultValue={user.phone_number}></input>
                                            <label htmlFor='phone_number' className="update-labels">Phone number</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-floating">
                                            <small id="login-fail" className="form-text">{errors.phoneError}</small>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-floating">
                                            <input type="text" className="form-control" id="address" name="address"
                                                defaultValue={user.address}></input>
                                            <label htmlFor="address" className="form-label">Address</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-floating">
                                            <input type="text" className="form-control" id="city" name="city" defaultValue={user.city}></input>
                                            <label htmlFor="city" className="form-label">City</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-floating">
                                            <select id="province" name="province" className="form-select">
                                                <option defaultValue="0">{user.province}</option>
                                                {["NL", "PE", "NS", "NB", "QC", "ON", "MB", "SK", "AB", "BC"].map((province, index) => {
                                                    return province !== user.province ? <option key={index} value={province}>{province}</option> : ""
                                                })}
                                            </select>
                                            <label htmlFor="province" className="form-label">Province</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-floating">
                                            <input type="text" className="form-control" id="postal_code" name="postal_code" defaultValue={user.postal_code}></input>
                                            <label htmlFor="postal_code" className="form-label">Postal Code</label>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-floating">
                                            <input className="form-control" type="file" id="user_avatar" name="user_avatar"></input>
                                            <label htmlFor="formFile" className="form-label">Update your profile icon</label>
                                        </div>
                                    </div>
                                    <div className="d-grid gap-2 col-8 mx-auto">
                                        <button type="submit" className="btn btn-primary">Save Profile</button>
                                    </div>
                                </form>
                            </div>
                            <div className="col-md-4">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h4 className="change-password">Change Password</h4>
                                </div>
                                <form className="row g-3 form-update-pwd" onSubmit={handle_password_submit}>
                                    <div className="col-12">
                                        <div className="form-floating">
                                            <input type="password" className="form-control" id="old_password" name="old_password" autoComplete="current_password" required></input>
                                            <label htmlFor="old_password" className="form-label">New password</label>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-floating">
                                            <input type="password" className="form-control" id="new_password" name="new_password" autoComplete="new_password" required></input>
                                            <label htmlFor="new_password" className="form-label">Confirm password</label>
                                            <small id="login-fail" className="form-text">{errors.passwordError}</small>
                                        </div>
                                    </div>
                                    <div className="d-grid gap-2 col-8 mx-auto">
                                        <button type="submit" className="btn btn-primary">Update password</button>
                                    </div>
                                </form>
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h4 className="profile-setting">Email Preferences</h4>
                                </div>
                                <form className="row g-3 form-update-pre" onSubmit={handle_profile_submit}>
                                    <div className="col-12">
                                        <div className="form-check">
                                            <label className="form-check-label" htmlFor="receive_communications">
                                                I would like to receive communications from PetPal,
                                                including info on pet adoption and pet care,
                                                promotional materials and more. You can withdraw consent at any time.
                                            </label>
                                            <input className="form-check-input" type="checkbox" id="receive_communications" name="receive_communications"
                                            checked={user.receive_communications} onChange={() => setUser({...user, receive_communications: !user.receive_communications})}></input>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-check">
                                            <label className="form-check-label" htmlFor="receive_news">
                                                I would like to receive the latest news, updates, promotions,
                                                special offers and exclusive savings from PetPal.
                                                You can withdraw consent at any time.
                                            </label>
                                            <input className="form-check-input" type="checkbox" name="receive_news"
                                                id="receive_news" checked={user.receive_news} 
                                                onChange={() => setUser({...user, receive_news: !user.receive_news})}></input>
                                        </div>
                                    </div>
                                    <div className="d-grid gap-2 col-8 mx-auto">
                                        <button type="submit" className="btn btn-primary">Update preferences</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        {(is_shelter) ?
                            <div className="row justify-content-center">
                                <div className="col-md-3 border-end"></div>
                                <div className="col-md-9 border-top">
                                    <div className="d-flex justify-content-start align-items-center mb-3">
                                        <h4 className="shelter-setting-title">Shelter Page Settings</h4>
                                    </div>
                                    <form className="row g-3 form-pet-listing" onSubmit={handle_profile_submit}>
                                        <div className="col-md-6">
                                            <div className="form-floating">
                                                <input type="text" className="form-control" id="shelter_name" name="shelter_name"
                                                    defaultValue={user.shelter_name} required></input>
                                                <label htmlFor="shelter_name" className="update-labels">Current shelter name</label>
                                                <small className="form-text">**Default as your username.</small>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-floating">
                                                <input className="form-control" type="file" id="shelter_avatar" name="shelter_avatar"></input>
                                                <label htmlFor="formFile" className="form-label">Update your shelter image</label>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <label htmlFor="inputMission" className="form-label">&nbsp;Mission Statement</label>
                                            <textarea className="form-control" rows="3" id="inputMission" name="mission_statement" defaultValue={user.mission_statement}></textarea>
                                        </div>
                                        <div className="d-grid gap-2 col-4 mx-auto">
                                            <button type="submit" className="btn btn-primary">Save Shelter Profile</button>
                                        </div>
                                        <div className="d-grid gap-2 col-4 mx-auto">
                                            <button onClick={() => navigate(`/listings?page=1&status=Available&shelter=${user.shelter_name}`)} className="btn btn-primary update-manage-btn">Manage Your Pet Listings</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            : ""}
                    </div>
                </main>
                <Footer />
            </div>
        </div>
    </>
}

export default Profile;