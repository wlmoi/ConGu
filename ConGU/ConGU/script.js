// Animasi bola berbenturan
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Ukuran canvas sesuaikan dengan ukuran layar
canvas.width = window.innerWidth;
canvas.height = 1500;

// Array untuk menyimpan informasi bola
const balls = [];
const colors = ['rgb(242, 181, 249)', 'rgb(174, 147, 255)', 'rgb(182, 163, 253)', 'rgb(162, 138, 220)', 'rgb(166, 181, 234)'];

// Fungsi untuk membuat bola baru
function createBall(x, y, dx, dy, radius, color) {
  balls.push({ x, y, dx, dy, radius, color });
}

// Fungsi untuk menggambar bola
function drawBalls() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < balls.length; i++) {
    ctx.beginPath();
    ctx.arc(balls[i].x, balls[i].y, balls[i].radius, 0, Math.PI * 2);

    // Efek gelembung: bayangan dan opacity (alpha)
    ctx.shadowColor = balls[i].color;
    ctx.shadowBlur = 20;
    ctx.globalAlpha = 0.6;

    ctx.fillStyle = balls[i].color;
    ctx.fill();
    ctx.closePath();

    // Reset efek setelah menggambar bola
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;

    // Update posisi bola
    balls[i].x += balls[i].dx;
    balls[i].y += balls[i].dy;

    // Kondisi jika bola mencapai tepi canvas
    if (balls[i].x + balls[i].radius > canvas.width || balls[i].x - balls[i].radius < 0) {
      balls[i].dx = -balls[i].dx;
    }

    if (balls[i].y + balls[i].radius > canvas.height || balls[i].y - balls[i].radius < 0) {
      balls[i].dy = -balls[i].dy;
    }
  }

  requestAnimationFrame(drawBalls);
}


// Membuat beberapa bola dengan posisi, kecepatan, dan warna acak
for (let i = 0; i < 100; i++) {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height;
  const dx = (Math.random() - 0.5) * 4;
  const dy = (Math.random() - 0.5) * 4;
  const radius = Math.random() * 20 + 10; // Ukuran bola antara 10-30
  const color = colors[Math.floor(Math.random() * colors.length)];

  createBall(x, y, dx, dy, radius, color);
}

// Memanggil fungsi untuk menggambar bola
drawBalls();
