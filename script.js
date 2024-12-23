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
const correctAnswersContainer = document.getElementById("correct-answers");
const feedback = document.getElementById("feedback");
const submitButton = document.getElementById("submit-btn");
const resultsScreen = document.getElementById("results-screen");

let selectedWords = [];
let attempts = 4;

// Shuffle and render
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
    const difficulty = selectedWords[0].difficulty;
    const allMatch = selectedWords.every(word => word.group === group);

    const resultRow = document.createElement("div");
    resultRow.className = "result-row";

    for (let i = 0; i < 4; i++) {
        const block = document.createElement("div");
        block.className = "result-block";

        if (allMatch) {
            block.classList.add(difficulty); // Assign difficulty color
        } else {
            block.classList.add("failure"); // Gray for failure
        }

        resultRow.appendChild(block);
    }

    resultsScreen.appendChild(resultRow);

    if (allMatch) {
        feedback.textContent = `Correct! Group: ${group}`;
        feedback.style.color = "green";

        selectedWords.forEach(word => {
            const card = [...gameContainer.children].find(el => el.textContent === word.word);
            if (card) card.remove();
        });

        if (gameContainer.children.length === 0) {
            feedback.textContent = "Congratulations! You've solved all groups!";
        }
    } else {
        feedback.textContent = "Incorrect! Try again.";
        feedback.style.color = "red";
        attempts--;
        document.getElementById("attempts").textContent = attempts;

        if (attempts === 0) {
            feedback.textContent = "Game Over! You've used all attempts.";
            submitButton.disabled = true;
        }
    }

    document.querySelectorAll(".word-card.selected").forEach(div => div.classList.remove("selected"));
    selectedWords = [];
});
