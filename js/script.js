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


//Create function to update "words-in-progress" paragraph & replace letters with symbol
placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        console.log(letter);
        placeholderLetters.push("●")
    }
    inProgress.innerText = placeholderLetters.join("");

};
placeholder(word);

//Add event listener for the button 
//This clears guess box after submitting & logs input in console
button.addEventListener("click", function (e) {
    e.preventDefault();
    const guessedLetters = textInput.value;
    console.log(guessedLetters);
    textInput.value = "";
});