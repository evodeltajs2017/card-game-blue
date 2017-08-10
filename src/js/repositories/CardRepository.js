class CardRepository {
	constructor() {
		
	}

	postNewCardType(data) {
		return new Promise((resolve, reject) =>{
			const xhr = new XMLHttpRequest();
			xhr.open("POST", "http://localhost:3000/addnewcard", true);
			xhr.setRequestHeader("Content-Type", "application/json");
			
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 )
				if (xhr.status == 200){ 
					console.log(this.status);
					resolve(xhr.responseText, this.status);
				
				} else {
					reject(xhr.responseText, this.status);	
				}			
		}

		xhr.send(data);	
		});
	}

}
