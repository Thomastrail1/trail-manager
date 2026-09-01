document.addEventListener("DOMContentLoaded", () => {

const screens = document.querySelectorAll(".screen");
const navItems = document.querySelectorAll(".nav-item");

const runnerName = document.getElementById("runnerName");
const previewName = document.getElementById("previewName");
const createButton = document.getElementById("createRunnerButton");
const profileCards = document.querySelectorAll(".profile-card");

const careerName = document.getElementById("careerName");
const careerProfile = document.getElementById("careerProfile");
const careerLevel = document.getElementById("careerLevel");
const xpBar = document.getElementById("xpBar");
const xpText = document.getElementById("xpText");
const energyValue = document.getElementById("energyValue");
const moneyValue = document.getElementById("moneyValue");
const racesValue = document.getElementById("racesValue");
const winsValue = document.getElementById("winsValue");

const raceResult = document.getElementById("raceResult");

let selectedProfile = null;

let runner = null;

try {
runner = JSON.parse(
localStorage.getItem("trailManagerRunner")
);
} catch (error) {
runner = null;
}


const profileNames = {
grimpeur: "Grimpeur",
rouleur: "Rouleur",
descendeur: "Descendeur",
ultra: "Ultra",
polyvalent: "Polyvalent"
};


// =========================
// AFFICHER UN ÉCRAN
// =========================

function showScreen(screenId) {

screens.forEach((screen) => {

if (screen.id === screenId) {
screen.classList.add("active");
} else {
screen.classList.remove("active");
}

});


navItems.forEach((item) => {

if (item.dataset.screen === screenId) {
item.classList.add("active");
} else {
item.classList.remove("active");
}

});

window.scrollTo(0, 0);
}


// =========================
// ACCUEIL
// =========================

const startButton =
document.getElementById("startButton");

if (startButton) {

startButton.onclick = function () {
showScreen("createScreen");
};

}


// =========================
// RETOUR
// =========================

const backButton =
document.getElementById("backButton");

if (backButton) {

backButton.onclick = function () {
showScreen("homeScreen");
};

}


const raceBackButton =
document.getElementById("raceBackButton");

if (raceBackButton) {

raceBackButton.onclick = function () {
showScreen("careerScreen");
};

}


// =========================
// NOM DU RUNNER
// =========================

if (runnerName) {

runnerName.oninput = function () {

const name =
runnerName.value.trim();

if (previewName) {
previewName.textContent =
name || "Ton prénom";
}

};

}


// =========================
// PROFILS
// =========================

profileCards.forEach((card) => {

card.onclick = function () {

profileCards.forEach((item) => {
item.classList.remove("selected");
});

card.classList.add("selected");

selectedProfile =
card.dataset.profile;

};

});


// =========================
// CREER LE RUNNER
// =========================

if (createButton) {

createButton.onclick = function () {

const name =
runnerName
? runnerName.value.trim()
: "";

if (name.length < 2) {

if (runnerName) {
runnerName.focus();
}

return;
}


if (!selectedProfile) {

alert(
"Choisis un profil pour ton runner."
);

return;
}


runner = {

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


updateCareer();


showScreen("careerScreen");

};

}


// =========================
// AFFICHER LA CARRIERE
// =========================

function updateCareer() {

if (!runner) {
return;
}


if (careerName) {
careerName.textContent =
runner.name;
}


if (careerProfile) {
careerProfile.textContent =
profileNames[runner.profile]
|| "Polyvalent";
}


if (careerLevel) {
careerLevel.textContent =
runner.level;
}


if (xpBar) {

xpBar.style.width =
Math.min(
100,
runner.xp
) + "%";

}


if (xpText) {

xpText.textContent =
runner.xp +
" / 100 XP";

}


if (energyValue) {
energyValue.textContent =
runner.energy;
}


if (moneyValue) {

moneyValue.textContent =
runner.money + " €";

}


if (racesValue) {

racesValue.textContent =
runner.races;

}


if (winsValue) {

winsValue.textContent =
runner.victories;

}

}


// =========================
// VOIR LA COURSE
// =========================

const raceButton =
document.getElementById("raceButton");

if (raceButton) {

raceButton.onclick = function () {

showScreen("raceScreen");

};

}


// =========================
// STRATEGIES
// =========================

const strategyCards =
document.querySelectorAll(
".strategy-card"
);


strategyCards.forEach((card) => {

card.onclick = function () {

strategyCards.forEach((item) => {

item.classList.remove(
"selected"
);

});


card.classList.add(
"selected"
);

};

});


// =========================
// LANCER LA COURSE
// =========================

const startRaceButton =
document.getElementById(
"startRaceButton"
);


if (startRaceButton) {

startRaceButton.onclick = function () {

if (!runner) {

showScreen(
"createScreen"
);

return;
}


const selectedStrategy =
document.querySelector(
".strategy-card.selected"
);


const strategy =
selectedStrategy
? selectedStrategy.dataset.strategy
: "prudent";


const energyCost = {

prudent: 20,

regulier: 30,

attaque: 45

};


const xpGain = {

prudent: 25,

regulier: 35,

attaque: 45

};


runner.energy =
Math.max(
0,
runner.energy -
energyCost[strategy]
);


runner.xp +=
xpGain[strategy];


runner.races += 1;


let levelMessage = "";


if (runner.xp >= 100) {

runner.xp -= 100;

runner.level += 1;

runner.money += 150;

levelMessage =
"<br><br><strong>" +
"Niveau supérieur !" +
"</strong>";

}


let resultText = "";


if (strategy === "attaque") {

resultText =
"Tu as attaqué fort dès le départ. " +
"La performance est bonne, mais tu termines très fatigué.";

} else if (strategy === "regulier") {

resultText =
"Course solide et régulière. " +
"Tu as bien géré ton effort.";

} else {

resultText =
"Course maîtrisée. " +
"Tu termines avec encore des réserves.";

}


localStorage.setItem(
"trailManagerRunner",
JSON.stringify(runner)
);


updateCareer();


if (raceResult) {

raceResult.innerHTML =
"<strong>🏁 Course terminée</strong><br><br>" +
resultText +
levelMessage;

raceResult.classList.remove(
"hidden"
);

}

};

}


// =========================
// NAVIGATION
// =========================

navItems.forEach((item) => {

item.onclick = function () {

const target =
item.dataset.screen;


if (
target === "careerScreen" &&
!runner
) {

showScreen(
"createScreen"
);

return;

}


showScreen(target);

};

});


// =========================
// INITIALISATION
// =========================

updateCareer();

});
