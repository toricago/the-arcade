const canvas = document.getElementById("gameCanvas")
const ctx = canvas.getContext("2d")

let birdX = 50
let birdY = canvas.height / 2
let birdVelocity = 0
const gravity = 0.5
let score = 0
let isGameOver = false

// Add obstacle variables
const obstacleWidth = 50
const gapHeight = 150
const minObstacleY = 50
const maxObstacleY = canvas.height - gapHeight - minObstacleY
let obstacleX = canvas.width
let topObstacleY = minObstacleY + Math.random() * (maxObstacleY - minObstacleY)
let bottomObstacleY = topObstacleY + gapHeight

function update() {
  // Check if game is over
  if (isGameOver) {
    return
  }

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // Update bird position
  birdVelocity += gravity
  birdY += birdVelocity

  // Draw bird
  ctx.fillStyle = "yellow"
  ctx.beginPath()
  ctx.arc(birdX, birdY, 20, 0, 2 * Math.PI)
  ctx.fill()

  // Move obstacle
  obstacleX -= 5

  // Check for collision
  if (
    birdY < 0 ||
    birdY > canvas.height ||
    (birdX + 20 > obstacleX &&
      birdX - 20 < obstacleX + obstacleWidth &&
      (birdY - 20 < topObstacleY || birdY + 20 > bottomObstacleY))
  ) {
    isGameOver = true
    alert("Game over! Your score was: " + score)
    location.reload()
  }

  // Check if obstacle has gone off screen
  if (obstacleX < -obstacleWidth) {
    obstacleX = canvas.width
    topObstacleY = minObstacleY + Math.random() * (maxObstacleY - minObstacleY)
    bottomObstacleY = topObstacleY + gapHeight
    score++
  }

  // Draw obstacle
  ctx.fillStyle = "green"
  ctx.fillRect(obstacleX, 0, obstacleWidth, topObstacleY)
  ctx.fillRect(
    obstacleX,
    bottomObstacleY,
    obstacleWidth,
    canvas.height - bottomObstacleY
  )

  // Draw score
  ctx.fillStyle = "black"
  ctx.font = "24px Arial"
  ctx.fillText("Score: " + score, 10, 30)

  // Call update function again
  requestAnimationFrame(update)
}

// Add event listener for clicking the canvas
document.addEventListener("keydown", function () {
  if (!isGameOver) {
    birdVelocity = -10
  }
})

// Start game loop
update()
