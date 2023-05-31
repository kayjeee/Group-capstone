const getLikes = async () => {
    try {
      const response = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/bj33OEQX34RPwoGeJ8eJ/likes');
      if (!response.ok) {
        throw new Error('Failed to fetch likes');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching likes:', error);
      return []; // Return an empty array as the default value
    }
  };
  
  export default getLikes;