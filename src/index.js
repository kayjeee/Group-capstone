import './style.css';

// Your remaining JavaScript code goes her

import { fetchTVShows } from '../modules/utils';

// Get the container for the item list
const itemListContainer = document.querySelector('.item-list');

// Function to create a single item element
const createItemElement = (item) => {
  const {
    name,
    image: { medium },
    likes
  } = item;

  // Create the item container
  const itemContainer = document.createElement('div');
  itemContainer.classList.add('item');

  // Create the item title
  const itemTitle = document.createElement('h2');
  itemTitle.textContent = name;

  // Create the item description
  // const itemDescription = document.createElement('p');
  // itemDescription.innerHTML = summary;

  // Create the item actions container
  const itemActionsContainer = document.createElement('div');
  itemActionsContainer.classList.add('item-actions');

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
  likesSpan.innerHTML = `<i class="fas fa-heart"></i> ${likes || 0} Likes`;
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
  // itemContainer.appendChild(itemDescription);
  itemContainer.appendChild(itemActionsContainer);

  return itemContainer;
};

// Function to handle the like button click
const handleLikeButtonClick = (item) => {
  // TODO: Implement the logic to interact with the Involvement API and update the like count
  console.log(`Liked ${item.name}`);
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
    shows.forEach((show) => {
      const itemElement = createItemElement(show);
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
