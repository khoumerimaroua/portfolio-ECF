//  menu Hamberg
function CambiarClase() {
    let siteNav = document.getElementById('site-nav');
    siteNav.classList.toggle('site-nav-open');
    let menuOpen = document.getElementById('menu-toggle');
    menuOpen.classList.toggle('menu-open');
}
// bullon backgroynd//
const canvas = document.createElement("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.getElementById("background").appendChild(canvas);

const context = canvas.getContext("2d");

const bubbles = [];
for (let i = 0; i < 70; i++) {
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

// récupérer l'api
const APIKEY = '1ad2e2d667e8ae70cc862a13beaf5d99';
let apiCall = function (city) {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}&units=metric`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            document.querySelector('#city').innerHTML = data.name;
            document.querySelector('#temp').innerHTML = '<i class="fa-solid fa-temperature-high" style="color: #000000;"></i>' + data.main.temp + '°';
            document.querySelector('#humidity').innerHTML = 'humidity:' + data.main.humidity + '%';
            document.querySelector('#wind').innerHTML = '<i class="fa-solid fa-wind" style="color: #000000;"></i>' + data.wind.speed + 'M/s';
        })
        .catch(err => console.log('erreur:' + err));
};
// ecouteur d'evenement
document.querySelector('#forme').addEventListener('submit', function (e) {
    e.preventDefault(); // rafraîchissement de la page)
    let ville = document.querySelector('#inputCity').value;
    apiCall(ville);
});
// appel par defaut au chargement de la page
apiCall('Marseille');