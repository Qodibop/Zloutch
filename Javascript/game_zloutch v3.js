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

var combinaison = [];
var countRecurrence = {};
var dispatchPoints = function() {
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
console.log(countRecurrence);
console.log(Object.values(countRecurrence));
console.log(Object.keys(countRecurrence));

// ----Jusqu'ici CODE BON ----

// --- Bosser sur la repartition des points en fonction du resultat consolidé dans countRecurrence ---

// ---assigniation des points---

var countPoint = function() {
  for (var i = 0; i < combinaison.length; i++) {
    //   vas dans combinaison: chaque index est la key dans l'objet countRecurrence. Retourne les valeurs de chaque key et compare les a l'assignateur de point.
    if (countRecurrence[throwCombi[i]] === 5) {
      return throwCombi[i];
    } else if (countRecurrence[throwCombi[i]] === 4) {
      return Player.Carre(throwCombi[i]);
    } else {
      return "aiejin";
    }
  }
};
countPoint();

// // var Brelant = function(dieBrelant) {
//   if (dieBrelant === 1) {
//     throwScore = 1000;
//   } else {
//     throwScore = dieBrelant * 100;
//   }
// };

// ..
// ..

// ----END OF THE CODE-----

Player.prototype.countingRules = function() {
  if (firstThrow >= minToPay) {
    return finalScore.push(finalScore);
  } else if (penalty === 3) {
    var i = finalScore.length;
    finalScore = finalScore[i - 1];
  }
};

// if (firstThrow >= minToPay) {
//     switch (this.throwCombi){
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
