
import getAllmovies from "./getAllmovies";
import a_Like_in_movie from "./a_like_inMovie";

const commentModal = document.getElementById('commentModal');

const appId = 'Mlar7kUsbdh93qbI71nO';
const invUrl = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${appId}/comments`;

const fetchComments = async (itemId) => {
  try {
    // Fetch comments from the server for the specified item ID
    const response = await fetch(`${invUrl}?item_id=${itemId}`);
    const data = await response.json();

    // Get references to HTML elements
    const commentHead = document.querySelector('.comm-header');
    const commentList = document.querySelector('.comment-list');

    if (data.length > 0) {
      // If there are comments, display the count and populate the comment list
      commentHead.textContent = `Comments(${data.length})`;
      commentList.innerHTML = '';

      // Iterate through each comment and create HTML markup for display
      data.forEach((comment) => {
        const commentItem = `
          <span class="comment-list">${comment.creation_date} ${comment.username}: ${comment.comment}</span>
          <hr>
        `;
        commentList.innerHTML += commentItem;
      });
    } else {
      // If there are no comments, display a message
      commentHead.textContent = 'Comments(0)';
      const noComment = `<span>No comments to show.</span>`;
      commentList.innerHTML = noComment;
    }
  } catch (err) {
    // Handle any errors that occur during the fetch
    throw new Error('Request error: ', err);
  }
};

const postComment = async (itemId) => {
  const username = document.querySelector('.nameInput');
  const comment = document.querySelector('.commentInput');

  if (username.value !== '' && comment.value !== '') {
    try {
      // Display the comment on the screen
      const commentList = document.querySelector('.comment-list');
      const commentItem = `
        <span class="comment-list">${username.value}: ${comment.value}</span>
        <hr>
      `;
      commentList.innerHTML += commentItem;

      // Send a POST request to the server to post the comment
      const response = await fetch(invUrl, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ item_id: itemId, username: username.value, comment: comment.value }),
      });

      if (response.ok) {
        // If the request is successful, clear the input fields
        username.value = '';
        comment.value = '';

        // Fetch the updated comments to refresh the display
        fetchComments(itemId);
        return;
      }
    } catch (err) {
      // Handle any errors that occur during the fetch
      console.error('Request error:', err);
    }
  }
};

// Show the comment popup modal
const showCommentModal = async (movie) => {
  const modal = document.createElement('div');
  modal.className = 'comment-modal';
  modal.innerHTML = `
    <div class="header-container">
      <div class="img-container">
        <img src="${movie.image.medium}" class="mov-img" alt="Movie Image">
      </div>
      <i class="close-icon fa-solid fa-xmark fa-5x"></i>
    </div>
    <h3 class="movie-name">${movie.name}</h3>
    <div class="details">
      <div class="detail-item">${movie.summary}</div>
      <div class="detail-item">
        Language: ${movie.language}<br/>
        Premiered: ${movie.premiered} <br/>
        Genre: ${movie.genres[0]}
      </div>
    </div>

    <div class="comments">
      <h3 class="comm-header"></h3>
      <div class="comment-list"></div>
    </div>

    <div class="add-comment">
      <h3 class="add-comm-header">Add Comment</h3>
      <div class="comment-input-container">
        <input type="text" class="nameInput" size="30" placeholder="Your name">
        <br>
        <textarea class="commentInput" rows="5" cols="30" placeholder="Your insights"></textarea>
        <br>
        <button class="sub-comment-btn" type="button">Comment</button>
      </div>
    </div>
  `;

  const closeIcon = modal.querySelector('.close-icon');
  closeIcon.addEventListener('click', () => {
    modal.remove();
  });

  const commentBtn = modal.querySelector('.sub-comment-btn');
  commentBtn.addEventListener('click', async () => {
    await postComment(movie.id);
  });

  commentModal.appendChild(modal);

  // Fetch comments for the movie
  fetchComments(movie.id);
};

const movies = async () => {
  // Fetch all movies
  const arr = await getAllmovies();

  // Select the main element
  const mainElement = document.querySelector('main');

  for (let i = 0; i < 9 && i < arr.length; i++) {
    const movie = arr[i];

    if (!movie || !movie.image || !movie.name) {
      continue; // Skip iteration if movie data is missing
    }

    // Fetch likes for the current movie
    const res = await a_Like_in_movie();
    const currentValue = res;

    let assignLike = 0;

    // Filter likes based on the movie name
    const like = currentValue.filter((elmt) => elmt.item_id === movie.name);

    if (like.length > 0) {
      assignLike = like[0].likes;
    }

    // Create a new movie item
    const movieItem = document.createElement('article');
    movieItem.className = 'movie-item';
    movieItem.id = `movie-${i}`;
    movieItem.innerHTML = `
      <div class="item">
        <img src="${movie.image.medium}" alt="${movie.name}">
        <h5>${movie.name}</h5>
        <div class="item-actions">
          <a class="likes">
           
          <span class="likeBtn"><i class="fas fa-heart"></i></span>
            
            <p><span id="likes-status">${assignLike}</span> likes</p>
          </a>
          <button class="comments-btn">Comments</button>
          <button type="button" class="reservation-btn">Reservations</button>
        </div>
      </div>
    `;

    // Append the movie item to the main element
    mainElement.appendChild(movieItem);

    // Show the comment modal for the current movie
    movieItem.querySelector('.comments-btn').addEventListener('click', () => {
      showCommentModal(movie);
    });
  }

  // Update the counter with the total count of movies
  const counter = document.getElementById('count');
  counter.innerText = `[${arr.length}]`;
  counter.style.color = 'blue';
};

export default movies;
export { movies };
