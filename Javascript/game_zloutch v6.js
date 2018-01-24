// @ts-check

var throwCombination = [];
var numberOfDice = 5;
var throwScore = 0;

// --- Fonction dice ---

var throwDice = function() {
  for (var i = 0; i < numberOfDice; i++) {
    throwCombination.push(Math.floor(Math.random() * 6 + 1));
  }
  console.log(throwCombination);
};

throwDice();

// --- Répartitin des points ainsi que de leur fréquences---

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

// ---assigniation des points---

var brelant = function(x) {
  return x * 100;
};

var countPoint = function() {
  var dieNum = Object.keys(countRecurrence);
  for (var i = 0; i < dieNum.length; i++) {
    var number = Number(dieNum[i]);
    var amount = countRecurrence[dieNum[i]];
    if (amount === 5) {
      if (number === 1) {
        throwScore += brelant(10) * 4;
      } else {
        throwScore += brelant(number) * 4;
      }
    } else if (amount === 4) {
      if (number === 1) {
        throwScore += brelant(10) * 2;
      } else {
        throwScore += brelant(number) * 2;
      }
    } else if (amount === 3) {
      if (number === 1) {
        throwScore += brelant(10);
      } else {
        throwScore += brelant(number);
      }
    } else if (amount <= 2) {
      if (number === 1) {
        throwScore += 100 * amount;
      } else if (number === 5) {
        throwScore += 50 * amount;
      }
    }
  }
  return throwScore;
};

countPoint();

// NE PAS OUBLIER LA FONCTION Number() A APPLIQUER A dieNum()

// ---- Jusqu'ici tout va bien ----

// non:voici ce qu'a retourné la console.

// [ 2, 6, 6, 1, 6 ]
// { 1: 1, 2: 1, 6: 3 }
// [ 1, 1, 3 ]
// [ '1', '2', '6' ]
// => 100

// [ 4, 4, 4, 1, 4 ]
// { 1: 1, 4: 4 }
// [ 1, 4 ]
// [ '1', '4' ]
// => 100

// [ 6, 3, 6, 6, 3 ]
// { 3: 2, 6: 3 }
// [ 2, 3 ]
// [ '3', '6' ]
// => NaN

// Il y a un bug avec les ifs car des qu une condition est validé ils skeep les autres et donc pas d adition de points. CHecker la fonction forEach().
// Il semblerait que le problème survient quand il y a un 1.
// Créer l'assigniation quand on a un Full.
//
