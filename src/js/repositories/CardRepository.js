class CardRepository {
	constructor() {
		
	}

	postNewCardType(data, callback) {
		const xhr = new XMLHttpRequest();
		xhr.open("POST", "http://localhost:3000/addnewcard", true);
		xhr.setRequestHeader("Content-Type", "application/json");
		
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 && xhr.status == 200) 
			{
				callback(xhr.responseText, this.status);
				
			}			
		};
		xhr.send(data);	
	}
}

