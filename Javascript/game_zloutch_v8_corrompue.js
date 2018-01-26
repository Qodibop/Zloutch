// @ts-check

var throwCombination = [];
var numberOfDice = 5;
var throwScore = 0;
var roundScore = 0;
var minToPay = 0;
// --- Fonction dice ---

var throwDice = function() {
  for (var i = 0; i < numberOfDice; i++) {
    throwCombination.push(Math.floor(Math.random() * 6 + 1));
  }
  console.log(throwCombination);
};

throwDice();

// --- Répartition des points ainsi que de leur fréquences---

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
// console.log(Object.values(countRecurrence)); // --> return an Array of the dice's values frequences;
// console.log(Object.keys(countRecurrence)); // --> return an Array of the dice's values /!\ it's in a string format;

/* ---assigniation des points--- */

var brelan = function(x) {
  return x * 100;
};

var suite = function() {
  var numToString = throwCombination.sort();
  var b = numToString.toString();
  if (b === "1,2,3,4,5" || b === "2,3,4,5,6") {
    return true;
  } else {
    return false;
  }
};

var countPoint = function() {
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