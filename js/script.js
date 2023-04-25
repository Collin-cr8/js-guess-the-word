//Create global variables
const list = document.querySelector(".guessed-letters");
const button = document.querySelector(".guess");
const textInput = document.querySelector(".letter");
const inProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const span = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgain = document.querySelector(".play-again");

const word = "magnolia"; 
//Magnolia= starting word to test out game
const guessedLetters = [];


//Create function to update "words-in-progress" paragraph & replace letters with symbol
placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        console.log(letter);
        placeholderLetters.push("●");
    }
    inProgress.innerText = placeholderLetters.join("");

};
placeholder(word);

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

//Create function to cpture input
const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        message.innerText = "Oops! You already tried that. Give it another shot!";
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
        showLetters();
        wordUpdate(guessedLetters);
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
const wordUpdate = function(guessedLetters) {
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

//Create function to check if player won
const winCheck = function () {
    if (word.toUpperCase() === inProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed the correct word! Congratulations!</p>`;
    }
};