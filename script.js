//html eliment
const gameBoard = document.getElementById("game-board");
const image = document.getElementById("image");
const image2 = document.getElementById("image2");
const startButton = document.getElementById("start-btn");

const upButton = document.getElementById("up");
const downButton = document.getElementById("down");
const leftButton = document.getElementById("left");
const rightButton = document.getElementById("right");

const scroreBoard = document.getElementById("point");
//game varivable
let snake = [{ x: 10, y: 10 }];
let direction = "right";
let gameInterval;
let isgameStart = false;
const gridSize = 20;
let food = generateFood();
let point = 0;

// draw snake food etc

function draw() {
  gameBoard.innerHTML = "";
  if (isgameStart) {
    drawSnake();
    drawFood();
  }
}

function drawSnake() {
  snake.forEach((segment) => {
    const gameEliment = createGameEliment("div", "snake");
    gameBoard.appendChild(gameEliment);
    setPosition(gameEliment, segment);
  });
}

function createGameEliment(Etag, tagClassName) {
  const tag = document.createElement(Etag);
  tag.className = tagClassName;
  return tag;
}

function setPosition(element, position) {
  element.style.gridColumn = position.x;
  element.style.gridRow = position.y;
}

function moveSnake() {
  const head = { ...snake[0] };

  switch (direction) {
    case "up":
      head.y--;
      break;
    case "down":
      head.y++;
      break;
    case "left":
      head.x--;
      break;
    case "right":
      head.x++;
      break;
  }
  snake.unshift(head);
  if (head.x == food.x && head.y == food.y) {
    console.log(food.x, food);
    point = point + 1;
    scroreBoard.innerText = "Score: " + point;
    food = generateFood();
  } else {
    snake.pop();
  }
}

function GameControl(event) {
  if (event.key == " ") {
    startGame();
  } else {
    switch (event.key) {
      case "ArrowUp":
        if (direction !== "down") {
          direction = "up";
        }
        break;
      case "ArrowDown":
        if (direction !== "up") {
          direction = "down";
        }
        break;
      case "ArrowLeft":
        if (direction !== "right") {
          direction = "left";
        }
        break;
      case "ArrowRight":
        if (direction !== "left") {
          direction = "right";
        }
        break;
    }
  }
}

//genarate food

function drawFood() {
  const gameEliment = createGameEliment("div", "food");
  gameBoard.appendChild(gameEliment);
  setPosition(gameEliment, food);
}

function generateFood() {
  let x, y;
  let overlap
  do {
    x = Math.floor(Math.random() * gridSize) + 1;
    y = Math.floor(Math.random() * gridSize) + 1;

    // Check if the new coordinates overlap with the snake
   overlap = snake.some(segment => segment.x === x && segment.y === y);

    // If there's an overlap, generate new coordinates
  } while (overlap);

  return { x, y };
}

function collision() {
  const head = snake[0];
  if (head.x < 1 || head.x > gridSize || head.y < 1 || head.y > gridSize) {
    isgameStart = false;

    snake = [{ x: 10, y: 10 }];
    startButton.style.display = "inline";
    image2.style.display = "block";
    draw();
    clearInterval(gameInterval);
  }

  for (let i = 1; i < snake.length; i++) {
    if (head.x == snake[i].x && head.y == snake[i].y) {
      isgameStart = false;

      snake = [{ x: 10, y: 10 }];
      startButton.style.display = "inline";
      image2.style.display = "block";
      draw();
      clearInterval(gameInterval);
    }
  }
}

document.addEventListener("keydown", GameControl);

function GameControl2(direction2) {
  console.log(direction2);
  if (direction2 == "start") {
    startGame();
  } else {
    switch (direction2) {
      case "ArrowUp":
        if (direction !== "down") {
          direction = "up";
        }
        break;
      case "ArrowDown":
        if (direction !== "up") {
          direction = "down";
        }
        break;
      case "ArrowLeft":
        if (direction !== "right") {
          direction = "left";
        }
        break;
      case "ArrowRight":
        if (direction !== "left") {
          direction = "right";
        }
        break;
    }
  }
}

upButton.addEventListener("click", () => GameControl2("ArrowUp"));
downButton.addEventListener("click", () => GameControl2("ArrowDown"));
leftButton.addEventListener("click", () => GameControl2("ArrowLeft"));
rightButton.addEventListener("click", () => GameControl2("ArrowRight"));

function startGame() {
  point = 0
  startButton.style.display = "none";
  isgameStart = true;
  image.style.display = "none";
  image2.style.display = "none";
  clearInterval(gameInterval);
  scroreBoard.innerText = "Score: " + 0;
  gameInterval = setInterval(() => {
    //  console.log(snake[0].x)
    moveSnake();
    collision();
    draw();
    generateFood();
  }, 200);
}

function pauseGame() {
  clearInterval(gameInterval);
}

startButton.addEventListener("click", startGame);
