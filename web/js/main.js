document.addEventListener("DOMContentLoaded", () => {

const screens = document.querySelectorAll(".screen");
const navItems = document.querySelectorAll(".nav-item");

let runner = null;
let selectedProfile = null;

let raceInterval = null;
let raceState = null;

const names = {
grimpeur: "Grimpeur",
rouleur: "Rouleur",
descendeur: "Descendeur",
ultra: "Ultra",
polyvalent: "Polyvalent"
};

const profileStats = {
grimpeur: {
endurance: 55,
climb: 80,
descent: 40,
speed: 50,
management: 55,
fitness: 60
},

rouleur: {
endurance: 55,
climb: 45,
descent: 55,
speed: 80,
management: 60,
fitness: 60
},

descendeur: {
endurance: 50,
climb: 40,
descent: 85,
speed: 70,
management: 50,
fitness: 60
},

ultra: {
endurance: 85,
climb: 60,
descent: 40,
speed: 40,
management: 85,
fitness: 60
},

polyvalent: {
endurance: 60,
climb: 60,
descent: 60,
speed: 60,
management: 60,
fitness: 60
}
};

const equipment = {
shoes: {
standard: {
name: "Standard",
speed: 0,
descent: 0
},
"trail-basic": {
name: "Trail Basic",
speed: 2,
descent: 2
},
"mountain-pro": {
name: "Mountain Pro",
speed: 4,
descent: 5
}
},

bags: {
standard: {
name: "5 L",
management: 0
},
"pack-5l": {
name: "Pack Trail 5L",
management: 3
},
"pack-12l": {
name: "Ultra Pack 12L",
management: 8
}
},

clothes: {
standard: {
name: "Standard",
fitness: 0
}
},

poles: {
standard: {
name: "Aucun",
climb: 0
}
}
};


/* =========================
CHARGEMENT
========================== */

try {
runner = JSON.parse(
localStorage.getItem("trailManagerRunner")
);
} catch (error) {
runner = null;
}


function saveRunner() {

if (!runner) return;

localStorage.setItem(
"trailManagerRunner",
JSON.stringify(runner)
);
}


function showScreen(id) {

screens.forEach(screen => {
screen.classList.toggle(
"active",
screen.id === id
);
});

navItems.forEach(item => {
item.classList.toggle(
"active",
item.dataset.screen === id
);
});

window.scrollTo(0, 0);
}


/* =========================
STATS
========================== */

function getEquipmentBonus() {

if (!runner || !runner.equipment) {
return {
speed: 0,
descent: 0,
management: 0,
fitness: 0,
climb: 0
};
}

const bonus = {
speed: 0,
descent: 0,
management: 0,
fitness: 0,
climb: 0
};

Object.entries(runner.equipment).forEach(
([category, itemId]) => {

const categoryItems =
equipment[category];

if (!categoryItems) return;

const item =
categoryItems[itemId];

if (!item) return;

Object.keys(bonus).forEach(stat => {
bonus[stat] += item[stat] || 0;
});
}
);

return bonus;
}


function getEffectiveStats() {

if (!runner) return null;

const bonus = getEquipmentBonus();

return {
endurance: runner.stats.endurance,
climb:
runner.stats.climb + bonus.climb,
descent:
runner.stats.descent + bonus.descent,
speed:
runner.stats.speed + bonus.speed,
management:
runner.stats.management + bonus.management,
fitness:
runner.stats.fitness + bonus.fitness
};
}


/* =========================
AFFICHAGE RUNNER
========================== */

function renderRunner() {

if (!runner) return;

const nameElement =
document.getElementById(
"runnerScreenName"
);

const levelElement =
document.getElementById(
"runnerScreenLevel"
);

const profileElement =
document.getElementById(
"runnerProfileName"
);

if (nameElement) {
nameElement.textContent =
runner.name;
}

if (levelElement) {
levelElement.textContent =
runner.level;
}

if (profileElement) {
profileElement.textContent =
names[runner.profile] ||
"Polyvalent";
}

renderStats();
renderEquipment();
renderCareer();
renderShopMoney();
}


function renderStats() {

if (!runner) return;

const stats =
getEffectiveStats();

const map = {
Endurance: stats.endurance,
Climb: stats.climb,
Descent: stats.descent,
Speed: stats.speed,
Management: stats.management,
Fitness: stats.fitness
};

Object.entries(map).forEach(
([name, value]) => {

const valueElement =
document.getElementById(
`stat${name}Value`
);

const barElement =
document.getElementById(
`stat${name}Bar`
);

if (valueElement) {
valueElement.textContent =
Math.round(value);
}

if (barElement) {
barElement.style.width =
Math.min(100, value) + "%";
}
}
);
}


function renderEquipment() {

if (!runner) return;

const eq =
runner.equipment || {};

const shoe =
equipment.shoes[
eq.shoes || "standard"
];

const bag =
equipment.bags[
eq.bags || "standard"
];

const clothes =
equipment.clothes[
eq.clothes || "standard"
];

const pole =
equipment.poles[
eq.poles || "standard"
];

const shoeElement =
document.getElementById(
"shoeEquipment"
);

const bagElement =
document.getElementById(
"bagEquipment"
);

const jacketElement =
document.getElementById(
"jacketEquipment"
);

const poleElement =
document.getElementById(
"poleEquipment"
);

if (shoeElement) {
shoeElement.textContent =
shoe.name;
}

if (bagElement) {
bagElement.textContent =
bag.name;
}

if (jacketElement) {
jacketElement.textContent =
clothes.name;
}

if (poleElement) {
poleElement.textContent =
pole.name;
}
}


/* =========================
CARRIÈRE
========================== */

function renderCareer() {

if (!runner) return;

const elements = {
careerName: runner.name,
careerProfile:
names[runner.profile] ||
"Polyvalent",
careerLevel:
runner.level,
careerLevelSmall:
runner.level,
energyValue:
runner.energy,
moneyValue:
`${runner.money} €`,
racesValue:
runner.races,
winsValue:
runner.victories
};

Object.entries(elements).forEach(
([id, value]) => {

const element =
document.getElementById(id);

if (element) {
element.textContent =
value;
}
}
);

const xpBar =
document.getElementById(
"xpBar"
);

const xpText =
document.getElementById(
"xpText"
);

if (xpBar) {
xpBar.style.width =
Math.min(
100,
runner.xp
) + "%";
}

if (xpText) {
xpText.textContent =
`${runner.xp} / 100 XP`;
}
}


function renderShopMoney() {

const moneyElement =
document.getElementById(
"shopMoney"
);

if (
moneyElement &&
runner
) {
moneyElement.textContent =
`${runner.money} €`;
}
}


/* =========================
CREATION
========================== */

const runnerName =
document.getElementById(
"runnerName"
);

const previewName =
document.getElementById(
"previewName"
);

if (runnerName) {

runnerName.oninput = () => {

previewName.textContent =
runnerName.value.trim() ||
"Ton prénom";
};
}


document
.querySelectorAll(".profile-card")
.forEach(card => {

card.onclick = () => {

document
.querySelectorAll(
".profile-card"
)
.forEach(c => {
c.classList.remove(
"selected"
);
});

card.classList.add(
"selected"
);

selectedProfile =
card.dataset.profile;
};
});


const createButton =
document.getElementById(
"createRunnerButton"
);

if (createButton) {

createButton.onclick = () => {

const name =
runnerName.value.trim();

if (name.length < 2) {

runnerName.focus();

return;
}

if (!selectedProfile) {

alert(
"Choisis ton profil de coureur."
);

return;
}

runner = {

name,

profile:
selectedProfile,

level: 1,

xp: 0,

races: 0,

victories: 0,

money: 500,

energy: 100,

equipment: {
shoes: "standard",
bags: "standard",
clothes: "standard",
poles: "standard"
},

inventory: [],

stats: {
...profileStats[
selectedProfile
]
}
};

saveRunner();

renderRunner();

showScreen(
"careerScreen"
);
};
}


/* =========================
NAVIGATION PRINCIPALE
========================== */

const startButton =
document.getElementById(
"startButton"
);

if (startButton) {
startButton.onclick = () => {
showScreen(
"createScreen"
);
};
}


const backButton =
document.getElementById(
"backButton"
);

if (backButton) {
backButton.onclick = () => {
showScreen(
"homeScreen"
);
};
}


const raceButton =
document.getElementById(
"raceButton"
);

if (raceButton) {
raceButton.onclick = () => {
showScreen(
"raceScreen"
);
};
}


const raceBackButton =
document.getElementById(
"raceBackButton"
);

if (raceBackButton) {
raceBackButton.onclick = () => {
showScreen(
"careerScreen"
);
};
}


navItems.forEach(item => {

item.onclick = () => {

const target =
item.dataset.screen;

if (
target !== "homeScreen" &&
!runner
) {

showScreen(
"createScreen"
);

return;
}

showScreen(target);

if (
target === "runnerScreen"
) {
renderRunner();
}

if (
target === "careerScreen"
) {
renderCareer();
}

if (
target === "shopScreen"
) {
renderShopMoney();
}
};
});


/* =========================
BOUTIQUE
========================== */

document
.querySelectorAll(".buy-button")
.forEach(button => {

button.onclick = () => {

if (!runner) return;

const itemId =
button.dataset.item;

const price =
Number(
button.dataset.price
);

if (
runner.money <
price
) {

alert(
"Tu n'as pas assez d'argent."
);

return;
}

runner.money -= price;

if (
!runner.inventory
) {
runner.inventory = [];
}

if (
!runner.inventory.includes(
itemId
)
) {

runner.inventory.push(
itemId
);
}

if (
itemId ===
"trail-basic" ||
itemId ===
"mountain-pro"
) {

runner.equipment.shoes =
itemId;
}

if (
itemId ===
"pack-5l" ||
itemId ===
"pack-12l"
) {

runner.equipment.bags =
itemId;
}

saveRunner();

renderRunner();

alert(
"Équipement acheté et équipé !"
);
};
});


/* =========================
STRATÉGIE AVANT COURSE
========================== */

document
.querySelectorAll(".strategy-card")
.forEach(card => {

card.onclick = () => {

document
.querySelectorAll(
".strategy-card"
)
.forEach(c => {
c.classList.remove(
"selected"
);
});

card.classList.add(
"selected"
);
};
});


const startRaceButton =
document.getElementById(
"startRaceButton"
);

if (startRaceButton) {

startRaceButton.onclick = () => {

if (!runner) return;

if (
runner.energy <= 5
) {

alert(
"Ton coureur est trop fatigué. Repose-toi avant de courir."
);

return;
}

const strategy =
document
.querySelector(
".strategy-card.selected"
)
?.dataset.strategy ||
"prudent";

startActiveRace(
strategy
);
};
}


/* =========================
LANCEMENT COURSE
========================== */

function startActiveRace(
strategy
) {

if (raceInterval) {
clearInterval(
raceInterval
);
}

raceState = {

elapsed: 0,

duration: 300,

distance: 0,

totalDistance: 8,

energy: 100,

hydration: 100,

pace: 50,

gradient: 0,

gels: 4,

drinks: 3,

bars: 2,

strategy

};

const slider =
document.getElementById(
"paceSlider"
);

if (slider) {
slider.value = 50;
}

updateRaceUI();

showScreen(
"activeRaceScreen"
);

raceInterval =
setInterval(
raceTick,
1000
);
}


/* =========================
MOTEUR COURSE
========================== */

function getCurrentGradient(
progress
) {

const points = [
0,
5,
15,
25,
38,
50,
62,
73,
85,
100
];

const values = [
1,
5,
10,
-4,
3,
8,
-9,
5,
-3,
0
];

for (
let i = 0;
i < points.length - 1;
i++
) {

if (
progress >= points[i] &&
progress <= points[i + 1]
) {

const ratio =
(
progress -
points[i]
) /
(
points[i + 1] -
points[i]
);

return (
values[i] +
(
values[i + 1] -
values[i]
) *
ratio
);
}
}

return 0;
}


function raceTick() {

if (!raceState) return;

raceState.elapsed += 1;

const stats =
getEffectiveStats();

const progress =
(
raceState.distance /
raceState.totalDistance
) * 100;

raceState.gradient =
getCurrentGradient(
progress
);

const pace =
raceState.pace;

let baseSpeed =
0.015 +
(
pace / 100
) * 0.035;

baseSpeed *=
0.75 +
(
stats.speed /
100
) * 0.5;

if (
raceState.gradient > 0
) {

const climbFactor =
stats.climb / 100;

baseSpeed *=
1 -
(
raceState.gradient *
0.018 *
(1.25 - climbFactor)
);
}

if (
raceState.gradient < 0
) {

const descentFactor =
stats.descent / 100;

baseSpeed *=
1 +
(
Math.abs(
raceState.gradient
) *
0.012 *
descentFactor
);
}

baseSpeed =
Math.max(
0.004,
baseSpeed
);

const energyCost =
(
0.08 +
(
pace / 100
) * 0.20
) *
(
1.15 -
stats.endurance /
500
) *
(
1.10 -
stats.management /
1000
);

raceState.energy =
Math.max(
0,
raceState.energy -
energyCost
);

raceState.hydration =
Math.max(
0,
raceState.hydration -
(
0.10 +
pace * 0.001
)
);

if (
raceState.energy < 20
) {
baseSpeed *=
0.65;
}

if (
raceState.hydration < 20
) {
baseSpeed *=
0.72;
}

raceState.distance +=
baseSpeed;

if (
raceState.distance >=
raceState.totalDistance ||
raceState.elapsed >=
raceState.duration
) {

raceState.distance =
raceState.totalDistance;

updateRaceUI();

finishRace();

return;
}

updateRaceUI();
}


/* =========================
AFFICHAGE COURSE
========================== */

function updateRaceUI() {

if (!raceState) return;

const distanceElement =
document.getElementById(
"raceDistanceValue"
);

const timerElement =
document.getElementById(
"raceTimer"
);

const energyElement =
document.getElementById(
"raceEnergy"
);

const hydrationElement =
document.getElementById(
"raceHydration"
);

const energyBar =
document.getElementById(
"raceEnergyBar"
);

const hydrationBar =
document.getElementById(
"raceHydrationBar"
);

const paceElement =
document.getElementById(
"paceValue"
);

const gradientElement =
document.getElementById(
"raceGradientValue"
);

if (distanceElement) {

distanceElement.textContent =
raceState.distance
.toFixed(1);
}

if (timerElement) {

const remaining =
Math.max(
0,
raceState.duration -
raceState.elapsed
);

const minutes =
Math.floor(
remaining / 60
);

const seconds =
remaining % 60;

timerElement.textContent =
`${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}`;
}

if (energyElement) {

energyElement.textContent =
`${Math.round(raceState.energy)}%`;
}

if (hydrationElement) {

hydrationElement.textContent =
`${Math.round(raceState.hydration)}%`;
}

if (energyBar) {

energyBar.style.width =
`${raceState.energy}%`;
}

if (hydrationBar) {

hydrationBar.style.width =
`${raceState.hydration}%`;
}

if (paceElement) {

paceElement.textContent =
`${Math.round(raceState.pace)}%`;
}

if (gradientElement) {

const value =
Math.round(
raceState.gradient *
10
) / 10;

gradientElement.textContent =
value >= 0
? `+${value}%`
: `${value}%`;
}

const runnerElement =
document.getElementById(
"raceRunner"
);

const elevationRunner =
document.querySelector(
".elevation-runner"
);

const progress =
(
raceState.distance /
raceState.totalDistance
) * 100;

if (runnerElement) {

runnerElement.style.left =
`${Math.max(
3,
Math.min(
92,
progress
)
)}%`;
}

if (elevationRunner) {

elevationRunner.style.left =
`${Math.max(
0,
Math.min(
96,
progress
)
)}%`;
}

const gelCount =
document.getElementById(
"gelCount"
);

const drinkCount =
document.getElementById(
"drinkCount"
);

const barCount =
document.getElementById(
"barCount"
);

if (gelCount) {
gelCount.textContent =
raceState.gels;
}

if (drinkCount) {
drinkCount.textContent =
raceState.drinks;
}

if (barCount) {
barCount.textContent =
raceState.bars;
}
}


/* =========================
CONTRÔLE ALLURE
========================== */

const paceSlider =
document.getElementById(
"paceSlider"
);

if (paceSlider) {

paceSlider.addEventListener(
"input",
() => {

if (!raceState) return;

raceState.pace =
Number(
paceSlider.value
);

updateRaceUI();
}
);
}


/* =========================
ALIMENTATION
========================== */

const gelButton =
document.getElementById(
"gelButton"
);

if (gelButton) {

gelButton.onclick = () => {

if (
!raceState ||
raceState.gels <= 0
) return;

raceState.gels -= 1;

raceState.energy =
Math.min(
100,
raceState.energy +
18
);

updateRaceUI();
};
}


const drinkButton =
document.getElementById(
"drinkButton"
);

if (drinkButton) {

drinkButton.onclick = () => {

if (
!raceState ||
raceState.drinks <= 0
) return;

raceState.drinks -= 1;

raceState.hydration =
Math.min(
100,
raceState.hydration +
25
);

updateRaceUI();
};
}


const barButton =
document.getElementById(
"barButton"
);

if (barButton) {

barButton.onclick = () => {

if (
!raceState ||
raceState.bars <= 0
) return;

raceState.bars -= 1;

raceState.energy =
Math.min(
100,
raceState.energy +
28
);

updateRaceUI();
};
}


/* =========================
FIN DE COURSE
========================== */

function finishRace() {

if (raceInterval) {

clearInterval(
raceInterval
);

raceInterval = null;
}

const stats =
getEffectiveStats();

const pace =
raceState.pace;

let performance =
(
stats.endurance * 0.25 +
stats.climb * 0.15 +
stats.descent * 0.15 +
stats.speed * 0.20 +
stats.management * 0.15 +
stats.fitness * 0.10
);

performance +=
(
raceState.energy -
50
) * 0.25;

performance +=
(
raceState.hydration -
50
) * 0.10;

performance -=
Math.abs(
pace - 60
) * 0.05;

const position =
performance >= 75
? 1
: performance >= 68
? 3
: performance >= 60
? 8
: performance >= 52
? 15
: 25;

const won =
position === 1;

const xp =
won
? 70
: position <= 3
? 55
: position <= 8
? 45
: 30;

const reward =
won
? 350
: position <= 3
? 250
: position <= 8
? 180
: 120;

runner.races += 1;

if (won) {
runner.victories += 1;
}

runner.xp += xp;

runner.money += reward;

runner.energy =
Math.max(
0,
Math.round(
runner.energy -
(
25 +
pace * 0.15
)
)
);

let levelUp = false;

while (
runner.xp >= 100
) {

runner.xp -= 100;

runner.level += 1;

levelUp = true;
}

saveRunner();

const result =
document.getElementById(
"raceResult"
);

if (result) {

result.innerHTML =
`
<strong>🏁 Course terminée</strong>
<br><br>

<strong>
${won
? "🥇 VICTOIRE !"
: `Classement : ${position}e`}
</strong>

<br><br>

Distance :
8 km

<br>

Énergie restante :
${Math.round(
raceState.energy
)}%

<br>

XP gagnée :
+${xp}

<br>

Récompense :
+${reward} €

${
levelUp
? `
<br><br>
<strong>
🎉 Niveau ${runner.level} !
</strong>
`
: ""
}
`;

result.classList.remove(
"hidden"
);
}

renderRunner();

showScreen(
"raceScreen"
);
}


/* =========================
INITIALISATION
========================== */

if (runner) {

if (!runner.stats) {

runner.stats = {
...profileStats[
runner.profile
] ||
profileStats.polyvalent
};
}

if (!runner.equipment) {

runner.equipment = {
shoes: "standard",
bags: "standard",
clothes: "standard",
poles: "standard"
};
}

if (!runner.inventory) {
runner.inventory = [];
}

saveRunner();

renderRunner();
}

});
