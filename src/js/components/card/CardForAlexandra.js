class CardForAlexandra {
        constructor(container, width, height, name, cost, damage, health, image) {
                this.container = container;
                this.width = width;
                this.height = height;
                this.name = name;
                this.cost = cost; 
                this.damage = damage;
                this.health = health;
                this.image = image;
        }

        initialize() {
                const divCarte = document.createElement("div");
                divCarte.className = "openedCard2 modal-content-temp";
                const nameP = document.createElement("p");
                nameP.setAttribute("id", "wordWrapTemp");
                nameP.innerHTML = this.name;
                nameP.style.marginLeft = 17 + "%";
                nameP.style.marginTop = 100 + "%";
                nameP.style.textAlign = "center";
                nameP.className = "card-name-temp";
        
                const costP = document.createElement("p");
                costP.setAttribute("id", "wordWrapTemp");
                costP.innerHTML = this.cost;
                costP.style.marginLeft = -21 + "%";
                costP.style.marginTop = -109.5 + "%";
                costP.style.textAlign = "center";
                costP.className = "alt-text-temp";

                const damageP = document.createElement("p");
                damageP.setAttribute("id", "wordWrapTemp");
                damageP.innerHTML = this.damage;
                damageP.className = "alt-text-temp";
                damageP.style.marginLeft = 11 + "%";
                damageP.style.marginTop = 101.5 + "%";

                const healthP = document.createElement("p");
                healthP.setAttribute("id", "wordWrapTemp");
                healthP.innerHTML = this.health;
                healthP.className = "alt-text-temp";
                healthP.style.marginLeft = 87 + "%";
                healthP.style.marginTop = -28 + "%";

                const imageP = document.createElement("div");
                imageP.style.marginLeft = 37.5 + "%";
                imageP.style.marginTop = -120 + "%";
                imageP.style.fontSize = "70px";
                const asdf = document.createElement("i");
                asdf.className = "fa " + this.image;
                imageP.appendChild(asdf);
                imageP.style.color = "rgb(165, 151, 131)";

                divCarte.appendChild(nameP);
                divCarte.appendChild(costP);
                divCarte.appendChild(damageP);
                divCarte.appendChild(healthP);
                divCarte.appendChild(imageP);
                divCarte.style.width = this.width + "px";
                divCarte.style.height = this.height + "px";
                this.container.appendChild(divCarte);

                const underDiv = document.createElement("div");
                underDiv.className = "underDivBigCard";
                underDiv.style.marginLeft = 30 + "px";
                underDiv.style.marginTop = 30 + "px";
                this.container.appendChild(underDiv);
        }

        destroy() {

        }
}