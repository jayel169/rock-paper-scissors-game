// Retrieve stored data or initialize new game data
let update = JSON.parse(localStorage.getItem('update')) || {
    user: 0,
    computer: 0,
    roundsPlayed: 0
};

// Function to play the game
function playGame(userChoice) {
    if (update.roundsPlayed >= 5) {
        alert("Game over! Click 'Reset Game' to play again.");
        return;
    }

    // Get computer's choice
    let computerChoice = Math.floor(Math.random() * 3);
    let computerMove = ["rock", "paper", "scissors"][computerChoice];

    // Determine round winner
    if (userChoice === computerMove) {
        alert("It's a tie!");
    } else if (
        (userChoice === "paper" && computerMove === "rock") ||
        (userChoice === "scissors" && computerMove === "paper") ||
        (userChoice === "rock" && computerMove === "scissors")
    ) {
        alert("You win this round!");
        update.user++;
    } else {
        alert("You lose this round!");
        update.computer++;
    }

    update.roundsPlayed++;

    // Store updated data in localStorage
    localStorage.setItem('update', JSON.stringify(update));

    // Update UI before alerts
    document.querySelector(".userchoice").innerText = `You chose: ${userChoice}`;
    document.querySelector(".compchoice").innerText = `Computer chose: ${computerMove}`;
    document.querySelector(".outcome").innerText = 
        `Round ${update.roundsPlayed}/5\nYour Score: ${update.user}\nComputer Score: ${update.computer}`;

    // Check if the game is over
    if (update.roundsPlayed === 5) {
        if (update.user > update.computer) {
            alert("🎉 Congratulations! You won the game!");
        } else if (update.computer > update.user) {
            alert("😞 You lost the game! Better luck next time.");
        } else {
            alert("😮 It's a tie game!");
        }
        alert("Game Over! Click 'Reset Game' to play again.");
    }
}

// Function to reset the game
function resetGame() {
    update = { user: 0, computer: 0, roundsPlayed: 0 };
    localStorage.removeItem('update');

    // Reset UI
    document.querySelector(".userchoice").innerText = "Your choice:";
    document.querySelector(".compchoice").innerText = "Computer choice:";
    document.querySelector(".outcome").innerText = "";
}
