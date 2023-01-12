//Global Variables:
let healthPool = 10;
let chosenWord = "";
let correctLetters = [];

//DOM References:
let hiddenWord = document.getElementById("hidden-word");
let hp = document.getElementById("life");
let gameOverBanner = document.getElementById("game-over-banner");

function displayNewWord(category) {
  chosenWord = category[Math.floor(Math.random() * films.length)];

  let splitArray = chosenWord.split("");
  let _array = [];

  for (let i = 0; i < splitArray.length; i++) {
    if (splitArray[i] === "-") {
      _array.push("- ");
    } else _array.push("_ ");
  }

  let obscuredWord = _array.join("");
  hiddenWord.innerHTML = obscuredWord;
}

function keepTrackOfGuessedLetters(input) {
  let chosenWordArray = chosenWord.split("");

  if (chosenWordArray.includes(input)) {
    correctLetters.push(input);
  }
}

function revealLetter(key) {
  let strArray = chosenWord.split("");
  let hiddenWordArray = [];

  strArray.forEach((letter) => {
    if (letter == key) {
      hiddenWordArray.push(letter + " ");
    } else if (letter !== "-" && correctLetters.includes(letter)) {
      hiddenWordArray.push(letter + " ");
    } else if (letter === "-") {
      hiddenWordArray.push("- ");
    } else {
      hiddenWordArray.push("_ ");
    }
  });

  let updatedHiddenWord = hiddenWordArray.join("");
  hiddenWord.innerText = updatedHiddenWord;
}

function disableKey(key) {
  key.disabled = true;
}

function loseLife(input) {
  if (!correctLetters.includes(input)) {
    healthPool--;
  }

  if (healthPool === 0) {
    gameOver();
  }

  hp.innerText = `${healthPool}/10`;
}

function gameOver() {
  gameOverBanner.style.visibility = "visible";
}

function restart() {
  gameOverBanner.style.visibility = "hidden";
  document.getElementById("game-banner-message").innerText = "GAME OVER!";
  healthPool = 10;
  displayNewWord(films);
  correctLetters = [];
  hp.innerText = `${healthPool}/10`;
  for (let i = 0; i < keys.length; i++) {
    keys[i].disabled = false;
  }
}

function winGame() {
  let hiddenWordArray = hiddenWord.innerHTML.split("");

  if (!hiddenWordArray.includes("_")) {
    document.getElementById("game-banner-message").innerText = "Well Done!";
    gameOverBanner.style.visibility = "visible";
  }
}

module.exports = {
  displayNewWord,
  keepTrackOfGuessedLetters,
  revealLetter,
  disableKey,
  loseLife,
  gameOver,
  restart,
  winGame,
};
