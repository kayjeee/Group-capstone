const getAllmovies = async () => {
    // Create an empty array to store the fetched data
    let arr = [];
  
    // Fetch data from the specified URL and wait for the response
    const response = await fetch('https://api.tvmaze.com/shows?page=1');
  
    // Parse the response as JSON and wait for the parsed data
    const data = await response.json();
  
    // Assign the parsed data to the array
    arr = data;
  
    // Return the array containing the fetched data
    return arr;
  };
  
  export default getAllmovies;
  