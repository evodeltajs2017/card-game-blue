class CreateDeck {
	constructor(container, router) {
		this.container = container;
		this.router = router;
		this.cardsInDeckCounter = 0;
	}

	initialize() {
		this.render();
		this.populateCardsPool();
		this.addSaveEvent();
		this.addInputEvent();		
	}

	reroute(x){
		this.router.go(x);

	}

	populateCardsPool(){
		const repo = new ConstructDeckRepository();
		repo.getData("").then((receivedObj) => { 
			let rawData = receivedObj.items;

			for (let i = 0; i < rawData.length; i++){
				let cardModel = this.renderOneCard(rawData[i]);
				this.theDom.querySelector(".cards-list-section").appendChild(cardModel);
			}

			this.addDragDropEvents();
			this.addHoverEffects();	
		});

	}

	renderOneCard(obj){
		let div = document.createElement("div");
		div.className = "tmp-card-model";
		div.setAttribute("draggable", "true");
		div.setAttribute("tag", obj.id);
		div.setAttribute("value", 0);
		

		let template = `<div class="card-model">
							<div class="tmp-card-cost">${obj.cost}</div>
			  				<div class="tmp-card-name">
			  					<p class="align-name-center">${obj.name}</p>
			  				</div>
			  				
				  		</div>`;
		div.innerHTML = template;
		return div;
	}
	
	sendToRepo(deckObject) {
	    const deckRepo = new ConstructDeckRepository();
	    deckRepo.postNewDeck(deckObject).then((message, status) => {
	       //this.reroute("/card-types");
	       this.reroute("/view-decks");
	       console.log("something");
	    }, (message) => {
	    	console.log("something else");
	    });
	}


	render(){
		const htmlTemplate = document.createElement("div");
		htmlTemplate.innerHTML =`
		<div class="tmp-wrapper-container">
			<div class="wrapper-header">
				<h1>Create Deck</h1>
				<div class="buttons-container">
				   <button class="save-denied save-deck action-button" disabled="true" >Save</button>
				</div>
			</div>
			

			<div class="tmp-view-container">
			 	<div class="cards-list-section cards-section-drop-target" >
				  
				</div>
				
				<div class="deck-list-section">
					<div class="deck-name-container">
						<input class="deck-name-input" name="deck-name" type="text" placeholder="Enter a name for the deck" maxlength="30" required>
					</div>
					<div class="deck-cards-container">
						<div class="deck-cards-container-text bad-counter">${this.cardsInDeckCounter} / 30   CARDS</div>
					</div>
					<div class="deck-list-pool deck-section-drop-target" >
				    	
				   	</div>
				</div>
				<div class="clear-view"></div>			   
			</div>   
		</div>
			`;
		this.container.appendChild(htmlTemplate);
		this.theDom = htmlTemplate;
	}

	addSaveEvent(){
		this.theDom.querySelector(".save-deck").addEventListener("click", ()=>{
			this.deckObjectValues = {};
			this.deckObjectValues.ids = [];
			this.deckObjectValues.name = this.theDom.querySelector(".deck-name-input").value;
			let cardsArr = this.theDom.querySelectorAll(".tmp-card-model");
			
			for (let i = 0; i< cardsArr.length; i++)
				if (cardsArr[i].getAttribute("value") == 1)
					this.deckObjectValues.ids.push(cardsArr[i].getAttribute("tag"));

            this.deckObject = JSON.stringify(this.deckObjectValues);
            this.sendToRepo(this.deckObject);

		});
	}

	addInputEvent(){
		this.theDom.querySelector(".deck-name-input").addEventListener("keyup", ()=>{
			console.log("while typing ", this.theDom.querySelector(".deck-name-input").value);
			this.checkDeckValidity();
		});
	}

	addDragDropEvents(){
		this.theDom.querySelector(".cards-section-drop-target").addEventListener("dragenter", (e) =>{
			e.currentTarget.style.backgroundColor = "#1abc9c";
		});

		this.theDom.querySelector(".deck-section-drop-target").addEventListener("dragenter", (e) =>{
			e.currentTarget.style.borderColor = "green";
			e.currentTarget.style.backgroundColor = 'rgba(46,204,113,0.3)'.replace(/[^,]+(?=\))/, '0.5');
		});
		
		this.theDom.querySelector(".cards-section-drop-target").addEventListener("dragover", (e) =>{
			e.preventDefault();


			e.currentTarget.style.backgroundColor = "#1abc9c";
		});


		

		this.theDom.querySelector(".deck-section-drop-target").addEventListener("dragover", (e) =>{
			e.preventDefault();


			e.currentTarget.style.borderColor = "green";
			e.currentTarget.style.backgroundColor = 'rgba(46,204,113,0.3)'.replace(/[^,]+(?=\))/, '0.5');
		});

		this.theDom.querySelector(".cards-section-drop-target").addEventListener("dragleave", (e) =>{
			e.currentTarget.style.backgroundColor = "";
		});

		this.theDom.querySelector(".deck-section-drop-target").addEventListener("dragleave", (e) =>{
			e.currentTarget.style.borderColor = "";
			e.currentTarget.style.backgroundColor = "";
		});

		let theMovingDivs = this.theDom.querySelectorAll(".tmp-card-model");

		for (let i = 0; i < theMovingDivs.length; i++){
			theMovingDivs[i].addEventListener("dragstart", (e) =>{
				e.dataTransfer.setData("source", e.target.getAttribute("tag"));
			});

			theMovingDivs[i].addEventListener("dragover", (e) =>{
				//this.theDom.querySelector(".cards-section-drop-target").style.backgroundColor="";
				e.dataTransfer.dropEffect = "none";

			});

			
		}

		this.theDom.querySelector(".deck-section-drop-target").addEventListener("drop", (e) =>{
			e.preventDefault();
			let data = e.dataTransfer.getData("source");
			let element = this.theDom.querySelector(`[tag="${data}"]`);
				
			if (element.getAttribute("value") == 0){
				this.cardsInDeckCounter += 1;
				element.setAttribute("value", 1);
				this.checkDeckValidity();
			}

			e.target.appendChild(element);
			e.currentTarget.style.borderColor = "";
			e.currentTarget.style.backgroundColor = "";
			//e.dataTransfer.dropEffect = "move";
		});

		this.theDom.querySelector(".cards-section-drop-target").addEventListener("drop", (e) =>{
			e.preventDefault();
			let data = e.dataTransfer.getData("source");
			let element = this.theDom.querySelector(`[tag="${data}"]`);

			if (element.getAttribute("value") == 1){
				this.cardsInDeckCounter -= 1;
				element.setAttribute("value", 0);
				this.checkDeckValidity();
			}

			e.currentTarget.style.backgroundColor = "";
			//e.dataTransfer.dropEffect = "move";
			e.target.appendChild(element);


		});
	}

	checkDeckValidity(){
		let tmpCounterText = this.theDom.querySelector(".deck-cards-container-text");
	    tmpCounterText.innerHTML = `${this.cardsInDeckCounter} / 30   CARDS`;

        let buton = this.theDom.querySelector(".save-deck");
			if ((this.cardsInDeckCounter == 30) && (this.theDom.querySelector(".deck-name-input").value !== "") && (this.theDom.querySelector(".deck-name-input").value !== null)) {
				buton.removeAttribute("disabled");
				buton.classList.remove("save-denied");
	            buton.classList.add("save-allowed");
	            tmpCounterText.classList.remove("bad-counter");
	            tmpCounterText.classList.add("good-counter");
	           
	        } else if (buton.classList.contains("save-allowed")){
	        		buton.classList.remove("save-allowed");
	        		buton.classList.add("save-denied");
	        		buton.setAttribute("disabled", "true");
		        	tmpCounterText.classList.remove("good-counter");
		            tmpCounterText.classList.add("bad-counter");      
	        }

	}

	addHoverEffects(){
		let cardsArr = this.theDom.querySelectorAll(".tmp-card-model");
		
		for (let i = 0; i< cardsArr.length; i++){
			cardsArr[i].addEventListener("mouseover", () => {

				cardsArr[i].classList.add("hover-effect"); 
			});
			cardsArr[i].addEventListener("mouseout", () => {
				cardsArr[i].classList.remove("hover-effect");
			});

		}
	}


	destroy() {
	}
}