document.addEventListener('DOMContentLoaded', function () {
    const words = ["voiture", "foie", "maison", "famille", "amis"];
    let chosenWord = '';
    let displayedWord = '';
    let wrongAttempts = 0;
    const maxAttempts = 6;
    const usedLetters = [];

    const startButton = document.getElementById('startButton');
    const replayButton = document.getElementById('replayButton');
    const submitLetter = document.getElementById('submitLetter');
    const letterInput = document.getElementById('letterInput');

    startButton.addEventListener('click', startGame);
    replayButton.addEventListener('click', startGame);
    submitLetter.addEventListener('click', submitGuess);
    letterInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            submitGuess();
        }
    });

    function startGame() {
        chosenWord = words[Math.floor(Math.random() * words.length)];
        displayedWord = '_'.repeat(chosenWord.length);
        wrongAttempts = 0;
        usedLetters.length = 0;
        updateDisplay();
        document.getElementById('menu').classList.add('hidden');
        document.getElementById('game').classList.remove('hidden');
        document.getElementById('end').classList.add('hidden');
        letterInput.value = '';
        letterInput.focus();
        document.getElementById('hangman').style.backgroundImage = `url('./assets/img/hangman0.png')`;
    }

    function submitGuess() {
        const guess = letterInput.value.toLowerCase();
        letterInput.value = '';
        if (!guess || guess.length !== 1 || usedLetters.includes(guess)) {
            return;
        }
        usedLetters.push(guess);
        if (chosenWord.includes(guess)) {
            updateDisplayedWord(guess);
        } else {
            wrongAttempts++;
            document.getElementById('hangman').style.backgroundImage = `url('./assets/img/hangman${wrongAttempts}.png')`;
        }
        updateDisplay();
        checkEndGame();
    }

    function updateDisplayedWord(guess) {
        let newDisplayedWord = '';
        for (let i = 0; i < chosenWord.length; i++) {
            if (chosenWord[i] === guess) {
                newDisplayedWord += guess;
            } else {
                newDisplayedWord += displayedWord[i];
            }
        }
        displayedWord = newDisplayedWord;
    }

    function updateDisplay() {
        document.getElementById('wordDisplay').textContent = displayedWord.split('').join(' ');
        document.getElementById('usedLetters').textContent = `Lettres proposées : ${usedLetters.join(', ')}`;
    }

    function checkEndGame() {
        if (displayedWord === chosenWord) {
            endGame(true);
        } else if (wrongAttempts >= maxAttempts) {
            endGame(false);
        }
    }

    function endGame(won) {
        document.getElementById('game').classList.add('hidden');
        document.getElementById('end').classList.remove('hidden');
        document.getElementById('endMessage').textContent = won ? 'Félicitations, vous avez gagné !' : 'Désolé, vous avez perdu.';
        document.getElementById('correctWord').textContent = `Le mot correct était : ${chosenWord}`;
    }
});
