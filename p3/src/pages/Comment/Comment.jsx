function Comment(props) {
    
    function format_time(time) {
        time = time.split('T');
        return time[1].substring(0, 5).concat(" ", time[0]);
}

    return <div class="comment">
    <div class="d-flex flex-start align-items-center">
      <div>
        <h6 class="fw-bold text-primary mb-1">{ props.result.commenter_name }</h6>
        <p class="text-muted small mb-0">
          Posted: { format_time(props.result.creation_time) }
        </p>
        { 'rating' in props.result
        ? <p class="text-muted small mb-0">
            Rating: { props.result.rating }
          </p>
        : <></> }
      </div>
    </div>
    <p class="mt-3 mb-4 pb-2">
      { props.result.content }
    </p>
  </div>
}

export default Comment;