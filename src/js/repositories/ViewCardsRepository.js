class ViewCardsRepository {
	constructor() {
	}

	getPageOfCards(number, callback) {
		const xhr = new XMLHttpRequest();
		let query = `number=${number}`;
		xhr.open("GET", `http://localhost:3000/view-cards?${query}`, true);

		xhr.onreadystatechange = function() {
			if (xhr.readyState === XMLHttpRequest.DONE) {
				callback(this.status, JSON.parse(this.responseText));
			}
		};

		xhr.send();
	}
}