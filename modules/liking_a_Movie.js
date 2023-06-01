// Import the necessary modules
import getAllmovies from './getAllmovies.js';
//import postLike from './likesApi.js';
import post_a_Like_in_movie from './post_a_Like_in_movie.js';

// Define the 'liking' function
const liking_a_Movie = async () => {
  // Fetch all movies
  const allMovies = await getAllmovies();

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
      post_a_Like_in_movie(allMovies[index].name);
      
      // Increment the like count
      likeCount += 1;

      // Update the like count in the corresponding span
      spans[index].innerHTML = likeCount;
    });
  });
};

// Export the 'liking' function as the default export

export default liking_a_Movie;