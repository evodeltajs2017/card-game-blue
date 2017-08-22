class CreateArenaDeck {
	constructor(container) {
		this.container = container;
	}

	buildThePage() {
        const div = document.createElement("div");
        div.innerHTML = "<h1>Create arena deck</h1>";
        div.className = "mainContent";


        const cardsDiv = document.createElement("div");
        cardsDiv.className = "rightSide";

        const backImg = document.createElement("div");
        backImg.className = "backImg";

        this.container.appendChild(div);
        this.container.appendChild(cardsDiv);
        this.container.appendChild(backImg);
    }

	initialize() {
		this.buildThePage();
	}

	destroy() {

	}
}