class Tamagotchi {
    #type;
    #name;
    #hunger;
    #hapiness;
    constructor(type, name) {
        this.#type = type
        this.#name = name
        this.#hunger = 10;
        this.#hapiness = 10;
    }
    getName() {
        return this.#name
    }
    getTitle() {
        return `${this.#type}: ${this.#name}`;
    }
    getHunger() {
        return this.#hunger;
    }
    gethapiness() {
        return this.#hapiness;
    }
    getType() {
        return this.#type;
    }
    decreaseHunger() {
        if (!this.hasDied()) {
            this.#hunger -= 1;
        }
    }
    decreaseHapiness() {
        if (!this.hasDied()) {
            this.#hapiness -= 1;
        }
    }
    hasDied() {
        return this.#hapiness === 0 || this.#hunger === 0;
    }
    play() {
        if (!this.hasDied() && this.#hapiness < 10) {
            this.#hapiness += 1
        }
    }
    feed() {
        if (!this.hasDied() && this.#hunger < 10) {
            this.#hunger += 1
        }
    }
};

class CatTamagotchi extends Tamagotchi {
    constructor(name) {
        super("Cat", name)
    }
};

class DogTamagotchi extends Tamagotchi {
    constructor(name) {
        super("Dog", name)
    }
};




export {
    CatTamagotchi,
    DogTamagotchi
};