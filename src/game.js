var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        },
        audio: {
          disableWebAudio: true
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);
var score = 0;
var scoreText;
var lastFired = 0;
var arrayOfEnemies;
var arrayOfBubbles = [];
var bubble;
var weapon;
var hurt = 0;
var killCount = 0;
var invincible = 'false'
var lives = 10


function preload ()
{
  //GET FROM RAILS API
  this.load.spritesheet('bluedragon', '../images/bluedragon.png', { frameWidth: 64, frameHeight: 64});
  this.load.spritesheet('greendragon', '../images/greendragon.png',{ frameWidth: 64, frameHeight: 64});
  this.load.spritesheet('bluebubbles', '../images/bluebubbles.png',{ frameWidth: 64, frameHeight: 64});
  this.load.image('ground', '../images/platform.png');
  this.load.image('background', '../images/forestbackground.png');
  this.load.audio('death', '../audio/death.mp3');
  this.load.audio('jump', '../audio/jump.mp3');
  this.load.audio('shootbubble', '../audio/shootbubble.mp3');
  // this.load.image('projectile', '../images/greenbubbles.png', {frameWidth: 64, frameHeight: 64});


  this.load.spritesheet('enemy', '../images/enemiesNew.png', { frameWidth: 64, frameHeight: 64});

}

function create ()
{
  bg = this.add.tileSprite(0, 0, 1600, 1200, 'background');

  // Player
  player = this.physics.add.sprite(100, 450, 'bluedragon');
  player.setBounce(0);
  player.setCollideWorldBounds(true);

  // Green Friend
  enemy = this.physics.add.sprite(600, 450, 'greendragon');
  enemy.setBounce(0);
  enemy.setCollideWorldBounds(true);

  // Robo Enemy
  realEnemy = this.physics.add.sprite(200, 300, 'enemy');
  realEnemy.setBounce(0);
  realEnemy.setCollideWorldBounds(true);

  arrayOfEnemies = [realEnemy]
  // debugger

  // Robo Enemy, left and right animation
  this.anims.create({
    key: 'enemyleft',
    frames: this.anims.generateFrameNumbers('enemy', { start: 0, end: 1}),
    frameRate: 10,
    // repeat: -1
  });
  this.anims.create({
      key: 'enemyright',
      frames: this.anims.generateFrameNumbers('enemy', { start: 2, end: 3 }),
      frameRate: 10,
      // repeat: -1
  });

  // Green Dragon Friend, left and right animation
  this.anims.create({
    key: 'greenleft',
    frames: this.anims.generateFrameNumbers('greendragon', { start: 4, end: 6}),
    frameRate: 10,
    // repeat: -1
  });
  this.anims.create({
      key: 'greenright',
      frames: this.anims.generateFrameNumbers('greendragon', { start: 24, end: 26 }),
      frameRate: 10,
      // repeat: -1
  });

  // Blue Dragon (self)
  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('bluedragon', { start: 4, end: 6}),
    frameRate: 10,
    // repeat: -1
  });
  this.anims.create({
    key: 'turnLeft',
    frames: [ { key: 'bluedragon', frame: 0 } ],
    frameRate: 20
  });
  this.anims.create({
      key: 'turnRight',
      frames: [ { key: 'bluedragon', frame: 20 } ],
      frameRate: 20
  });
  this.anims.create({
    key: 'up',
    frames: [ { key: 'bluedragon', frame:12}],
    frameRate: 20
  })
  this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('bluedragon', { start: 24, end: 26 }),
      frameRate: 10,
      // repeat: -1
  });
  this.anims.create({
    key: 'pewleft',
    // frames: this.anims.generateFrameNumbers('bluedragon', {start: 8, end: 13}),
    frames: this.anims.generateFrameNumbers('bluedragon', { frames: [ 8, 9, 10, 11, 10, 9, 8, 0]}),
    frameRate: 30,
    // repeat:
  })
  this.anims.create({
    key: 'pewright',
    // frames: this.anims.generateFrameNumbers('bluedragon', {start: 8, end: 13}),
    frames: this.anims.generateFrameNumbers('bluedragon', { frames: [ 28, 29, 30, 31, 30, 29, 28, 20]}),
    frameRate: 30,
    // repeat:
  })
  this.anims.create({
    key: 'bubbles',
    // frames: this.anims.generateFrameNumbers('bluedragon', {start: 8, end: 13}),
    frames: this.anims.generateFrameNumbers('bluebubbles', { start:0 , end:10}),
    frameRate: 15,
    // repeat:
  })

  platforms = this.physics.add.staticGroup();
  platforms.create(400, 568, 'ground').setScale(2).refreshBody();
  platforms.create(600, 400, 'ground')
  platforms.create(50, 250, 'ground');
  platforms.create(750, 220, 'ground');

  this.physics.add.collider(player, platforms);
  // this.physics.add.collider(enemy, platforms);
  this.physics.add.collider(realEnemy, platforms);
  // this.physics.add.collider(enemy, player, playerWasHit, null, this);
  this.physics.add.overlap(player, arrayOfEnemies, playerWasHit, null, this);

  this.physics.add.overlap(arrayOfBubbles, arrayOfEnemies, hitSprite, null, this);

    // this.physics.add.collider(bullet, realEnemy);
    // realEnemy.body.onCollide = new Phaser.Signal();
    // realEnemy.body.onCollide.add(hitSprite, this);
    // this.physics.add.overlap(player, stars, collectStar, null, this);
  //
  scoreText = this.add.text(16, 16, `Score: ${killCount}`, { fontSize: '32px', fill: '#000' });
  hurtText = this.add.text(16, 550, `HP Left: ${lives}`, { fontSize: '32px', fill: '#fff' });
}

