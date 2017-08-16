class Card {
	constructor(container, width, height, name, cost, damage, health, imgIdentifier) {
		this.container = container;
		this.width = width;
		this.height = height;
		this.name = name;
		this.cost = cost; 
		this.damage = damage;
		this.health = health;
		this.imgIdentifier = imgIdentifier;
	}

	initialize() {
		//method that draws the card
		//sizes: approx. 400x300
		const divCarte = document.createElement("div");
        divCarte.className = "openedCard modal-content";
        const nameP = document.createElement("p");
        nameP.setAttribute("id", "wordWrap");
        nameP.innerHTML = this.name;
        nameP.style.marginLeft = 3 + "px";
        nameP.style.marginTop = 150 + "px";
        nameP.style.textAlign = "center";
        nameP.className = "card-name";


        const costP = document.createElement("p");
        costP.setAttribute("id", "wordWrap");
        costP.innerHTML = this.cost;
        costP.style.marginLeft = -53 + "px";
        costP.style.marginTop = -188 + "px";
        costP.style.textAlign = "center";
        costP.className = "alt-text";

        const damageP = document.createElement("p");
        damageP.setAttribute("id", "wordWrap");
        damageP.innerHTML = this.damage;
        damageP.className = "alt-text";
        damageP.style.marginLeft = 16 + "px";
        damageP.style.marginTop = 138 + "px";

        const healthP = document.createElement("p");
        healthP.setAttribute("id", "wordWrap");
        healthP.innerHTML = this.health;
        healthP.className = "alt-text";
        healthP.style.marginLeft = 130 + "px";
        healthP.style.marginTop = -66 + "px";


        divCarte.appendChild(nameP);
        divCarte.appendChild(costP);
        divCarte.appendChild(damageP);
        divCarte.appendChild(healthP);
        divCarte.style.width = this.width;
        divCarte.style.height = this.height;
        this.container.appendChild(divCarte);
	}

	destroy() {

	}
}

module.exports = Card;