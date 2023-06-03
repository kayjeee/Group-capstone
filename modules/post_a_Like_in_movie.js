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

export default postALikeInMovie;