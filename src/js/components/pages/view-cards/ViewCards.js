class ViewCards {
    constructor(container) {
        this.container = container;
        this.number = 1;
    }

    putCardsInPlace(openDiv) {
        const repo = new ViewCardsRepository();
        const context = this;
        repo.getPageOfCards(context.number, (status, data) => {
            if (status !== 200) {

            } else {
                console.log(data);
                for (var i = data.length - 1; i >= 0; i--) {
                    let div = document.createElement("div");
                    div.style.height = "400px";
                    div.style.width = "300px";
                    let card = new Card(div, 250, 350, 0, 0, 0, 0);
                    card.initialize();
                    openDiv.appendChild(div);
                }
            }
        });
    }

    buildThePage() {
        const div = document.createElement("div");
        div.innerHTML = "<h1>View Cards</h1>";
        div.className = "upperSide";

        const button = document.createElement("input");
        button.setAttribute("type", "submit");
        button.className = "toTheRight exterior";
        div.appendChild(button);

        const field = document.createElement("input");
        field.className = "toTheRight";
        field.setAttribute("placeholder", "Card name...");
        div.appendChild(field);

        div.style.textAlign = "center";
        this.container.appendChild(div);

        const backImg = document.createElement("div");
        backImg.className = "backImg";
        this.container.appendChild(backImg);

        const openDiv = document.createElement("div");
        openDiv.className = "cards";

        this.container.appendChild(openDiv);

        this.putCardsInPlace(openDiv);
    }

    initialize() {
        this.buildThePage();
    }

    destroy() {}
}