function hitSprite(bubble, enemy) {
  // Kill Enemy on Hit
  let index = arrayOfEnemies.indexOf(enemy);
  if (index > -1) {
    arrayOfEnemies.splice(index, 1);
  } else {
    arrayOfEnemies.pop();
  }
  enemy.destroy();

  // Kill Bubble on Hit
  let bubbleIndex = arrayOfBubbles.indexOf(bubble);
  bubble.setVelocity(0);
  if (bubbleIndex > -1) {
    arrayOfBubbles.splice(bubbleIndex, 1);
  } else {
    arrayOfBubbles.pop();
  }
  bubble.destroy();


  // delete arrayOfBubbles[bubbleIndex];
  // arrayOfBubbles = arrayOfBubbles.filter((bubble) => bubble === undefined)
  // setTimeout(() => {
  //     bubble.anims.play('bubbles', true)
  //   }, 500)

  // Update Score
  killCount += 1;
  scoreText.setText(`Score: ${killCount*100}`);
}

function playerWasHit(player, enemy) {
  // console.log("Ouch!");
  if (invincible === 'false' && lives > 0){
    lives -= 1
    invincible = 'true'
    setTimeout(function () {invincible = 'false'}, 2000)
  }
  hurtText.setText(`HP Left: ${lives}`);
}

