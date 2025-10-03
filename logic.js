
document.getElementById('year').textContent = new Date().getFullYear();


window.addEventListener("load", () => {
  document.querySelector("h1.title").classList.add("active");
  document.querySelector(".subtitle").classList.add("active");
  document.querySelector(".divider").classList.add("active");
});


const reveals = document.querySelectorAll('.reveal');
const obsOptions = { threshold: 0.12 };
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      revealObserver.unobserve(entry.target);
    }
  });
}, obsOptions);
reveals.forEach(el => revealObserver.observe(el));


const tiltCards = document.querySelectorAll('[data-tilt]');
tiltCards.forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rotateY = (px - 0.5) * 10; 
    const rotateX = (0.5 - py) * 8;
    card.style.transform = `perspective(900px) translateY(-6px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    card.classList.add('is-tilt');
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.classList.remove('is-tilt');
  });
  card.addEventListener('touchstart', () => {
    card.classList.add('is-tilt');
    setTimeout(()=>card.classList.remove('is-tilt'), 600);
  });
});


const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();
let offset = 0;
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "rgba(255,255,255,0.07)";
  ctx.lineWidth = 1;
  const spacing = 60;
  offset += 0.3;
  for (let x = -spacing; x < canvas.width + spacing; x += spacing) {
    ctx.beginPath();
    ctx.moveTo(x + offset, 0);
    ctx.lineTo(x + offset, canvas.height);
    ctx.stroke();
  }
  for (let y = -spacing; y < canvas.height + spacing; y += spacing) {
    ctx.beginPath();
    ctx.moveTo(0, y + offset);
    ctx.lineTo(canvas.width, y + offset);
    ctx.stroke();
  }
  requestAnimationFrame(animate);
}
animate();
