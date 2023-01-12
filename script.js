// hint button does not change color on winround function

//Global Variables:
let healthPool = 10;
let chosenWord = "";
let correctLetters = [];
let score = 0;
let highestScore = 0;
let forfeit = false;
let hint = false;
let instructions = false;
let gameIsOver = false;
let gameWin = false;
let kategory = "Films";
let words = 18;

//DOM References:
let hiddenWord = document.getElementById("hidden-word");
let hp = document.getElementById("life");
let gameBanner = document.getElementById("game-banner");
let scoreRef = document.getElementById("score");
let highScore = document.getElementById("high-score");
let body = document.querySelector("body");
let hangman = document.getElementById("hangman");
let hangmanIMG = document.getElementById("image");
let instructionsRef = document.getElementById("instructions");

//nextWord button
let nextWordBtn = document.getElementById("nextWordBtn");
nextWordBtn.addEventListener("click", () => {
  document.getElementById("nextWordBtn").innerHTML = "Next Word";

  if (gameIsOver === true) {
    newGame();
    forfeited();
  } else if (gameWin === true) {
    newGame();
  } else {
    newRound();
  }

  if (instructions === true) {
    revealInstructions();
  }
});

//hint button
let hintBtn = document.getElementById("hintBtn");
hintBtn.addEventListener("click", () => {
  showHint();
});

//forfeit button
let forfeitBtn = document.getElementById("forfeit");
forfeitBtn.addEventListener("click", () => {
  gameOver();
  document.getElementById("game-banner-message").innerText =
    "Thanks for hanging around...";
  forfeit = true;

  if (instructions === true) {
    revealInstructions();
  }
});

//instructions button
let instructionsBtn = document.getElementById("instructionsBtn");
instructionsBtn.addEventListener("click", revealInstructions);

//instructions btn two
let instructionsBtnTwo = document.getElementById("instructionsBtnTwo");
instructionsBtnTwo.onclick = () => {
  revealInstructions();
};

//playGame button
let playGameBtn = document.getElementById("submitBtn");
playGameBtn.addEventListener("click", startGame);

//select
let selectOptions = document.getElementById("select");
selectOptions.addEventListener("change", (event) => {
  kategory = event.target.value;
  console.log(kategory);
});

//Alphabet-keys
let keys = document.getElementsByClassName("alphabet-keys");
for (let i = 0; i < keys.length; i++) {
  keys[i].addEventListener("click", () => {
    keepTrackOfGuessedLetters(keys[i].innerHTML, keys[i]);
    revealLetter(keys[i].innerHTML);
    disableKey(keys[i]);
    loseLife(keys[i].innerHTML);
    displayHangman();
    disableHintBtn();
    changeColor();
    winRound();
  });
}

//DATABASE for the game
let filmsData = [
  "harry-potter",
  "avatar",
  "pulp-fiction",
  "iron-man",
  "smile",
  "the-conjuring",
  "king-kong",
  "godzilla",
  "alien",
  "dune",
  "joker",
  "the-nice-guys",
  "knives-out",

  "dont-look-up",
  "shaun-of-the-dead",

  "groundhog-day",
  "school-of-rock",
  "ghostbusters",
  "home-alone",
  "the-exorcist",
  "gone-girl",
  "get-out",
  "american-psycho",
  "green-book",
  "the-big-short",
  "elf",
];
let countriesData = [
  "england",
  "switzerland",
  "wales",
  "scotland",
  "germany",
  "france",
  "italy",
  "russia",
  "india",
  "china",
  "new-zealand",
  "northern-ireland",
  "madagascar",
  "mongolia",
  "netherlands",
  "north-korea",
  "saudi-arabia",
  "south-africa",
  "ukraine",
  "australia",
  "greece",
  "japan",
  "kazakstan",
  "zimbabwe",
  "brazil",
  "mexico",
  "costa-rica",
  "portugal",
  "venezuela",
  "canada",
];
let famousPeepsData = [
  "brad-pitt",
  "leonardo-dicaprio",
  "jason-statham",
  "dwayne-johnson",
  "robert-de-niro",
  "margot-robbie",
  "meryl-streep",
  "elisabeth-moss",
  "john-lennon",
  "donald-trump",
  "barrack-obama",
  "elon-musk",
  "vladimir-putin",
  "russel-brand",
  "fredrick-nietzsche",
  "nikola-tesla",
  "isaac-newton",
  "alan-turing",
  "dave-grohl",
  "elton-john",
  "dua-lipa",
  "doja-cat",
  "eric-clapton",
  "bob-marley",
  "emmanuel-macron",
  "whim-hof",
  "martin-luther-king-jr",
  "winston-churchill",
  "pablo-picasso",
  "cristiano-ronaldo",
  "stephen-king",
];

