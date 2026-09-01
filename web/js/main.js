document.addEventListener("DOMContentLoaded", () => {
const homeScreen = document.getElementById("homeScreen");
const createScreen = document.getElementById("createScreen");
const careerScreen = document.getElementById("careerScreen");

const startButton = document.getElementById("startButton");
const backButton = document.getElementById("backButton");

const runnerName = document.getElementById("runnerName");
const previewName = document.getElementById("previewName");
const createRunnerButton = document.getElementById("createRunnerButton");

const careerName = document.getElementById("careerName");
const careerProfile = document.getElementById("careerProfile");

const profileCards = document.querySelectorAll(".profile-card");
const navItems = document.querySelectorAll(".nav-item");

let selectedProfile = null;

const profileNames = {
grimpeur: "Grimpeur",
rouleur: "Rouleur",
descendeur: "Descendeur",
ultra: "Ultra",
polyvalent: "Polyvalent"
};


/* =========================
CHANGER D'ÉCRAN
========================== */

function showScreen(screen) {
document.querySelectorAll(".screen").forEach((item) => {
item.classList.remove("active");
});

screen.classList.add("active");

navItems.forEach((item) => {
item.classList.remove("active");
});

const matchingNav = document.querySelector(
`.nav-item[data-screen="${screen.id}"]`
);

if (matchingNav) {
matchingNav.classList.add("active");
}

window.scrollTo({
top: 0,
behavior: "instant"
});
}


/* =========================
ACCUEIL → CRÉATION
========================== */

startButton.addEventListener("click", () => {
showScreen(createScreen);
runnerName.focus();
});


/* =========================
RETOUR ACCUEIL
========================== */

backButton.addEventListener("click", () => {
showScreen(homeScreen);
});


/* =========================
NOM DU RUNNER
========================== */

runnerName.addEventListener("input", () => {
const name = runnerName.value.trim();

previewName.textContent = name || "Ton prénom";

updateCreateButton();
});


/* =========================
CHOIX DU PROFIL
========================== */

profileCards.forEach((card) => {
card.addEventListener("click", () => {

profileCards.forEach((item) => {
item.classList.remove("selected");
});

card.classList.add("selected");

selectedProfile = card.dataset.profile;

updateCreateButton();
});
});


/* =========================
VALIDATION
========================== */

function updateCreateButton() {
const validName = runnerName.value.trim().length >= 2;
const validProfile = selectedProfile !== null;

createRunnerButton.disabled = !(validName && validProfile);
}


/* =========================
CRÉER LE RUNNER
========================== */

createRunnerButton.addEventListener("click", () => {

const name = runnerName.value.trim();

if (name.length < 2 || !selectedProfile) {
return;
}

const runner = {
name: name,
profile: selectedProfile,
level: 1,
races: 0,
victories: 0,
xp: 0
};

localStorage.setItem(
"trailManagerRunner",
JSON.stringify(runner)
);

careerName.textContent = runner.name;

careerProfile.textContent =
profileNames[runner.profile] || "Polyvalent";

showScreen(careerScreen);
});


/* =========================
NAVIGATION
========================== */

navItems.forEach((item) => {

item.addEventListener("click", () => {

const targetId = item.dataset.screen;

if (!targetId) {
return;
}

const targetScreen = document.getElementById(targetId);

if (targetScreen) {
showScreen(targetScreen);
}
});

});


/* =========================
CHARGER UNE CARRIÈRE
========================== */

function loadRunner() {

const savedRunner =
localStorage.getItem("trailManagerRunner");

if (!savedRunner) {
return;
}

try {

const runner = JSON.parse(savedRunner);

careerName.textContent =
runner.name || "Runner";

careerProfile.textContent =
profileNames[runner.profile] || "Polyvalent";

} catch (error) {

console.warn(
"Impossible de charger le runner sauvegardé."
);

localStorage.removeItem(
"trailManagerRunner"
);
}
}


/* =========================
INITIALISATION
========================== */

loadRunner();
updateCreateButton();

});
