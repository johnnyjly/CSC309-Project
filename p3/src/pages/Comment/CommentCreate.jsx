import { ajax_or_login } from "../../ajax.js";
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function CommentCreate(props) {

    const navigate = useNavigate();

    function handle_submit(event) {
        let data = new FormData(event.target);

        console.log('Content:', data.get('content')); // DEBUG
        console.log('Rating:', data.get('rating')); // DEBUG

        ajax_or_login(props.url, {
            method: 'POST',
            body: data,
        }, navigate)
        .then(response => {
            if (response.ok) {
                console.log("Response is OK");
                return response.json();
            }
            else {
                console.log("Response has error");
                throw Error(response.statusText);
            }
        })
        .then(json => {
            console.log("JSON:", json);
            switch (props.on) {
                case 'shelter':
                    if (json.pet_shelter_name === jwtDecode(localStorage.getItem('access')).username) {
                        return;
                    }
                    var notif = {
                        'message': data.get('content'),
                        'is_read': false,
                        'recipient': json.pet_shelter_name,
                        'type': 'comment_on_shelter',
                        'pk': json.ID,
                    }
                    break;
                case 'application':
                    var notif = {
                        'message': data.get('content'),
                        'is_read': false,
                        'recipient': jwtDecode(localStorage.getItem('access')).username === json.pet_shelter_name
                        ? json.pet_seeker_name
                        : json.pet_shelter_name,
                        'type': 'comment_on_application',
                        'pk': json.ID,
                    }
                    break;
                case 'blog':
                    return;
            }
            console.log("Notification Body:", notif);
            ajax_or_login(`/notifications/`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(notif),
                credentials: 'include',
              })
              .then((response) => response.json())
              .then((data) => {})
              .catch((error) => {
                console.error('Error sending notification:', error);
              });
        })
        .catch(error => console.log(error));
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