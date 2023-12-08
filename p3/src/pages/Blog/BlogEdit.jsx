import { useState } from "react";
import { ajax_or_login } from "../../ajax.js";
import { useNavigate, useParams } from 'react-router-dom';

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

function BlogEdit() {
    const [ response, setResponse ] = useState({});
    const [ error, setError ] = useState("");
    
    const params = useParams()
    const navigate = useNavigate();

    ajax_or_login(`/blogs/${params.username}/${params.id}/`, {method: 'GET'}, navigate)
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

    console.log(response);

    function handle_submit(event) {
        let data = new FormData(event.target);

        ajax_or_login(`/blogs/${params.username}/`, {
            method: 'POST',
            body: data,
        }, navigate);

        navigate(`/shelters/${params.username}`);
    }

    return <div>
    <div class="page_container">
      <div class="content_wrap">
        <Header />
        <section style={{marginLeft: "1em", marginRight: "1em"}}>
          <h1>Edit Blog Post</h1>
          <form id="comment-create" class="card-footer py-3 border-0" style={{backgroundColor: "#f8f9fa"}} onSubmit={ handle_submit }>
          <div class="d-flex flex-start w-100">
              <div class="form-outline w-100">
              <label class="form-label" for="title">Title</label>
              <input class="form-control" name="title" id="title" type="text" maxLength="1000"
               style={{background: "#fff"}}></input>
              <label class="form-label" for="image">Image (optional)</label>
              <input class="form-control" name="image" id="image" type="file"
               style={{background: "#fff"}}></input>
              <label class="form-label" for="content">Content</label>
              <textarea class="form-control" name="content" id="content" rows="4"
              style={{background: "#fff"}}></textarea>
              </div>
          </div>
          <div class="float-end mt-2 pt-1">
              <button type="submit" class="btn btn-primary btn-sm">Post</button>
          </div>
          </form>
        </section>
        <div style={{margin: "6em"}}></div>
      </div>
      <Footer />
    </div>
  </div>

}

export default BlogEdit;