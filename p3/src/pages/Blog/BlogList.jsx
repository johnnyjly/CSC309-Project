import { useState, useEffect } from "react";
import { ajax, ajax_or_login } from "../../ajax.js";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';


function BlogList(props) {
  const [query, setQuery] = useState({});
  const [response, setResponse] = useState({});
  const [page, setPage] = useState(1);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    ajax_or_login(`/blogs/${props.username}/?page=${page}`, { method: 'GET' }, navigate)
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
  }, [query, page, navigate]);

  console.log(response); // DEBUG
  console.log(jwtDecode(localStorage.getItem('access')).username); // DEBUG

  function format_time(time) {
    time = time.split('T');
    return time[1].substring(0, 5).concat(" ", time[0]);
  }

  return <div className="container my-5 py-5">
    <div className="justify-content-center">
      <div class="row d-flex justify-content-center">
        <div className="col-md-12 col-lg-10 col-xl-8">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h2>Blog Posts</h2>
            {props.username === jwtDecode(localStorage.getItem('access')).username
              ? <Link to={`/blogs/${props.username}/create`}>
                <button type="button" className="btn btn-primary">New Post</button>
              </Link>
              : <></>}
          </div>
          <div class="row d-flex justify-content-center">
            {response.results !== undefined && response.results.length > 0
              ? response.results.map((result, index) =>
              (
                <div className="card" style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }} key={index}>
                  <div className="card-body" style={{ height: "100px" }}>
                    <h6><a href={`/blogs/${props.username}/${result.ID}/`} style={{ textDecoration: "none" }}>{result.title}</a></h6>
                    <p className="text-muted small mb-0">Posted: {format_time(result.creation_time)}</p>
                    <p className="text-muted small mb-0">Last Updated: {format_time(result.update_time)}</p>
                  </div>
                </div>
              ))
              :
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p>&nbsp;&nbsp;No blog posts yet.</p>
              </div>}
          </div>
          {response.count > 1
            ? <div style={{ textAlign: "center" }}>
              {response.previous
                ? <button type="button" className="btn btn-primary" onClick={() => setPage(page - 1)} style={{ margin: "0.5rem" }}>{"<<"}</button>
                : <></>}
              {response.next
                ? <button type="button" className="btn btn-primary" onClick={() => setPage(page + 1)} style={{ margin: "0.5rem" }}>{">>"}</button>
                : <></>}
            </div>
            : <></>}
        </div>
      </div>
    </div>
  </div>
}

export default BlogList;