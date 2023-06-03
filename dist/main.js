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
      const noComment = '<em>No comments to show.</em>';
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
        <em class="comment-list">${username.value}: ${comment.value}</em>
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
  <section class="header-container">
    <img src="${movie.image.medium}" class="mov-img" alt="Movie Image">
</section>
<section class='header-body'>
    <section class="header-title">
        <h3 class="movie-name">${movie.name}</h3>
        <i id='close-btn' class="close-icon fa-solid fa-xmark fa-5x"></i>
    </section>
    <section class="details">
        <section class="detail-item">${movie.summary}</section>
        <section class="detail-item">
            Language: ${movie.language}<br/>
            Premiered: ${movie.premiered} <br/>
            Genre: ${movie.genres[0]}
        </section>
    </section>

    <section class="comments">
        <h3 class="comm-header"></h3>
        <section class="comment-list"></section>
    </section>

    <section class="add-comment">
        <h3 class="add-comm-header">Add Comment</h3>
        <section class="input-container">
            <input type="text" class="nameInput" size="30" placeholder="Your name">
            <textarea class="commentInput" rows="5" cols="30" placeholder="Your insights"></textarea>
            <button class="sub-comment-btn" type="button">Comment</button>
        </section>
    </section>
</section>

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
      
    <section class="item">
    <img src="${movie.image.medium}" alt="${movie.name}">
    <h5>${movie.name}</h5>
    <section class="item-actions">
        <a class="likes">
            <span class="likeBtn"><i class="fas fa-heart"></i></span>
            <p><em id="likes-status">${assignLike}</em> likes</p>
        </a>
        <button class="comments-btn">Comments</button>
    </section>
    </section>
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
___CSS_LOADER_EXPORT___.push([module.id, "* {\r\n  box-sizing: border-box;\r\n  margin: 0;\r\n  padding: 0;\r\n}\r\n\r\nhtml {\r\n  height: 100%;\r\n}\r\n\r\n.header-container {\r\n  transition: transform 0.3s ease-in-out;\r\n}\r\n\r\n.header-container.active {\r\n  transform: scale(1.2);\r\n}\r\n\r\n.close-icon {\r\n  transition: transform 0.3s ease-in-out;\r\n}\r\n\r\n.close-icon.active {\r\n  transform: rotate(45deg);\r\n}\r\n\r\n.header {\r\n  text-align: center;\r\n  background-color: gainsboro;\r\n}\r\n\r\nbody {\r\n  display: flex;\r\n  flex-direction: column;\r\n  min-height: 100%;\r\n  font-size: 16px;\r\n}\r\n\r\n.nav-bar {\r\n  display: flex;\r\n  justify-content: space-around;\r\n  align-items: center;\r\n}\r\n\r\nli {\r\n  list-style: none;\r\n}\r\n\r\n.nav-bar a {\r\n  text-decoration: none;\r\n  font-weight: 500;\r\n  font-size: 1.3rem;\r\n  color: #333;\r\n  padding: 1rem;\r\n}\r\n\r\n.nav-links {\r\n  display: flex;\r\n  gap: 1rem;\r\n}\r\n\r\nmain {\r\n  display: grid;\r\n  grid-gap: 20px;\r\n  grid-template-columns: repeat(3, 1fr);\r\n  justify-content: center;\r\n  margin: 0 auto;\r\n  padding: 1rem;\r\n}\r\n\r\n.movie-item {\r\n  align-items: center;\r\n  background-color: #f0f0f0;\r\n  display: flex;\r\n  flex-direction: column;\r\n  padding: 20px;\r\n}\r\n\r\n.movie-item img {\r\n  height: auto;\r\n  width: 300px;\r\n}\r\n\r\n.item-actions {\r\n  align-items: center;\r\n  display: flex;\r\n  margin-top: 20px;\r\n  gap: 0.6rem;\r\n}\r\n\r\n.likes {\r\n  display: flex;\r\n  gap: 0.6rem;\r\n}\r\n\r\n.comments-btn {\r\n  padding: 0.3rem;\r\n  border-radius: 5px;\r\n  font-size: 1.2rem;\r\n  background-color: rgb(23, 131, 239);\r\n  cursor: pointer;\r\n  color: #fff;\r\n  border: none;\r\n}\r\n\r\n.item h5 {\r\n  font-size: 1.3rem;\r\n  color: rgb(239, 60, 60);\r\n}\r\n\r\n.comment-modal {\r\n  border: 3px solid #fff;\r\n  bottom: 0;\r\n  height: 80%;\r\n  margin: 0 auto;\r\n  margin-top: 10px;\r\n  overflow-y: scroll;\r\n  position: fixed;\r\n  right: 0;\r\n  z-index: 10;\r\n  display: flex;\r\n  padding: 0.5rem;\r\n  border-radius: 10px;\r\n  gap: 1rem;\r\n  top: 50%;\r\n  left: 50%;\r\n  transform: translate(-50%, -50%);\r\n  background-color: #fff;\r\n  width: 800px;\r\n  max-width: 80%;\r\n}\r\n\r\n.modal-header {\r\n  align-items: center;\r\n  display: flex;\r\n  justify-content: space-between;\r\n  margin-bottom: 20px;\r\n}\r\n\r\n.modal-title {\r\n  font-size: 18px;\r\n  font-weight: bold;\r\n  margin: 0;\r\n}\r\n\r\n.modal-body img {\r\n  margin-bottom: 10px;\r\n  max-height: 300px;\r\n  object-fit: cover;\r\n  width: 100%;\r\n}\r\n\r\n#close-btn {\r\n  font-size: 1.5rem;\r\n  color: red;\r\n  cursor: pointer;\r\n}\r\n\r\n.header-title {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n}\r\n\r\n.movie-name {\r\n  font-size: 1.5rem;\r\n  color: rgb(138, 75, 146);\r\n}\r\n\r\n.details {\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 0.5rem;\r\n  padding: 0.7rem;\r\n  line-height: 1.2;\r\n}\r\n\r\n.nameInput {\r\n  padding: 0.5rem;\r\n  outline: none;\r\n  border-radius: 8px;\r\n  width: 250px;\r\n}\r\n\r\n.commentInput {\r\n  padding: 0.4rem;\r\n  outline: none;\r\n  border-radius: 6px;\r\n  width: 401px;\r\n}\r\n\r\n.input-container {\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 0.5rem;\r\n}\r\n\r\n.sub-comment-btn {\r\n  width: 150px;\r\n  font-size: 1.3rem;\r\n  color: #fff;\r\n  background-color: rgb(104, 168, 104);\r\n  padding: 0.3rem;\r\n  border: none;\r\n  border-radius: 6px;\r\n  cursor: pointer;\r\n}\r\n\r\nfooter {\r\n  background-color: #333;\r\n  color: #fff;\r\n  margin-top: auto;\r\n  padding: 10px;\r\n  text-align: center;\r\n}\r\n\r\n.overlay-pop {\r\n  inset: 0;\r\n  display: flex;\r\n}\r\n\r\n#overlay {\r\n  inset: 0;\r\n  position: fixed;\r\n  background-color: rgba(193, 199, 208, 0.9);\r\n  backdrop-filter: blur(1px);\r\n  z-index: 9;\r\n  pointer-events: none;\r\n  opacity: 0;\r\n}\r\n\r\n#overlay.active {\r\n  pointer-events: all;\r\n  opacity: 1;\r\n}\r\n", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;EACE,sBAAsB;EACtB,SAAS;EACT,UAAU;AACZ;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,sCAAsC;AACxC;;AAEA;EACE,qBAAqB;AACvB;;AAEA;EACE,sCAAsC;AACxC;;AAEA;EACE,wBAAwB;AAC1B;;AAEA;EACE,kBAAkB;EAClB,2BAA2B;AAC7B;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,gBAAgB;EAChB,eAAe;AACjB;;AAEA;EACE,aAAa;EACb,6BAA6B;EAC7B,mBAAmB;AACrB;;AAEA;EACE,gBAAgB;AAClB;;AAEA;EACE,qBAAqB;EACrB,gBAAgB;EAChB,iBAAiB;EACjB,WAAW;EACX,aAAa;AACf;;AAEA;EACE,aAAa;EACb,SAAS;AACX;;AAEA;EACE,aAAa;EACb,cAAc;EACd,qCAAqC;EACrC,uBAAuB;EACvB,cAAc;EACd,aAAa;AACf;;AAEA;EACE,mBAAmB;EACnB,yBAAyB;EACzB,aAAa;EACb,sBAAsB;EACtB,aAAa;AACf;;AAEA;EACE,YAAY;EACZ,YAAY;AACd;;AAEA;EACE,mBAAmB;EACnB,aAAa;EACb,gBAAgB;EAChB,WAAW;AACb;;AAEA;EACE,aAAa;EACb,WAAW;AACb;;AAEA;EACE,eAAe;EACf,kBAAkB;EAClB,iBAAiB;EACjB,mCAAmC;EACnC,eAAe;EACf,WAAW;EACX,YAAY;AACd;;AAEA;EACE,iBAAiB;EACjB,uBAAuB;AACzB;;AAEA;EACE,sBAAsB;EACtB,SAAS;EACT,WAAW;EACX,cAAc;EACd,gBAAgB;EAChB,kBAAkB;EAClB,eAAe;EACf,QAAQ;EACR,WAAW;EACX,aAAa;EACb,eAAe;EACf,mBAAmB;EACnB,SAAS;EACT,QAAQ;EACR,SAAS;EACT,gCAAgC;EAChC,sBAAsB;EACtB,YAAY;EACZ,cAAc;AAChB;;AAEA;EACE,mBAAmB;EACnB,aAAa;EACb,8BAA8B;EAC9B,mBAAmB;AACrB;;AAEA;EACE,eAAe;EACf,iBAAiB;EACjB,SAAS;AACX;;AAEA;EACE,mBAAmB;EACnB,iBAAiB;EACjB,iBAAiB;EACjB,WAAW;AACb;;AAEA;EACE,iBAAiB;EACjB,UAAU;EACV,eAAe;AACjB;;AAEA;EACE,aAAa;EACb,8BAA8B;EAC9B,mBAAmB;AACrB;;AAEA;EACE,iBAAiB;EACjB,wBAAwB;AAC1B;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,WAAW;EACX,eAAe;EACf,gBAAgB;AAClB;;AAEA;EACE,eAAe;EACf,aAAa;EACb,kBAAkB;EAClB,YAAY;AACd;;AAEA;EACE,eAAe;EACf,aAAa;EACb,kBAAkB;EAClB,YAAY;AACd;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,WAAW;AACb;;AAEA;EACE,YAAY;EACZ,iBAAiB;EACjB,WAAW;EACX,oCAAoC;EACpC,eAAe;EACf,YAAY;EACZ,kBAAkB;EAClB,eAAe;AACjB;;AAEA;EACE,sBAAsB;EACtB,WAAW;EACX,gBAAgB;EAChB,aAAa;EACb,kBAAkB;AACpB;;AAEA;EACE,QAAQ;EACR,aAAa;AACf;;AAEA;EACE,QAAQ;EACR,eAAe;EACf,0CAA0C;EAC1C,0BAA0B;EAC1B,UAAU;EACV,oBAAoB;EACpB,UAAU;AACZ;;AAEA;EACE,mBAAmB;EACnB,UAAU;AACZ","sourcesContent":["* {\r\n  box-sizing: border-box;\r\n  margin: 0;\r\n  padding: 0;\r\n}\r\n\r\nhtml {\r\n  height: 100%;\r\n}\r\n\r\n.header-container {\r\n  transition: transform 0.3s ease-in-out;\r\n}\r\n\r\n.header-container.active {\r\n  transform: scale(1.2);\r\n}\r\n\r\n.close-icon {\r\n  transition: transform 0.3s ease-in-out;\r\n}\r\n\r\n.close-icon.active {\r\n  transform: rotate(45deg);\r\n}\r\n\r\n.header {\r\n  text-align: center;\r\n  background-color: gainsboro;\r\n}\r\n\r\nbody {\r\n  display: flex;\r\n  flex-direction: column;\r\n  min-height: 100%;\r\n  font-size: 16px;\r\n}\r\n\r\n.nav-bar {\r\n  display: flex;\r\n  justify-content: space-around;\r\n  align-items: center;\r\n}\r\n\r\nli {\r\n  list-style: none;\r\n}\r\n\r\n.nav-bar a {\r\n  text-decoration: none;\r\n  font-weight: 500;\r\n  font-size: 1.3rem;\r\n  color: #333;\r\n  padding: 1rem;\r\n}\r\n\r\n.nav-links {\r\n  display: flex;\r\n  gap: 1rem;\r\n}\r\n\r\nmain {\r\n  display: grid;\r\n  grid-gap: 20px;\r\n  grid-template-columns: repeat(3, 1fr);\r\n  justify-content: center;\r\n  margin: 0 auto;\r\n  padding: 1rem;\r\n}\r\n\r\n.movie-item {\r\n  align-items: center;\r\n  background-color: #f0f0f0;\r\n  display: flex;\r\n  flex-direction: column;\r\n  padding: 20px;\r\n}\r\n\r\n.movie-item img {\r\n  height: auto;\r\n  width: 300px;\r\n}\r\n\r\n.item-actions {\r\n  align-items: center;\r\n  display: flex;\r\n  margin-top: 20px;\r\n  gap: 0.6rem;\r\n}\r\n\r\n.likes {\r\n  display: flex;\r\n  gap: 0.6rem;\r\n}\r\n\r\n.comments-btn {\r\n  padding: 0.3rem;\r\n  border-radius: 5px;\r\n  font-size: 1.2rem;\r\n  background-color: rgb(23, 131, 239);\r\n  cursor: pointer;\r\n  color: #fff;\r\n  border: none;\r\n}\r\n\r\n.item h5 {\r\n  font-size: 1.3rem;\r\n  color: rgb(239, 60, 60);\r\n}\r\n\r\n.comment-modal {\r\n  border: 3px solid #fff;\r\n  bottom: 0;\r\n  height: 80%;\r\n  margin: 0 auto;\r\n  margin-top: 10px;\r\n  overflow-y: scroll;\r\n  position: fixed;\r\n  right: 0;\r\n  z-index: 10;\r\n  display: flex;\r\n  padding: 0.5rem;\r\n  border-radius: 10px;\r\n  gap: 1rem;\r\n  top: 50%;\r\n  left: 50%;\r\n  transform: translate(-50%, -50%);\r\n  background-color: #fff;\r\n  width: 800px;\r\n  max-width: 80%;\r\n}\r\n\r\n.modal-header {\r\n  align-items: center;\r\n  display: flex;\r\n  justify-content: space-between;\r\n  margin-bottom: 20px;\r\n}\r\n\r\n.modal-title {\r\n  font-size: 18px;\r\n  font-weight: bold;\r\n  margin: 0;\r\n}\r\n\r\n.modal-body img {\r\n  margin-bottom: 10px;\r\n  max-height: 300px;\r\n  object-fit: cover;\r\n  width: 100%;\r\n}\r\n\r\n#close-btn {\r\n  font-size: 1.5rem;\r\n  color: red;\r\n  cursor: pointer;\r\n}\r\n\r\n.header-title {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n}\r\n\r\n.movie-name {\r\n  font-size: 1.5rem;\r\n  color: rgb(138, 75, 146);\r\n}\r\n\r\n.details {\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 0.5rem;\r\n  padding: 0.7rem;\r\n  line-height: 1.2;\r\n}\r\n\r\n.nameInput {\r\n  padding: 0.5rem;\r\n  outline: none;\r\n  border-radius: 8px;\r\n  width: 250px;\r\n}\r\n\r\n.commentInput {\r\n  padding: 0.4rem;\r\n  outline: none;\r\n  border-radius: 6px;\r\n  width: 401px;\r\n}\r\n\r\n.input-container {\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 0.5rem;\r\n}\r\n\r\n.sub-comment-btn {\r\n  width: 150px;\r\n  font-size: 1.3rem;\r\n  color: #fff;\r\n  background-color: rgb(104, 168, 104);\r\n  padding: 0.3rem;\r\n  border: none;\r\n  border-radius: 6px;\r\n  cursor: pointer;\r\n}\r\n\r\nfooter {\r\n  background-color: #333;\r\n  color: #fff;\r\n  margin-top: auto;\r\n  padding: 10px;\r\n  text-align: center;\r\n}\r\n\r\n.overlay-pop {\r\n  inset: 0;\r\n  display: flex;\r\n}\r\n\r\n#overlay {\r\n  inset: 0;\r\n  position: fixed;\r\n  background-color: rgba(193, 199, 208, 0.9);\r\n  backdrop-filter: blur(1px);\r\n  z-index: 9;\r\n  pointer-events: none;\r\n  opacity: 0;\r\n}\r\n\r\n#overlay.active {\r\n  pointer-events: all;\r\n  opacity: 1;\r\n}\r\n"],"sourceRoot":""}]);
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