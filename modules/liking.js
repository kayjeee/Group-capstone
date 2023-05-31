
import postLike from '../modules/likesAPI.js';
import { fetchTVShows } from '../modules/utils';
const liking = async () => {
  const allMovies = await fetchTVShows(); // Fetches an array of all movies

  const likesBtn = document.querySelectorAll('.likeBtn'); // Selects all elements with the class 'likeBtn'
  const spans = document.querySelectorAll('#likes-status'); // Selects all elements with the id 'likes-status'
  
  // Iterates over each like button
  likesBtn.forEach((a, i) => {
    let h = JSON.parse(spans[i].innerHTML); // Parses the innerHTML of the corresponding span element to get the current like count
    
    a.addEventListener('click', () => {
      postLike(allMovies[i].name); // Calls the postLike function to send a like for the movie
      h += 1; // Increments the like count
      spans[i].innerHTML = h; // Updates the innerHTML of the corresponding span element with the updated like count
    });
  });
};

  
  export default liking;