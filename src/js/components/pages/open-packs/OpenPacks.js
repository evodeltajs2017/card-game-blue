class OpenPacks {
	constructor(container) {
		this.container = container;
	}

	showElems(){
		const repo = new OpenPacksRepository();
		repo.getUnopenedCardPacks((status, data) => {
			if (status !== 200) {
				div.innerHTML = "<h1>error</h1>";
			} else {
				console.log(status, data);
				
				for (let i=0; i<5; i++){
					let item = data[Math.floor(Math.random()*data.length)];
					console.log(item);
				}
			}
		});
	}

	initialize() {
		const div = document.createElement("div");
		div.innerHTML = "<h1>Open card packs</h1>";
		div.className = "upperShit";
		const butt = document.createElement("button");
		butt.innerHTML = "Open";
		butt.addEventListener("click", (e) => { this.showElems(); }, false);
		div.appendChild(butt);
		div.style.textAlign = "center";
		this.container.appendChild(div);
		this.container.style.backgroundImage = "url(../src/js/components/pages/open-packs/imgs/maxresdefault.jpg)";

		const deckDiv = document.createElement("div");
		deckDiv.className = "decks";
		this.container.appendChild(deckDiv);

		const openDiv = document.createElement("div");
		openDiv.className = "openDecks";
		this.container.appendChild(openDiv);
	}

	

	destroy() {
	}
}