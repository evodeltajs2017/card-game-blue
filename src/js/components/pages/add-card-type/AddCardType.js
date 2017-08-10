class AddCardType {
	constructor(container, router) {
		this.container = container;
		this.router = router;
	}

	initialize() {
		this.render();
		this.addEvents();
	}

	reroute(innerPath){
		this.router.go("/");

	}
	
	sendToRepo(cardObject) {
	    const cardRepo = new CardRepository();
	    cardRepo.postNewCardType(cardObject, (errorArray, status) => {
	        if (status !== 200) {
	            console.log("not 200 here");
	        } else if (errorArray == "Success") {
	        	this.reroute("");
	        	
	        } else {
	            this.displayErr(JSON.parse(errorArray));
	        }
	    });
	}

	displayErr(errorArray) {
	    let displayErr = this.theDom.querySelector(".display-error");
	    displayErr.innerHTML = "";
	    for (let i = 0; i < errorArray.length; i++) {
	        let errMessage = document.createElement("p");
	        errMessage.className = "err-message";
	        errMessage.innerHTML = `<i class="fa fa-times-circle"></i> ${errorArray[i]} `;
	        displayErr.appendChild(errMessage);
	    }
	}

	render(){
		const htmlTemplate = document.createElement("div");
		htmlTemplate.innerHTML =`
		<h1>add card type</h1>
		<div class="buttons-container">
		   <button id="save" class="action-button">Save</button>
		   <button id="cancel" class="action-button">Cancel</button>
		</div>
		</br>
		<hr>
		<div class="view-container">
		   <div class="display-error"></div>
		   <div class="card-model-container">
		      <div id="card-model-cost" class="rounded-stats"> COST </div>
		      <div id="card-model-image">
		         <div id="image-to-change">
		            <i class="fa fa-question-circle-o" aria-hidden="true"></i>
		         </div>
		         <div id="card-model-name">Card Name</div>
		      </div>
		      <div id="card-model-damage" class="rounded-stats"> DAMAGE </div>
		      <div id="card-model-health" class="rounded-stats"> HEALTH </div>
		   </div>
		   <div class="card-input-container">
		      <form class="form-horizontal">
		         <fieldset id="fieldset">
		            <div class="card-form-style">
		               <label class="card-input-label" for="card-name">Name</label>  
		               <div class="card-form-style">
		                  <input id="card-name" name="card-name" type="text" placeholder="Name (required)" class="card-input-style" required="">
		               </div>
		            </div>
		            <div class="card-form-style">
		               <label class="card-input-label" for="card-cost">Cost</label>  
		               <div class="card-form-style">
		                  <input id="card-cost" name="card-cost" type="text" placeholder="Cost (required)" class="card-input-style" required="">
		               </div>
		            </div>
		            <div class="card-form-style">
		               <label class="card-input-label" for="card-damage">Damage</label>  
		               <div class="card-form-style">
		                  <input id="card-damage" name="card-damage" type="text" placeholder="Damage (required)" class="card-input-style" required="">
		               </div>
		            </div>
		            <div class="card-form-style">
		               <label class="card-input-label" for="card-health">Health</label>  
		               <div class="card-form-style">
		                  <input id="card-health" name="card-health" type="text" placeholder="Health (required)" class="card-input-style" required="">
		               </div>
		            </div>
		            <div id="last-element" class="card-form-style">
		               <label class="card-input-label " for="card-image">Image</label>
		               <div class="card-form-style">
		                  <select id="image-select" class="card-input-style">
		                     <option value="fa-trophy">Trophy</option>
		                     <option value="fa-taxi">Car</option>
		                     <option value="fa-snowflake-o">Snowflake</option>
		                     <option value="fa-rocket">Rocket</option>
		                  </select>
		               </div>
		            </div>
		         </fieldset>
		      </form>
		   </div>
		   <div class="clear"></div>
		</div>
			`;
		this.container.appendChild(htmlTemplate);
		this.theDom = htmlTemplate;
	}

	addEvents() {
	    this.theDom.querySelector("#card-name").addEventListener("keyup", () => {
	        this.theDom.querySelector("#card-model-name").innerHTML =
	            this.theDom.querySelector("#card-name").value;
	    });
	    this.theDom.querySelector("#card-cost").addEventListener("keyup", () => {
	        this.theDom.querySelector("#card-model-cost").innerHTML =
	            this.theDom.querySelector("#card-cost").value;
	    });
	    this.theDom.querySelector("#card-damage").addEventListener("keyup", () => {
	        this.theDom.querySelector("#card-model-damage").innerHTML =
	            this.theDom.querySelector("#card-damage").value;
	    });
	    this.theDom.querySelector("#card-health").addEventListener("keyup", () => {
	        this.theDom.querySelector("#card-model-health").innerHTML =
	            this.theDom.querySelector("#card-health").value;
	    });
	    this.theDom.querySelector("#image-select").addEventListener("change", () => {
	        this.theDom.querySelector("#image-to-change").innerHTML =
	            `<i class="fa ${this.theDom.querySelector("#image-select").value}" aria-hidden="true"></i>`
	    });

	    this.theDom.querySelector("#save").addEventListener("click", () => {
	        this.cardObjectValues = {};
	        this.cardObjectValues.name = this.theDom.querySelector("#card-name").value;
	        this.cardObjectValues.cost = this.theDom.querySelector("#card-cost").value;
	        this.cardObjectValues.damage = this.theDom.querySelector("#card-damage").value;
	        this.cardObjectValues.health = this.theDom.querySelector("#card-health").value;
	        this.cardObjectValues.image = this.theDom.querySelector("#image-select").value;


	        let validateMyData = new Validator(this.cardObjectValues);
	        validateMyData.initialize();
	        let errorArray = validateMyData.result();

	        if (errorArray.length > 0) {
	            this.displayErr(errorArray);

	        } else {
	            this.cardObject = JSON.stringify(this.cardObjectValues);
	            this.sendToRepo(this.cardObject);
	        }
	    });
	}

	destroy() {
	}
}