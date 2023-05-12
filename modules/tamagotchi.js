class Tamagotchi {
    #type;
    #name;
    #hunger;
    #happiness;
    #hungerId;
    #happinessId;
    #container;
  
    constructor(type, name) {
      this.#type = type;
      this.#name = name;
      this.#hunger = 10;
      this.#happiness = 10;
    }
  
    //Kicka igång
    startPlaying() {
      const tamagotchiContainer = document.getElementById("tamagotchi-container");
      tamagotchiContainer.classList.remove("hidden");
      tamagotchiContainer.classList.add("container");
  
      this.#container = document.createElement("div");
      this.#container.classList.add(this.#type);
  
      const tamagotchiCard = document.createElement("div");
      tamagotchiCard.classList.add("tamagotchiCard");
      tamagotchiCard.style.backgroundColor = "turquoise";
  
      const h3 = document.createElement("h3");
      const h4 = document.createElement("h4");
      h4.innerText = `${this.#name}:${this.#type}`;
      const hungerLevel = document.createElement("p");
      hungerLevel.innerText = `Hunger level: ${this.#hunger}/10`;
      const happinessLevel = document.createElement("p");
      happinessLevel.innerText = `Happiness level: ${this.#happiness}/10`;
  
      tamagotchiCard.append(h3, h4, hungerLevel, happinessLevel);
  
      const feedBtn = this.createButton("Feed", "dot");
      feedBtn.addEventListener("click", () => {
        this.feed(hungerLevel);
      });
      feedBtn.style.marginRight = ("8px")
  
      const playBtn = this.createButton("Play", "dot");
      playBtn.addEventListener("click", () => {
        this.play(happinessLevel);
      });
  
      this.#container.append(tamagotchiCard, feedBtn, playBtn);
      tamagotchiContainer.append(this.#container);
  
      this.startInterval(hungerLevel, happinessLevel);
    }
  
    createButton(text, className) {
      const button = document.createElement("button");
      button.innerText = text;
      button.classList.add(className);
      return button;
    }
  
    startInterval(hungerLevel, happinessLevel) {
      this.#hungerId = setInterval(() => {
        this.updateLevel(hungerLevel, "hunger");
      }, 2000);
  
      this.#happinessId = setInterval(() => {
        this.updateLevel(happinessLevel, "happiness");
      }, 3500);
    }
  
    updateLevel(level, type) {
      if (type === "hunger") {
        this.#hunger--;
        level.innerText = `Hunger level: ${this.#hunger}/10`;
        if (this.#hunger === 0) this.dead();
      } else if (type === "happiness") {
        this.#happiness--;
        level.innerText = `Happiness level: ${this.#happiness}/10`;
        if (this.#happiness === 0) this.dead();
      }
    }
  

    //Mata tamagotchi för att hålla liv
    feed(level) {
      if (this.#hunger > 0 && this.#hunger < 10) {
        this.#hunger++;
        level.innerText = `Hunger level: ${this.#hunger}/10`;
      } else {
        level.innerText = `Hunger level: ${this.#hunger}/10`;
      }
    }
  

    //Leka med tamagotchi för att hålla liv
    play(level) {
      if (this.#happiness > 0 && this.#happiness < 10) {
        this.#happiness++;
        level.innerText = `Happiness level: ${this.#happiness}/10`;
      } else {
        level.innerText = `Happiness level: ${this.#happiness}/10`;
      }
    }
  

    //Disabled knapparna när den dö
    dead() {
        clearInterval(this.#hungerId);
        clearInterval(this.#happinessId);
      
        this.#container.classList.add("dead");
      
        for (const childNode of this.#container.childNodes) {
          if (childNode.tagName === "BUTTON") {
            childNode.disabled = true;
          }
          if (childNode.classList.contains("screen")) {
            const text = childNode.firstChild;
            text.textContent = "R.I.P";
            text.classList.add("rip");
          }
        }
      }
            

}

export {Tamagotchi}