//
// var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });
//
//
// function preload() {
//
//     game.load.spritesheet('dude', 'assets/games/starstruck/dude.png', 32, 48);
//     game.load.image('background', '../image/background2.png');
//
// }
//
// var player;
// var facing = 'left';
// var jumpTimer = 0;
// var cursors;
// var jumpButton;
// var bg;
//
// function create() {
//
//     game.physics.startSystem(Phaser.Physics.ARCADE);
//
//     game.time.desiredFps = 30;
//
//     bg = game.add.tileSprite(0, 0, 800, 600, 'background');
//
//     game.physics.arcade.gravity.y = 250;
//
//     player = game.add.sprite(32, 32, 'dude');
//     game.physics.enable(player, Phaser.Physics.ARCADE);
//
//     player.body.bounce.y = 0.2;
//     player.body.collideWorldBounds = true;
//     player.body.setSize(20, 32, 5, 16);
//
//     player.animations.add('left', [0, 1, 2, 3], 10, true);
//     player.animations.add('turn', [4], 20, true);
//     player.animations.add('right', [5, 6, 7, 8], 10, true);
//
//     cursors = game.input.keyboard.createCursorKeys();
//     jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
//
// }
//
// function update() {
//
//     // game.physics.arcade.collide(player, layer);
//
//     player.body.velocity.x = 0;
//
//     if (cursors.left.isDown)
//     {
//         player.body.velocity.x = -150;
//
//         if (facing != 'left')
//         {
//             player.animations.play('left');
//             facing = 'left';
//         }
//     }
//     else if (cursors.right.isDown)
//     {
//         player.body.velocity.x = 150;
//
//         if (facing != 'right')
//         {
//             player.animations.play('right');
//             facing = 'right';
//         }
//     }
//     else
//     {
//         if (facing != 'idle')
//         {
//             player.animations.stop();
//
//             if (facing == 'left')
//             {
//                 player.frame = 0;
//             }
//             else
//             {
//                 player.frame = 5;
//             }
//
//             facing = 'idle';
//         }
//     }
//
//     if (jumpButton.isDown && player.body.onFloor() && game.time.now > jumpTimer)
//     {
//         player.body.velocity.y = -250;
//         jumpTimer = game.time.now + 750;
//     }
//
// }
//
// function render () {
//
//     game.debug.text(game.time.suggestedFps, 32, 32);
//
//     // game.debug.text(game.time.physicsElapsed, 32, 32);
//     // game.debug.body(player);
//     // game.debug.bodyInfo(player, 16, 24);
//
// }


var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    scene: {
        preload: preload,
        create: create
    }
};

var game = new Phaser.Game(config);

function preload ()
{
    // this.load.setBaseURL('');

    this.load.image('sky', 'http://labs.phaser.io/assets/skies/space3.png');
    this.load.image('logo', '../images/selectBlu.png');
    this.load.image('red', '../images/select');
}

function create ()
{
    this.add.image(400, 300, 'sky');

    var particles = this.add.particles('red');

    var emitter = particles.createEmitter({
        speed: 100,
        scale: { start: 1, end: 0 },
        blendMode: 'ADD'
    });

    var logo = this.physics.add.image(400, 100, 'logo');

    logo.setVelocity(10000, 100000);
    logo.setBounce(1, 1);
    logo.setCollideWorldBounds(true);

    emitter.startFollow(logo);
}
