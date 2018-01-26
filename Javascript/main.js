var minToPlayGame = 0;
var targetToWinGame = 0;

var setUp = function() {
  numberOfPlayers = parseInt($("#menuSetUpPlayers").val());
  minToPlayGame = parseInt($("#menuSetUpminToPlay").val());
  targetToWinGame = parseInt($("#menuSetUptargetToWin").val());
};

var game = new Game(minToPlayGame, 10000, [
  "Balckbeard",
  "Jack Sparrow",
  "Barbarossa",
  "Lady Mary Killigrew",
  "Jacquotte Delahaye",
  "Anne Dieu-le-Veut"
]);

$(document).ready(function() {
  $("#saveSetUp").click(function() {
    setUp();
  });

  $("#btnPlay").click(function() {
    game.play();
  });

  $("#btnCashIn").click(function() {
    game.cashIn();
  });
});

Player.prototype.updateTableScores = function() {
  if (this.name === "Balckbeard") {
    this.creatTr();
  }
  var scoreToPut = this.finalScore;
  var rowSelector = "#r" + this.round;
  $(rowSelector).append("<td>" + scoreToPut + "</td>");
};

Player.prototype.creatTr = function() {
  var idTr = "<tr id=r" + this.round + "></tr>";
  $("#tableScoresBody").append(idTr);
};
