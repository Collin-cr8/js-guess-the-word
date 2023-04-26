//Create global variables
const list = document.querySelector(".guessed-letters");
const button = document.querySelector(".guess");
const textInput = document.querySelector(".letter");
const inProgress = document.querySelector(".word-in-progress");
const remaining = document.querySelector(".remaining");
const span = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgain = document.querySelector(".play-again");

let remainingGuesses = 5;

let word = "magnolia"; 
//Magnolia= starting word to test out game
const guessedLetters = [];

//Add async function to retrieve random words
const getWord = async function () {
    const res = await fetch ("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await res.text();
    const wordArray = words.split("\n");
//Grab random word
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    placeholder(word);
};

//Start Game
getWord();


//Create function to update "words-in-progress" paragraph & replace letters with symbol
placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        console.log(letter);
        placeholderLetters.push("●");
    }
    inProgress.innerText = placeholderLetters.join("");

};

//Add event listener for the button 
//This clears guess box after submitting & logs input in console
button.addEventListener("click", function (e) {
    e.preventDefault();
    message.innerText = "";
    const guess = textInput.value;
    console.log(guess);

    
    textInput.value = "";
    const goodGuess = validate(guess);
    makeGuess(goodGuess);
});

//Create function to check the player's input
const validate = function (input) {
    const acceptedLetter = /[a-zA-Z]/ //Regular expression to only accept values A-Z
    if (input.length === 0) {
        message.innerText = "Go ahead and guess any letter! Good luck!";
    } else if (input.length > 1) {
        message.innerText = "One letter per guess please 😁";
    } else if (!input.match(acceptedLetter)) {
        message.innerText = "Uh oh! That's not a letter! Please only enter letters from A to Z";
    } else { //Player entered one new letter
        return input;
    }
};

//Create function to capture input
const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        message.innerText = "Oops! You already tried that. Give it another shot!";
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
        showLetters();
        guessCounter(guess);
        wordInProgressUpdate(guessedLetters);
    } 
};

//Create function to SHOW guessed letters in browser
const showLetters = function () {
    list.innerHTML = "";
    for (const letter of guessedLetters) {
        const listItem = document.createElement("li");
        listItem.innerText = letter;
        list.append(listItem);
    }
};

//Create function to update word-in-progress
const wordInProgressUpdate = function(guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const revealWord = [];
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            revealWord.push(letter.toUpperCase());
        } else {
            revealWord.push("●");
        }
    }
    inProgress.innerText = revealWord.join("");
    winCheck();
};

//Create function to count guesses remaining
const guessCounter = function(guess) {
    const upperWord = word.toUpperCase();
    if (upperWord.includes(guess)) {
        message.innerText = `Good guess! The word has the letter ${guess}!`;
    } else {
        message.innerText = `Sorry, the word doesn't have the letter ${guess}. Try again!`;
        remainingGuesses -= 1;
    }

    if (remainingGuesses === 0) {
        message.innerHTML = `Oh no! You're out of guesses! The word was <span class= "highlight"> ${word} </span>.`;
    } else if (remainingGuesses === 1) {
        span.innerText = `${remainingGuesses} guess`;
    } else {
        span.innerText = `${remainingGuesses} guesses`;
    }
};


//Create function to check if player won
const winCheck = function () {
    if (word.toUpperCase() === inProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed the correct word! Congratulations!</p>`;
    }
};

