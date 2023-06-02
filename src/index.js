import './style.css';
import { fetchTVShows } from '../modules/utils';
fetchTVShows()
window.addEventListener('DOMContentLoaded',async()=>{
     await fetchTVShows()
    const scores = document.querySelectorAll('.scores')
    scores.forEach( async (score)=>{
        const getlikes = async()=>{
            const get = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/Mlar7kUsbdh93qbI71nO/likes')
            const response = await get.json()
            response.forEach(element => {
              if(score.id == element.item_id){
                score.textContent = `${element.likes}`
              }
              
            });
          }
          getlikes()
     
    })    
})