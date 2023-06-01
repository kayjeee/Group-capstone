const postLikes = async(item_id)=>{
const response = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/Mlar7kUsbdh93qbI71nO/likes',{
    method:'POST',
    body:JSON.stringify({
        item_id
    }),
  headers: { 'Content-Type': 'application/json; charset=UTF-8' }
})
const getResponse = await response.text()
console.log(getResponse)
return getResponse;
}
export default postLikes