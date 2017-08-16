class OpenPacksRepository {
	constructor() {
	}

	getAllCards(callback) {
		const xhr = new XMLHttpRequest();
		xhr.open("POST", "http://localhost:3000/view-cards", true);

		xhr.onreadystatechange = function() {
			if (xhr.readyState === XMLHttpRequest.DONE) {
				callback(this.status, JSON.parse(this.responseText));
			}
		};

		xhr.send();
	}
}