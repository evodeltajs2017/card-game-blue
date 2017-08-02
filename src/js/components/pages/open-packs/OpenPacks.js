class OpenPacks {
	constructor(container) {
		this.container = container;
	}

	initialize() {
		const div = document.createElement("div");
		div.innerHTML = "<h1>Open card packs</h1>";
		div.className = "upperShit";
		const butt = document.createElement("button");
		butt.innerHTML = "Open";
		div.appendChild(butt);
		div.style.textAlign = "center";
		this.container.appendChild(div);
		this.container.style.backgroundImage = "url(../src/js/components/pages/open-packs/imgs/maxresdefault.jpg)";
		

		const repo = new UnopenedPacksRepository();
		repo.getUnopenedCardPacks((status, data) => {
			if (status !== 200) {
				div.innerHTML = "<h1>error</h1>";
			} else {
				console.log(status, data);
			}
		});
	}

	destroy() {
	}
}