function getAllSprites(){
  return fetch('http://localhost:3000/api/v1/playable_sprites')
  .then(res => res.json())
}

function getHighScores(){
  return fetch('http://localhost:3000/api/v1/highscores')
  .then(res => res.json())
}



document.addEventListener('DOMContentLoaded', async() =>{
  allSprites = await getAllSprites()
  highScores = await getHighScores()
  console.log(allSprites)
  console.log(highScores)
})
