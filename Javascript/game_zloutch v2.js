var throwCombination = [];
var numberOfDice = 5;
var throwScore = 0;

var throwDice = function() {
  for (var i = 0; i < numberOfDice; i++) {
    throwCombination.push(Math.floor(Math.random() * 6 + 1));
  }
  console.log(throwCombination);
  return throwCombination;
};

throwDice();

var dispatchPoints = function() {
  var combinaison = [];
  var countRecurrence = {};

  for (var i = 0; i < throwCombination.length; i++) {
    if (!combinaison.includes(throwCombination[i])) {
      combinaison.push(throwCombination[i]);
      countRecurrence[throwCombination[i]] = 1;
    } else {
      countRecurrence[throwCombination[i]] += 1;
    }
  }
  return countRecurrence;
};
dispatchPoints();

// ----Jusqu'ici CODE BON ----

// --- Bosser sur la repartition des points en fonction du resultat consolidé dans countRecurrence ---

DispatchPoints.prototype.Carre = function(dieCarre) {
  return (this.throwScore += Brelant(dieCarre) * 2);
};

DispatchPoints.prototype.Yam = function(dieYam) {
  return (this.throwScore += Brelant(dieYam) * 4);
};

DispatchPoints.prototype.Brelant = function(dieBrelant) {
  if (dieBrelant === 1) {
    this.throwScore = 1000;
  } else {
    this.throwScore = dieBrelant * 100;
  }
};

DispatchPoints.prototype.countPoint = function() {
  for (var i = 0; i < throwCombination.length; i++) {
    if (this.countRecurrence[throwCombination[i]] === 5) {
      return Player.Yam(throwCombination[i]);
    } else if (this.countRecurrence[throwCombination[i]] === 4) {
      return Player.Carre(throwCombination[i]);
    } else {
      return "aiejin";
    }
  }
};
dispatchPoints.countPoint();

// ----END OF THE CODE-----

Player.prototype.countingRules = function() {
  if (this.firstThrow >= minToPay) {
    return finalScore.push(finalScore);
  } else if (this.penalty === 3) {
    var i = this.finalScore.length;
    this.finalScore = this.finalScore[i - 1];
  }
};

// if (this.firstThrow >= minToPay) {
//     switch (this.throwCombination){
// case

//     }
//       for (var i = 0; i<= dice.length; i++)
//     if (dice[i] === 1) {
//       this.throwScore += 100;
//     } else if (dice[i] === 5) {
//       this.throwScore += 100;
//     } else {
//       this.throwScore += 0;
//     }
//   };

//   Player.prototype.Brelant = function(dieBrelant) {
//       if (dieBrelant === 1) {
//           this.throwScore = 1000;
//         } else {
//           this.throwScore = dieBrelant * 100;
//   };

//   Player.prototype.Carre = function(dieCarre) {
//     return this.throwScore += Brelant(dieCarre) * 2;
//   };

//   Player.prototype.Yam = function(dieYam) {
//     return this.throwScore += Brelant(dieYam) * 4;
//   };

//   Player.prototype.Suite = function() {
//     return this.throwScore += 1500;
//   };

//   Player.prototype.Full = function(dieBrelant, diePair) {
//     return this.throwScore += (Brelant(dieBrelant) + (diePair * 50));
//   };

//   Player.prototype.throwDice = function() {
//     for (var i = 0; i < numberOfDice; i++) {
//       this.throwCombination.push(Math.floor(Math.random() * 7));
//     }
//     return this.throwCombination;
//   };
