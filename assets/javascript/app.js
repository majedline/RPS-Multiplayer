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
    this.move = "";
}

function Play(playerID, playerName, move) {
    this.playerID = playerID;
    this.playerName = playerName;
    this.move = move;
}



/*************************************************** */
var player;
var thePlay;
var myTurn = true;

/*************************************************** */
var playerCreated = false;
$("#start-button").on("click", function () {
    if (!playerCreated) {
        var pname = ($("#name-keyword").val().trim());
        if (pname.length > 0) {
            player = new Player(pname, pname + Date.now() + "");
        } else {
            var p = "Player-" + Date.now();
            player = new Player(p, p);
        }
        console.log("Player set: " + JSON.stringify(player));

        $("#name-keyword").addClass("disabled");
        $("#start-button").addClass("disabled");
        $("#connect-to-new-game-msg2").text("Welcome: " + player.name);
        playerCreated = true;
    }

});
/*************************************************** */
$("#send-button").on("click", chatClickHandler);

// press enter
$(document).ready(function (event) {
    if (event.keyCode == 13) {
        $("#chat-text").keypress(chatClickHandler);
    }
});

function chatClickHandler() {
    if (playerCreated) {

        var chatText = $("#chat-text").val().trim();

        database.ref().push(
            {
                play: {
                    action: "chat",
                    playerID: player.id,
                    playerName: player.name,
                    chatText: chatText
                }
            });
    }
}

/******************RPS Clicks**************************** */
$("#R-play").on("click", function () {
    addPlay("R", $("#R-img").attr("src"));
});

$("#P-play").on("click", function () {
    addPlay("P", $("#P-img").attr("src"));
});

$("#S-play").on("click", function () {
    addPlay("S", $("#S-img").attr("src"));
});

function addPlay(playStr, imgURL) {
    if (playerCreated && myTurn) {

        var p = new Play(player.id, player.name, playStr);
        thePlay = {
            play: {
                action: "play",
                playerID: player.id,
                playerName: player.name,
                playerMove: playStr,
                playerMoveImage: imgURL
            }
        };

        database.ref().push(thePlay);
        myTurn = false;
    }
}

/*************************************************** */
database.ref().on("child_added", function (snapshot) {

    if (playerCreated) {
        var play = snapshot.val().play;

        if (play.action === "chat") {
            var txt = "[" + play.playerName + " chat] " + play.chatText + "<br/>";
            $("#chat-area").append($("<div>").html(txt));

        } else if (play.action === "play") {
            var txt = "[" + play.playerName + " played]  ===>" + play.playerMove + "<br/>";
            $("#chat-area").append($("<div>").html(txt));

            if (thePlay != null) {
                console.log("thePlay: " + JSON.stringify(thePlay.play));
                console.log("play: " + JSON.stringify(play));


                if (thePlay.play.playerID != play.playerID) {

                    var state =
                    {
                        play: {
                            action: "state",
                            playerID: "Game",
                            playerName: "Game",
                            chatText: ""
                        }
                    };

                    if (thePlay.play.playerMove === play.playerMove) { state.play.chatText = "**** tie ****"; }
                    if (thePlay.play.playerMove === "R" && play.playerMove === "P") { state.play.chatText = ("**** " + play.playerName + "  wins ****"); }
                    if (thePlay.play.playerMove === "R" && play.playerMove === "S") { state.play.chatText = ("**** " + thePlay.play.playerName + "  wins ****"); }
                    if (thePlay.play.playerMove === "P" && play.playerMove === "S") { state.play.chatText = ("**** " + play.playerName + "  wins ****"); }
                    if (thePlay.play.playerMove === "P" && play.playerMove === "R") { state.play.chatText = ("**** " + thePlay.play.playerName + "  wins ****"); }
                    if (thePlay.play.playerMove === "S" && play.playerMove === "R") { state.play.chatText = ("**** " + play.playerName + "  wins ****"); }
                    if (thePlay.play.playerMove === "S" && play.playerMove === "P") { state.play.chatText = ("**** " + thePlay.play.playerName + "  wins ****"); }

                    database.ref().push(state);

                }
            }

        } else if (play.action === "state") {
            var txt = "[" + play.playerName + " chat] " + play.chatText + "<br/>";
            $("#chat-area").append($("<div>").html(txt));

            thePlay = null;
            play = null;
            myTurn = true;

        }
    }
}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);

});

/*************************************************** */


/************************ */
function getWinner(p1, p2) {

    if (thePlay.playerMove === play.playerMove) $("#chat-area").append($("<div>").html("**** tie ****"));
    if (thePlay.playerMove === "R" && play.playerMove === "P") $("#chat-area").append($("<div>").html("**** Other player wins ****"));
    if (thePlay.playerMove === "R" && play.playerMove === "S") $("#chat-area").append($("<div>").html("**** You win ****"));
    if (thePlay.playerMove === "P" && play.playerMove === "S") $("#chat-area").append($("<div>").html("**** Other player wins ****"));
    if (thePlay.playerMove === "P" && play.playerMove === "R") $("#chat-area").append($("<div>").html("**** You win ****"));
    if (thePlay.playerMove === "S" && play.playerMove === "R") $("#chat-area").append($("<div>").html("**** Other player wins ****"));
    if (thePlay.playerMove === "S" && play.playerMove === "P") $("#chat-area").append($("<div>").html("**** You win ****"));

}