function update (time) {
  var cursors = this.input.keyboard.createCursorKeys();
  var spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  var zButton = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);

  //PLAYER MOVEMENTS --------------------------------------------------------------------
  if (cursors.left.isDown) {
      player.setVelocityX(-300);
      player.anims.play('left', true);
      direction = 'left'
  }
  else if (cursors.right.isDown) {
    // console.log("i tried to move right")
      player.setVelocityX(300);
      player.anims.play('right', true);
      direction = 'right'
  }
  else if (Phaser.Input.Keyboard.JustDown(spaceBar)){
    const newBubble = this.physics.add.sprite(player.x, player.y, 'bluebubbles');
    this.physics.add.collider(newBubble, enemy);
    this.physics.add.collider(newBubble, realEnemy);
    newBubble.setCollideWorldBounds(true);
    newBubble.body.setAllowGravity(false);
    newBubble.body.onWorldBounds = true;
    arrayOfBubbles.push(newBubble)
    this.sound.play('shootbubble');
    setTimeout(function(){
      let index = arrayOfBubbles.indexOf(newBubble);
      if (index > -1) {
        arrayOfBubbles.splice(index, 1);
      } else {
        arrayOfBubbles.pop();
      }
      newBubble.destroy();
    }, 700)

    // debugger

    if (direction === 'left'){
      // console.log('i am facing left')
      player.anims.play('pewleft', true);
      newBubble.setVelocityX(-300);
      newBubble.anims.play('bubbles', true)
    }
    else if (direction === 'right'){
      // console.log('i am facing right')
      player.anims.play('pewright', true);
      newBubble.setVelocityX(300);
      newBubble.anims.play('bubbles', true)
    }
    else{
      // console.log('i am facing left')
      player.anims.play('pewleft', true);
      newBubble.setVelocityX(-300);
      newBubble.anims.play('bubbles', true)
    }

  }
  else {
      player.setVelocityX(0);
      // player.anims.play('turnRight');
  }

  if (cursors.up.isDown && player.body.touching.down) {
      player.body.checkCollision.up = false
      player.setVelocityY(-320);
      this.sound.play('jump');
  }
  //PLAYER MOVEMENTS END -------------------------------------------------------


  //ENEMY MOVEMENTS START ------------------------------------------------------

  // else if (player.y < 360 && enemy.y > 500){
  //   console.log("Blue is on Platform 1 and Green is on the Ground")
  // }
  // if (player.y < 220 && enemy.y > 500){
  //   console.log("Blue is on Platform 2 and Green is on the Ground")
  // }
  // else if (player.y < 180 &&  enemy.y > 500 ){
  //   console.log("Blue is on Platform 3 and Green is on the Ground")
  // }
  if (Math.round(enemy.x / 100)*100 > Math.round(player.x / 100)*100) {
    enemy.setVelocityX(-150);
    enemy.anims.play('greenleft', true);
  }  else if (Math.round(enemy.x / 100)*100 < Math.round(player.x / 100)*100){
    enemy.setVelocityX(150);
    enemy.anims.play('greenright', true);
    // enemy.setVelocityX(0);
    // player.anims.play('turnRight');
  } else if (Math.floor(enemy.y / 100)*100 > Math.floor(player.y / 100)*100 && enemy.body.touching.down){
    enemy.body.checkCollision.up = false
    setTimeout(function() {enemy.setVelocityY(-260)}, 200);
  }


  // Real Enemy Chase
  if (arrayOfEnemies.length > 0) {
    arrayOfEnemies.forEach(enemy => {
      if (Math.round(enemy.x / 100)*100 > Math.round(player.x / 100)*100) {
        enemy.setVelocityX(-200);
        enemy.anims.play('enemyleft', true);
      } else if (Math.round(enemy.x / 100)*100 < Math.round(player.x / 100)*100) {
        enemy.setVelocityX(200);
        enemy.anims.play('enemyright', true);
      } else if (Math.floor(enemy.y / 100)*100 > Math.floor(player.y / 100)*100 && enemy.body.touching.down) {
        setTimeout(function() {enemy.setVelocityY(-240)}, 300);
      }
    })
  }
  // Real Enemy end
  //ENEMY MOVEMENTS START ------------------------------------------------------

  // New Enemy Spawning
  if (arrayOfEnemies.length < 3) {
    let w = Math.random() * (800 - 100) + 100;
    let h = Math.random() * (500 - 100) + 100;
    const newEnemy = this.physics.add.sprite(w, h, 'enemy');
    // newEnemy.setBounce(0);
    newEnemy.setCollideWorldBounds(true);
    //
    this.physics.add.collider(newEnemy, platforms);
    // this.physics.add.collider(newEnemy, player);
    arrayOfEnemies.push(newEnemy)
  }

  //  Manual New Enemy Spawning
  // if (Phaser.Input.Keyboard.JustDown(zButton)) {
  //   const newEnemy = this.physics.add.sprite(200, 300, 'enemy');
  //   // newEnemy.setBounce(0);
  //   newEnemy.setCollideWorldBounds(true);
  //   //
  //   this.physics.add.collider(newEnemy, platforms);
  //   this.physics.add.collider(newEnemy, player);
  //   arrayOfEnemies.push(newEnemy)
  // }

if (arrayOfBubbles.length > 0) {
  arrayOfBubbles.forEach(bubble => {
    // debugger
    if (bubble.body.checkWorldBounds()) {
      let index = arrayOfBubbles.indexOf(bubble);
      if (index > -1) {
        arrayOfBubbles.splice(index, 1);
      } else {
        arrayOfBubbles.pop();
      }
      // debugger
      bubble.destroy();
      }
    })
  }

  if (lives <= 0){
    this.sound.play('death')
  }
}
