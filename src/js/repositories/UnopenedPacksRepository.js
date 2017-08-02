class UnopenedPacksRepository {
	constructor() {
	}

	getUnopenedCardPacks(callback) {
		const xhr = new XMLHttpRequest();
		xhr.open("GET", "http://localhost:3000/open-packs", true);

		xhr.onreadystatechange = function() {
			if (xhr.readyState === XMLHttpRequest.DONE) {
				callback(this.status, eval(this.responseText));
			}
		};

		xhr.send();
	}
}