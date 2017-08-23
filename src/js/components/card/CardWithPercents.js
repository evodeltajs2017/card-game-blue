class Card {
    constructor(container, width, height, name, cost, damage, health, img) {
        this.container = container;
        this.width = width;
        this.height = height;
        this.name = name;
        this.cost = cost;
        this.damage = damage;
        this.health = health;
        this.img = img;
    }

    initialize() {
        const divCarte = document.createElement("div");
        divCarte.className = "CardComponent";
        const nameP = document.createElement("p");
        nameP.className = "wordWrap";
        nameP.innerHTML = this.name;
        nameP.className += " play-name card-name";

        const costP = document.createElement("p");
        costP.className = "";
        costP.innerHTML = this.cost;
        costP.className += " play-cost alt-text";

        const damageP = document.createElement("p");
        damageP.className = "";
        damageP.innerHTML = this.damage;
        damageP.className += " play-damage alt-text";


        const healthP = document.createElement("p");
        healthP.className = "";
        healthP.innerHTML = this.health;
        healthP.className += " play-health alt-text";

        const imgP = document.createElement("i");
        imgP.className += ` play-img fa ${this.img}`;



        divCarte.appendChild(costP);
        divCarte.appendChild(imgP);
        divCarte.appendChild(nameP);
        divCarte.appendChild(damageP);
        divCarte.appendChild(healthP);

        divCarte.style.width = this.width + "px";
        divCarte.style.height = this.height + "px";
        this.container.appendChild(divCarte);
    }

    destroy() {

    }
}