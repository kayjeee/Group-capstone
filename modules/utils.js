// Hard-coded data
const API = 'https://api.tvmaze.com';
import postLikes from "./getlikes";
import postComments from "./comments";
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
  scoresValue.classList.add('scores')
  scoresValue.setAttribute('id',`item${movies[i].id}`)

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
  //listen on the comments button
  commentsButton.addEventListener('click',()=>{
    const section = document.querySelector('.modal')
    section.classList.toggle('show-section')
    const image = document.createElement('div')
    image.classList.add('image-container')
    const itemsImage = document.createElement('img');
    itemsImage.src = `${movies[i].image.medium}`;
    itemsImage.alt = 'Item Image';
    image.appendChild(itemsImage)
    const bodyDiv = document.createElement('div')
    bodyDiv.classList.add('header-body')
    const heading = document.createElement('div')
    heading.classList.add('heading')
    const header = document.createElement('h2')
    header.textContent = `${movies[i].name}`
    const cancelItem = document.createElement('p')
    cancelItem.innerText = `x`
    heading.appendChild(header)
    heading.appendChild(cancelItem)
    bodyDiv.appendChild(heading)
    const commentsDiv = document.createElement('div')
    commentsDiv.classList.add('comments')
    bodyDiv.appendChild(commentsDiv)
    //form inputs
    const formDiv = document.createElement('div')
    formDiv.classList.add('formDiv')
    const formHeader = document.createElement('h3')
    formHeader.innerText = `Add a comment`
    const form = document.createElement('form')
    form.classList.add('form')
    const nameInput = document.createElement('input')
    nameInput.classList.add('user-input')
    nameInput.type = 'text'
    nameInput.placeholder = 'enter your name'
    const commentInput = document.createElement('input')
    commentInput.classList.add('comment-input')
    commentInput.type = 'text'
    commentInput.placeholder = 'your insight'
    const submitButton = document.createElement('button')
    submitButton.setAttribute('id',`item${movies[i].id}`)
    submitButton.type = 'button'
    submitButton.classList.add('submit')
    submitButton.innerText = `Comment`
    
    //append items on the form
    form.appendChild(nameInput)
    form.appendChild(commentInput)
    form.appendChild(submitButton)
    //append items on the formdiv
    formDiv.appendChild(formHeader)
    formDiv.appendChild(form)
    bodyDiv.appendChild(formDiv)
    section.appendChild(image)
    section.appendChild(bodyDiv)
    //listen on the submit buutton
    submitButton.addEventListener('click',async(e)=>{
      let itemId = e.target.id
      if(nameInput.value === '' || commentInput.value === ''){
        console.log('am empty')
      }else{
        await postComments(itemId,nameInput.value,commentInput.value)
        const getcomments = async()=>{
          const get = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/Mlar7kUsbdh93qbI71nO/comments?item_id=${itemId}`)
          const response = await get.json()
          commentsDiv.innerHTML = ''
          response.forEach((comments)=>{
            const li = document.createElement('div')
            li.innerHTML =`<li>date:${comments.creation_date}: name:${comments.username} comment: ${comments.comment}</li>`
            commentsDiv.appendChild(li)
          })
        }
        await getcomments()
        form.reset()
      }
    })
  })
 }
}