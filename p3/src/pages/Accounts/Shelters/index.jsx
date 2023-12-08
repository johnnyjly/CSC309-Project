// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

// import header and footer (better to use layout but just stick with this for now)
import Header from '../../../components/Header/Header.jsx';
import Footer from '../../../components/Footer/Footer.jsx';
import Table from './Table';

// import the css file and other static files
import '../style.css'
import favicon from '../../../assets/favicon/icons8-dog-96-upscaled.png'

// import react-related stuff
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from "react-router-dom";

// import other components
import { ajax_or_login } from '../../../ajax';

function Shelters() {

    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [totalPages, setTotalPages] = useState(1);
    const [shelters, setShelters] = useState([]);
    const [error, setError] = useState("");

    const query = useMemo(() => ({
        page: parseInt(searchParams.get("page") > totalPages ? 1 : searchParams.get("page") || 1),
    }), [searchParams]);

    useEffect(() => {

        const { page } = query;

        ajax_or_login(`/accounts/shelters/?page=${page}`, { method: "GET" }, navigate)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw Error(response.statusText);
                }
            })
            .then(json => {
                setShelters(json.results);
                setTotalPages(Math.ceil(parseFloat(json.count / 10.0)));
            })
            .catch(error => setError(error));
        if (error !== "") {
            alert(error);
        }
    }, [query, navigate]);

    return <>
        <div className="page_container">
            <div className="content_wrap">
                <Header />
                <main>
                    <div className="container mt-5 mb-5">
                        <div className="row justify-content-center">
                            <div className="col-md-2 border-end">
                                <div className="d-flex flex-column align-items-center justify-content-center text-center">
                                    <img src={favicon} width={72} height={72} alt="favicon" />
                                </div>
                            </div>
                            <div className="col-md-10 border-end">
                                <div className="d-flex justify-content-evenly align-items-center mb-3">
                                    <h1 className="profile-setting">Shelters List</h1>
                                </div>
                                <Table shelters={shelters} />
                                <p>
                                    {query.page < totalPages
                                        ? <button onClick={() => setSearchParams({ ...query, page: query.page + 1 })}>Next</button>
                                        : <></>}
                                    {query.page > 1
                                        ? <button onClick={() => setSearchParams({ ...query, page: query.page - 1 })}>Previous</button>
                                        : <></>}
                                </p>
                                <p>Page {query.page} out of {totalPages}.</p>
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        </div>
    </>
}

export default Shelters;

