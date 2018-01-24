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

// --- Bosser sur la repartition des points en fonction du resultat consolidé dans countRecurrence ---

// ---assigniation des points---
var Brelant = function(x) {
  return x * 100;
};

var countPoint = function() {
  var numFrequency = Object.values(countRecurrence);
  var dieNum = Object.keys(countRecurrence);
  for (var i = 0; i < numFrequency.length; i++) {
    if (numFrequency[i] === 5) {
      if (dieNum[i] === 1) {
        throwScore += Brelant(10) * 4;
      } else {
        throwScore += Brelant(dieNum[i]) * 4;
      }
    } else if (numFrequency[i] === 4) {
      if (dieNum[i] === 1) {
        throwScore += Brelant(10) * 2;
      } else {
        return (throwScore += Brelant(dieNum[i]) * 2);
      }
    } else if (numFrequency[i] === 3) {
      if (dieNum[i] === 1) {
        throwScore += Brelant(10);
      } else {
        return (throwScore += Brelant(dieNum[i]));
      }
    }
  }
  return throwScore;
};

countPoint();

// NE PAS OUBLIER LA FONCTION Number() A APPLIQUER A dieNum(0) CAR POUR L INSTANT CELA RETOURNE DES STRINGS ET NON DES NUMBERS
// ----Jusqu'ici CODE BON ----
