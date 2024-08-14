const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20;
const canvasSize = 400;
let snake = [{ x: box * 5, y: box * 5 }];
let food = {};
let direction = "RIGHT";
let score = 0;

document.addEventListener("keydown", changeDirection);
document.getElementById("startButton").addEventListener("click", startGame);

function startGame() {
    score = 0;
    snake = [{ x: box * 5, y: box * 5 }];
    direction = "RIGHT";
    generateFood();
    game = setInterval(updateGame, 100);
}

function generateFood() {
    food = {
        x: Math.floor(Math.random() * (canvasSize / box)) * box,
        y: Math.floor(Math.random() * (canvasSize / box)) * box,
    };
}

function changeDirection(event) {
    if (event.keyCode === 37 && direction !== "RIGHT") direction = "LEFT";
    else if (event.keyCode === 38 && direction !== "DOWN") direction = "UP";
    else if (event.keyCode === 39 && direction !== "LEFT") direction = "RIGHT";
    else if (event.keyCode === 40 && direction !== "UP") direction = "DOWN";
}

function updateGame() {
    const head = { x: snake[0].x, y: snake[0].y };

    if (direction === "LEFT") head.x -= box;
    else if (direction === "UP") head.y -= box;
    else if (direction === "RIGHT") head.x += box;
    else if (direction === "DOWN") head.y += box;

    if (head.x === food.x && head.y === food.y) {
        score++;
        generateFood();
    } else {
        snake.pop();
    }

    if (
        head.x < 0 || head.y < 0 || head.x >= canvasSize || head.y >= canvasSize ||
        snake.some(segment => segment.x === head.x && segment.y === head.y)
    ) {
        clearInterval(game);
        alert("Game Over! Your score: " + score);
        return;
    }

    snake.unshift(head);

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? "green" : "white";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeStyle = "black";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    document.getElementById("score").innerHTML = "Score: " + score;
}
