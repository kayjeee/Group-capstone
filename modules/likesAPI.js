
const postLike = (movie) => {
    fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/pCT6kArf3OLol0gUxPZ3/likes', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        item_id: movie,
      }),
    });
};
  
  export default postLike;