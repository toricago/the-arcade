var canvas = document.getElementById("gameCanvas")
var ctx = canvas.getContext("2d")

var snake = [
  { x: 10, y: 10 },
  { x: 9, y: 10 },
  { x: 8, y: 10 },
]
var direction = "right"
var food = {
  x: Math.floor(Math.random() * 40),
  y: Math.floor(Math.random() * 40),
}
var score = 0
var end = false

document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowLeft" && direction !== "right") {
    direction = "left"
  } else if (event.key === "ArrowUp" && direction !== "down") {
    direction = "up"
  } else if (event.key === "ArrowRight" && direction !== "left") {
    direction = "right"
  } else if (event.key === "ArrowDown" && direction !== "up") {
    direction = "down"
  }
})

function drawSnake() {
  ctx.fillStyle = "#333"
  snake.forEach(function (segment) {
    ctx.fillRect(segment.x * 10, segment.y * 10, 10, 10)
  })
}

function moveSnake() {
  var head = { x: snake[0].x, y: snake[0].y }
  if (direction === "left") {
    head.x -= 1
  } else if (direction === "up") {
    head.y -= 1
  } else if (direction === "right") {
    head.x += 1
  } else if (direction === "down") {
    head.y += 1
  }
  if (
    head.x < 0 ||
    head.x >= canvas.width / 10 ||
    head.y < 0 ||
    head.y >= canvas.height / 10
  ) {
    end = true
    return
  }
  for (var i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      end = true
      return
    }
  }
  snake.unshift(head)
  if (head.x === food.x && head.y === food.y) {
    food = {
      x: Math.floor(Math.random() * 40),
      y: Math.floor(Math.random() * 40),
    }
    score += 10
  } else {
    snake.pop()
  }
}

function drawFood() {
  ctx.fillStyle = "#f00"
  ctx.fillRect(food.x * 10, food.y * 10, 10, 10)
}

function drawScore() {
  ctx.fillStyle = "#333"
  ctx.font = "20px Arial"
  ctx.fillText("Score: " + score, 10, 30)
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
}

function gameLoop() {
  if (end) return
  clearCanvas()
  moveSnake()
  drawSnake()
  drawFood()
  drawScore()
  setTimeout(gameLoop, 100)
}

gameLoop()
