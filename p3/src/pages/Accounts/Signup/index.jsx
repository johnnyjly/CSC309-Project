// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

import Header from '../../../components/Header/Header.jsx';
import Footer from '../../../components/Footer/Footer.jsx';
import '../style.css'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ajax } from '../../../ajax.js';

const Signup = () => {

    const navigate = useNavigate();
    const [errors, setErrors] = useState({ firstNameError: "", lastNameError: "", emailError: "", usernameError: "", password1Error: "", password2Error: "", otherErrors: "" });

    function handle_submit(event) {
        let data = new FormData(event.target);

        ajax("/accounts/", {
            method: "POST",
            body: data,
        })
            .then(request => {
                if (request.status === 201) {
                    navigate("/login");
                } else {
                    let json = request.json();
                    json.then(json => {
                        console.log(json);
                        setErrors({
                            firstNameError: json.first_name ? "**" + json.first_name[0] : "",
                            lastNameError: json.last_name ? "**" + json.last_name[0] : "",
                            emailError: json.email ? "**" + json.email[0] : "",
                            usernameError: json.username ? "**" + json.username[0] : "",
                            password1Error: json.password1 ? "**" + json.password1[0] : "",
                            password2Error: json.password2 ? "**" + json.password2 : "",
                            otherErrors: ""
                        });
                    }
                    )
                }
            })
            .catch(error => {
                setErrors({ ...errors, otherErrors: error });
            });

        event.preventDefault();
    }

    return <>
        <div className="page_container">
            <div className="content_wrap">
                <Header />
                <main>
                    <div className="container">
                        <div className="row justify-content-center">
                            <form className="row g-3 form-signup" onSubmit={handle_submit}>
                                <h1 className="form-title">Sign Up</h1>
                                <div className="col-md-6">
                                    <div className="form-floating">
                                        <input type="text" className="form-control" id="first_name" name="first_name" required></input>
                                        <label htmlFor='first_name' className="form-label">First name</label>
                                        <small id="login-fail" className="form-text">{errors.firstNameError}</small>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-floating">
                                        <input type="text" className="form-control" id="last_name" name="last_name" required></input>
                                        <label htmlFor='last_name' className="form-label">Last name</label>
                                        <small id="login-fail" className="form-text">{errors.lastNameError}</small>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-floating">
                                        <input type="email" className="form-control" id="email" name="email" required></input>
                                        <label htmlFor='email' className="form-label">Email</label>
                                        <small id="login-fail" className="form-text">{errors.emailError}</small>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-floating">
                                        <input type="text" className="form-control" id="username" name="username" required></input>
                                        <label htmlFor='username' className="form-label">Username</label>
                                        <small id="login-fail" className="form-text">{errors.usernameError}</small>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-floating">
                                        <input type="password" className="form-control" id="password1" name="password1" required></input>
                                        <label htmlFor='password1' className="form-label">Password</label>
                                        <small id="login-fail" className="form-text">{errors.password1Error}</small>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-floating">
                                        <input type="password" className="form-control" id="password2" name="password2" required></input>
                                        <label htmlFor='password2' className="form-label">Confirmed-Password</label>
                                        <small id="login-fail" className="form-text">{errors.password2Error}</small>
                                    </div>
                                </div>
                                <h5 className="form-subtitle">Are you a pet shelter?</h5>
                                <div className="col-12">
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="checkbox" name="become_shelter" id="become_shelter"></input>
                                        <label className="form-check-label" htmlFor="become_shelter">
                                            I'm a Pet Shelter.
                                        </label>
                                    </div>
                                </div>
                                <div className="d-grid gap-2 col-6 mx-auto">
                                    <button type="submit" className="btn btn-primary">Sign up</button>
                                    <small id="login-fail" className="form-text">{errors.otherErrors}</small>
                                </div>
                            </form>
                            <div className="login-signup">
                                <p>Already have an account?&nbsp;</p>
                                <Link to="/login">Log in</Link>
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        </div>
    </>
}

export default Signup;