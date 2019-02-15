function getAllSprites(){
  return fetch('http://localhost:3000/api/v1/playable_sprites')
  .then(res => res.json())
}

function getHighScores(){
  return fetch('http://localhost:3000/api/v1/highscores')
  .then(res => res.json())
}

function iterateHighScores(highScores, scoresLocation){
  scoresLocation.innerHTML += highScores.map(highScoreHTML).join('')
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
  scoresLocation = document.getElementById('highscores')
  console.log(scoresLocation.innerHTML)
  allSprites = await getAllSprites()
  highScores = await getHighScores()
  console.log(highScores)
  console.log(scoresLocation)
  iterateHighScores(highScores, scoresLocation);
})
