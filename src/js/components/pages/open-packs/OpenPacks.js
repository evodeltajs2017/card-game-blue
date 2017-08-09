class OpenPacks {
	constructor(container) {
		this.container = container;
	}


	adaugaListener(e, ceva, butt, repo) {
		ceva.addEventListener("click", (e) => { e.stopImmediatePropagation(); this.showElems(e, butt, repo); }, false);
	}

	createDivForCard(modal, name, cost, damage, health, left, top) {
		const divCarte = document.createElement("div");
		divCarte.className = "openedCard modal-content";
		const paraph = document.createElement("p");
		paraph.setAttribute("id", "wordWrap");
		paraph.innerHTML = "<pre> Name: " + name + "\n Cost: " + cost + "\n Damage: " + damage + "\n Health: " + health + "</pre>";
		divCarte.appendChild(paraph);
		divCarte.style.marginLeft = left+"%";
		divCarte.style.marginTop = top+"px";
		modal.appendChild(divCarte);
	}

	openingTheDeck(data) {
		const modal = document.createElement("div");
		modal.className = "modal";
		modal.style.display = "block";
		const kitten = this;
		let left = 54;
		let top = 90;
		let i = 0;
		//data.forEach(function(i) { kitten.createDivForCard(i.Name, i.Cost, i.Damage, i.Health, left, top); left = left + 170; });
		for (i=0; i<data.length; i++) {
			kitten.createDivForCard(modal, data[i].Name, data[i].Cost, data[i].Damage, data[i].Health, left, top);
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
				if (nr === "+0") {
					let listOfDOMDecks = document.getElementsByClassName("decks");
					listOfDOMDecks[0].removeChild(listOfDOMDecks[0].childNodes[0]);
				}
				else {
					leftDecks.innerHTML = "+" + eval(nr - 1);
					if (eval(nr - 1) === 0) {
						let listOfDOMDecks = document.getElementsByClassName("decks");
						leftDecks.parentNode.removeChild(leftDecks);
					}
				}
				const first = document.getElementsByClassName("deck");
				if (first.length === 0) {
					
				}
				else{
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

	initialize() {
		const repo = new OpenPacksRepository();

		const div = document.createElement("div");
		div.innerHTML = "<h1>Open card packs</h1>";
		div.className = "upperShit";
		let butt = document.createElement("button");
		butt.innerHTML = "Open";

		butt.addEventListener("click", (e) => { this.showElems(e, butt, repo); }, false);
		div.appendChild(butt);
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
		
		repo.getUnopenedCardPacks((status, data) => {
			if (status !== 200) {

			}
			else{
				console.log(status, data);
				if (data.UnopenedCardPacks === 0) {
					butt.setAttribute("disabled", true);
				}
				else{
					let nrDecks = data.UnopenedCardPacks;
					let nrOfLeftDecks = 0;
					if (nrDecks > 4) {
						nrOfLeftDecks = nrDecks - 4;
						nrDecks = 4;
					}
					let i = 0;
					for (i = 0; i<nrDecks; i++) {
						const div = document.createElement("div");
						div.className = "deck";
						deckDiv.appendChild(div);
						if (i === 0) {
							div.addEventListener("click", (e) => { e.stopImmediatePropagation(); this.showElems(e, butt, repo); }, false);
						}
					}
					if (nrOfLeftDecks > 0){
						const div = document.createElement("div");
						div.className = "leftDecks";
						div.innerHTML = "+" + nrOfLeftDecks;
						deckDiv.appendChild(div);
					}
					
				}
			}
		});

		this.container.appendChild(deckDiv);
		this.container.appendChild(openDiv);	
	}

	destroy() {
	}
}