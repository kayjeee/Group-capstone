import './style.css';

// Your remaining JavaScript code goes her
import liking from '../modules/liking.js';
import { fetchTVShows } from '../modules/utils';
import getLikes from '../modules/getlikes';

const body = document.querySelector('body');
const commentModal = document.getElementById('commentModal');
let count = 0;
const counter = document.getElementById('count');
const middleSection = document.getElementById('middle');
let currentValue = 0;
// Get the container for the item list
const itemListContainer = document.querySelector('.item-list');
const getLikesCount = async (item_id) => {
  const response = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/pCT6kArf3OLol0gUxPZ3/likes?item_id=${item_id}`);
  const data = await response.json();
  return data.length > 0 ? data[0].likes : 0;
};
// Function to create a single item element
const createItemElement = async (item) => {
  const {
    name,
    image: { medium }
  } = item;

  // Create the item container
  const itemContainer = document.createElement('div');
  itemContainer.classList.add('item');

  // Create the item title
  const itemTitle = document.createElement('h2');
  itemTitle.textContent = name;

  // Create the item actions container
  const itemActionsContainer = document.createElement('div');
  itemActionsContainer.classList.add('item-actions');
  itemContainer.setAttribute('id', `show-${item.id}`); // Set the unique identifier using show.id

  // Create the image container
  const imageContainer = document.createElement('div');
  imageContainer.classList.add('container');
  const imageRow = document.createElement('div');
  imageRow.classList.add('row');
  const itemImage = document.createElement('img');
  itemImage.src = medium;
  itemImage.alt = 'Item Image';
  imageRow.appendChild(itemImage);
  imageContainer.appendChild(imageRow);

  // Create the buttons container
  const buttonsContainer = document.createElement('div');
  buttonsContainer.classList.add('row');
  const likesSpan = document.createElement('span');
  likesSpan.classList.add('likes');
  const likesCount = await getLikesCount(name); // Retrieve the likes count
  likesSpan.innerHTML = `<i class="fas fa-heart"></i> ${likesCount} Likes`;
  const commentsButton = document.createElement('button');
  commentsButton.classList.add('comments-btn');
  commentsButton.textContent = 'Comments';
  const reservationsButton = document.createElement('button');
  reservationsButton.classList.add('reservations-btn');
  reservationsButton.textContent = 'Reservations';
  buttonsContainer.appendChild(likesSpan);
  buttonsContainer.appendChild(commentsButton);
  buttonsContainer.appendChild(reservationsButton);

  // Append all elements to the item container
  itemActionsContainer.appendChild(imageContainer);
  itemActionsContainer.appendChild(buttonsContainer);
  itemContainer.appendChild(itemTitle);
  itemContainer.appendChild(itemActionsContainer);

  return itemContainer;
};

// Function to handle the comments button click
const handleCommentsButtonClick = (item) => {
  // TODO: Implement the logic to show the comments popup
  console.log(`Show comments for ${item.name}`);
};

// Function to handle the reservations button click
const handleReservationsButtonClick = (item) => {
  // TODO: Implement the logic to show the reservations popup
  console.log(`Show reservations for ${item.name}`);
};

// Fetch TV shows and display them in the item list container
fetchTVShows()
  .then((shows) => {
    shows.forEach(async (show) => {
      const itemElement = await createItemElement(show); // Await the creation of the item element
      const likeButton = itemElement.querySelector('.likes');
      const commentsButton = itemElement.querySelector('.comments-btn');
      const reservationsButton = itemElement.querySelector('.reservations-btn');

      likeButton.addEventListener('click', () => handleLikeButtonClick(show));
      commentsButton.addEventListener('click', () => handleCommentsButtonClick(show));
      reservationsButton.addEventListener('click', () => handleReservationsButtonClick(show));

      itemListContainer.appendChild(itemElement);
    });
  })
  .catch((error) => {
    console.error('Error fetching TV shows:', error);
  });

const handleLikeButtonClick = async (show) => {
  const likedItems = await getLikes();
  const like = likedItems.find((item) => item.item_id === show.name);
  const itemElement = document.querySelector(`#show-${show.id}`);
  const likesStatus = itemElement.querySelector('.likes');

  if (like) {
    // Increment the likes count
    like.likes++;
    likesStatus.textContent = like.likes;
  } else {
    // Add a new like for the show
    likedItems.push({ item_id: show.name, likes: 1 });
    likesStatus.textContent = '1';
  }

  // Update the likes on the server
  const requestBody = {
    item_id: show.name
  };

  await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/pCT6kArf3OLol0gUxPZ3/likes', {
    method: 'POST',
    body: JSON.stringify(requestBody),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
  
/** 
const getLikes = async () => {
  let likedItems = [];
  await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/bj33OEQX34RPwoGeJ8eJ/likes')
    .then((response) => response.json())
    .then((res) => (likedItems = res));
  return likedItems;
};
*/
  body.addEventListener('click', () => {
    liking();
  });