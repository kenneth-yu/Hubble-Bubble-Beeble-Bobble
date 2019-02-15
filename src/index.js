function getAllSprites(){
  return fetch('http://localhost:3000/api/v1/playable_sprites')
  .then(res => res.json())
}

function getHighScores(){
  return fetch('http://localhost:3000/api/v1/highscores')
  .then(res => res.json())
  .then(data => console.log(data))
}

function iterateHighScores(highScores, scoresLocation){
  scoresLocation.innerHTML = highScores.map(highScoreHTML).join('')
}

function highScoreHTML(highScore){
  return `
  <tr id='scores'>
    <td>${highScore.username}</td>
    <td>${highScore.score}</td>
  </tr>
  `

}


document.addEventListener('DOMContentLoaded', async() =>{
<<<<<<< HEAD
  scoresLocation = document.getElementById('scores')
  allSprites = await getAllSprites()
  highScores = await getHighScores()
  console.log(highScores)
=======
  const scoresLocation = document.getElementById('scores')
  const allSprites = await getAllSprites()
  const highScores = await getHighScores()
>>>>>>> a9512bc7bd82928ec73a2c53d2709bc5d73ff2f6
  console.log(scoresLocation)
  iterateHighScores(highScores, scoresLocation);
})
