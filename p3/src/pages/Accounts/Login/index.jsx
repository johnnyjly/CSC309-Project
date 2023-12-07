// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

// import header and footer (better to use layout but just stick with this for now)
import Header from '../../../components/Header/Header.jsx';
import Footer from '../../../components/Footer/Footer.jsx';

// import the css file and other static files
import '../style.css'
import favicon from '../../../assets/favicon/icons8-dog-96-upscaled.png'

// import react-related stuff
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

// import other components
import { ajax } from '../../../ajax';

const Login = () => {

    const [error, setError] = useState("");
    const navigate = useNavigate();

    function handle_submit(event) {
        let data = new FormData(event.target);

        ajax("/api/token/", {
            method: "POST",
            body: data,
        })
            .then(request => request.json())
            .then(json => {
                if ("access" in json) {
                    localStorage.setItem("access", json.access);
                    localStorage.setItem("username", data.get("username"));
                    navigate("/");
                }
                else if ("detail" in json || "username" in json || "password" in json) {
                    setError("Invalid username or password.");
                }
                else {
                    setError("Unknown error while signing in.")
                }
            })
            .catch(error => {
                setError(error);
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
                            <form className="form-login" onSubmit={handle_submit}>
                                <img src={favicon} width={72} height={72} alt="favicon" />
                                <div className="form-group">
                                    <input type="text" className="form-control" id="InputUsername" name="username" required
                                        placeholder="username"></input>
                                </div>
                                <div className="form-group">
                                    <input type="password" className="form-control" id="InputPassword" name="password" autoComplete="password" required
                                        placeholder="password"></input>
                                    <small id="login-fail" className="form-text">{error}</small>
                                </div>
                                <button type="submit" className="btn btn-lg btn-primary btn-block">Log in</button>
                                <p className="mt-5 mb-3 text-muted">© 2023-2024</p>
                            </form>
                            <div className="login-signup">
                                <p>Don't have an account?&nbsp;</p>
                                <Link to="/signup">Sign up</Link>
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        </div>
    </>
};

export default Login;
