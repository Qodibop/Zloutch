var throwCombination = [];
var numberOfDice = 5;
var throwScore = 0;

// --- Fonction dé ---

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

var Brelant = function(x) {
  return x * 100;
};

var countPoint = function() {
  var numFrequency = Object.values(countRecurrence);
  var dieNum = Object.keys(countRecurrence);
  for (var i = 0; i < numFrequency.length; i++) {
    if (numFrequency[i] === 5) {
      if (Number(dieNum[i]) === 1) {
        return (throwScore += Brelant(10) * 4);
      } else {
        return (throwScore += Brelant(dieNum[i]) * 4);
      }
    } else if (numFrequency[i] === 4) {
      if (Number(dieNum[i]) === 1) {
        return (throwScore += Brelant(10) * 2);
      } else {
        return (throwScore += Brelant(dieNum[i]) * 2);
      }
    } else if (numFrequency[i] === 3) {
      if (Number(dieNum[i]) === 1) {
        return (throwScore += Brelant(10));
      } else {
        return (throwScore += Brelant(dieNum[i]));
      }
    } else if (numFrequency[i] === 1) {
      if (Number(dieNum[i]) === 1) {
        return (throwScore += 100);
      } else if (Number(dieNum[i]) === 5) {
        return (throwScore += 50);
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

// Il y a un bug avec les ifs car des qu une condition est validé ils skeep les autres et donc pas d adition de points. CHecker la fonction forEach().
// Il semblerait que le problème survient quand il y a un 1.
// Créer l'assigniation quand on a un Full.
//
