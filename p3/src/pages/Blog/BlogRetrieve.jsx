import { useState, useEffect } from "react";
import { ajax_or_login } from "../../ajax.js";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

import CommentList from "../Comment/CommentList";


function BlogRetrieve() {
  const [query, setQuery] = useState({});
  const [response, setResponse] = useState({});
  const [error, setError] = useState("");

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    ajax_or_login(`/blogs/${params.username}/${params.pk}/`, { method: 'GET' }, navigate)
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
  console.log(jwtDecode(localStorage.getItem('access')).username); // DEBUG

  function handle_delete(id) {
    console.log(params.username); // DEBUG
    console.log(id); // DEBUG
    ajax_or_login(`/blogs/${params.username}/${id}/`, { method: 'DELETE' }, navigate)
      .then(response => navigate(`/shelters/${params.username}`));
  }

  function handle_edit(id) {
    console.log(params.username); // DEBUG
    console.log(id); // DEBUG
    navigate(`/blogs/${params.username}/${id}/edit`);
  }

  function format_time(time) {
    time = time.split('T');
    return time[1].substring(0, 5).concat(" ", time[0]);
  }

  // TODO: will probably need to change Link later
  return <div>
    <div class="page_container">
      <div class="content_wrap">
        <Header />
        <section>
          <div class="container my-5 py-5">
            <div class="row d-flex justify-content-center">
              <div class="col-md-12 col-lg-10 col-xl-8">
                <div class="card">
                  {response.hasOwnProperty('content')
                    ? <div class="card-body">
                      <h2>{response.title}</h2>
                      <p class="text-muted small mb-0">Posted: {format_time(response.creation_time)}</p>
                      <p class="text-muted small mb-0">Last Updated: {format_time(response.update_time)}</p>
                      <div style={{ margin: "1rem", display: "grid", justifyItems: "center" }}>
                        <img src={response.image} style={{ maxHeight: "640px" }}></img>
                      </div>
                      <p class="mt-3 mb-4 pb-2">{response.content}</p>
                    </div>
                    : <></>}
                  {params.username === jwtDecode(localStorage.getItem('access')).username
                    ? <div class="prev-next-container d-flex justify-content-center">
                      <button type="button" class="btn btn-primary" onClick={() => handle_edit(response.ID)} style={{ margin: "0.5rem" }}>Edit</button>
                      <button type="button" class="btn btn-danger" onClick={() => handle_delete(response.ID)} style={{ margin: "0.5rem" }}>Delete</button>
                    </div>
                    : <></>
                  }
                </div>
              </div>
            </div>
          </div>
        </section>
        <CommentList on={'blog'} username={params.username} id={params.pk} />
      </div>
      <Footer />
    </div>
  </div>
}

export default BlogRetrieve;