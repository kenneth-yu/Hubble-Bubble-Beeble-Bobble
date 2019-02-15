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
  const scoresLocation = document.getElementById('scores')
  const allSprites = await getAllSprites()
  const highScores = await getHighScores()
  console.log(scoresLocation)
  iterateHighScores(highScores, scoresLocation);
})
