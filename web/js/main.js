document.addEventListener("DOMContentLoaded", function () {

// =========================
// ÉCRANS
// =========================

const homeScreen = document.getElementById("homeScreen");
const createScreen = document.getElementById("createScreen");
const careerScreen = document.getElementById("careerScreen");

// =========================
// BOUTONS
// =========================

const startButton = document.getElementById("startButton");
const backButton = document.getElementById("backButton");
const createRunnerButton = document.getElementById("createRunnerButton");

// =========================
// FORMULAIRE
// =========================

const runnerName = document.getElementById("runnerName");
const previewName = document.getElementById("previewName");

const careerName = document.getElementById("careerName");
const careerProfile = document.getElementById("careerProfile");

const profileCards = document.querySelectorAll(".profile-card");
const navItems = document.querySelectorAll(".nav-item");

let selectedProfile = "";

const profileNames = {
grimpeur: "Grimpeur",
rouleur: "Rouleur",
descendeur: "Descendeur",
ultra: "Ultra",
polyvalent: "Polyvalent"
};


// =========================
// CHANGER D'ÉCRAN
// =========================

function showScreen(screen) {

if (!screen) return;

document.querySelectorAll(".screen").forEach(function (item) {
item.classList.remove("active");
});

screen.classList.add("active");

document.querySelectorAll(".nav-item").forEach(function (item) {
item.classList.remove("active");
});

const navButton = document.querySelector(
'.nav-item[data-screen="' + screen.id + '"]'
);

if (navButton) {
navButton.classList.add("active");
}

window.scrollTo(0, 0);
}


// =========================
// ACCUEIL → CRÉATION
// =========================

if (startButton) {
startButton.addEventListener("click", function () {
showScreen(createScreen);

if (runnerName) {
setTimeout(function () {
runnerName.focus();
}, 100);
}
});
}


// =========================
// RETOUR
// =========================

if (backButton) {
backButton.addEventListener("click", function () {
showScreen(homeScreen);
});
}


// =========================
// NOM DU RUNNER
// =========================

if (runnerName) {

runnerName.addEventListener("input", function () {

const name = runnerName.value.trim();

if (previewName) {
previewName.textContent = name || "Ton prénom";
}

updateCreateButton();
});
}


// =========================
// CHOIX DU PROFIL
// =========================

profileCards.forEach(function (card) {

card.addEventListener("click", function () {

profileCards.forEach(function (item) {
item.classList.remove("selected");
});

card.classList.add("selected");

selectedProfile = card.getAttribute("data-profile") || "";

updateCreateButton();
});
});


// =========================
// BOUTON CRÉER
// =========================

function updateCreateButton() {

if (!createRunnerButton) return;

const name =
runnerName ? runnerName.value.trim() : "";

const validName = name.length >= 2;
const validProfile = selectedProfile !== "";

createRunnerButton.disabled = !(validName && validProfile);

if (validName && validProfile) {
createRunnerButton.classList.add("ready");
} else {
createRunnerButton.classList.remove("ready");
}
}


// =========================
// CRÉATION DU RUNNER
// =========================

if (createRunnerButton) {

createRunnerButton.addEventListener("click", function () {

const name =
runnerName ? runnerName.value.trim() : "";

if (name.length < 2) {
return;
}

if (!selectedProfile) {
return;
}

const runner = {
name: name,
profile: selectedProfile,
level: 1,
xp: 0,
races: 0,
victories: 0,
money: 500,
energy: 100
};

localStorage.setItem(
"trailManagerRunner",
JSON.stringify(runner)
);

if (careerName) {
careerName.textContent = runner.name;
}

if (careerProfile) {
careerProfile.textContent =
profileNames[runner.profile] || "Polyvalent";
}

showScreen(careerScreen);
});
}


// =========================
// NAVIGATION BASSE
// =========================

navItems.forEach(function (item) {

item.addEventListener("click", function () {

const targetId = item.getAttribute("data-screen");

if (!targetId) return;

const targetScreen =
document.getElementById(targetId);

if (targetScreen) {
showScreen(targetScreen);
}
});
});


// =========================
// CHARGER LE RUNNER SAUVEGARDÉ
// =========================

function loadRunner() {

const savedRunner =
localStorage.getItem("trailManagerRunner");

if (!savedRunner) {
return;
}

try {

const runner = JSON.parse(savedRunner);

if (careerName) {
careerName.textContent =
runner.name || "Runner";
}

if (careerProfile) {
careerProfile.textContent =
profileNames[runner.profile] || "Polyvalent";
}

} catch (error) {

localStorage.removeItem("trailManagerRunner");

}
}


// =========================
// INITIALISATION
// =========================

loadRunner();
updateCreateButton();

});
