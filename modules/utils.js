// Hard-coded data
const API = 'https://api.tvmaze.com';
import postLikes from "./getlikes";
export const fetchTVShows = async () => {
  try {
    // URL for fetching the TV shows
    const url = `${API}/shows`;

    // Fetch TV show data from the API
    const response = await fetch(url);
    const shows = await response.json();
    showMovies(shows)

  } catch (error) {
    // Handle errors, log the error to the console, and return an empty array
    console.error('Error fetching TV shows:', error);
    return [];
  }
};
const showMovies = (movies)=>{
  const itemListContainer = document.querySelector('.item-list');
  itemListContainer.innerHTML = ''
 for(let i = 0; i < 16; i++){
  const itemContainer = document.createElement('div');
  itemContainer.classList.add('item');
  itemContainer.innerText = `${movies[i].name}`
  const itemActionsContainer = document.createElement('div');
  itemActionsContainer.classList.add('item-actions');
  const imageContainer = document.createElement('div');
  imageContainer.classList.add('container');
  const imageRow = document.createElement('div');
  imageRow.classList.add('row');
  const itemImage = document.createElement('img');
  itemImage.src = `${movies[i].image.medium}`;
  itemImage.alt = 'Item Image';
  imageRow.appendChild(itemImage);
  imageContainer.appendChild(imageRow);
  //buttons 
  const buttonsContainer = document.createElement('div');
  buttonsContainer.classList.add('rows');
  const likesSpan = document.createElement('div');
  likesSpan.classList.add('likes');
  likesSpan.innerHTML = `<i id='item${movies[i].id}'class="fas fa-heart"></i>`
  buttonsContainer.appendChild(likesSpan)
  const scoresValue = document.createElement('p')
  scoresValue.textContent = 0;
  const scores = document.createElement('p')
  scores.textContent = 'likes';
  const commentsButton = document.createElement('button');
  commentsButton.classList.add('comments-btn');
  commentsButton.textContent = 'Comments';
  buttonsContainer.appendChild(scoresValue)
  buttonsContainer.appendChild(scores)
  buttonsContainer.appendChild(commentsButton);
  //append all elements
  itemActionsContainer.appendChild(imageContainer);
  itemActionsContainer.appendChild(buttonsContainer);
  itemContainer.appendChild(itemActionsContainer);
  //append all on the div
  itemListContainer.appendChild(itemContainer)
  likesSpan.addEventListener('click',async (e)=>{
    let itemid = e.target.id
    await postLikes(itemid)
    const getlikes = async()=>{
      const get = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/Mlar7kUsbdh93qbI71nO/likes')
      const response = await get.json()
      response.forEach(element => {
        if(itemid == element.item_id){
          scoresValue.textContent = `${element.likes}`
        }
        
      });
      
    }
     await getlikes()
   
  })
 }
}
