class OpenPacksRepository {
	constructor() {
	}

	getUnopenedCardPacks(callback) {
		const xhr = new XMLHttpRequest();
		xhr.open("POST", "http://localhost:3000/sample", true);

		xhr.onreadystatechange = function() {
			if (xhr.readyState === XMLHttpRequest.DONE) {
				callback(this.status, JSON.parse(this.responseText));
			}
		};

		xhr.send();
	}

	getOpenedCards(callback) {
		const xhr = new XMLHttpRequest();
		xhr.open("POST", "http://localhost:3000/open-packs", true);

		xhr.onreadystatechange = function() {
			if (xhr.readyState === XMLHttpRequest.DONE) {
				callback(this.status, JSON.parse(this.responseText));
			}
		};

		xhr.send();
	}
}