import postLikes from "./getLikes";
import getAllmovies from "./getAllmovies";
import a_Like_in_movie from "./a_like_inMovie";



const commentModal = document.getElementById('commentModal');
let count = 0;
const counter = document.getElementById('count');
const middleSection = document.getElementById('middle');
let currentValue = 0;

const appId = 'Mlar7kUsbdh93qbI71nO';
const invUrl = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${appId}/comments`;
// Fetch comments for a specific item
const fetchComments = async (itemId) => {
  try {
    // Fetch comments from the server
    const comments = await fetch(`${invUrl}?item_id=${itemId}`);
    const data = await comments.json();

    // Get references to HTML elements
    const commentHead = document.querySelector('.comm-header');
    const commentList = document.querySelector('.comment-list');

    if (data.length > 0) {
      // If there are comments, display the count and populate the comment list
      commentHead.innerHTML = `Comments(${data.length})`;
      commentList.innerHTML = '';

      data.forEach((comm) => {
        // Create HTML markup for each comment item
        const commentItem = `
          <span class="comment-list">${comm.creation_date} ${comm.username}: ${comm.comment}</span>
          <hr>
        `;
        commentList.innerHTML += commentItem;
      });
    } else {
      // If there are no comments, display a message
      commentHead.innerHTML = 'Comments(0)';
      const noComment = `
        <span>No comments to show.</span>
      `;
      commentList.innerHTML = noComment;
    }
  } catch (err) {
    // Handle any errors that occur during the fetch
    throw new Error('Request error: ', err);
  }
};

// Post a new comment for a specific item
const postComment = async (itemId) => {
  const username = document.querySelector('.nameInput');
  const comment = document.querySelector('.commentInput');

  if (username.value !== '' || comment.value !== '') {
    try {
      // Send a POST request to the server to post the comment
      const response = await fetch(invUrl, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ item_id: itemId, username: username.value, comment: comment.value }),
      });

      const data = await response.json();

      if (response.ok) {
        // If the request is successful, clear the input fields and fetch the updated comments
        username.value = '';
        comment.value = '';
        fetchComments(itemId);
        return data;
      }
    } catch (err) {
      // Handle any errors that occur during the fetch
      throw new Error('Request error: ', err);
    }
    return true;
  }

  return false;
};

// Close the comment popup modal
const closePopupModal = () => {
  const closeIcon = document.querySelector('.close-icon');
  closeIcon.addEventListener('click', (e) => {
    e.preventDefault();
    if (!commentModal.classList.contains('hide-modal')) {
      commentModal.classList.add('hide-modal');
    }
  });
};

const showCommentModal = async () => {
  const arr = await getAllmovies(); // Fetch movie data

  // Select all comment buttons
  const commentBtns = document.querySelectorAll('.comment-btn');

  // Iterate over each comment button
  commentBtns.forEach((commentBtn) => {
    const btnId = commentBtn.getAttribute('id'); // Get the button ID
    const movieDetails = arr[btnId]; // Get movie details based on ID

    // Add event listener to the comment button
    commentBtn.addEventListener('click', () => {
      fetchComments(btnId); // Fetch comments for the movie

      // Create the modal HTML markup
      const modal = `
        <!-- Header section -->
        <div class="header-container">
          <div class="img-container">
            <img src="${movieDetails.image.medium}" class="mov-img" alt="Movie Image">
          </div>
          <i class="close-icon fa-solid fa-xmark fa-5x"></i>
        </div>
        <!-- Movie details section -->
        <h3 class="movie-name">${movieDetails.name}</h3>
        <div class="details">
          <div class="detail-item">${movieDetails.summary}</div>
          <div class="detail-item">
            Laguage: ${movieDetails.language}<br/>
            Premiered: ${movieDetails.premiered} <br/>
            Genre: ${movieDetails.genres[0]}
          </div>
        </div>
        <!-- Comments section -->
        <div class="comments">
          <h3 class="comm-header"></h3>
          <div class="comment-list"></div>
        </div>
        <!-- Add comment section -->
        <div class="add-comment">
          <h3 class="add-comm-header">Add Comment</h3>
          <div class="comment-input-container">
            <input type="text" class="nameInput" size="30" placeholder="Your name">
            <br>
            <textarea class="commentInput" rows="5" cols="30" placeholder="Your insights"></textarea>
            <br>
            <button class="sub-comment-btn" id="${btnId}" type="button">Comment</button>
          </div>
        </div>
      `;

      // Show the comment modal and set the modal content
      if (commentModal.classList.contains('hide-modal')) {
        commentModal.classList.remove('hide-modal');
        commentModal.innerHTML = modal;
      }

      // Add event listener to the "Comment" button within the modal
      const cmntBtn = document.querySelector('.sub-comment-btn');
      cmntBtn.addEventListener('click', () => {
        postComment(btnId); // Post the comment
      });

      closePopupModal(); // Close the popup modal
    });
  });
};

const movies = async () => {
  // Fetch all movies
  const arr = await getAllmovies();

  for (let i = 0; i < 20; i++) {
    const movie = arr[i];

    // Fetch likes for the current movie
    const res = await a_Like_in_movie();
    const currentValue = res;

    let assignLike = 0;

    // Filter likes based on the movie name
    const like = currentValue.filter((elmt) => elmt.item_id === movie.name);

    if (like.length > 0) {
      assignLike = like[0].likes;
    }

    // Create a new movie element
    const movieElement = document.createElement('article');
    movieElement.className = 'movie';
    movieElement.id = `movie-${i}`;
    movieElement.innerHTML = `
      <img src="${movie.image.medium}" alt="${movie.name}">
      <h5>${movie.name}</h5>
      <a class="likes">
        <img class="likeBtn" src="https://img.icons8.com/material-outlined/24/000000/filled-like.png">
        <p><span id="likes-status">${assignLike}</span>likes</p>
      </a>
      <button class="comment-btn" type="button" id="comment-${i}">comments</button>
      <button type="button" class="reservation-btn">reservations</button>
      <p>${movie.summary}</p>
    `;

    // Create the new item list
    const itemList = document.createElement('div');
    itemList.className = 'item-list';
    itemList.innerHTML = `
      <div class="item">
        Under the Dome
        <div class="item-actions">
          <div class="container">
            <div class="row">
              <img src="https://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg" alt="Item Image">
            </div>
          </div>
          <div class="rows">
            <div class="likes">
              <i id="item1" class="fas fa-heart"></i>
            </div>
            <p>0</p>
            <p>likes</p>
            <button class="comments-btn">Comments</button>
          </div>
        </div>
      </div>
    `;

    // Append the movie element to the main container
    const mainContainer = document.querySelector('main');
    mainContainer.appendChild(movieElement);
    mainContainer.appendChild(itemList);

    // Select the middle section and append the movie element
    const middleSection = document.getElementById('middleSection');
    middleSection.appendChild(movieElement);

    // Show the comment modal
    showCommentModal();
  }

  // Update the counter with the total count of movies
  counter.innerText = `[${arr.length}]`;
  counter.style.color = 'blue';
};


export default movies;

const showMovies = async (movies) => {
  const itemListContainer = document.querySelector('.item-list');
  itemListContainer.innerHTML = '';

  for (let i = 0; i < 16; i++) {
    // Generate HTML markup for each movie item
    const itemMarkup = `
      <div class="item">
        ${movies[i].name}
        <div class="item-actions">
          <div class="container">
            <div class="row">
              <img src="${movies[i].image.medium}" alt="Item Image">
            </div>
          </div>
          <div class="rows">
            <div class="likes">
              <i id="item${movies[i].id}" class="fas fa-heart"></i>
            </div>
            <p>0</p>
            <p>likes</p>
            <button class="comments-btn">Comments</button>
          </div>
        </div>
      </div>
    `;

    // Append the generated item markup to the item list container
    itemListContainer.innerHTML += itemMarkup;
  }

  // Add event listeners for the like buttons (assuming postLikes and getLikes functions are defined)
  const likesButtons = document.querySelectorAll('.likes i');
  likesButtons.forEach((button) => {
    button.addEventListener('click', async (e) => {
      const itemid = e.target.id;
      await postLikes(itemid);
      await getlikes(itemid);
    });
  });
};

export { movies, showMovies };
