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
  this.load.spritesheet('dude', '../images/dude.png', { frameWidth: 32, frameHeight: 48 });
  this.load.image('background', '../images/background2.png');
}

function create ()
{
  bg = this.add.tileSprite(0, 0, 1600, 1200, 'background');
  player = this.add.sprite(32,320,'dude');

}

function update ()
{
}
