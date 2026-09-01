// =========================================
// TRAIL MANAGER
// Main application
// =========================================

const homeScreen = document.getElementById("homeScreen");
const createScreen = document.getElementById("createScreen");

const startButton = document.getElementById("startButton");
const backButton = document.getElementById("backButton");

const runnerName = document.getElementById("runnerName");
const previewName = document.getElementById("previewName");

const createRunnerButton =
    document.getElementById("createRunnerButton");

const profileCards =
    document.querySelectorAll(".profile-card");

let selectedProfile = null;


// Ouvrir création
startButton.addEventListener("click", () => {

    homeScreen.classList.add("hidden");
    createScreen.classList.remove("hidden");

});


// Retour accueil
backButton.addEventListener("click", () => {

    createScreen.classList.add("hidden");
    homeScreen.classList.remove("hidden");

});


// Nom du coureur
runnerName.addEventListener("input", () => {

    const name = runnerName.value.trim();

    previewName.textContent =
        name || "Ton coureur";

    updateCreateButton();

});


// Choix du profil
profileCards.forEach(card => {

    card.addEventListener("click", () => {

        profileCards.forEach(item => {
            item.classList.remove("selected");
        });

        card.classList.add("selected");

        selectedProfile =
            card.dataset.profile;

        updateCreateButton();

    });

});


// Activation du bouton
function updateCreateButton() {

    const hasName =
        runnerName.value.trim().length >= 2;

    createRunnerButton.disabled =
        !(hasName && selectedProfile);

}


// Création du coureur
createRunnerButton.addEventListener("click", () => {

    const name =
        runnerName.value.trim();

    const newRunner =
        createRunner(name, selectedProfile);

    alert(
        `Bienvenue ${newRunner.name} ! 🏔️\n\n` +
        `Profil : ${newRunner.profile}\n\n` +
        `Ta carrière commence maintenant.`
    );

});
