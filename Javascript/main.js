var game = new Game();

$(document).ready(function() {
  $("#newGame").click(function() {
    location.reload();
  });

  $("#saveSetUp").click(() => {
    $("#saveSetUp").toggleClass("green");
    $(".dice").prop("checked", true);
    game.setUp();
  });

  $("#btnPlay").click(function() {
    game.play();
  });

  $("#btnCashIn").click(function() {
    game.cashIn();
    $(".dice").prop("checked", true);
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

Game.prototype.makeHeaderTableScores = function() {
  for (var i = 0; i < this.numberOfPlayers; i++) {
    $("#rhplayerName").append("<th><h6>" + this.playersNames[i] + "</h6></th>");
  }
};
