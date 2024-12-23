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
const shuffleButton = document.getElementById("shuffle-btn");
const howToPlayBtn = document.getElementById("how-to-play-btn");
const modal = document.getElementById("how-to-play-modal");
const closeBtn = document.querySelector(".close-btn");

function shuffleGrid() {
    const shuffledWords = words.sort(() => Math.random() - 0.5);
    gameContainer.innerHTML = "";
    shuffledWords.forEach((item) => {
        const div = document.createElement("div");
        div.className = "word-card";
        div.textContent = item.word;
        gameContainer.appendChild(div);
    });
}

shuffleButton.addEventListener("click", shuffleGrid);
howToPlayBtn.addEventListener("click", () => (modal.style.display = "block"));
closeBtn.addEventListener("click", () => (modal.style.display = "none"));
window.addEventListener("click", (event) => {
    if (event.target === modal) modal.style.display = "none";
});

shuffleGrid();
