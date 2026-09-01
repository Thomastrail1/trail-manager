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

function show(id) {
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

function renderRunner() {
if (!runner) return;

careerName.textContent = runner.name;

careerProfile.textContent =
names[runner.profile] || "Polyvalent";

careerLevel.textContent =
runner.level;

xpBar.style.width =
Math.min(100, runner.xp) + "%";

xpText.textContent =
`${runner.xp} / 100 XP`;

energyValue.textContent =
runner.energy;

moneyValue.textContent =
`${runner.money} €`;

racesValue.textContent =
runner.races;

winsValue.textContent =
runner.victories;
}

function renderRunnerStats() {
if (!runner || !runner.stats) return;

const stats = runner.stats;

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
valueElement.textContent = value;
}

if (barElement) {
barElement.style.width =
value + "%";
}
}
);
}

document.getElementById(
"startButton"
).onclick = () => {
show("createScreen");
};

document.getElementById(
"backButton"
).onclick = () => {
show("homeScreen");
};

document.getElementById(
"raceBackButton"
).onclick = () => {
show("careerScreen");
};

document.getElementById(
"raceButton"
).onclick = () => {
show("raceScreen");
};

runnerName.oninput = () => {

previewName.textContent =
runnerName.value.trim() ||
"Ton prénom";
};

profileCards.forEach(card => {

card.onclick = () => {

profileCards.forEach(c => {
c.classList.remove("selected");
});

card.classList.add("selected");

selectedProfile =
card.dataset.profile;
};
});

createButton.onclick = () => {

const name =
runnerName.value.trim();

if (name.length < 2) {

runnerName.focus();

runnerName.style.borderColor =
"#b7f04d";

return;
}

if (!selectedProfile) {

profileCards[0].focus();

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

energy: 100,

stats: {
...profileStats[selectedProfile]
}
};

localStorage.setItem(
"trailManagerRunner",
JSON.stringify(runner)
);

renderRunner();

renderRunnerStats();

show("careerScreen");
};

document.querySelectorAll(
".strategy-card"
).forEach(card => {

card.onclick = () => {

document.querySelectorAll(
".strategy-card"
).forEach(c => {
c.classList.remove("selected");
});

card.classList.add("selected");
};
});

document.getElementById(
"startRaceButton"
).onclick = () => {

if (!runner) return;

const selectedStrategy =
document.querySelector(
".strategy-card.selected"
);

const strategy =
selectedStrategy?.dataset.strategy ||
"prudent";

const costs = {
prudent: 20,
regulier: 30,
attaque: 45
};

const xpGain = {
prudent: 25,
regulier: 35,
attaque: 45
};

runner.energy = Math.max(
0,
runner.energy -
costs[strategy]
);

runner.xp +=
xpGain[strategy];

runner.races += 1;

let levelUp = "";

if (runner.xp >= 100) {

runner.xp -= 100;

runner.level += 1;

runner.money += 150;

levelUp =
`<br><br>
<strong>Niveau supérieur !</strong>
<br>
Tu passes niveau ${runner.level}.
`;
}

let result = "";

if (strategy === "attaque") {

result =
"Tu as pris des risques et signé une belle performance.";

} else if (strategy === "regulier") {

result =
"Course solide et régulière. Tu progresses sans te mettre dans le rouge.";

} else {

result =
"Course maîtrisée. Tu termines avec encore des réserves.";
}

localStorage.setItem(
"trailManagerRunner",
JSON.stringify(runner)
);

renderRunner();

renderRunnerStats();

raceResult.innerHTML =
`<strong>🏁 Course terminée</strong>
<br><br>
${result}
${levelUp}`;

raceResult.classList.remove(
"hidden"
);
};

navItems.forEach(item => {

item.onclick = () => {

const target =
item.dataset.screen;

if (
target === "careerScreen" &&
!runner
) {
show("createScreen");
return;
}

show(target);
};
});

if (runner) {

if (!runner.stats) {

runner.stats = {
...profileStats[
runner.profile
] || profileStats.polyvalent
};

localStorage.setItem(
"trailManagerRunner",
JSON.stringify(runner)
);
}

renderRunner();

renderRunnerStats();
}

});
