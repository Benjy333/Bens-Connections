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

const difficulties = {
    easy: "#8bc34a",      // Green
    medium: "#ffeb3b",    // Yellow
    hard: "#2196f3",      // Blue
    tricky: "#9c27b0"     // Purple
};

const gameContainer = document.getElementById("game-container");
const feedback = document.getElementById("feedback");
const attemptsLeft = document.getElementById("attempts");
const submitButton = document.getElementById("submit-btn");
const correctAnswersContainer = document.getElementById("correct-answers");
const howToPlayBtn = document.getElementById("how-to-play-btn");
const modal = document.getElementById("how-to-play-modal");
const closeBtn = document.querySelector(".close-btn");

// Modal functionality
howToPlayBtn.addEventListener("click", () => modal.style.display = "block");
closeBtn.addEventListener("click", () => modal.style.display = "none");
window.addEventListener("click", (event) => {
    if (event.target === modal) modal.style.display = "none";
});

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

submitButton.addEventListener("click", checkGroup);

function checkGroup() {
    if (selectedWords.length !== 4) {
        feedback.textContent = "Select exactly 4 words!";
        feedback.style.color = "red";
        return;
    }

    const group = selectedWords[0].group;
    const allMatch = selectedWords.every(word => word.group === group);

    if (allMatch) {
        const difficulty = selectedWords[0].difficulty;

        feedback.textContent = `Correct! Group: ${group} (${difficulty.toUpperCase()})`;
        feedback.style.color = difficulties[difficulty];

        // Add the correct group to the "Correct Answers" section
        const groupDiv = document.createElement("div");
        groupDiv.className = "correct-group";
        groupDiv.style.backgroundColor = difficulties[difficulty]; // Add difficulty color
        groupDiv.style.color = "white";
        groupDiv.textContent = `${group}: ${selectedWords.map(w => w.word).join(", ")}`;
        correctAnswersContainer.appendChild(groupDiv);

        selectedWords.forEach(word => {
            const card = [...gameContainer.children].find(el => el.textContent === word.word);
            if (card) card.remove();
        });
    } else {
        feedback.textContent = "Incorrect! Try again.";
        feedback.style.color = "red";
        attempts--;
        attemptsLeft.textContent = attempts;

        if (attempts === 0) {
            feedback.textContent = "Game Over! Reset to play again.";
            submitButton.disabled = true;
        }
    }

    document.querySelectorAll(".word-card.selected").forEach(div => div.classList.remove("selected"));
    selectedWords = [];
}