let films = [];
let countries = [];
let famousPeeps = [];

//hints will be searched via object key
let hints = {
  "harry-potter": "Wizardly things...",
  avatar: "Science-Fiction Film",
  "pulp-fiction": "Don't be a square...",
  "iron-man": "A Super-Hero Film",
  smile: "Horror Film",
  "the-conjuring": "Horror Film",
  "king-kong": "A big animal is featured in this film...",
  godzilla: "A large Monster...",
  "the-hills-have-eyes": "A bunch of Mutants...",
  alien: "A Horror Sci-Fi...",
  dune: "A Sci-Fi...",
  joker: "A psychological thriller based on a very famous villain...",
  "the-nice-guys": "A Comedy/Action film...",
  "knives-out": "A Dark Comedy Mystery Detective Film...",
  "the-grand-budapest-hotel": "A European Comedy-Drama...",
  "dont-look-up": "An Apocolyptic American Political Satire Comedy Film...",
  "the-cabin-in-the-woods": "An American Horror Comedy...",
  "shaun-of-the-dead": "A British Comedy Horror...",
  "gaurdians-of-the-galaxy": "An American Super-hero Film...",
  "groundhog-day": "An American Fantasy Comedy...",
  "school-of-rock": "A 'Rock n Roll' Comedy...",
  ghostbusters: "A Super-natural Comedy Cult Classic...",
  "home-alone": "THE Christmas Comedy film...",
  "the-exorcist": "An old Horror Film...",
  "gone-girl": "An American Psychological Thriller...",
  "get-out": "An American Psychological Horror...",
  "american-psycho": "A Horror/Thriller Film...",
  "green-book": "An American Biographical Comedy-Drama...",
  "the-big-short": "An American Biographical Comedy-Drama...",
  elf: "Did you really need a hint for this one?",

  england: "A part of the UK...",
  switzerland: "A European Country...",
  africa: "Where man first walked...",
  wales: "A part of the UK...",
  scotland: "A part of the UK...",
  germany: "A European Country...",
  france: "A European Country...",
  italy: "A European Country...",
  russia: "It can be VERY cold here...",
  india: "Somewhere in Asia...",
  china: "Somewhere in Asia...",
  "new-zealand": "Residing in the South Pacific Ocean...",
  "northern-ireland": "A European Country...",
  madagascar: "The world's second largest island country...",
  mongolia: "Somewhere in Asia...",
  netherlands: "A Northwestern European Country...",
  "north-korea": "Somewhere in Asia...",
  "saudi-arabia": "Somewhere in the Middle-East...",
  ukraine: "Somewhere in Eastern Europe...",
  australia: "The world's sixth largest Country...",
  greece: "Somewhere in Europe...",
  japan: "Do you really need a hint for this one? ...somewhere in asia...",
  kazakstan: "Home to one of the world's most famous jorunalists...",
  zimbabwe: "Somewhere in Africa...",
  brazil: "Largest country in Latin America...",
  mexico: "Somewhere close to America...",
  "costa-rica": "Neither in North America, or South-America... ",
  portugal: "Famous for their cod-fish...",
  venezuela: "Neither in North America, or Central America...",
  canada: "It can be VERY cold here...",

  "brad-pitt": "A high-profile American actor...",
  "leonardo-dicaprio": "A high-profile American actor...",
  "jason-statham": "A British Action Star...",
  "dwayne-johnson": "A high-profile American action star...",
  "robert-de-niro": "A hollywood gangster-portraying icon...",
  "emma-stone": "An American actress...",
  "margot-robbie": "An Australian actress...",
  "meryl-streep": "An older but iconic American actress...",
  "kate-winslet": "An American actress...",
  "cameron-diaz": "A well-known American actress...",
  "elisabeth-moss": "A famous & talented American actress....",
  "john-lennon": "A lead singer/songwriter of a very famous all male band...",
  "donald-trump": "A Notorious American Businessman with tiny hands... ",
  "barrack-obama": "Once a leader of the free world, he's very charismatic...",
  "elon-musk": "If iron man were a real person, it would be this guy...",
  "vladimir-putin": "A World Leader of a vast and cold region...",
  "russel-brand": "He's British, tall and wears tight leather clothing... ",
  "fredrick-nietzsche":
    "A famous German philosopher, often remembered for 'killing god'...",
  "nikola-tesla": "Without this guy, we would have no electricity...",
  "isaac-newton": "Father of gravity...",
  "alan-turing": "Father of computers...",
  "dave-grohl": "Lead singer/drummer of a famous rock band...",
  "elton-john": "An older but very famous british singer/songwriter...",
  "dua-lipa": "A young and famous female pop artist...",
  "doja-cat": "A young female R&B/rap artist...",
  "eric-clapton": "An older but legendary guitarist/singer...",
  "bob-marley": "A very famous Reggae singer/songwriter...",
  "emmanuel-macron": "A leader of a European nation that borders Spain...",
  "whim-hof": "He's often known as the 'Ice-man...",
  "martin-luther-king-jr":
    "A prominent American civil rights activist in the 50/60s... ",
  "winston-churchill": "A former British Prime Minister... ",
  "pablo-picasso": "An incredibly famous Spanish painter/artist... ",
  "cristiano-ronaldo": "A famous Portuguese footballer...",
  "stephen-king": "A famous American writer of the Horror Genre...",
};

