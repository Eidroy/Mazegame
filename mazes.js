const LEVEL_1 = [
  ["*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", ".", "*"],
  ["*", "S", ".", ".", ".", ".", ".", "*", "*", ".", "*", ".", "T"],
  ["*", "*", "*", "*", "*", ".", ".", ".", ".", ".", "*", ".", "*"],
  ["*", "*", "*", "*", "*", ".", "*", "*", "*", ".", "*", ".", "*"],
  ["*", "*", "*", "*", "*", ".", "*", "*", "*", "*", "*", ".", "*"],
  ["*", "*", "*", "*", "*", ".", "*", "*", "*", "*", "*", ".", "*"],
  ["*", "*", "*", "*", "*", ".", ".", ".", ".", ".", ".", ".", "*"],
  ["*", "*", "*", "*", "*", ".", "*", "*", "*", "*", "*", "*", "*"],
  ["*", ".", ".", ".", ".", ".", ".", ".", ".", ".", "*", "*", "*"],
  ["*", ".", "*", "*", "*", "*", "*", "*", ".", ".", ".", "*", "*"],
  ["*", ".", ".", ".", ".", "*", "*", "*", "*", "*", "*", "*", "*"],
  ["*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*"],
];

const LEVEL_2 = [
  [
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
  ],
  [
    "*",
    ".",
    "S",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    "*",
  ],
  [
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    ".",
    "*",
  ],
  [
    "*",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    "*",
  ],
  [
    "*",
    ".",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
  ],
  [
    "*",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    "T",
  ],
  [
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
  ],
];

let mazeElement = document.querySelector("main");
let playerX = 1;
let playerY = 1;

let currentLevel = 1;
let LEVELS = [LEVEL_1, LEVEL_2];

function generateMaze() {
  mazeElement.innerHTML = "";
  mazeData = LEVELS[currentLevel - 1];

  mazeData.forEach((row) => {
    const rowElement = document.createElement("div");
    rowElement.classList.add("row");

    row.forEach((cell) => {
      const cellElement = document.createElement("div");
      cellElement.classList.add(cell === "*" ? "wall" : "path");
      if (cell === "S") {
        cellElement.classList.add("player");
      } else if (cell === "T") {
        cellElement.classList.add("target");
      }
      rowElement.appendChild(cellElement);
    });

    mazeElement.appendChild(rowElement);
  });
}

function handleKeyDown(event) {
  let key = event.key;
  let newX = playerX;
  let newY = playerY;

  switch (key) {
    case "ArrowUp":
      newY--;
      break;
    case "ArrowDown":
      newY++;
      break;
    case "ArrowLeft":
      newX--;
      break;
    case "ArrowRight":
      newX++;
      break;
  }

  if (
    newX >= 0 &&
    newX < mazeData[0].length &&
    newY >= 0 &&
    newY < mazeData.length &&
    mazeData[newY][newX] !== "*"
  ) {
    let playerElement = document.querySelector(".player");
    playerElement.classList.remove("player");
    mazeData[playerY][playerX] = ".";

    playerX = newX;
    playerY = newY;

    mazeData[playerY][playerX] = "S";
    playerElement = document.querySelector(
      `.row:nth-child(${playerY + 1}) .path:nth-child(${playerX + 1})`
    );
    playerElement.classList.add("player");

    let targetElement = document.querySelector(".target");

    if (targetElement && playerElement === targetElement) {
      alert("Congratulations! You win!");

      if (currentLevel < LEVELS.length) {
        currentLevel++;
        generateMaze();
      } else {
        alert("You've completed all levels!");
      }
    }
  }
}

generateMaze();
document.addEventListener("keydown", handleKeyDown);
