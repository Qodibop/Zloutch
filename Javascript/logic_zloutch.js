var minToPay = 500;
var throwCombination = [];
var numberOfDice = 5;

var Player = function(name, pictureId, firstThrow) {
  this.name = name;
  this.pic = pictureId;
  this.firstThrow = 0;
  this.throwScore = 0;
  this.throwCombination = [];
  this.finalScore = [];
  this.penalty = 0;
};

Player.prototype.countingRules = function() {
  if (this.firstThrow >= minToPay) {
    return finalScore.push(finalScore);
  } else if ( this.penalty === 3){
      var i = this.finalScore.length; 
      this.finalScore = this.finalScore[i-1];
  }
};

Player.prototype.SingleDice = function(dice) {
    for (var i = 0; i<= dice.length; i++)
  if (dice[i] === 1) {
    this.throwScore += 100;
  } else if (dice[i] === 5) {
    this.throwScore += 100;
  } else {
    this.throwScore += 0;
  }
};

Player.prototype.Brelant = function(dieBrelant) {
    if (dieBrelant === 1) {
        this.throwScore = 1000;
      } else {
        this.throwScore = dieBrelant * 100;
};

Player.prototype.Carre = function(dieCarre) {
  return this.throwScore += Brelant(dieCarre) * 2;
};

Player.prototype.Yam = function(dieYam) {
  return this.throwScore += Brelant(dieYam) * 4;
};

Player.prototype.Suite = function() {
  return this.throwScore += 1500;
};

Player.prototype.Full = function(dieBrelant, diePair) {
  return this.throwScore += (Brelant(dieBrelant) + (diePair * 50));
};

Player.prototype.throwDice = function() {
  for (var i = 0; i < numberOfDice; i++) {
    this.throwCombination.push(Math.floor(Math.random() * 7));
  }
  return this.throwCombination;
};
