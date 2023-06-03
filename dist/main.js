/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./modules/a_like_inMovie.js":
/*!***********************************!*\
  !*** ./modules/a_like_inMovie.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const aLikeInMovie = async () => {
  // Create an empty array to store the liked items
  let likedItems = [];

  // Fetch likes data from the specified URL and wait for the response
  const response = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/Mlar7kUsbdh93qbI71nO/likes');

  // Parse the response as JSON and wait for the parsed data
  const data = await response.json();

  // Assign the parsed data to the likedItems array
  likedItems = data;

  // Return the array containing the liked items
  return likedItems;
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (aLikeInMovie);


/***/ }),

/***/ "./modules/getAllmovies.js":
/*!*********************************!*\
  !*** ./modules/getAllmovies.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const getAllmovies = async () => {
  // Create an empty array to store the fetched data
  let arr = [];

  try {
    // Fetch data from the specified URL and wait for the response
    const response = await fetch('https://api.tvmaze.com/shows?page=1');

    // Parse the response as JSON and wait for the parsed data
    const data = await response.json();

    // Assign the parsed data to the array
    arr = data;
  } catch (error) {
    return [];
  }

  // Return the array containing the fetched data
  return arr;
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getAllmovies);


/***/ }),

/***/ "./modules/liking_a_Movie.js":
/*!***********************************!*\
  !*** ./modules/liking_a_Movie.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _getAllmovies_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getAllmovies.js */ "./modules/getAllmovies.js");
/* harmony import */ var _post_a_Like_in_movie_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./post_a_Like_in_movie.js */ "./modules/post_a_Like_in_movie.js");
// Import the necessary modules

// import postLike from './likesApi.js';


// Define the 'liking' function
const likingAMovie = async () => {
  // Fetch all movies
  const allMovies = await (0,_getAllmovies_js__WEBPACK_IMPORTED_MODULE_0__["default"])();

  // Select all like buttons and like count spans
  const likesBtn = document.querySelectorAll('.likeBtn');
  const spans = document.querySelectorAll('#likes-status');

  // Iterate over each like button
  likesBtn.forEach((likeBtn, index) => {
    // Retrieve the initial like count from the span
    let likeCount = JSON.parse(spans[index].innerHTML);

    // Add a click event listener to the like button
    likeBtn.addEventListener('click', () => {
      // Post a like for the corresponding movie
      (0,_post_a_Like_in_movie_js__WEBPACK_IMPORTED_MODULE_1__["default"])(allMovies[index].name);

      // Increment the like count
      likeCount += 1;

      // Update the like count in the corresponding span
      spans[index].innerHTML = likeCount;
    });
  });
};

// Export the 'liking' function as the default export

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (likingAMovie);

/***/ }),

/***/ "./modules/post_a_Like_in_movie.js":
/*!*****************************************!*\
  !*** ./modules/post_a_Like_in_movie.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const postALikeInMovie = (movie) => {
  // Make a POST request to the specified URL with the movie data-
  fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/Mlar7kUsbdh93qbI71nO/likes', {
    method: 'POST', // Use the POST method
    headers: { 'content-type': 'application/json' }, // Set the content-type header to JSON
    body: JSON.stringify({ // Convert the movie data to a JSON string
      item_id: movie, // Pass the movie as the item_id
    }),
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (postALikeInMovie);

/***/ }),

/***/ "./modules/utils.js":
/*!**************************!*\
  !*** ./modules/utils.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   movies: () => (/* binding */ movies)
/* harmony export */ });
/* harmony import */ var _getAllmovies_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getAllmovies.js */ "./modules/getAllmovies.js");
/* harmony import */ var _a_like_inMovie_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./a_like_inMovie.js */ "./modules/a_like_inMovie.js");



const commentModal = document.querySelector('.commentModal');

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
      const noComment = '<span>No comments to show.</span>';
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
      }
    } catch (err) {
      // Handle any errors that occur during the fetch
      throw new Error('Request error: ', err);
    }
  }
};

