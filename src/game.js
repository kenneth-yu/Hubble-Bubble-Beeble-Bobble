var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload ()
{
  this.load.spritesheet('dude', '../images/dude.png', 32, 48);
  this.load.image('background', '../images/background2.png');
  // this.load.image('gr', 'assets/platform.png')
  // this.load.image('star', 'assets/star.png');
}

function create ()
{
  // this.add.image(400, 300, 'background');
  bg = this.add.tileSprite(0, 0, 1600, 1200, 'background');
  player = this.add.sprite(32,320,'dude');

}

function update ()
{
}
