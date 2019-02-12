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
console.log(game)
var score = 0;
var scoreText;


function preload ()
{
  //GET FROM RAILS API
  this.load.spritesheet('bluedragon', '../images/bluedragon.png', { frameWidth: 64, frameHeight: 64});
  this.load.spritesheet('greendragon', '../images/greendragon.png',{ frameWidth: 64, frameHeight: 64});
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

  platforms = this.physics.add.staticGroup();
  platforms.create(400, 568, 'ground').setScale(2).refreshBody();
  platforms.create(600, 400, 'ground');
  platforms.create(50, 250, 'ground');
  platforms.create(750, 220, 'ground');

  this.physics.add.collider(player, platforms);
  this.physics.add.collider(enemy, platforms);
  this.physics.add.collider(enemy, player);

  scoreText = this.add.text(16, 16, 'Le Pew Pews: 0', { fontSize: '32px', fill: '#FFF' });

}

function update (){
  // console.log(this.scene)
  // debugger
  this.physics.moveToObject(enemy,player,60,3*1000);
  cursors = this.input.keyboard.createCursorKeys();
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
  else
  {
      player.setVelocityX(0);
      // player.anims.play('turnRight');
  }

  if (cursors.up.isDown && player.body.touching.down)
  {
     // console.log("i tried to jump")
      player.setVelocityY(-320);
  }
}

// function chase(enemy){
//   console.log()
//   // this.physics.Arcade.moveToObject(enemy,player,60,10*1000);
//     // Phaser.Physics.Arcade.moveToObject(enemy,player,60,1*1000);
// }
