class OpenPacks {
	constructor(container) {
		this.container = container;
	}

	showElems(butt){
		const repo = new OpenPacksRepository();

		repo.getOpenedCards((status, data) => {
			if (status !== 200) {
				div.innerHTML = "<h1>error</h1>";
			} else {
				console.log(status, data);
				const userRepo = new UserRepository();

				userRepo.getUnopenedCardPacks((status, data) => {
					if (status !== 200) {
		
							}
							else{
								console.log(status, data);
								if (data.UnopenedCardPacks === 1) {
									butt.setAttribute("disabled", true);
								}
								else{
		
								}
							}
				});
			}
		});
	}

	initialize() {
		const div = document.createElement("div");
		div.innerHTML = "<h1>Open card packs</h1>";
		div.className = "upperShit";
		let butt = document.createElement("button");
		butt.innerHTML = "Open";



		butt.addEventListener("click", (e) => { this.showElems(butt); }, false);
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


		const userRepo = new UserRepository();

		userRepo.getUnopenedCardPacks((status, data) => {
			if (status !== 200) {

			}
			else{
				console.log(status, data);
				if (data.UnopenedCardPacks === 0) {
					butt.setAttribute("disabled", true);
				}
				else{

				}
			}
		});
	}

	

	destroy() {
	}
}