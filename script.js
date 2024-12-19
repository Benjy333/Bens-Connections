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
];

const difficulties = {
    easy: "#8bc34a", // Green
    medium: "#ffeb3b", // Yellow
    hard: "#2196f3", // Blue
};

const gameContainer = document.getElementById("game-container");
const resultContainer = document.getElementById("result-container");
const feedback = document.getElementById("feedback");
const submitButton = document.getElementById("submit-btn");
let selectedWords = [];

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
    const difficulty = selectedWords[0].difficulty;
    const allMatch = selectedWords.every(word => word.group === group);

    if (allMatch) {
        feedback.textContent = `Correct!`;
        feedback.style.color = "green";

        // Create a result row with colored blocks
        const resultRow = document.createElement("div");
        resultRow.className = "result-row";
        for (let i = 0; i < 4; i++) {
            const block = document.createElement("div");
            block.className = "result-block";
            block.style.backgroundColor = difficulties[difficulty];
            resultRow.appendChild(block);
        }
        resultContainer.appendChild(resultRow);

        selectedWords.forEach(word => {
            const card = [...gameContainer.children].find(el => el.textContent === word.word);
            if (card) card.remove();
        });
    } else {
        feedback.textContent = "Incorrect! Try again.";
        feedback.style.color = "red";
    }

    document.querySelectorAll(".word-card.selected").forEach(div => div.classList.remove("selected"));
    selectedWords = [];
});
