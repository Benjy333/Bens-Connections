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

const gameContainer = document.getElementById("game-container");
const correctAnswersContainer = document.getElementById("correct-answers");
const feedback = document.getElementById("feedback");
const submitButton = document.getElementById("submit-btn");
const finalResult = document.getElementById("final-result");
const finalMessage = document.getElementById("final-message");

let selectedWords = [];
let attempts = 4;

// Shuffle words and render
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
        feedback.textContent = `Correct! Group: ${group}`;
        feedback.style.color = "green";

        const groupDiv = document.createElement("div");
        groupDiv.className = "correct-group";
        groupDiv.textContent = `${group}: ${selectedWords.map(w => w.word).join(", ")}`;
        correctAnswersContainer.appendChild(groupDiv);

        selectedWords.forEach(word => {
            const card = [...gameContainer.children].find(el => el.textContent === word.word);
            if (card) card.remove();
        });

        if (gameContainer.children.length === 0) {
            showFinalResult(true);
        }
    } else {
        feedback.textContent = "Incorrect! Try again.";
        feedback.style.color = "red";
        attempts--;
        document.getElementById("attempts").textContent = attempts;

        if (attempts === 0) {
            showFinalResult(false);
        }
    }

    selectedWords.forEach(div => div.classList.remove("selected"));
    selectedWords = [];
}

function showFinalResult(success) {
    finalResult.classList.remove("hidden");
    finalResult.classList.add(success ? "success" : "failure");
    finalMessage.textContent = success
        ? `Success! You solved all groups with ${attempts} attempts left.`
        : "Game Over! You've used all attempts.";
}
