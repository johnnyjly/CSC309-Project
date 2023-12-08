import { useState, useEffect } from "react";
import { ajax_or_login } from "../../ajax.js";
import { Link, useNavigate, useParams } from 'react-router-dom';

import Comment from './Comment.jsx';


function CommentList(props) {
    const [ query, setQuery ] = useState({});
    const [ response, setResponse ] = useState({});
    const [ error, setError ] = useState("");

    const params = useParams(); // params used for testing, can replace with props later
    const navigate = useNavigate();
    useEffect(() => {
        let url = "";
        switch(props.on) {
            case 'shelter':
                url = `/comments/pet_shelters/${params.username}/${params.id}/`;
                break;
            case 'application':
                url = `/comments/applications/${params.pk}/${params.id}/`;
                break;
        };
        ajax_or_login(url, {method: 'GET'}, navigate)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            else {
                throw Error(response.statusText);
            }
        })
        .then(json => {
            setResponse(json);
        })
        .catch(error => setError(error.toString()));
    }, [query, error, navigate]);

    console.log(response); // DEBUG

    // TODO: will probably need to change Link later
    return <div>
        <section>
          <div class="container my-5 py-5">
            <div class="row d-flex justify-content-center">
              <div class="col-md-12 col-lg-10 col-xl-8">
                <div class="card">
                  { response.hasOwnProperty('content')
                    ? <>
                        <div class="card-body">
                          <Comment result={response} />
                        </div>
                        <div style={{textAlign: "center"}}>
                          <Link to=".." relative="path">
                            <button type="button" class="btn btn-primary">View full thread</button>
                          </Link>
                        </div>
                      </>
                    : <></> }
                </div>
              </div>
            </div>
          </div>
        </section>
    </div>
}

export default CommentList;