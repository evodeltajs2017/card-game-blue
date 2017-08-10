class Validator {
	
	constructor(Obj){
		this.objectToValidate = Obj;
		this.responseArr = [];
	}

	initialize(){
		this.validateName();
		this.validateCost();
		this.validateDamage();
		this.validateHealth();
	}

	validateName(){
		console.log("I'm here");
		if ((this.objectToValidate.name == null) || (this.objectToValidate.name == ""))
			this.responseArr.push("The name field is null or empty");
		if (this.objectToValidate.name.length > 30)
			this.responseArr.push("Name must have less than 30 chars");
		if (this.objectToValidate.name.match(/^[a-zA-Z]*$/) == null)
			this.responseArr.push("Name must be alphabetic");
	}

	validateCost(){
		if ((this.objectToValidate.cost == null) || (this.objectToValidate.cost == "")) 
			this.responseArr.push("The cost field is null or empty");
		if ((this.objectToValidate.cost < 0) || (this.objectToValidate.cost > 10))
			this.responseArr.push("The cost value must be between 0-10");
		if (this.objectToValidate.cost.match(/^[0-9]*$/) == null)
			this.responseArr.push("The cost must be a number");
	}

	validateDamage(){
		if ((this.objectToValidate.damage == null) || (this.objectToValidate.damage == "")) 
			this.responseArr.push("The damage field is null or empty");
		if ((this.objectToValidate.damage < 0) || (this.objectToValidate.damage > 10))
			this.responseArr.push("The damage value must be between 0-10");
		if (this.objectToValidate.damage.match(/^[0-9]*$/) == null)
			this.responseArr.push("The damage must be a number");
	}

	validateHealth(){
		if ((this.objectToValidate.health == null) || (this.objectToValidate.health == "")) 
			this.responseArr.push("The health field is null or empty");
		if ((this.objectToValidate.health < 0) || (this.objectToValidate.health > 10))
			this.responseArr.push("The health value must be between 0-10");
		if (this.objectToValidate.health.match(/^[0-9]*$/) == null)
			this.responseArr.push("The health must be a number");
	}

	result(){
		return this.responseArr;
	}



	destroy(){


	}
}