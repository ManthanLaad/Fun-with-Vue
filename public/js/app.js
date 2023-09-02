let lastClickTime = Date.now()
const maxEllipses = 20 // Maximum number of ellipses
let ellipses = []

// Fullscreen button click event
const fullscreenButton = document.getElementById("fullscreenButton")
fullscreenButton.addEventListener("click", toggleFullscreen)

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch((err) => {
      console.error(
        "Error attempting to enable full-screen mode: " + err.message
      )
    })
  } else {
    document.exitFullscreen()
  }
}

function setupCanvas() {
  const canvas = document.getElementById("canvas")
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}

function handlePageClick(event) {
  lastClickTime = Date.now()

  const canvas = document.getElementById("canvas")
  const canvasRect = canvas.getBoundingClientRect()
  const clickX = event.clientX - canvasRect.left
  const clickY = event.clientY - canvasRect.top

  const newEllipse = {
    x: clickX,
    y: clickY,
    radiusX: 10 + Math.random() * 20,
    radiusY: 10 + Math.random() * 20,
    color: getRandomColor(),
    animationSpeedX: Math.random() * 2 + 1,
    animationSpeedY: Math.random() * 1.5 + 1,
    particles: [], // Array to store particles with similar color to the ellipse
  }

  // Get the color of the ellipse
  const ellipseColor = newEllipse.color

  // Randomly determine the number of particles (between 3 and 5)
  const numberOfParticles = Math.floor(Math.random() * 3) + 3

  // Create particles for the ellipse with similar color
  for (let i = 0; i < numberOfParticles; i++) {
    const angle = Math.random() * Math.PI * 2

    const speed = Math.random() * 2 + 1 // Random particle speed
    const particleRadius = Math.random() * 2 + 1 // Random particle size

    // Use the color of the ellipse for the particles
    const particleColor = ellipseColor // Set the particle color

    newEllipse.particles.push({
      x: newEllipse.x,
      y: newEllipse.y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      radius: particleRadius,
      life: 300, // Particle life in frames (4 seconds at 60 FPS)
      color: particleColor, // Set the particle color
      initialAlpha: 0, // Initial alpha (transparency)
    })
  }

  // Check if the maximum number of ellipses is reached
  if (ellipses.length >= maxEllipses) {
    ellipses.shift() // Remove the oldest ellipse
  }

  ellipses.push(newEllipse)
}

function getRandomColor() {
  const letters = "0123456789ABCDEF"
  let color = "#"
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

function animate() {
  const canvas = document.getElementById("canvas")
  const ctx = canvas.getContext("2d")

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  ellipses = ellipses.filter((ellipse) => {
    const gradient = ctx.createRadialGradient(
      ellipse.x,
      ellipse.y,
      0,
      ellipse.x,
      ellipse.y,
      Math.max(ellipse.radiusX, ellipse.radiusY)
    )

    gradient.addColorStop(0, ellipse.color)
    gradient.addColorStop(1, "transparent")

    ctx.fillStyle = gradient
    ctx.beginPath()
    ctx.ellipse(
      ellipse.x,
      ellipse.y,
      ellipse.radiusX,
      ellipse.radiusY,
      0,
      0,
      Math.PI * 2
    )
    ctx.fill()

    ellipse.radiusX += ellipse.animationSpeedX
    ellipse.radiusY += ellipse.animationSpeedY

    // Remove ellipses that have expanded beyond the viewport
    return (
      ellipse.x + ellipse.radiusX > 0 &&
      ellipse.x - ellipse.radiusX < canvas.width &&
      ellipse.y + ellipse.radiusY > 0 &&
      ellipse.y - ellipse.radiusY < canvas.height
    )
  })

  // Draw and update particles
  ellipses.forEach((ellipse) => {
    ellipse.particles = ellipse.particles.filter((particle) => {
      if (particle.life <= 0) {
        return false
      }

      // Calculate the current alpha (transparency) based on the remaining life
      const currentAlpha = (300 - particle.life) / 300

      ctx.fillStyle = `rgba(${particle.color}, ${currentAlpha})` // Apply the fade-in effect
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
      ctx.fill()

      // Decrease particle speed and increase particle size over time
      particle.vx *= 0.98
      particle.vy *= 0.98
      particle.radius += 0.025 // Increase particle size
      particle.life -= 1

      // Update particle position
      particle.x += particle.vx
      particle.y += particle.vy

      return true
    })
  })

  requestAnimationFrame(animate)
}

function simulateClick() {
  const numberOfClicks = Math.floor(Math.random() * 5) + 1

  for (let i = 0; i < numberOfClicks; i++) {
    const randomX = Math.random() * window.innerWidth
    const randomY = Math.random() * window.innerHeight

    handlePageClick({
      clientX: randomX,
      clientY: randomY,
    })
  }
}

// Attach event listeners
window.addEventListener("resize", setupCanvas)
document.body.addEventListener("click", handlePageClick)

// Initialize canvas and start animation
setupCanvas()
animate()

// Set a timer to simulate clicks if no actual clicks are made for 10 seconds
setInterval(simulateClick, 10000)
