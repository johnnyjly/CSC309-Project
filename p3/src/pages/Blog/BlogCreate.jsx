import { ajax_or_login } from "../../ajax.js";
import { useNavigate, useParams } from 'react-router-dom';

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useEffect, useMemo, useState } from "react";


function BlogCreate() {

  const params = useParams()
  const navigate = useNavigate();

  function handle_submit(event) {
    let data = new FormData(event.target);

    ajax_or_login(`/blogs/${params.username}/`, {
      method: 'POST',
      body: data,
    }, navigate)
      .then(response=>{
        navigate(`/shelters/${params.username}`);
      })
      event.preventDefault();
  }

  return <div>
    <div className="page_container">
      <div className="content_wrap">
        <Header />
        <section style={{ marginLeft: "1em", marginRight: "1em" }}>
          <h1>Create Blog Post</h1>
          <form id="comment-create" className="card-footer py-3 border-0" style={{ backgroundColor: "#f8f9fa" }} onSubmit={handle_submit}>
            <div className="d-flex flex-start w-100">
              <div className="form-outline w-100">
                <label className="form-label" htmlFor="title">Title</label>
                <input className="form-control" name="title" id="title" type="text" maxLength="1000"
                  style={{ background: "#fff" }}></input>
                <label className="form-label" htmlFor="image">Image (optional)</label>
                <input className="form-control" name="image" id="image" type="file"
                  style={{ background: "#fff" }}></input>
                <label className="form-label" htmlFor="content">Content</label>
                <textarea className="form-control" name="content" id="content" rows="4"
                  style={{ background: "#fff" }}></textarea>
              </div>
            </div>
            <div className="float-end mt-2 pt-1">
              <button type="submit" className="btn btn-primary btn-sm">Post</button>
            </div>
          </form>
        </section>
        <div style={{ margin: "6em" }}></div>
      </div>
      <Footer />
    </div>
  </div>
};

export default BlogCreate;