const words = [
  "JAVASCRIPT",
  "PYTHON",
  "HTML",
  "CSS",
  "NODE",
  "REACT",
  "ANGULAR",
  "VUE",
  "TYPESCRIPT",
  "JAVA",
  "RUBY",
  "GO",
  "PHP",
  "SWIFT",
  "KOTLIN",
  "CPLUSPLUS",
  "C",
  "PERL",
  "BASH",
]

// Select a random word from the words array in words.js
let word = words[Math.floor(Math.random() * words.length)]

// Initialize variables
let guessedLetters = []
let guessesRemaining = 6
let gameOver = false

// Display initial game state
updateWordDisplay()
updateGuessesRemaining()
updateLettersGuessed()

// Listen for keyboard input
document.addEventListener("keydown", handleKeyPress)

function handleKeyPress(event) {
  // Check if game is over
  if (gameOver) {
    return
  }

  // Check if letter has already been guessed
  let letter = event.key.toUpperCase()
  if (guessedLetters.includes(letter)) {
    return
  }

  // Check if letter is in the word
  if (word.includes(letter)) {
    // Update guessedLetters array
    guessedLetters.push(letter)

    // Update word display
    updateWordDisplay()

    // Check for win
    if (checkForWin()) {
      endGame(true)
    }
  } else {
    // Update guessedLetters array
    guessedLetters.push(letter)

    // Update guesses remaining
    guessesRemaining--

    // Update letters guessed
    updateLettersGuessed()

    // Update guesses remaining display
    updateGuessesRemaining()

    // Check for loss
    if (guessesRemaining === 0) {
      endGame(false)
    }
  }
}

function updateWordDisplay() {
  let wordDisplay = document.getElementById("word-display")
  let wordArray = word.split("")

  let innerHTML = ""
  for (let i = 0; i < wordArray.length; i++) {
    let letter = wordArray[i]
    if (guessedLetters.includes(letter)) {
      innerHTML += letter
    } else {
      innerHTML += "_"
    }
    innerHTML += " "
  }

  wordDisplay.innerHTML = innerHTML
}

function updateGuessesRemaining() {
  let guessesRemainingDisplay = document.getElementById("guesses-remaining")
  guessesRemainingDisplay.innerHTML = `Guesses Remaining: ${guessesRemaining}`
}

function updateLettersGuessed() {
  let lettersGuessedDisplay = document.getElementById("letters-guessed")
  lettersGuessedDisplay.innerHTML = `Letters Guessed: ${guessedLetters.join(
    ", "
  )}`
}

function checkForWin() {
  let wordArray = word.split("")
  for (let i = 0; i < wordArray.length; i++) {
    let letter = wordArray[i]
    if (!guessedLetters.includes(letter)) {
      return false
    }
  }
  return true
}

function endGame(win) {
  gameOver = true
  let gameEndMessage = document.getElementById("game-over")
  if (win) {
    gameEndMessage.innerHTML = "You Win!"
  } else {
    gameEndMessage.innerHTML = `You Lose! The word was ${word}.`
  }
  gameEndMessage.style.display = "block"
}
