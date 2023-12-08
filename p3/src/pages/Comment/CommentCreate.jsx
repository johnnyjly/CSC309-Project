import { ajax_or_login } from "../../ajax.js";
import { useNavigate } from 'react-router-dom';

function CommentCreate(props) {

    const navigate = useNavigate();

    function handle_submit(event) {
        let data = new FormData(event.target);

        console.log(data.get('content')); // DEBUG
        console.log(data.get('rating')); // DEBUG

        ajax_or_login(props.url, {
            method: 'POST',
            body: data,
        }, navigate);
    }

    return <form id="comment-create" class="card-footer py-3 border-0" style={{backgroundColor: "#fff", marginBottom: "1em"}} onSubmit={handle_submit}>
      <div class="d-flex flex-start w-100">
        <div class="form-outline w-100">
          <label class="form-label" for="content">Message</label>
          <textarea class="form-control" name="content" id="content" rows="4" placeholder="Add a comment..."
           style={{background: "#fff"}} required></textarea>
          { props.on === "shelter"
            ? <>
                <label class="form-label" for="rating">Rating</label>
                <input class="form-control" name="rating" id="rating" type="number" min="1" max="5"
                 style={{background: "#fff"}} required></input>
              </>
            : <></> }
        </div>
      </div>
      <div class="float-end mt-2 pt-1">
        <button type="submit" class="btn btn-primary btn-sm">Post Comment</button>
      </div>
    </form>
};

export default CommentCreate;