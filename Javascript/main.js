var game = new Game();

$(document).ready(function() {
  $("#saveSetUp").click(function() {
    game.setUp();
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
