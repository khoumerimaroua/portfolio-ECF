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
const numBubbles = 25; // Set the number of bubbles you want to display

for (let i = 0; i < numBubbles; i++) {
    const size = Math.random() * 50 + 10;
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
// verification de formulaire 
const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");
const textarea1 = document.getElementById("textarea1");

// Fonction pour afficher les erreurs
function showError(input, message) {
    const formField = input.parentElement;
    const errorMessage = formField.querySelector("small");
    const errorIcon = formField.querySelector(".fa-circle-exclamation");
    const successIcon = formField.querySelector(".fa-circle-check");
    formField.classList.remove("success");
    formField.classList.add("error");
    errorMessage.innerText = message;
    errorMessage.style.visibility = "visible";
    errorIcon.style.visibility = "visible";
    successIcon.style.visibility = "hidden";
}

// Fonction pour afficher la validation
function showSuccess(input) {
    const formField = input.parentElement;
    const errorIcon = formField.querySelector(".fa-circle-exclamation");
    const successIcon = formField.querySelector(".fa-circle-check");
    const errorMessage = formField.querySelector("small");
    formField.classList.remove("error");
    formField.classList.add("success");
    errorMessage.style.visibility = "hidden";
    errorIcon.style.visibility = "hidden";
    successIcon.style.visibility = "visible";
}

// Fonction pour vérifier la longueur d'une chaîne de caractères
function checkLength(input, min, max) {
    if (input.value.trim() === '') {
        showError(input, `${input.previousElementSibling.innerText} ne peut pas être vide.`);
    } else if (input.value.length < min) {
        showError(input, `${input.previousElementSibling.innerText} doit contenir au moins ${min} caractères.`);
    } else if (input.value.length > max) {
        showError(input, `${input.previousElementSibling.innerText} doit contenir au plus ${max} caractères.`);
    } else {
        showSuccess(input);
    }
}

// Fonction pour vérifier si deux champs sont identiques
function checkMatch(input1, input2) {
    if (input1.value !== input2.value) {
        showError(input2, "Les mots de passe ne correspondent pas.");
    }
}

// Fonction pour valider l'adresse email
function checkEmail(input) {
    const regex = /^([a-zA-Z0-9_\.\-])+@([a-zA-Z0-9_\.\-])+\.([a-zA-Z]{2,4})$/;
    if (input.value.trim() === '') {
        showError(input, "L'adresse email ne peut pas être vide.");
    } else if (regex.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, "L'adresse email n'est pas valide.");
    }
}

// Fonction pour valider le mot de passe
function checkPassword(input) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,20}$/;
    if (input.value.trim() === '') {
        showError(input, "Le mot de passe ne peut pas être vide.");
    } else if (regex.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, "Le mot de passe doit contenir entre 6 et 20 caractères, au moins une lettre minuscule, une lettre majuscule et un chiffre.");
    }
}

// Fonction pour valider le formulaire
function checkForm(event) {
    event.preventDefault();
    let isValid = true;

    // Vérification du champ "username"
    if (username.value === '') {
        showError(username, "Le champ nom d'utilisateur est requis.");
        isValid = false;
    } else {
        checkLength(username, 3, 15);
    }

    // Vérification du champ "email"
    if (email.value === '') {
        showError(email, "Le champ email est requis.");
        isValid = false;
    } else {
        checkEmail(email);
    }

    // Vérification du champ "password"
    if (password.value === '') {
        showError(password, "Le champ mot de passe est requis.");
        isValid = false;
    } else {
        // Vérification de la force du mot de passe
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
        if (!passwordRegex.test(password.value)) {
            showError(password, "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre.");
            isValid = false;
        } else {
            showSuccess(password);
        }
    }

    // Vérification du champ "password2"
    if (password2.value === '') {
        showError(password2, "Le champ confirmation de mot de passe est requis.");
        isValid = false;
    } else {
        checkMatch(password, password2);
    }

    // Vérification du champ "textarea1"
    if (textarea1.value === '') {
        showError(textarea1, "Le champ message est requis.");
        isValid = false;
    } else {
        checkLength(textarea1, 10, 200);
    }

    // Si tous les champs sont valides, on envoie le formulaire
    if (isValid) {
        form.submit();
    }
}
