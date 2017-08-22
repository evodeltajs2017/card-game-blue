class Card {
        constructor(container, width, height, name, cost, damage, health) {
                this.container = container;
                this.width = width;
                this.height = height;
                this.name = name;
                this.cost = cost; 
                this.damage = damage;
                this.health = health;
        }

        initialize() {
                //method that draws the card
                //sizes: approx. 400x300
                const divCarte = document.createElement("div");
                divCarte.className = "openedCard2 modal-content";
                const nameP = document.createElement("p");
                nameP.setAttribute("id", "wordWrap");
                nameP.innerHTML = this.name;
                nameP.style.marginLeft = 20 + "%";
                nameP.style.marginTop = 100 + "%";
                nameP.style.textAlign = "center";
                nameP.className = "card-name";
        
                const costP = document.createElement("p");
                costP.setAttribute("id", "wordWrap");
                costP.innerHTML = this.cost;
                costP.style.marginLeft = -18 + "%";
                costP.style.marginTop = -109.5 + "%";
                costP.style.textAlign = "center";
                costP.className = "alt-text";

                const damageP = document.createElement("p");
                damageP.setAttribute("id", "wordWrap");
                damageP.innerHTML = this.damage;
                damageP.className = "alt-text";
                damageP.style.marginLeft = 11 + "%";
                damageP.style.marginTop = 101.5 + "%";

                const healthP = document.createElement("p");
                healthP.setAttribute("id", "wordWrap");
                healthP.innerHTML = this.health;
                healthP.className = "alt-text";
                healthP.style.marginLeft = 87 + "%";
                healthP.style.marginTop = -28 + "%";

                divCarte.appendChild(nameP);
                divCarte.appendChild(costP);
                divCarte.appendChild(damageP);
                divCarte.appendChild(healthP);
                divCarte.style.width = this.width + "px";
                divCarte.style.height = this.height + "px";
                this.container.appendChild(divCarte);
        }

        destroy() {

        }
}