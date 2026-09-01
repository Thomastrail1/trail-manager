// =========================================
// TRAIL MANAGER
// Runner system
// =========================================

const runner = {
    name: "",
    profile: "",

    stats: {
        speed: 35,
        endurance: 40,
        climb: 40,
        descent: 35,
        technique: 35,
        mental: 40
    },

    condition: {
        form: 80,
        fatigue: 10,
        morale: 80
    },

    level: 1,
    xp: 0,
    money: 1000,
    races: 0,
    victories: 0,
    elevation: 0
};

function createRunner(name, profile) {

    runner.name = name;
    runner.profile = profile;

    switch (profile) {

        case "grimpeur":
            runner.stats.climb += 10;
            runner.stats.endurance += 5;
            runner.stats.speed -= 3;
            break;

        case "rouleur":
            runner.stats.speed += 10;
            runner.stats.endurance += 5;
            runner.stats.climb -= 3;
            break;

        case "descendeur":
            runner.stats.descent += 10;
            runner.stats.technique += 5;
            runner.stats.climb -= 3;
            break;

        case "ultra":
            runner.stats.endurance += 12;
            runner.stats.mental += 5;
            runner.stats.speed -= 5;
            break;

        case "polyvalent":
            runner.stats.speed += 3;
            runner.stats.endurance += 3;
            runner.stats.climb += 3;
            runner.stats.descent += 3;
            runner.stats.technique += 3;
            runner.stats.mental += 3;
            break;
    }

    saveRunner();

    return runner;
}

function saveRunner() {
    localStorage.setItem(
        "trailManagerRunner",
        JSON.stringify(runner)
    );
}

function loadRunner() {

    const savedRunner =
        localStorage.getItem("trailManagerRunner");

    if (savedRunner) {
        Object.assign(
            runner,
            JSON.parse(savedRunner)
        );
    }

    return runner;
}
