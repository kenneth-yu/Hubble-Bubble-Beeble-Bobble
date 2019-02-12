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


function preload ()
{
  // this.load.spritesheet('dude', '../images/dude.png', { frameWidth: 32, frameHeight: 48 });
  this.load.spritesheet('dude', '../images/bluedragon.png', { frameWidth: 64, frameHeight: 64});
  this.load.image('ground', '../images/platform.png');
  this.load.image('background', '../images/background2.png');
}

function create ()
{
  bg = this.add.tileSprite(0, 0, 1600, 1200, 'background');

  player = this.physics.add.sprite(100, 450, 'dude');
  player.setBounce(0.2);
  player.setCollideWorldBounds(true);

  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('dude', { start: 4, end: 6}),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: 'turnLeft',
    frames: [ { key: 'dude', frame: 0 } ],
    frameRate: 20
  });

  this.anims.create({
      key: 'turnRight',
      frames: [ { key: 'dude', frame: 20 } ],
      frameRate: 20
  });

  this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', { start: 24, end: 26 }),
      frameRate: 10,
      repeat: -1
  });

  platforms = this.physics.add.staticGroup();
  platforms.create(400, 568, 'ground').setScale(2).refreshBody();
  platforms.create(600, 400, 'ground');
  platforms.create(50, 250, 'ground');
  platforms.create(750, 220, 'ground');

  this.physics.add.collider(player, platforms);

}

function update (){
  cursors = this.input.keyboard.createCursorKeys();
    if (cursors.left.isDown)
  {
    // console.log("i tried to move left")
      player.setVelocityX(-160);

      player.anims.play('left', true);
  }
  else if (cursors.right.isDown)
  {
    // console.log("i tried to move right")
      player.setVelocityX(160);

      player.anims.play('right', true);
  }
  // else
  // {
  //     player.setVelocityX(0);
  //     //
  //     // player.anims.play('turn');
  // }
  else if (cursors.left.isUp){
    console.log("hi")
    player.setVelocityX(0);
    player.anims.play('turnLeft', true);
  }
  else if (cursors.right.isUp){
    player.setVelocityX(0);
    player.anims.play('turnRight', true);
  }
  if (cursors.up.isDown && player.body.touching.down)
  {
     // console.log("i tried to jump")
      player.setVelocityY(-330);
  }
}
