import { useState, useEffect } from "react";
import { ajax_or_login } from "../../ajax.js";
import { Link, useNavigate, useParams } from 'react-router-dom';

import CommentCreate from './CommentCreate.jsx'
import Comment from './Comment.jsx';


function CommentList(props) {
    const [ query, setQuery ] = useState({});
    const [ response, setResponse ] = useState({});
    const [ page, setPage ] = useState(1);
    const [ url, setUrl ] = useState("");
    const [ error, setError ] = useState("");
    const [ status, setStatus ] = useState(200);

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        switch (props.on) {
            case 'shelter':
                setUrl(`/comments/pet_shelters/${props.username}/`);
                break;
            case 'application':
                setUrl(`/comments/applications/${params.pk}/`);
                break;
            case 'blog':
                setUrl(`/comments/blogs/${props.username}/${props.id}/`);
                break;
        };
        ajax_or_login(url.concat(`?page=${page}`), {method: 'GET'}, navigate)
        .then(response => {
            setStatus(response.status);
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
    }, [query, page, error, navigate]);

    console.log(response); // DEBUG
    console.log(url); // DEBUG
    console.log(error); // DEBUG
    console.log(status); // DEBUG

    return <div>
        <section>
          <div class="container my-5 py-5">
            <div class="row d-flex justify-content-center">
              <div class="col-md-12 col-lg-10 col-xl-8">
                <div class="card">
                  <div class="card-body">
                    <h2>Comments</h2>
                    { status !== 404 
                      ? <CommentCreate on={props.on} url={url} />
                      : <></> }
                    <div style={{margin: "1em"}}></div>
                    { response.results
                      ? response.results.map(result => <Comment result={result} />)
                      : <></> }
                  </div>
                  { response.count > 1
                    ? <div style={{textAlign: "center"}}>
                        { response.previous
                          ? <button type="button" class="btn btn-primary" onClick={ () => setPage(page - 1) } style={{margin: "0.5rem"}}>{"<<"}</button>
                          : <></> }
                        { response.next
                          ? <button type="button" class="btn btn-primary" onClick={ () => setPage(page + 1) } style={{margin: "0.5rem"}}>{">>"}</button>
                          : <></> }
                      </div>
                    : <></> }
                </div>
              </div>
            </div>
          </div>
        </section>
    </div>
}

export default CommentList;