function startGame(event) {
  event.preventDefault();
  document.getElementById("welcome").style.visibility = "hidden";
  document.querySelector("header").style.visibility = "visible";
  chooseCategory(kategory);
  populateArray(kategory);
  newRound();
}

function populateArray(category) {
  if (category === "Films") {
    while (films.length < 18) {
      let word = filmsData[Math.floor(Math.random() * filmsData.length)];
      if (!films.includes(word)) films.push(word);
    }
  } else if (category === "Countries") {
    while (countries.length < 18) {
      let word =
        countriesData[Math.floor(Math.random() * countriesData.length)];
      if (!countries.includes(word)) countries.push(word);
    }
  } else if (category === "Famous People") {
    while (famousPeeps.length < 18) {
      let word =
        famousPeepsData[Math.floor(Math.random() * famousPeepsData.length)];
      if (!famousPeeps.includes(word)) famousPeeps.push(word);
    }
  }
}

function displayNewWord() {
  if (kategory === "Films") {
    chosenWord = films[Math.floor(Math.random() * films.length)];
    films = films.filter((word) => word !== chosenWord);
  } else if (kategory === "Famous People") {
    chosenWord = famousPeeps[Math.floor(Math.random() * famousPeeps.length)];
    famousPeeps = famousPeeps.filter((word) => word !== chosenWord);
  } else if (kategory === "Countries") {
    chosenWord = countries[Math.floor(Math.random() * countries.length)];
    countries = countries.filter((word) => word !== chosenWord);
  }

  console.log(chosenWord);
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

function chooseCategory(category) {
  document.getElementById("category-title").innerHTML = `${category}`;
}

function keepTrackOfGuessedLetters(input, key) {
  let chosenWordArray = chosenWord.split("");

  if (chosenWordArray.includes(input)) {
    correctLetters.push(input);
    key.style.backgroundColor = "mediumseagreen";
  } else {
    key.style.backgroundColor = "rgb(255, 255, 255, 0.5)";
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

  if (healthPool <= 0) {
    gameOver();
  }

  hp.innerText = `Lives: ${healthPool}/10`;
}

function gameOver() {
  document.getElementById("image-container-two").style.visibility = "visible";
  document.getElementById("image-container-two").style.position = "";
  document.getElementById("game-banner-message").style.fontFamily = "";
  document.getElementById("game-banner").style.minHeight = "500px";

  document.getElementById("score-container").style.visibility = "hidden";
  document.getElementById("score-container").style.position = "absolute";
  hangmanIMG.src = "./images/zero.jpg";
  gameBanner.style.visibility = "visible";
  body.style.backgroundColor = "rgb(0, 0, 0, .5)";
  document.getElementById("game-banner-message").innerText =
    "You've been Hanged!";
  document.getElementById("nextWordBtn").innerText = "Play Again";
  films = [];
  countries = [];
  famousPeeps = [];
  darkOverlay();
  hp.style.color = "";
  gameIsOver = true;
  words = 18;
  hintBtn.style.visibility = "hidden";
}

function newGame() {
  welcome();
}

function newRound() {
  correctLetters = [];
  for (let i = 0; i < keys.length; i++) {
    keys[i].disabled = false;
    keys[i].style.backgroundColor = "";
  }
  forfeitBtn.disabled = false;
  hint = false;
  hintBtn.style.display = "";
  document.getElementById("hint-message").innerHTML =
    "A hint will cost you 5 lives...</strong>";
  hp.style.color = "";
  gameIsOver = false;
  gameWin = false;
  healthPool = 10;
  hp.innerText = `Lives: ${healthPool}/10`;
  document.getElementById("nextWordBtn").innerText = "Next Word ";

  body.style.backgroundColor = "";
  hangmanIMG.src = "./images/zero.jpg";

  document.getElementById("hint-message").style.visibility = "visible";
  gameBanner.style.visibility = "hidden";
  document.getElementById("image-container-two").style.visibility = "hidden";
  document.getElementById("image-container-two").style.position = "absolute";
  hideScore();
  disableOverlay();
  displayNewWord();
  wordTracker();
  hintBtn.style.visibility = "visible";
}

function winRound() {
  let hiddenWordArray = hiddenWord.innerHTML.split("");

  if (!hiddenWordArray.includes("_") && words === 0) {
    winGame();
  } else if (!hiddenWordArray.includes("_")) {
    document.getElementById("game-banner-message").style.fontFamily =
      "Helvetica";
    document.getElementById(
      "game-banner-message"
    ).innerHTML = `Well Done! You guessed <strong><i>${chosenWord}</i></strong> correctly! <br/><br/>You're still alive for now...`;
    gameBanner.style.visibility = "visible";
    darkOverlay();
    for (let i = 0; i < keys.length; i++) {
      keys[i].disabled = true;
    }
    keepScore();
    showScore();
    forfeitBtn.disabled = true;
    document.getElementById("game-banner").style.height = "400px";

    hintBtn.style.visibility = "visible";
    hintBtn.style.position = "relative";
    hangmanIMG.src = "./images/zero.jpg";

    if (instructions === true) {
      revealInstructions();
    }
  }
}

function showHint() {
  let chosenHint = hints[chosenWord];
  document.getElementById("hint-message").innerHTML = `${chosenHint}`;
  hint = true;
  healthPool -= 5;
  displayHangman();
  hp.innerText = `Lives: ${healthPool}/10`;
  hintBtn.style.display = "none";
  changeColor();
}

function disableHintBtn() {
  if (healthPool <= 5 && hint != true) {
    hintBtn.style.display = "none";
    // hintBtn.style.backgroundColor = "rgb(209, 163, 251)";
    document.getElementById("hint-message").innerHTML = "You snooze you loose!";
  }
}

function keepScore() {
  if (healthPool === 0) {
    score = 0;
    scoreRef.innerText = `Score: ${score}`;
  } else {
    score += 100;
    scoreRef.innerText = `Score: ${score}`;
  }

  if (score > highestScore) {
    highestScore = score;
    highScore.innerText = `High Score: ${highestScore}`;
  }

  if (highestScore >= 3200) {
    score = 0;
    highestScore = score;
    highScore.innerText = `Highest Score: ${highestScore}`;
  }
}

function showScore() {
  document.getElementById("score-container").style.visibility = "visible";
  document.getElementById("score-container").style.position = "relative";
}

function hideScore() {
  document.getElementById("score-container").style.visibility = "hidden";
  document.getElementById("score-container").style.position = "absolute";
}

function forfeited() {
  score = 0;
  scoreRef.innerText = `Score: ${score}`;
  forfeit = false;
}

function darkOverlay() {
  document.getElementById("mother-container").style.visibility = "hidden";
  document.querySelector("body").style.backgroundColor = "rgb(0, 0, 0, 0.5";
  document.getElementById("hint-message").style.visibility = "hidden";
}

function disableOverlay() {
  document.getElementById("mother-container").style.visibility = "visible";
  document.querySelector("body").style.backgroundColor = "";
  document.getElementById("hint-message").style.visibility = "visible";
}

function displayHangman() {
  if (gameIsOver === true) {
    return;
  } else if (healthPool === 9) {
    hangmanIMG.src = "./images/one.jpg";
  } else if (healthPool === 8) {
    hangmanIMG.src = "./images/two.jpg";
  } else if (healthPool === 7) {
    hangmanIMG.src = "./images/three.jpg";
  } else if (healthPool === 6) {
    hangmanIMG.src = "./images/four.jpg";
  } else if (healthPool === 5) {
    hangmanIMG.src = "./images/five.jpg";
  } else if (healthPool === 4) {
    hangmanIMG.src = "./images/six.jpg";
  } else if (healthPool === 3) {
    hangmanIMG.src = "./images/seven.jpg";
  } else if (healthPool === 2) {
    hangmanIMG.src = "./images/eight.jpg";
  } else if (healthPool === 1) {
    hangmanIMG.src = "./images/nine.jpg";
  } else if (healthPool === 0) {
    hangmanIMG.src = "./images/ten.jpg";
  }
}

function changeColor() {
  if (healthPool === 2) {
    hp.style.color = "orange";
  } else if (healthPool === 1) {
    hp.style.color = "red";
  }
}

function revealInstructions() {
  instructions = !instructions;
  if (instructions === true) {
    instructionsBtn.innerHTML = "Hide Instructions";
    instructionsRef.style.position = "relative";
    instructionsRef.style.visibility = "visible";
  } else {
    instructionsBtn.innerHTML = "Click for Instructions";
    instructionsRef.style.position = "absolute";
    instructionsRef.style.visibility = "hidden";
  }
}

function welcome() {
  document.getElementById("welcome").style.visibility = "visible";
  body.style.backgroundColor = "";
}

function wordTracker() {
  document.getElementById(
    "word-count"
  ).innerHTML = `Words Left: <br/> ${words}`;
  words--;
}

function winGame() {
  gameBanner.style.visibility = "visible";
  document.getElementById("game-banner-message").style.fontFamily =
    "Gloria Hallelujah";
  document.getElementById("game-banner-message").innerText =
    "Congratulations... you win! You are most formidable. You will not hang... this time!";
  nextWordBtn.innerText = "Play again?";
  darkOverlay();
  gameWin = true;
  hintBtn.style.visibility = "hidden";

  if (instructions === true) {
    revealInstructions();
  }
}

darkOverlay();
body.style.backgroundColor = "";
document.querySelector("header").style.visibility = "hidden";
