// Hard-coded data
const API = 'https://api.tvmaze.com';

export const fetchTVShows = async () => {
  try {
    // URL for fetching the TV shows
    const url = `${API}/shows`;

    // Fetch TV show data from the API
    const response = await fetch(url);
    const shows = await response.json();

    // Return the fetched data
    return shows;
  } catch (error) {
    // Handle errors, log the error to the console, and return an empty array
    console.error('Error fetching TV shows:', error);
    return [];
  }
};

export const fetchTVShowDetails = async (showId) => {
  try {
    // URL for fetching the TV show details
    const url = `${API}/shows/${showId}`;

    // Fetch TV show details from the API
    const response = await fetch(url);
    const show = await response.json();

    // Return the fetched data
    return show;
  } catch (error) {
    // Handle errors, log the error to the console, and return null
    console.error(`Error fetching details for show ID ${showId}:`, error);
    return null;
  }
};
