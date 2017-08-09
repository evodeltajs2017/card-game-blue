class OpenPacks {
	constructor(container) {
		this.container = container;
		this.nrExtraPacks = 0;
	}


	adaugaListener(e, ceva, butt, repo) {
		ceva.addEventListener("click", (e) => { e.stopImmediatePropagation(); this.showElems(e, butt, repo); }, false);
	}

	createDivForCard(modal, name, cost, damage, health, left, top) {
		const divCarte = document.createElement("div");
		divCarte.className = "openedCard modal-content";
		const paraph = document.createElement("p");
		paraph.setAttribute("id", "wordWrap");
		paraph.innerHTML = `<pre> Name: ${name}\nCost: ${cost}\nDamage: ${damage}\nHealth: ${health}</pre>`;
		divCarte.appendChild(paraph);
		divCarte.style.marginLeft = left+"%";
		divCarte.style.marginTop = top+"px";
		modal.appendChild(divCarte);
	}

	openingTheDeck(data) {
		const modal = document.createElement("div");
		modal.className = "modal";
		modal.style.display = "block";
		let left = 54;
		let top = 90;
		let i = 0;
		for (i=0; i<data.length; i++) {
			this.createDivForCard(modal, data[i].Name, data[i].Cost, data[i].Damage, data[i].Health, left, top);
			if (i === 0) {
				left = 7;
				top = 360;
			}
			if (i === 1) {
				left = -16;
				top = 650;
			}
			if (i === 2) {
				left = -30;
				top = 650;
			}
			if (i === 3) {
				left = -38;
				top = 360;
			}
		}
		document.body.appendChild(modal);
		window.onclick = function(event) {
    		if (event.target == modal) {
        		modal.style.display = "none";
    		}
		}
	}

	showElems(e, butt, repo){
		const context = this;
		repo.getOpenedCards((status, data) => {
			if (status !== 200) {
				div.innerHTML = "<h1>error</h1>";
			} else {
				console.log(status, data);
				let nr = null;
				let leftDecks = document.getElementsByClassName("leftDecks")[0];
				if (leftDecks !== undefined){
					nr = leftDecks.innerHTML;
				}
				else{
					nr = "+0";
				}
				if (context.nrExtraPacks === 0) {
					let listOfDOMDecks = document.getElementsByClassName("decks");
					listOfDOMDecks[0].removeChild(listOfDOMDecks[0].childNodes[0]);
				}
				else {
					context.nrExtraPacks = context.nrExtraPacks - 1;
					leftDecks.innerHTML = "+" + context.nrExtraPacks;
					if (context.nrExtraPacks === 0) {
						let listOfDOMDecks = document.getElementsByClassName("decks");
						leftDecks.parentNode.removeChild(leftDecks);
					}
				}
				let first = document.getElementsByClassName("deck");
				first = Array.from(first);
				if (first.length !== 0) {
					e.stopImmediatePropagation();
					this.adaugaListener(e, first[0], butt, repo);
				}

				this.openingTheDeck(data);

				repo.getUnopenedCardPacks((status, data) => {
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
		});
	}

	generatePacks(button, deckDiv) {
		const repo = new OpenPacksRepository();
		const context = this;
		repo.getUnopenedCardPacks((status, data) => {
			if (status !== 200) {

			}
			else{
				console.log(status, data, data.UnopenedCardPacks);
				if (data.UnopenedCardPacks === 0) {
					button.setAttribute("disabled", true);
				}
				else{
					let nrDecks = data.UnopenedCardPacks;
					
					if (nrDecks > 3) {
						context.nrExtraPacks = nrDecks - 3;
						nrDecks = 3;
					}
					let i = 0;
					for (i = 0; i<nrDecks; i++) {
						const div = document.createElement("div");
						div.className = "deck";
						deckDiv.appendChild(div);
						if (i === 0) {
							div.addEventListener("click", (e) => { e.stopImmediatePropagation(); this.showElems(e, button, repo); }, false);
						}
					}
					if (context.nrExtraPacks > 0){
						const div = document.createElement("div");
						div.className = "leftDecks";
						div.innerHTML = "+" + context.nrExtraPacks;
						deckDiv.appendChild(div);
					}
					
				}
			}
		});	
	}

	buildThePage() {
		const div = document.createElement("div");
		div.innerHTML = "<h1>Open card packs</h1>";
		div.className = "upperShit";

		let button = document.createElement("button");
		button.innerHTML = "Open";
		button.addEventListener("click", (e) => { this.showElems(e, button, new OpenPacksRepository()); }, false);

		div.appendChild(button);
		div.style.textAlign = "center";
		this.container.appendChild(div);

		const backImg = document.createElement("div");
		backImg.className = "backImg";
		this.container.appendChild(backImg);

		const deckDiv = document.createElement("div");
		deckDiv.className = "decks";

		const openDiv = document.createElement("div");
		openDiv.className = "openDecks";

		const circleDiv = document.createElement("div");
		circleDiv.className = "circle";

		const staticDeck = document.createElement("div");
		staticDeck.className = "deck";

		circleDiv.appendChild(staticDeck);
		openDiv.appendChild(circleDiv);

		this.container.appendChild(deckDiv);
		this.container.appendChild(openDiv);

		this.generatePacks(button, deckDiv);
	}

	initialize() {
		this.buildThePage();
	}

	destroy() {
	}
}