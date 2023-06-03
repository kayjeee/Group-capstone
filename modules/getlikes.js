const postLikes = async (itemId) => {
  const response = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/Mlar7kUsbdh93qbI71nO/likes', {
    method: 'POST',
    body: JSON.stringify({
      item_id: itemId,
    }),
    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
  });
  const getResponse = await response.text();
  return getResponse;
};
export default postLikes;