/*
Only two users can play at the same time.
Both players pick either rock, paper or scissors. After the players make their selection, the game will tell them whether a tie occurred or if one player defeated the other.
The game will track each player's wins and losses.
Throw some chat functionality in there! No online multiplayer game is complete without having to endure endless taunts and insults from your jerk opponent.
Styling and theme are completely up to you. Get Creative!
Deploy your assignment to Github Pages.
*/

/******************OBJECTS********************** */
function Player(name, id) {
    this.name = name;
    this.id = id;
    this.score = 0;
    this.myTrun = false;
}

function Game(id, player1, player2) {
    this.chat = "";
    this.id = id;
    this.player1 = player1;
    this.player2 = player2;
}

Game.prototype.addChat = function (playerName, text) {
    this.chat += "<br/> [" + playerName + "] " + text;
}

/*************************************************** */

var thisGame;
var playerOne;
var playerTwo;

var game = new Game("1", new Player("jim", 1), new Player("Jow", 2));

database.ref().set({
    Game: game
});

