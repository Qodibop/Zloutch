// @ts-check

var throwCombination = [];
var numberOfDice = 5;
var throwScore = 0;
var roundScore = 0;
var minToPay = 500;

// --- Constructor to build a player ---

var Player = function(name, pictureId) {
  this.name = name;
  this.pic = pictureId;
  this.firstThrow = 0; // egal au finalScore du 1st round.
  this.throwScore = 0;
  this.throwCombination = [];
  this.finalScore = 0; // cannot end by 50.
  this.tableScores = [];
  this.penalty = 0; // max = 3; increment when finalScore = 0. when = 3 --> this.tableScores.pop()1
  this.round = 0; // count the number of turn, will be used for firstThrow.
};

// --- Method dice ---

Player.prototype.throwDice = function() {
  for (var i = 0; i < numberOfDice; i++) {
    this.throwCombination.push(Math.floor(Math.random() * 6 + 1));
  }
  console.log(this.throwCombination);
};

// --- Method checking each Player's round ---

Player.prototype.validateDice = function() {
  if (this.round === 0) {
    Player.throwDice();
    this.firstThrow = this.throwScore;
    if (this.firstThrow >= minToPay) {
      if (this.throwScore % 100 === 0) {
        this.finalScore += this.throwScore;
        this.tableScores.push(this.finalScore);
        this.round++;
        this.throwScore = 0;
      } else {
        console.log(
          "You cannot finish a round with a score ending by 50! Be brave and bet again!!"
        );
      }
    } else if (this.firstThrow < minToPay) {
      this.finalScore = 0;
      console.log(
        "Pass your turn, you haven't paid the due price to be granted to play"
      );
    }
  } else if (this.round >= 1) {
    if (this.throwScore % 100 === 0 && this.penalty < 3) {
      this.finalScore += this.throwScore;
      this.tableScores.push(this.finalScore);
      this.round++;
      this.throwScore = 0;
    } else if (this.penalty === 3) {
      console.log(
        "You received 3 penalties. Your lost your last plunder and must pass your turn."
      );
      this.tableScores.pop();
      this.penalty = 0;
      this.round++;
      this.throwScore = 0;
    } else {
      console.log(
        "You cannot finish a round with a score ending by 50! Be brave and bet again!!"
      );
    }
  }
};

/* ---Method to apply penalty--- */

Player.prototype.incrementPenalty = function() {
  if (this.firstThrow >= minToPay && this.throwScore === 0) {
    this.penalty++;
    this.round++;
    this.throwScore = 0;
    console.log("Pass your turn, you aren't brave enought to play this round.");
  }
};

// --- Dice values repartition by their frequence ---

var combinaison = [];
var countRecurrence = {};
Player.prototype.dispatchPoints = function() {
  for (var i = 0; i < this.throwCombination.length; i++) {
    if (!combinaison.includes(this.throwCombination[i])) {
      combinaison.push(this.throwCombination[i]);
      countRecurrence[this.throwCombination[i]] = 1;
    } else {
      countRecurrence[this.throwCombination[i]] += 1;
    }
  }
  return countRecurrence;
};
dispatchPoints();
console.log(countRecurrence);

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
  var dieNum = Object.keys(countRecurrence);
  var isSuite = suite();
  if (isSuite === true) {
    throwScore = 1500;
  } else if (isSuite === false) {
    for (var i = 0; i < dieNum.length; i++) {
      var number = Number(dieNum[i]); // NE PAS OUBLIER LA FONCTION Number() A APPLIQUER A dieNum()
      var frequence = countRecurrence[dieNum[i]];
      if (frequence === 5) {
        if (number === 1) {
          throwScore += brelan(10) * 4;
        } else {
          throwScore += brelan(number) * 4;
        }
      } else if (frequence === 4) {
        if (number === 1) {
          throwScore += brelan(10) * 2;
        } else {
          throwScore += brelan(number) * 2;
        }
      } else if (frequence === 3) {
        if (number === 1) {
          throwScore += brelan(10);
        } else {
          throwScore += brelan(number);
        }
      } else if (frequence === 2) {
        if (
          countRecurrence[dieNum[i - 1 % dieNum.length]] === 3 ||
          countRecurrence[dieNum[i + 1 % dieNum.length]] === 3
        ) {
          if (number === 1) {
            throwScore += 10 * 50;
          } else if (number !== 1) {
            throwScore += 50 * number;
          }
        } else {
          if (number === 1) {
            throwScore += 100 * frequence;
          } else if (number === 5) {
            throwScore += 50 * frequence;
          }
        }
      } else if (frequence < 2) {
        if (number === 1) {
          throwScore += 100 * frequence;
        } else if (number === 5) {
          throwScore += 50 * frequence;
        }
      }
    }
  }

  return throwScore;
};

countPoint();
console.log(throwScore);
