const words = [
    { word: "Red", group: "Colors" },
    { word: "Blue", group: "Colors" },
    { word: "Green", group: "Colors" },
    { word: "Yellow", group: "Colors" },
    { word: "Dog", group: "Animals" },
    { word: "Cat", group: "Animals" },
    { word: "Horse", group: "Animals" },
    { word: "Cow", group: "Animals" },
    { word: "Piano", group: "Instruments" },
    { word: "Guitar", group: "Instruments" },
    { word: "Violin", group: "Instruments" },
    { word: "Drum", group: "Instruments" },
    { word: "Circle", group: "Shapes" },
    { word: "Square", group: "Shapes" },
    { word: "Triangle", group: "Shapes" },
    { word: "Rectangle", group: "Shapes" },
];

const gameContainer = document.getElementById("game-container");
const feedback = document.getElementById("feedback");
const attemptsLeft = document.getElementById("attempts");
const submitButton = document.getElementById("submit-btn");

let selectedWords = [];
let attempts = 4;

// Shuffle words and render them
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
        return;
    }

    // Check if all selected words are in the same group
    const group = selectedWords[0].group;
    const allMatch = selectedWords.every(word => word.group === group);

    if (allMatch) {
        feedback.textContent = `Correct! Group: ${group}`;
        selectedWords.forEach(word => {
            document.querySelector(`.word-card:contains("${word.word}")`).remove();
        });
        selectedWords = [];
    } else {
        feedback.textContent = "Incorrect group!";
        attempts--;
        attemptsLeft.textContent = attempts;
        if (attempts === 0) {
            feedback.textContent = "Game Over! Try again.";
            submitButton.disabled = true;
        }
    }

    // Clear selections
    document.querySelectorAll(".word-card.selected").forEach(div => div.classList.remove("selected"));
    selectedWords = [];
}

