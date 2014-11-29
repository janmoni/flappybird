var score = 0;
var player;
var pipes;

// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };


// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(790, 400, Phaser.AUTO, 'game', stateActions);

/*
 * Loads all resources for the game and gives them names.
 */
function preload() {
    game.load.image("playerImg", "assets/flappy.png");
    game.load.image("pipe", "assets/pipe.png");
    game.load.audio("score", "assets/point.ogg");

}

/*
 * Initialises the game. This function is only called once.
 */
function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.stage.setBackgroundColor("#FFFFFF");
    //game.add.text(300, 180, "Hammer!", {font: "40px helvetica", fill: "#000000"});
    //game.add.sprite(730, 10, "playerImg");

    /*
    var x = 10;
    var y = 100;
    */

    player = game.add.sprite(80, 100, "playerImg");

    //generate_pipe();
    game.time.events.loop(1.75*Phaser.Timer.SECOND, generate_pipe)

    game.physics.arcade.enable(player);
    //player.body.velocity.x = 100;
    //player.body.velocity.y = -50;
    player.body.gravity.y = 600

    pipes = game.add.group();

    game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(player_jump);

    /*
    game.input.onDown.add(clickHandler);
    game.input.keyboard.addKey(Phaser.Keyboard.LEFT).onDown.add(moveLeft);
    game.input.keyboard.addKey(Phaser.Keyboard.RIGHT).onDown.add(moveRight);
    game.input.keyboard.addKey(Phaser.Keyboard.UP).onDown.add(moveUp);
    game.input.keyboard.addKey(Phaser.Keyboard.DOWN).onDown.add(moveDown);

     */

}

function game_over() {
    alert(score - 2);
    //game.paused = true;
    location.reload();
}


function generate_pipe() {
    changeScore();
    //for (var pop = 1; pop <=3; pop++){
        var gap_start = game.rnd.integerInRange (1, 5);
        for (var count = 0; count <= 7; count++) {
        if (count != gap_start && count != gap_start +1) {
            //game.add.sprite(pop * 200, count * 50, "pipe");
            add_pipe_part(800, 50 * count, "pipe");
        }
    }
    //}
}

function add_pipe_part(x, y, pipe_part) {
    var pipe =pipes.create(x, y, pipe_part);
    game.physics.arcade.enable(pipe);
    pipe.body.velocity.x= -300
}


/*
function moveRight () {
    player.x += 10;
}

function moveLeft () {
    player.x -= 10;
}

function moveUp () {
    player.y = player.y - 10;
}

function moveDown () {
    player.y = player.y + 10;
}
/*


/*
 * This function updates the scene. It is called for every new frame.
 */
function update() {
    game.physics.arcade.overlap(player,pipes,game_over);

}


function changeScore() {
    score = score + 1;
}


function clickHandler(event) {
    //alert(event.x + ":" + event.y);
    game.add.sprite(event.x, event.y, "playerImg");
    game.sound.play("score");
}


function player_jump() {
    player.body.velocity.y = -200;
}



function spaceHandler(event) {
    game.sound.play("score");
}