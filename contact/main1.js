//  menu Hamberg
function CambiarClase() {
    let siteNav = document.getElementById('site-nav');
    siteNav.classList.toggle('site-nav-open');
    let menuOpen = document.getElementById('menu-toggle');
    menuOpen.classList.toggle('menu-open');
}
// bullon background//
const canvas = document.createElement("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.getElementById("background").appendChild(canvas);
const context = canvas.getContext("2d");


const bubbles = [];
const numBubbles = 70; // Set the number of bubbles you want to display

for (let i = 0; i < numBubbles; i++) {
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
// validation du formulaire
const form = document.querySelector("#signup");
const usernameEl = document.querySelector("#username");
const emailEl = document.querySelector("#email");
const messageEl = document.querySelector("#message");

const showError = (inputEl, message) => {
    const formField = inputEl.parentElement;
    const errorEl = formField.querySelector("small");
    formField.classList.remove("success");
    formField.classList.add("error");
    errorEl.textContent = message;
};

const showSuccess = (inputEl) => {
    const formField = inputEl.parentElement;
    const errorEl = formField.querySelector("small");
    formField.classList.remove("error");
    formField.classList.add("success");
    errorEl.textContent = "";
};

const validateUsername = () => {
    const value = usernameEl.value.trim();
    if (value === "") {
        showError(usernameEl, "Le nom d'utilisateur ne peut pas être vide.");
        return false;
    } else if (value.length < 3 || value.length > 25) {
        showError(
            usernameEl,
            "Le nom d'utilisateur doit contenir entre 3 et 25 caractères."
        );
        return false;
    } else {
        showSuccess(usernameEl);
        return true;
    }
};

const validateEmail = () => {
    const value = emailEl.value.trim();
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (value === "") {
        showError(emailEl, "L'email ne peut pas être vide.");
        return false;
    } else if (!emailRegex.test(value)) {
        showError(emailEl, "L'email n'est pas valide.");
        return false;
    } else {
        showSuccess(emailEl);
        return true;
    }
};

const validateMessage = () => {
    const value = messageEl.value.trim();
    if (value === "") {
        showError(messageEl, "Le message ne peut pas être vide.");
        return false;
    } else {
        showSuccess(messageEl);
        return true;
    }
};
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const isUsernameValid = validateUsername();
    const isEmailValid = validateEmail();
    const isMessageValid = validateMessage();
    const isFormValid = isUsernameValid && isEmailValid && isMessageValid;
    if (isFormValid) {
        console.log("Formulaire valide !");
        // Envoyer le formulaire
        Email.send({
            Host: "smtp.elasticemail.com",
            Username: "khoumerimaroua89@gmail.com",
            Password: "6894987EA283C8A0E6EB5FC6F2B5DE325046",
            To: 'khoumerimaroua89@gmail.com',
            From: "khoumerimaroua89@gmail.com",
            Subject: "This is the subject",
            Body: "And this is the body"
        }).then(
            message => {
                alert("Le message a été envoyé avec succès !");
                form.reset();
            },
            error => {
                alert("Désolé, une erreur s'est produite lors de l'envoi du message. Veuillez réessayer plus tard.");
            }
        );
    } else {
        // Afficher un message d'erreur si le formulaire n'est pas valide
        alert("Désolé, le formulaire n'est pas valide. Veuillez vérifier les champs");
    }
});
