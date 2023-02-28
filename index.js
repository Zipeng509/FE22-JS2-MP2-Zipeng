import { CatTamagotchi, DogTamagotchi } from "./modules/tamagotchi.js";

const inputNameField = document.getElementById("input-name");
const selectTypeField = document.getElementById("select-type");
const addBtn = document.getElementById("add-btn");
const tamagotchiContainer = document.getElementById("tamagotchi-container");
const formElement = document.getElementById("form");

formElement.addEventListener("submit", (event) => {
    event.preventDefault();
});

const tamagotchiArray = [];
function hasTamagotchiName(name) {
    return tamagotchiArray
        .map(tamagotchi => tamagotchi.getName())
        .includes(name);
};

addBtn.addEventListener("click", () => {

    const name = inputNameField.value;
    const type = selectTypeField.options[selectTypeField.selectedIndex].value;

    if (name === "") {
        alert("Please fill the name field")
        return;
    }

    let tamagotchi;

    const isCat = type === "cat";

    if (isCat) {
        tamagotchi = new CatTamagotchi(name)
    };

    const isDog = type === "dog";

    if (isDog) {
        tamagotchi = new DogTamagotchi(name)
    };

    if (!isCat && !isDog) {
        return;
    };

    if (hasTamagotchiName(name)) {
        alert(`Name is already taken "${name}", please use another name`)
        return;
    }
    // console.log("asdasd")

    tamagotchiArray.push(tamagotchi);
    const tamagotchiUi = createTamagotchiUi(tamagotchi);
    tamagotchiContainer.innerHTML += tamagotchiUi;
    
    const startBtn = getTamagotchiStartBtn(tamagotchi);
    const hungerLevelElement = getTamagotchiHungerLevelElement(tamagotchi);
    const hapinessElement = getTamagotchiHapinessElement(tamagotchi);

    let hasStarted = false;
    startBtn.addEventListener("click", () => {
        hasStarted = true;
        const id1 = setInterval(() => {
            tamagotchi.decreaseHunger();
            const hunger = tamagotchi.getHunger();
            hungerLevelElement.innerText = hunger;

            if (tamagotchi.hasDied()) {
                clearId1();
                clearId2();
                const element = document.getElementById(tamagotchi.getName())
                element.className += "died"
                alert("You have lost");
            }
        }, 1000);

        function clearId1() {
            clearTimeout(id1)
        };

        const id2 = setInterval((a) => {
            tamagotchi.decreaseHapiness()
            const hapiness = tamagotchi.gethapiness();
            hapinessElement.innerText = hapiness;
            if (tamagotchi.hasDied()) {
                clearId2()
                clearId1()
                alert("You have lost");
            }
        }, 2000);

        function clearId2() {
            clearTimeout(id2)
        }
    });

    const playBtn = getTamagotchiPlayBtn(tamagotchi);
    playBtn.addEventListener("click", () => {
        if (hasStarted) {
            tamagotchi.play();
            const hapiness = tamagotchi.gethapiness();
            hapinessElement.innerText = hapiness;
        }
    });

    const feedBtn = getTamagotchiFeedBtn(tamagotchi);
    feedBtn.addEventListener("click", () => {
        if (hasStarted) {
            tamagotchi.feed();
            const hunger = tamagotchi.getHunger();
            hungerLevelElement.innerText = hunger;
        }
    })
});

function getTamagotchiStartBtnId(tamagotchi) {
    return `${tamagotchi.getName()}-start-btn`;
};

function getTamagotchiStartBtn(tamagotchi) {
    return document.getElementById(getTamagotchiStartBtnId(tamagotchi))
};

function getTamagotchiFeedBtnId(tamagotchi) {
    return `${tamagotchi.getName()}-feed-btn`
};

function getTamagotchiFeedBtn(tamagotchi) {
    return document.getElementById(getTamagotchiFeedBtnId(tamagotchi))
};

function getTamagotchiPlayBtnId(tamagotchi) {
    return `${tamagotchi.getName()}-play-btn`
};

function getTamagotchiPlayBtn(tamagotchi) {
    return document.getElementById(getTamagotchiPlayBtnId(tamagotchi))
};

function getTamagotchiHungerLevelId(tamagotchi) {
    return `${tamagotchi.getName()}-hunger-level`
};

function getTamagotchiHungerLevelElement(tamagotchi) {
    return document.getElementById(getTamagotchiHungerLevelId(tamagotchi))
};

function getTamagotchiHapinessId(tamagotchi) {
    return `${tamagotchi.getName()}-hapiness-level`
};

function getTamagotchiHapinessElement(tamagotchi) {
    return document.getElementById(getTamagotchiHapinessId(tamagotchi))
};

function createTamagotchiUi(tamagotchi) {
    const title = tamagotchi.getTitle()
    const hungerLevel = tamagotchi.getHunger()
    const hapinessLevel = tamagotchi.gethapiness()
    const type = tamagotchi.getType();
    const feedBtnId = getTamagotchiFeedBtnId(tamagotchi);
    const startBtnId = getTamagotchiStartBtnId(tamagotchi)
    const playBtnId = getTamagotchiPlayBtnId(tamagotchi) 
    const id = tamagotchi.getName()
    return `
        <div id=${id} class="${type.toLowerCase()} tamagotchi">
            <h4>
                ${title}
            </h4>
            <p>
                Hunger level: <span id="${getTamagotchiHungerLevelId(tamagotchi)}">${hungerLevel}</span>
            </P>
            <p>
                Hapiness level: <span id="${getTamagotchiHapinessId(tamagotchi)}">${hapinessLevel}</span>
            </P>
            <div>
                <button id="${feedBtnId}">
                    Feed
                </button>
                <button id="${playBtnId}">
                    Play
                </button>
                <button id="${startBtnId}">
                    Start
                </button>
            <div>
        </div>
    `
};