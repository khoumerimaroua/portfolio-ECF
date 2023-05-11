//l'affichage progressif du texte
var text = "Hello ! je suis Khoumeri Marwa, développeuse Full Stack ";
var index = 0;

function typeText() {
    var typingDiv = document.getElementById("typing-text");
    typingDiv.innerHTML = text.substring(0, index) + '<i class="fa-solid fa-hand"></i>';
    index++;
    if (index > text.length) {
        return;
    }
    setTimeout(typeText, 100);
}
typeText();
// background color
const canvas = document.createElement("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight * 0.6; // 60% de la hauteur de la fenêtre
document.getElementById("background").appendChild(canvas);

const context = canvas.getContext("2d");

const bubbles = [];
for (let i = 0; i < 40; i++) {
    const size = Math.random() * 20 + 10;
    bubbles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: size,
        color: "rgba(" + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + "," + Math.random() + ")",
        velocity: {
            x: (Math.random() - 0.5) * 2,
            y: (Math.random() - 0.5) * 2
        }
    });
}

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < bubbles.length; i++) {
        context.beginPath();
        context.arc(bubbles[i].x, bubbles[i].y, bubbles[i].size, 0, 2 * Math.PI);
        context.fillStyle = bubbles[i].color;
        context.fill();
        bubbles[i].x += bubbles[i].velocity.x;
        bubbles[i].y += bubbles[i].velocity.y;
        if (bubbles[i].x < -bubbles[i].size) bubbles[i].x = canvas.width + bubbles[i].size;
        if (bubbles[i].y < -bubbles[i].size) bubbles[i].y = canvas.height + bubbles[i].size;
        if (bubbles[i].x > canvas.width + bubbles[i].size) bubbles[i].x = -bubbles[i].size;
        if (bubbles[i].y > canvas.height + bubbles[i].size) bubbles[i].y = -bubbles[i].size;
    }
    requestAnimationFrame(draw);
}

draw();

// La fleur qui s'ouvre quand tu click sur le bouton
const flowerContainer = document.querySelector('.flower-container');
const flowerBtn = document.querySelector('#flower-btn');

flowerBtn.addEventListener('click', () => {
    flowerContainer.classList.toggle('opened');
});

