import { useState, useEffect } from "react";
import { ajax_or_login } from "../../ajax.js";
import { useNavigate, useParams } from 'react-router-dom';

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

function BlogEdit() {
    const [ response, setResponse ] = useState({});
    const [ error, setError ] = useState("");
    
    const params = useParams()
    const navigate = useNavigate();

    useEffect(() => {
        ajax_or_login(`/blogs/${params.username}/${params.pk}/`, {method: 'GET'}, navigate)
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
    }, [error, navigate]);

    console.log(response); // DEBUG

    function handle_submit(event) {
        let data = new FormData(event.target);

        ajax_or_login(`/blogs/${params.username}/${params.pk}/`, {
            method: 'PUT',
            body: data,
        }, navigate)
        .then(response => navigate(`/blogs/${params.username}/${params.pk}`));
        event.preventDefault();
    }

    return <div>
    <div class="page_container">
      <div class="content_wrap">
        <Header />
        <main>
          <div className="container mt-5 mb-5">
            <div className="row justify-content-center">
          <h1>Edit Blog Post</h1>
          <form id="comment-create" class="card-footer py-3 border-0" style={{backgroundColor: "#f8f9fa"}} onSubmit={ handle_submit }>
          <div class="d-flex flex-start w-100">
              <div class="form-outline w-100">
              <label class="form-label" for="title">Title</label>
              <input class="form-control" name="title" id="title" type="text" maxLength="1000"
               style={{background: "#fff"}} defaultValue={ response.title }></input>
               <p></p>
              <label class="form-label" for="image">Image (optional)</label>
              <input class="form-control" name="image" id="image" type="file"
               style={{background: "#fff"}}></input>
               <p></p>
              <label class="form-label" for="content">Content</label>
              <textarea class="form-control" name="content" id="content" rows="4"
              style={{background: "#fff"}} defaultValue={ response.content }></textarea>
              </div>
          </div>
          <div class="float-end mt-2 pt-1">
              <button type="submit" class="btn btn-primary btn-sm">Post</button>
          </div>
          </form>
        </div>
        </div>
        </main>
        <div style={{margin: "6em"}}></div>
      </div>
      <Footer />
    </div>
  </div>

}

export default BlogEdit;