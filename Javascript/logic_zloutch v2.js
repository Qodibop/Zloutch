// @ts-check

// --- Constructor to build a game ---

var Game = function(minToPlay, targetToWin, playersNames) {
  this.minToPlay = minToPlay;
  this.targetToWin = targetToWin;
  this.currentTurn = 0;
  this.playersNames = [
    "Player 1",
    "Player 2",
    "Player 3",
    "Player 4",
    "Player 5",
    "Player 6"
  ];

  this.players = [];
  for (var i = 0; i < playersNames.length; i++) {
    this.players.push(new Player(playersNames[i], this.minToPlay));
  }
};

function checkDice(dice) {
  if (document.getElementById(dice).checked) {
    return true;
  } else {
    return false;
  }
}

Game.prototype.play = function() {
  this.players[this.currentTurn].play();
};

Game.prototype.cashIn = function() {
  this.players[this.currentTurn].cashIn();
  if (this.players[this.currentTurn].finalScore >= this.targetToWin) {
    alert(
      this.players[this.currentTurn] +
        " is the Master of the Caribbean and won the jackpot!"
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
    this.firstThrow = this.throwScore;
    if (this.firstThrow >= this.minToPlay) {
      // if (this.throwScore % 100 === 0) {
      this.finalScore += this.throwScore;
      this.tableScores.push(this.finalScore);
      this.round++;
      this.throwScore = 0;
      // } else {
      //   alert(
      //     "Aaaar! You cannot finish a round with a score ending with 50! Be brave me hearty and bet again!!"
      //   );
      // }
    } else if (this.firstThrow < this.minToPlay) {
      this.finalScore = 0;
      this.round++;
      alert(
        "You haven't paid the " +
          this.minToPlay +
          " Pieces of Height as piracy fees to join the adventure! Pass your turn."
      );
    }
  } else {
    this.finalScore += this.throwScore;
    this.tableScores.push(this.finalScore);
    this.round++;
    this.throwScore = 0;
  }

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
};

/* ---Method to apply penalty--- */

// Player.prototype.incrementPenalty = function() {
//   if (this.firstThrow >= this.minToPlay && this.throwScore === 0) {
//     this.penalty++;
//     this.round++;
//     this.throwScore = 0;
//     alert("Pass your turn, you aren't brave enought to play this round.");
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
  var points = this.throwScore;
  $("#scoreBoard").text("Score: " + points + " Piece of Height");
};

Player.prototype.play = function() {
  this.throwDice();
  this.countPoint();
  this.updateBoard();
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

Player.prototype.cashIn = function() {
  this.validateDice();
  this.updateTableScores();
};
