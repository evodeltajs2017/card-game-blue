class CreateArenaDeck {
	constructor(container) {
		this.container = container;
	}

	putTheCards() {
		const repo = new CreateArenaDeckRepository();
		const cardsDiv = document.querySelector(".mainContent");
		repo.getThreeCards((status, data) => {
            if (status !== 200) {

            } else {
                console.log(status, data);
                for (var i = data.length - 1; i >= 0; i--) {
                	let div = document.createElement("div");
                    div.className = "parentOfCard";
                    div.style.height = "400px";
                    div.style.width = "300px";
                    let card = new Card(div, 250, 350, data[i].Name, data[i].Cost, data[i].Damage, data[i].Health);
                    card.initialize();
                    cardsDiv.appendChild(div);
                }
            }
        });
	}

	buildThePage() {
        const div = document.createElement("div");
        div.innerHTML = "<h1>Create arena deck</h1>";
        div.className = "mainContent";

        const cardsDiv = document.createElement("div");
        cardsDiv.className = "rightSide";

        const backImg = document.createElement("div");
        backImg.className = "backImg";

        const container = document.createElement("div");
        container.className = "content-container-tmp";

        container.appendChild(div);
        container.appendChild(cardsDiv);
        container.appendChild(backImg);
        this.container.appendChild(container);
    }

	initialize() {
		this.buildThePage();

		this.putTheCards();
	}

	destroy() {

	}
}