// @ts-check

// --- Constructor to build a game ---

var Game = function() {
  this.minToPlay = 0;
  this.targetToWin = 1000;
  this.currentTurn = 0;
  this.playersNames = [
    "Balckbeard",
    "Jacquotte Delahaye",
    "Charles Vane",
    "Ching Shih",
    "Barbarossa",
    "Grace O'Malley"
  ];
  this.numberOfPlayers = 0;
  this.players = [];
};

function checkDice(dice) {
  if (document.getElementById(dice).checked) {
    return true;
  } else {
    return false;
  }
}

Game.prototype.setUp = function() {
  this.numberOfPlayers = parseInt($("#menuSetUpPlayers").val());
  this.minToPlay = parseInt($("#menuSetUpminToPlay").val());
  this.targetToWin = parseInt($("#menuSetUptargetToWin").val());
  this.setUpPlayers();
  this.makeHeaderTableScores();
};

Game.prototype.setUpPlayers = function() {
  for (var i = 0; i < this.numberOfPlayers; i++) {
    this.players.push(new Player(this.playersNames[i], this.minToPlay));
  }
};

Game.prototype.play = function() {
  this.players[this.currentTurn].play();
};

Game.prototype.cashIn = function() {
  this.players[this.currentTurn].cashIn();
  if (this.players[this.currentTurn].finalScore >= this.targetToWin) {
    $("#dialogBox").text(
      this.players[this.currentTurn].name +
        " won the jackpot and becomes the Master of the 7 Seas! Aäääaar VICTORY!!!"
    );
  }
  if (this.currentTurn === this.players.length - 1) this.currentTurn = 0;
  else this.currentTurn++;
};

// --- Constructor to build a player ---

var Player = function(name, minToPlay) {
  this.numberOfDice = 0;
  this.name = name;
  this.firstThrow = 0; // equal to finalScore at the end of round 0.
  this.throwScore = 0; // sum of the scores made during a round by the Player after throwing dice.
  this.throwCombination = []; // dice combinations during Player's round.
  this.finalScore = 0; // final score of the round: cannot end with 50. this.finalScore += this.throwScore.
  this.tableScores = []; // table of Player's scores.
  this.penalty = 0; // max = 3; increment when finalScore = 0. when = 3 --> this.tableScores.pop()1
  this.round = 0; // count the number of turn, will be used for firstThrow.
  this.throwCombinationSummary = []; // Array contening only one value per same dice values.
  this.countRecurrence = {}; //Dice values disoached by their frequence.
  this.minToPlay = minToPlay;
  this.sumScoresPerRound = 0; //compile the score after each throw in the same round;
};

// --- Method dice ---

Player.prototype.countActiveDice = function() {
  this.numberOfDice = 0;
  checkDice("die1") === true ? this.numberOfDice++ : 0;
  checkDice("die2") === true ? this.numberOfDice++ : 0;
  checkDice("die3") === true ? this.numberOfDice++ : 0;
  checkDice("die4") === true ? this.numberOfDice++ : 0;
  checkDice("die5") === true ? this.numberOfDice++ : 0;
  console.log(this.numberOfDice);
};

Player.prototype.throwDice = function() {
  this.countActiveDice();
  var that = this;
  $(".dice2 input:checked").each(function(i, el) {
    var num = Math.floor(Math.random() * 6 + 1);
    $(el)
      .parent()
      .find("p")
      .text(num);
    that.throwCombination.push(num);
  });
};

// --- Method checking each Player's round ---

Player.prototype.validateDice = function() {
  if (this.round === 0) {
    this.firstThrow = this.sumScoresPerRound;
    if (this.firstThrow >= this.minToPlay) {
      // if (this.sumScoresPerRound % 100 === 0) {
      this.finalScore += this.sumScoresPerRound;
      this.tableScores.push(this.finalScore);
      this.round++;
      // } else {
      //   alert(
      //     "Aaaar! You cannot finish a round with a score ending with 50! Be brave me hearty and bet again!!"
      //   );
      // }
    } else if (this.firstThrow < this.minToPlay) {
      this.finalScore = 0;
      this.round++;
      $("#dialogBox").text(
        "You haven't paid " +
          this.minToPlay +
          " Pieces of Eight as piracy fee to join the adventure! Cash In and Pass your turn."
      );
    }
  } else {
    this.finalScore += this.sumScoresPerRound;
    this.tableScores.push(this.finalScore);
    this.round++;
  }
};
// } else if (this.round >= 1) {
//   if (this.throwScore % 100 === 0 && this.penalty < 3) {
//     this.finalScore += this.throwScore;
//     this.tableScores.push(this.finalScore);
//     this.round++;
//     this.throwScore = 0;
// } else if (this.penalty === 3) {
//   alert(
//     "You received 3 penalties. Your lost plunder is seized! Pass your turn."
//   );
//   this.tableScores.pop();
//   this.penalty = 0;
//   this.round++;
//   this.throwScore = 0;
// } else {
//   alert(
//     "Aaaar! You cannot finish a round with a score ending with 50! Be brave me hearty and bet again!!"
//   );
// }
// }