// Show the comment popup modal
const showCommentModal = async (movie) => {
  const modal = document.createElement('div');
  modal.className = 'comment-modal';
  modal.innerHTML = `
    <div class="header-container">
        <img src="${movie.image.medium}" class="mov-img" alt="Movie Image">
    </div>
    <div class='header-body'>
    <div class="header-title">
    <h3 class="movie-name">${movie.name}</h3>
    <i id='close-btn' class="close-icon fa-solid fa-xmark fa-5x"></i>
    </div>
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
      <div class="input-container">
        <input type="text" class="nameInput" size="30" placeholder="Your name">
        <textarea class="commentInput" rows="5" cols="30" placeholder="Your insights"></textarea>
        <button class="sub-comment-btn" type="button">Comment</button>
      </div>
      </div>
    </div>
  `;

  const closeIcon = modal.querySelector('.close-icon');
  closeIcon.addEventListener('click', () => {
    modal.remove();
    const overlay = document.querySelector('#overlay');
    overlay.classList.toggle('active');
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
  const arr = await (0,_getAllmovies_js__WEBPACK_IMPORTED_MODULE_0__["default"])();

  // Select the main element
  const mainElement = document.querySelector('main');
  const res = await (0,_a_like_inMovie_js__WEBPACK_IMPORTED_MODULE_1__["default"])();

  for (let i = 0; i < 9; i += 1) {
    const movie = arr[i];

    if (!movie || !movie.image || !movie.name) {
      return null;
    }

    // Fetch likes for the current movie

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
        </div>
      </div>
    `;

    // Append the movie item to the main element
    mainElement.appendChild(movieItem);

    // Show the comment modal for the current movie
    movieItem.querySelector('.comments-btn').addEventListener('click', () => {
      showCommentModal(movie);
      const overlay = document.querySelector('#overlay');
      overlay.classList.toggle('active');
    });
  }

  // Update the counter with the total count of movies

  const articles = document.querySelectorAll('.movie-item');
  articles.forEach((article) => {
    if (article !== '') {
      const counter = document.getElementById('count');
      counter.innerText = `(${articles.length})`;
      counter.style.color = 'black';
    }
  });
  return null;
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (movies);



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "* {\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n}\n\nhtml {\n  height: 100%;\n}\n\n.header {\n  text-align: center;\n  background-color: gainsboro;\n}\n\nbody {\n  display: flex;\n  flex-direction: column;\n  min-height: 100%;\n  font-size: 16px;\n}\n\n.nav-bar {\n  display: flex;\n  justify-content: space-around;\n  align-items: center;\n}\n\nli {\n  list-style: none;\n}\n\n.nav-bar a {\n  text-decoration: none;\n  font-weight: 500;\n  font-size: 1.3rem;\n  color: #333;\n  padding: 1rem;\n}\n\n.nav-links {\n  display: flex;\n  gap: 1rem;\n}\n\nmain {\n  display: grid;\n  grid-gap: 20px;\n  grid-template-columns: repeat(3, 1fr);\n  justify-content: center;\n  margin: 0 auto;\n  padding: 1rem;\n}\n\n.movie-item {\n  align-items: center;\n  background-color: #f0f0f0;\n  display: flex;\n  flex-direction: column;\n  padding: 20px;\n}\n\n.movie-item img {\n  height: auto;\n  width: 300px;\n}\n\n.item-actions {\n  align-items: center;\n  display: flex;\n  margin-top: 20px;\n  gap: 0.6rem;\n}\n\n.likes {\n  display: flex;\n  gap: 0.6rem;\n}\n\n.comments-btn {\n  padding: 0.3rem;\n  border-radius: 5px;\n  font-size: 1.2rem;\n  background-color: rgb(23, 131, 239);\n  cursor: pointer;\n  color: #fff;\n  border: none;\n}\n\n.item h5 {\n  font-size: 1.3rem;\n  color: rgb(239, 60, 60);\n}\n\n.comment-modal {\n  border: 3px solid #fff;\n  bottom: 0;\n  height: 80%;\n  margin: 0 auto;\n  margin-top: 10px;\n  overflow-y: scroll;\n  position: fixed;\n  right: 0;\n  z-index: 10;\n  display: flex;\n  padding: 0.5rem;\n  border-radius: 10px;\n  gap: 1rem;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  background-color: #fff;\n  width: 800px;\n  max-width: 80%;\n}\n\n.modal-header {\n  align-items: center;\n  display: flex;\n  justify-content: space-between;\n  margin-bottom: 20px;\n}\n\n.modal-title {\n  font-size: 18px;\n  font-weight: bold;\n  margin: 0;\n}\n\n.modal-body img {\n  margin-bottom: 10px;\n  max-height: 300px;\n  object-fit: cover;\n  width: 100%;\n}\n\n#close-btn {\n  font-size: 1.5rem;\n  color: red;\n  cursor: pointer;\n}\n\n.header-title {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n\n.movie-name {\n  font-size: 1.5rem;\n  color: rgb(138, 75, 146);\n}\n\n.details {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n  padding: 0.7rem;\n  line-height: 1.2;\n}\n\n.nameInput {\n  padding: 0.5rem;\n  outline: none;\n  border-radius: 8px;\n  width: 250px;\n}\n\n.commentInput {\n  padding: 0.4rem;\n  outline: none;\n  border-radius: 6px;\n  width: 400px;\n}\n\n.input-container {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n\n.sub-comment-btn {\n  width: 150px;\n  font-size: 1.3rem;\n  color: #fff;\n  background-color: rgb(104, 168, 104);\n  padding: 0.3rem;\n  border: none;\n  border-radius: 6px;\n  cursor: pointer;\n}\n\nfooter {\n  background-color: #333;\n  color: #fff;\n  margin-top: auto;\n  padding: 10px;\n  text-align: center;\n}\n\n.overlay-pop {\n  inset: 0;\n  display: flex;\n}\n\n#overlay {\n  inset: 0;\n  position: fixed;\n  background-color: rgba(193, 199, 208, 0.9);\n  backdrop-filter: blur(1px);\n  z-index: 9;\n  pointer-events: none;\n  opacity: 0;\n}\n\n#overlay.active {\n  pointer-events: all;\n  opacity: 1;\n}\n", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;EACE,sBAAsB;EACtB,SAAS;EACT,UAAU;AACZ;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,kBAAkB;EAClB,2BAA2B;AAC7B;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,gBAAgB;EAChB,eAAe;AACjB;;AAEA;EACE,aAAa;EACb,6BAA6B;EAC7B,mBAAmB;AACrB;;AAEA;EACE,gBAAgB;AAClB;;AAEA;EACE,qBAAqB;EACrB,gBAAgB;EAChB,iBAAiB;EACjB,WAAW;EACX,aAAa;AACf;;AAEA;EACE,aAAa;EACb,SAAS;AACX;;AAEA;EACE,aAAa;EACb,cAAc;EACd,qCAAqC;EACrC,uBAAuB;EACvB,cAAc;EACd,aAAa;AACf;;AAEA;EACE,mBAAmB;EACnB,yBAAyB;EACzB,aAAa;EACb,sBAAsB;EACtB,aAAa;AACf;;AAEA;EACE,YAAY;EACZ,YAAY;AACd;;AAEA;EACE,mBAAmB;EACnB,aAAa;EACb,gBAAgB;EAChB,WAAW;AACb;;AAEA;EACE,aAAa;EACb,WAAW;AACb;;AAEA;EACE,eAAe;EACf,kBAAkB;EAClB,iBAAiB;EACjB,mCAAmC;EACnC,eAAe;EACf,WAAW;EACX,YAAY;AACd;;AAEA;EACE,iBAAiB;EACjB,uBAAuB;AACzB;;AAEA;EACE,sBAAsB;EACtB,SAAS;EACT,WAAW;EACX,cAAc;EACd,gBAAgB;EAChB,kBAAkB;EAClB,eAAe;EACf,QAAQ;EACR,WAAW;EACX,aAAa;EACb,eAAe;EACf,mBAAmB;EACnB,SAAS;EACT,QAAQ;EACR,SAAS;EACT,gCAAgC;EAChC,sBAAsB;EACtB,YAAY;EACZ,cAAc;AAChB;;AAEA;EACE,mBAAmB;EACnB,aAAa;EACb,8BAA8B;EAC9B,mBAAmB;AACrB;;AAEA;EACE,eAAe;EACf,iBAAiB;EACjB,SAAS;AACX;;AAEA;EACE,mBAAmB;EACnB,iBAAiB;EACjB,iBAAiB;EACjB,WAAW;AACb;;AAEA;EACE,iBAAiB;EACjB,UAAU;EACV,eAAe;AACjB;;AAEA;EACE,aAAa;EACb,8BAA8B;EAC9B,mBAAmB;AACrB;;AAEA;EACE,iBAAiB;EACjB,wBAAwB;AAC1B;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,WAAW;EACX,eAAe;EACf,gBAAgB;AAClB;;AAEA;EACE,eAAe;EACf,aAAa;EACb,kBAAkB;EAClB,YAAY;AACd;;AAEA;EACE,eAAe;EACf,aAAa;EACb,kBAAkB;EAClB,YAAY;AACd;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,WAAW;AACb;;AAEA;EACE,YAAY;EACZ,iBAAiB;EACjB,WAAW;EACX,oCAAoC;EACpC,eAAe;EACf,YAAY;EACZ,kBAAkB;EAClB,eAAe;AACjB;;AAEA;EACE,sBAAsB;EACtB,WAAW;EACX,gBAAgB;EAChB,aAAa;EACb,kBAAkB;AACpB;;AAEA;EACE,QAAQ;EACR,aAAa;AACf;;AAEA;EACE,QAAQ;EACR,eAAe;EACf,0CAA0C;EAC1C,0BAA0B;EAC1B,UAAU;EACV,oBAAoB;EACpB,UAAU;AACZ;;AAEA;EACE,mBAAmB;EACnB,UAAU;AACZ","sourcesContent":["* {\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n}\n\nhtml {\n  height: 100%;\n}\n\n.header {\n  text-align: center;\n  background-color: gainsboro;\n}\n\nbody {\n  display: flex;\n  flex-direction: column;\n  min-height: 100%;\n  font-size: 16px;\n}\n\n.nav-bar {\n  display: flex;\n  justify-content: space-around;\n  align-items: center;\n}\n\nli {\n  list-style: none;\n}\n\n.nav-bar a {\n  text-decoration: none;\n  font-weight: 500;\n  font-size: 1.3rem;\n  color: #333;\n  padding: 1rem;\n}\n\n.nav-links {\n  display: flex;\n  gap: 1rem;\n}\n\nmain {\n  display: grid;\n  grid-gap: 20px;\n  grid-template-columns: repeat(3, 1fr);\n  justify-content: center;\n  margin: 0 auto;\n  padding: 1rem;\n}\n\n.movie-item {\n  align-items: center;\n  background-color: #f0f0f0;\n  display: flex;\n  flex-direction: column;\n  padding: 20px;\n}\n\n.movie-item img {\n  height: auto;\n  width: 300px;\n}\n\n.item-actions {\n  align-items: center;\n  display: flex;\n  margin-top: 20px;\n  gap: 0.6rem;\n}\n\n.likes {\n  display: flex;\n  gap: 0.6rem;\n}\n\n.comments-btn {\n  padding: 0.3rem;\n  border-radius: 5px;\n  font-size: 1.2rem;\n  background-color: rgb(23, 131, 239);\n  cursor: pointer;\n  color: #fff;\n  border: none;\n}\n\n.item h5 {\n  font-size: 1.3rem;\n  color: rgb(239, 60, 60);\n}\n\n.comment-modal {\n  border: 3px solid #fff;\n  bottom: 0;\n  height: 80%;\n  margin: 0 auto;\n  margin-top: 10px;\n  overflow-y: scroll;\n  position: fixed;\n  right: 0;\n  z-index: 10;\n  display: flex;\n  padding: 0.5rem;\n  border-radius: 10px;\n  gap: 1rem;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  background-color: #fff;\n  width: 800px;\n  max-width: 80%;\n}\n\n.modal-header {\n  align-items: center;\n  display: flex;\n  justify-content: space-between;\n  margin-bottom: 20px;\n}\n\n.modal-title {\n  font-size: 18px;\n  font-weight: bold;\n  margin: 0;\n}\n\n.modal-body img {\n  margin-bottom: 10px;\n  max-height: 300px;\n  object-fit: cover;\n  width: 100%;\n}\n\n#close-btn {\n  font-size: 1.5rem;\n  color: red;\n  cursor: pointer;\n}\n\n.header-title {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n\n.movie-name {\n  font-size: 1.5rem;\n  color: rgb(138, 75, 146);\n}\n\n.details {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n  padding: 0.7rem;\n  line-height: 1.2;\n}\n\n.nameInput {\n  padding: 0.5rem;\n  outline: none;\n  border-radius: 8px;\n  width: 250px;\n}\n\n.commentInput {\n  padding: 0.4rem;\n  outline: none;\n  border-radius: 6px;\n  width: 400px;\n}\n\n.input-container {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n\n.sub-comment-btn {\n  width: 150px;\n  font-size: 1.3rem;\n  color: #fff;\n  background-color: rgb(104, 168, 104);\n  padding: 0.3rem;\n  border: none;\n  border-radius: 6px;\n  cursor: pointer;\n}\n\nfooter {\n  background-color: #333;\n  color: #fff;\n  margin-top: auto;\n  padding: 10px;\n  text-align: center;\n}\n\n.overlay-pop {\n  inset: 0;\n  display: flex;\n}\n\n#overlay {\n  inset: 0;\n  position: fixed;\n  background-color: rgba(193, 199, 208, 0.9);\n  backdrop-filter: blur(1px);\n  z-index: 9;\n  pointer-events: none;\n  opacity: 0;\n}\n\n#overlay.active {\n  pointer-events: all;\n  opacity: 1;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _modules_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../modules/utils.js */ "./modules/utils.js");
/* harmony import */ var _modules_liking_a_Movie_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../modules/liking_a_Movie.js */ "./modules/liking_a_Movie.js");




const body = document.querySelector('body');
(0,_modules_utils_js__WEBPACK_IMPORTED_MODULE_1__.movies)();
body.addEventListener('click', _modules_liking_a_Movie_js__WEBPACK_IMPORTED_MODULE_2__["default"]);
})();

/******/ })()
;
//# sourceMappingURL=main.js.map