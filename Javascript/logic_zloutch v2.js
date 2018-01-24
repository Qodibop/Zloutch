var minToPay = 500;
var throwCombi = [];
var numberOfDice = 5;

var Player = function(name, pictureId, firstThrow) {
  this.name = name;
  this.pic = pictureId;
  this.firstThrow = 0;
  this.throwScore = 0;
  this.throwCombi = [];
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
    this.throwCombi.push(Math.floor(Math.random() * 7));
  }
  return this.throwCombi;
};
player.throwDice();

Player.prototype.countPoints = function() {
    var combinaison = [];
    var countRecurrence = {};
  
    for (var i = 0; i < this.throwCombi.length; i++) {
      if (!combinaison.includes(his.throwCombi[i])) {
        combinaison.push(his.throwCombi[i]);
        countRecurrence[his.throwCombi[i]] = 1;
      } else {
        countRecurrence[his.throwCombi[i]] += 1;
      }
    }
    switch (countRecurrence[throwCombination[i]]) {
        case 5:
          return Player.Yam();
          break;
        case 4:
          return Player.Carre();
          break;
        case 3 || 2:
          return Player.Full();
          break;
        case 3:
          return Player.Brelant();
          break;
      }
        
  };
  
  player.countPoint();