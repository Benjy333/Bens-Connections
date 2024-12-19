const words = [
    { word: "Bluey", group: "Bluey Characters", difficulty: "easy" },
    { word: "Bingo", group: "Bluey Characters", difficulty: "easy" },
    { word: "Bandit", group: "Bluey Characters", difficulty: "easy" },
    { word: "Chilli", group: "Bluey Characters", difficulty: "easy" },
    { word: "Broncos", group: "Brisbane Teams", difficulty: "medium" },
    { word: "Dolphins", group: "Brisbane Teams", difficulty: "medium" },
    { word: "Lions", group: "Brisbane Teams", difficulty: "medium" },
    { word: "Heat", group: "Brisbane Teams", difficulty: "medium" },
    { word: "Wallaby", group: "Native Australian Species", difficulty: "hard" },
    { word: "Platypus", group: "Native Australian Species", difficulty: "hard" },
    { word: "Kookaburra", group: "Native Australian Species", difficulty: "hard" },
    { word: "Koala", group: "Native Australian Species", difficulty: "hard" },
    { word: "Squirrel", group: "Red objects", difficulty: "tricky" },
    { word: "Fox", group: "Red objects", difficulty: "tricky" },
    { word: "Apple", group: "Red objects", difficulty: "tricky" },
    { word: "Cabbage", group: "Red objects", difficulty: "tricky" },
];

const gameContainer = document.getElementById("game-container");
const resultContainer = document.getElementById("result-container");
const feedback = document.getElementById("feedback");
const submitButton = document.getElementById("submit-btn");
const attemptsLeft = document.getElementById("attempts");
const finalResult = document.getElementById("final-result");
const finalMessage = document.getElementById("final-message");

let selectedWords = [];
let attempts = 4;

// Shuffle and render words
const shuffledWords = words.sort(() => Math.random() - 0.5);
shuffledWords.forEach(item => {
    const div = document.createElement("div");
    div.className = "word-card";
    div.textContent = item.word;
    div.addEventListener("click", () => toggleSelection(div, item));
    gameContainer.appendChild(div);
});

function toggleSelection(div, word) {
    if (div.classList.contains("selected")) {
        div.classList.remove("selected");
        selectedWords = selectedWords.filter(w => w.word !== word.word);
    } else if (selectedWords.length < 4) {
        div.classList.add("selected");
        selectedWords.push(word);
    }
}

submitButton.addEventListener("click", () => {
    if (selectedWords.length !== 4) {
        feedback.textContent = "Select exactly 4 words!";
        feedback.style.color = "red";
        return;
    }

    const group = selectedWords[0].group;
    const allMatch = selectedWords.every(word => word.group === group);

    if (allMatch) {
        feedback.textContent = `Correct! Group: ${group}`;
        feedback.style.color = "green";

        // Add a new row of correct blocks
        const resultRow = document.createElement("div");
        resultRow.className = "correct-group";
        resultRow.textContent = `${group}: ${selectedWords.map(w => w.word).join(", ")}`;
        resultContainer.appendChild(resultRow);

        selectedWords.forEach(word => {
            const card = [...gameContainer.children].find(el => el.textContent === word.word);
            if (card) card.remove();
        });

        // Check if the game is over (all groups solved)
        if (gameContainer.children.length === 0) {
            showFinalResult(true);
        }
    } else {
        feedback.textContent = "Incorrect! Try again.";
        feedback.style.color = "red";
        attempts--;
        attemptsLeft.textContent = attempts;

        if (attempts === 0) {
            showFinalResult(false);
        }
    }

    document.querySelectorAll(".word-card.selected").forEach(div => div.classList.remove("selected"));
    selectedWords = [];
});

function showFinalResult(success) {
    finalResult.classList.remove("hidden");
    if (success) {
        finalResult.classList.add("success");
        finalResult.classList.remove("failure");
        finalMessage.textContent = `Success! You solved all groups with ${attempts} attempts left.`;
    } else {
        finalResult.classList.add("failure");
        finalResult.classList.remove("success");
        finalMessage.textContent = "Game Over! You've used all attempts. Better luck next time!";
    }
}
