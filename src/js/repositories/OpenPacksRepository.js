class OpenPacksRepository {
	constructor() {
	}

	getOpenedCards(callback) {
		const xhr = new XMLHttpRequest();
		xhr.open("POST", "http://localhost:3000/open-packs", true);

		xhr.onreadystatechange = function() {
			if (xhr.readyState === XMLHttpRequest.DONE) {
				const response = eval(this.responseText);
				console.log("this: " + response.length);
				callback(this.status, response);
			}
		};

		xhr.send();
	}
}