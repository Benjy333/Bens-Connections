// Select the tiles and the correct answers section
const tiles = document.querySelectorAll('.tile');
const correctAnswers = document.getElementById('correct-answers');
let selectedTiles = [];

// Function to handle tile selection
function toggleSelection(tile) {
    if (tile.classList.contains("selected")) {
        tile.classList.remove("selected");
        selectedTiles = selectedTiles.filter(t => t !== tile);
    } else if (selectedTiles.length < 4) {
        tile.classList.add("selected");
        selectedTiles.push(tile);
    }

    if (selectedTiles.length === 4) {
        checkGroup();
    }
}

// Function to check if the selected group is correct
function checkGroup() {
    const words = selectedTiles.map(tile => tile.textContent);

    // Replace this with your correct answer groups
    const correctGroups = [
        ["Word 1", "Word 2", "Word 3", "Word 4"],
        ["Word 5", "Word 6", "Word 7", "Word 8"],
    ];

    const isCorrect = correctGroups.some(group =>
        group.every(word => words.includes(word))
    );

    if (isCorrect) {
        moveTilesToBottom();
    } else {
        alert("Incorrect group!");
        selectedTiles.forEach(tile => tile.classList.remove("selected"));
        selectedTiles = [];
    }
}

// Function to animate and move tiles to the bottom
function moveTilesToBottom() {
    selectedTiles.forEach(tile => {
        tile.classList.add("correct-group");

        // After animation, move the tile to the correct answers section
        setTimeout(() => {
            tile.classList.remove("selected", "correct-group");
            correctAnswers.appendChild(tile);
        }, 800);
    });

    selectedTiles = [];
}

// Attach event listeners to tiles
tiles.forEach(tile => {
    tile.addEventListener("click", () => toggleSelection(tile));
});
