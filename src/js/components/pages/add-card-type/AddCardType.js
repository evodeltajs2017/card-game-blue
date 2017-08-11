class AddCardType {
	constructor(container, router) {
		this.container = container;
		this.router = router;
	}

	initialize() {
		this.render();
		this.addEvents();
	}

	reroute(x){
		this.router.go(x);

	}
	
	sendToRepo(cardObject) {
	    const cardRepo = new CardRepository();
	    cardRepo.postNewCardType(cardObject).then((errorArray, status) => {
	       this.reroute("/card-types");
	    }, (errorArray) => {
	    	this.displayErr(JSON.parse(errorArray));
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
		<div class="wrapper-container">
			<div class="wrapper-header">
				<h1>add card type</h1>
				<div class="buttons-container">
				   <button class="save action-button">Save</button>
				   <button class="cancel action-button">Cancel</button>
				</div>
		</div>
			</div>

			<div class="view-container">
			   <div class="display-error"></div>
			 	<div class="section-model">
				   <div class="card-model-container">
				      <div class="card-model-cost rounded-stats"> COST </div>
				      <div class="card-model-image">
				         <div class="image-to-change">
				            <i class="fa fa-question-circle-o" aria-hidden="true"></i>
				         </div>
				         <div class="card-model-name">Card Name</div>
				      </div>
				      <div class="card-model-damage rounded-stats"> DAMAGE </div>
				      <div class="card-model-health rounded-stats"> HEALTH </div>
				   </div>
				</div>
				<div class="section-input">
			    <div class="card-input-container">
			      <form class="form-horizontal">
			         <fieldset class="fieldset">
			            <div class="card-form-style">
			               <label class="card-input-label" for="card-name">Name</label>  
			               <div class="card-form-style">
			                  <input class="card-name card-input-style" name="card-name" type="text" placeholder="Name (required)" maxlength="30" required>
			               </div>
			            </div>
			            <div class="card-form-style">
			               <label class="card-input-label" for="card-cost">Cost</label>  
			               <div class="card-form-style">
			                  <input class="card-cost card-input-style" name="card-cost" type="text" placeholder="Cost (required)" min="0" max="10" required>
			               </div>
			            </div>
			            <div class="card-form-style">
			               <label class="card-input-label" for="card-damage">Damage</label>  
			               <div class="card-form-style">
			                  <input class="card-damage card-input-style" name="card-damage" type="text" placeholder="Damage (required)" required>
			               </div>
			            </div>
			            <div class="card-form-style">
			               <label class="card-input-label" for="card-health">Health</label>  
			               <div class="card-form-style">
			                  <input class="card-health card-input-style" name="card-health" type="text" placeholder="Health (required)"  required>
			               </div>
			            </div>
			            <div class="last-element card-form-style">
			               <label class="card-input-label " for="card-image">Image</label>
			               <div class="card-form-style">
			                  <select class="image-select card-input-style">
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
			   </div>
			   <div class="clear"></div>
			</div>   
		</div>
			`;
		this.container.appendChild(htmlTemplate);
		this.theDom = htmlTemplate;
	}

	addEvents() {
	    this.theDom.querySelector(".card-name").addEventListener("keyup", () => {
	        this.theDom.querySelector(".card-model-name").innerHTML =
	            this.theDom.querySelector(".card-name").value;
	    });
	    this.theDom.querySelector(".card-cost").addEventListener("keyup", () => {
	        this.theDom.querySelector(".card-model-cost").innerHTML =
	            this.theDom.querySelector(".card-cost").value;
	    });
	    this.theDom.querySelector(".card-damage").addEventListener("keyup", () => {
	        this.theDom.querySelector(".card-model-damage").innerHTML =
	            this.theDom.querySelector(".card-damage").value;
	    });
	    this.theDom.querySelector(".card-health").addEventListener("keyup", () => {
	        this.theDom.querySelector(".card-model-health").innerHTML =
	            this.theDom.querySelector(".card-health").value;
	    });
	    this.theDom.querySelector(".image-select").addEventListener("change", () => {
	        this.theDom.querySelector(".image-to-change").innerHTML =
	            `<i class="fa ${this.theDom.querySelector(".image-select").value}" aria-hidden="true"></i>`
	    });

	    this.theDom.querySelector(".cancel").addEventListener("click", () => {
	    	this.reroute("/");

	    });
	    this.theDom.querySelector(".save").addEventListener("click", () => {
	        this.cardObjectValues = {};
	        this.cardObjectValues.name = this.theDom.querySelector(".card-name").value;
	        this.cardObjectValues.cost = this.theDom.querySelector(".card-cost").value;
	        this.cardObjectValues.damage = this.theDom.querySelector(".card-damage").value;
	        this.cardObjectValues.health = this.theDom.querySelector(".card-health").value;
	        this.cardObjectValues.image = this.theDom.querySelector(".image-select").value;


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