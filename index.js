import { Tamagotchi } from "./modules/tamagotchi.js";

const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const nameInput = document.querySelector("input");
  const typeSelect = document.querySelector("select");

  const name = nameInput.value;
  const type = typeSelect.value;

  if (name === "") {
    alert("Please fill the name field");
    return;
  }

  const newTama = new Tamagotchi(name, type);
  newTama.startPlaying();

  nameInput.value = "";
  typeSelect.value = "";
});

