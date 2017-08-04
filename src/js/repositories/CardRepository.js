class CardRepository {
	constructor() {
		
	}

	postNewCardType(data, callback) {
		const xhr = new XMLHttpRequest();
		xhr.open("POST", "http://localhost:3000/addnewcard", true);
		xhr.setRequestHeader("Content-Type", "application/json");
		console.log("x");
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4) //&& xhr.status == 200) 
			{
				console.log("das");

			}
		//	callback(this.status, JSON.parse(this.responseText));
		};

		xhr.send(data);
	//	return xhr;
		
	}
}