/* ---Method to apply penalty--- */

// Player.prototype.incrementPenalty = function() {
//   if (this.firstThrow >= this.minToPlay && this.throwScore === 0) {
//     this.penalty++;
//     this.round++;
//     this.throwScore = 0;
//     alert("Aaaar!Pass your turn, you aren't brave enought to play this round.");
//   }
// };

// --- Dice values repartition by their frequence ---

Player.prototype.dispatchPoints = function() {
  for (var i = 0; i < this.throwCombination.length; i++) {
    if (!this.throwCombinationSummary.includes(this.throwCombination[i])) {
      this.throwCombinationSummary.push(this.throwCombination[i]);
      this.countRecurrence[this.throwCombination[i]] = 1;
    } else {
      this.countRecurrence[this.throwCombination[i]] += 1;
    }
  }
  return this.countRecurrence;
};

/* --- function used as reference to calculate points --- */

var brelan = function(x) {
  return x * 100;
};

// --- method to check if it's a sequence ---

Player.prototype.suite = function() {
  var numToString = this.throwCombination.sort();
  var b = numToString.toString();
  if (b === "1,2,3,4,5" || b === "2,3,4,5,6") {
    return true;
  } else {
    return false;
  }
};

// --- method to assign points to the player ---

Player.prototype.countPoint = function() {
  this.dispatchPoints();
  var dieNum = Object.keys(this.countRecurrence);
  var isSuite = this.suite();
  if (isSuite === true) {
    this.throwScore = 1500;
  } else if (isSuite === false) {
    for (var i = 0; i < dieNum.length; i++) {
      var number = Number(dieNum[i]); // NE PAS OUBLIER LA FONCTION Number() A APPLIQUER A dieNum()
      var frequence = this.countRecurrence[dieNum[i]];
      if (frequence === 5) {
        if (number === 1) {
          this.throwScore += brelan(10) * 4;
        } else {
          this.throwScore += brelan(number) * 4;
        }
      } else if (frequence === 4) {
        if (number === 1) {
          this.throwScore += brelan(10) * 2;
        } else {
          this.throwScore += brelan(number) * 2;
        }
      } else if (frequence === 3) {
        if (number === 1) {
          this.throwScore += brelan(10);
        } else {
          this.throwScore += brelan(number);
        }
      } else if (frequence === 2) {
        if (
          this.countRecurrence[dieNum[i - 1 % dieNum.length]] === 3 ||
          this.countRecurrence[dieNum[i + 1 % dieNum.length]] === 3
        ) {
          if (number === 1) {
            this.throwScore += 10 * 50;
          } else if (number !== 1) {
            this.throwScore += 50 * number;
          }
        } else {
          if (number === 1) {
            this.throwScore += 100 * frequence;
          } else if (number === 5) {
            this.throwScore += 50 * frequence;
          }
        }
      } else if (frequence < 2) {
        if (number === 1) {
          this.throwScore += 100 * frequence;
        } else if (number === 5) {
          this.throwScore += 50 * frequence;
        }
      }
    }
  }

  return this.throwScore;
};

Player.prototype.updateBoard = function() {
  var points = this.sumScoresPerRound;
  if (this.throwScore === 0) {
    $("#dialogBox").text(
      "AAäääaaaââr!You didn't steal any Pieces of Eight! Shame on you!!    You lose your gain: Cash In and PASS YOUR TURN"
    );
  } else {
    $("#dialogBox").text("Score: " + points + " Pieces of Eight");
  }
};

Player.prototype.play = function() {
  this.throwDice();
  this.countPoint();
  this.sumScoreRound();
  console.log(this.throwCombination);
  console.log(this.countRecurrence);
  console.log(this.round);
  console.log(this.throwScore);
  console.log(this.finalScore);
  console.log(this.tableScores);
  this.throwCombinationSummary = [];
  this.throwCombination = [];
  this.countRecurrence = {};
};

Player.prototype.sumScoreRound = function() {
  if (this.throwScore === 0) {
    // $("#dialogBox").text(
    //   "AAäääaaaââr!You didn't steal any Pieces of Eight! Shame on you!!    You lose your gain: Cash In and PASS YOUR TURN"
    // );
    this.sumScoresPerRound = 0;
  } else {
    this.sumScoresPerRound += this.throwScore;
  }
  this.updateBoard();
  this.throwScore = 0;
};

Player.prototype.cashIn = function() {
  this.validateDice();
  this.updateTableScores();
  this.sumScoresPerRound = 0;
  $("#dialogBox").text("");
};
