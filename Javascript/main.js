var game = new Game(0, 10000, [
  "Player 1",
  "Player 2",
  "Player 3",
  "Player 4",
  "Player 5",
  "Player 6"
]);

//input fetch push them in array. This array then put instead of names.

$(document).ready(function() {
  $("#btnPlay").click(function() {
    game.play();
  });

  $("#btnCashIn").click(function() {
    updateTableScores();
  });
});

Player.prototype.updateTableScores = function() {
  if (this.name === "Player 1") {
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
