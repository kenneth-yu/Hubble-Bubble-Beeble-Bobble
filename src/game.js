var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
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


function preload ()
{
  //GET FROM RAILS API
  this.load.spritesheet('bluedragon', '../images/bluedragon.png', { frameWidth: 64, frameHeight: 64});
  this.load.spritesheet('greendragon', '../images/greendragon.png',{ frameWidth: 64, frameHeight: 64});
  this.load.spritesheet('bluebubbles', '../images/bluebubbles.png',{ frameWidth: 64, frameHeight: 64});
  this.load.image('ground', '../images/platform.png');
  this.load.image('background', '../images/background2.png');
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
    key: 'pew',
    // frames: this.anims.generateFrameNumbers('bluedragon', {start: 8, end: 13}),
    frames: this.anims.generateFrameNumbers('bluedragon', { frames: [ 8, 9, 10, 11, 10, 9, 8, 0]}),
    frameRate: 20,
    // repeat:
  })
  this.anims.create({
    key: 'bubbles',
    // frames: this.anims.generateFrameNumbers('bluedragon', {start: 8, end: 13}),
    frames: this.anims.generateFrameNumbers('bluebubbles', { start:0 , end:10}),
    frameRate: 20,
    // repeat:
  })

  platforms = this.physics.add.staticGroup();
  platforms.create(400, 568, 'ground').setScale(2).refreshBody();
  platforms.create(600, 400, 'ground')
  platforms.create(50, 250, 'ground');
  platforms.create(750, 220, 'ground');

  this.physics.add.collider(player, platforms);
  this.physics.add.collider(enemy, platforms);
  this.physics.add.collider(realEnemy, platforms);
  // this.physics.add.collider(enemy, player, playerWasHit, null, this);
  this.physics.add.collider(player, arrayOfEnemies, playerWasHit, null, this);

  this.physics.add.collider(arrayOfBubbles, arrayOfEnemies, hitSprite, null, this);

    // this.physics.add.collider(bullet, realEnemy);
    // realEnemy.body.onCollide = new Phaser.Signal();
    // realEnemy.body.onCollide.add(hitSprite, this);
    // this.physics.add.overlap(player, stars, collectStar, null, this);
  //
  scoreText = this.add.text(16, 16, `Le Pew Pews: ${killCount}`, { fontSize: '32px', fill: '#FFF' });
  hurtText = this.add.text(16, 50, `I Am Hurt: ${hurt}`, { fontSize: '32px', fill: '#FFF' });
}

function hitSprite(bubble, enemy) {
  let index = arrayOfEnemies.indexOf(enemy);
  let bubbleIndex = arrayOfBubbles.indexOf(bubble);
  delete arrayOfEnemies[index];
  enemy.destroy();
  // enemy.setActive(false).setVisible(false);

  bubble.setVelocity(0);
  // bubble.setActive(false)
  bubble.destroy();
  // debugger
  // delete arrayOfBubbles[bubbleIndex];
  // arrayOfBubbles = arrayOfBubbles.filter((bubble) => bubble === undefined)
  // setTimeout(() => {
  //     bubble.anims.play('bubbles', true)
  //     // bubble.setVisible(false);
  //   }, 500)
  killCount += 1;
  scoreText.setText(`Le Pew Pews: ${killCount}`);
}

function playerWasHit(player, enemy) {
  console.log("Ouch!");
  hurt += 1;
  hurtText.setText(`I Am Hurt: ${hurt}`);
  enemy.setActive(false).setVisible(false);
  arrayOfEnemies.shift();

  // This causes new enemies to not hurt the player for some reason
  // let index = arrayOfEnemies.indexOf(enemy);
  // delete arrayOfEnemies[index];
  // arrayOfEnemies = arrayOfEnemies.filter((enemy) => enemy === false)
}


function update (time) {
  var cursors = this.input.keyboard.createCursorKeys();
  var spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  var zButton = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
  if (cursors.left.isDown) {
      player.setVelocityX(-250);
      player.anims.play('left', true);
  }
  else if (cursors.right.isDown) {
    // console.log("i tried to move right")
      player.setVelocityX(250);
      player.anims.play('right', true);
  }
  else if (Phaser.Input.Keyboard.JustDown(spaceBar) && (time - lastFired) > 300){
    player.anims.play('pew', true);
      const newBubble = this.physics.add.sprite(player.x, player.y, 'bluebubbles');
        this.physics.add.collider(newBubble, enemy);
        this.physics.add.collider(newBubble, realEnemy);
        newBubble.body.setAllowGravity(false)
        newBubble.setVelocityX(-400);
        newBubble.anims.play('bubbles', true)
        arrayOfBubbles.push(newBubble)
        lastFired = time + 1000;

        // setTimeout(() => {
        //   newBubble.destroy();
        //   let index = arrayOfBubbles.indexOf(newBubble);
        //   delete arrayOfBubbles[index];
        // }, 1000)
  }
  else {
      player.setVelocityX(0);
      // player.anims.play('turnRight');
  }

  if (cursors.up.isDown && player.body.touching.down) {
      player.body.checkCollision.up = false
      player.setVelocityY(-320);
  }

  // A bunch of console.log();
  else if (player.y < 360 && enemy.y > 500){
    console.log("Blue is on Platform 1 and Green is on the Ground")
  }
  if (player.y < 220 && enemy.y > 500){
    console.log("Blue is on Platform 2 and Green is on the Ground")
  }
  else if (player.y < 180 &&  enemy.y > 500 ){
    console.log("Blue is on Platform 3 and Green is on the Ground")
  }
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


  // arrayOfBubbles.forEach(bubble => {
  //   this.physics.add.collider(bubble, arrayOfEnemies, hitSprite, null, this);
  //   // if (!bubble.body.touching.none) {
  //   //   console.log("Pop!");
  //   // }
  // })

  // New Enemy Spawning
  if (Phaser.Input.Keyboard.JustDown(zButton)) {
    const newEnemy = this.physics.add.sprite(200, 300, 'enemy');
    // newEnemy.setBounce(0);
    newEnemy.setCollideWorldBounds(true);
    //
    this.physics.add.collider(newEnemy, platforms);
    // this.physics.add.collider(newEnemy, player);
    arrayOfEnemies.push(newEnemy)
  }
}
