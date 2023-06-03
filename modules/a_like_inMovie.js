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

export default aLikeInMovie;
