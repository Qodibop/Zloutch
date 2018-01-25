var game = new Game(0, 10000, ["Arthur", "Michael"]);

$(document).ready(function() {
  $("#btnPlay").click(function() {
    game.play();
    updateBoard();
  });

  $("#btnCashIn").click(function() {
    updateTableScores();
  });
});

var updateTableScores = function() {};
