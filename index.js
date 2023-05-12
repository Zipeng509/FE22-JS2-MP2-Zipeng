import { Tamagotchi } from "./modules/tamagotchi.js";

const form = document.getElementById("form");
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const nameInput = document.getElementById("input-name");
  const typeSelect = document.getElementById("select-type");

  const name = nameInput.value;
  const type = typeSelect.value;

  if (name === "") {
    alert("Please fill the name field");
    return;
  }

  const newTamagotchi = new Tamagotchi(name, type);
  newTamagotchi.startPlaying();

  nameInput.value = "";
  typeSelect.value = "";
});

