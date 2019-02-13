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


function preload ()
{
  //GET FROM RAILS API
  this.load.spritesheet('bluedragon', '../images/bluedragon.png', { frameWidth: 64, frameHeight: 64});
  this.load.spritesheet('greendragon', '../images/greendragon.png',{ frameWidth: 64, frameHeight: 64});
  this.load.spritesheet('bluebubbles', '../images/bluebubbles.png',{ frameWidth: 55, frameHeight: 62});
  this.load.image('ground', '../images/platform.png');
  this.load.image('background', '../images/background2.png');
}

function create ()
{
  bg = this.add.tileSprite(0, 0, 1600, 1200, 'background');

  player = this.physics.add.sprite(100, 450, 'bluedragon');
  player.setBounce(0);
  player.setCollideWorldBounds(true);

  enemy = this.physics.add.sprite(600, 450, 'greendragon');
  enemy.setBounce(0);
  enemy.setCollideWorldBounds(true);

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
  this.physics.add.collider(enemy, player);

  scoreText = this.add.text(16, 16, 'Le Pew Pews: 0', { fontSize: '32px', fill: '#FFF' });

  var Bullet = new Phaser.Class({
    Extends: Phaser.GameObjects.Image,
    initialize:
    function Bullet (scene)
    {
        Phaser.GameObjects.Image.call(this, scene, 10, 10, 'bluebubbles');
        this.speed = Phaser.Math.GetSpeed(400, 1);
    },

    fire: function (x, y)
    {
        this.setPosition(x - 50, y );
        this.setActive(true);
        this.setVisible(true);
    },

    update: function (time, delta)
    {
        this.x -= this.speed * delta;
        if (this.x < -50)
        {
            this.setActive(false);
            this.setVisible(false);
        }
    }

});

bullets = this.add.group({
    classType: Bullet,
    maxSize: 10,
    runChildUpdate: true
});
speed = Phaser.Math.GetSpeed(300, 1);

}

function update (time){
  // console.log(this.scene)
  // debugger
  // this.physics.moveToObject(enemy,player,60,3*1000);
  var cursors = this.input.keyboard.createCursorKeys();
  var spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    if (cursors.left.isDown)
  {
    // console.log("i tried to move left")
    // chase(enemy)
      player.setVelocityX(-250);
      player.anims.play('left', true);
  }
  else if (cursors.right.isDown)
  {
    // console.log("i tried to move right")
      player.setVelocityX(250);
      player.anims.play('right', true);
  }
  else if (spaceBar.isDown&& time > lastFired){
    player.anims.play('pew', true);
    var bullet = bullets.get();
    if (bullet){
        bullet.fire(player.x, player.y);
        lastFired = time + 1000;
    }
  }
  else
  {
      player.setVelocityX(0);
      // player.anims.play('turnRight');
  }

  if (cursors.up.isDown && player.body.touching.down)
  {
     // console.log("i tried to jump")
      player.body.checkCollision.up = false
      player.setVelocityY(-320);
  }

  // else if (cursors.right.isDown) {
  // }

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

}

// function chase(enemy){
//   console.log()
//   // this.physics.Arcade.moveToObject(enemy,player,60,10*1000);
//     // Phaser.Physics.Arcade.moveToObject(enemy,player,60,1*1000);
// }
