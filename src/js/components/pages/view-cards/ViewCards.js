class ViewCards {
    constructor(container) {
        this.container = container;
        this.number = 1;
        this.func = null;
        this.searchname = "";
        this.totalcards = 0;
    }

    putCardsInPlace() {
        const repo = new ViewCardsRepository();
        const cardsDiv = document.querySelector(".cards");
        const context = this;
        repo.getPageOfCards(context.number, context.searchname, (status, data) => {
            if (status !== 200) {

            } else {
                console.log(data);
                context.totalcards = data.length;
                context.number += data.length;
                for (var i = data.length - 1; i >= 0; i--) {
                    let div = document.createElement("div");
                    div.className = "parentOfCard";
                    div.style.height = "400px";
                    div.style.width = "300px";
                    let card = new Card(div, 250, 350, data[i].Name, data[i].Cost, data[i].Damage, data[i].Health);
                    card.initialize();
                    cardsDiv.appendChild(div);
                }
            }
        });
    }

    search() {
        const input = document.getElementsByTagName("input")[1].value;
        this.searchname = input;
        console.log(this.searchname);
        this.number = 1;
        const parent = document.getElementsByClassName("content-container-temp")[0];
        let cards = document.getElementsByClassName("parentOfCard");
        let cardsDiv = document.getElementsByClassName("cards")[0];
        cardsDiv.innerHTML = '';
        this.putCardsInPlace();
    }

    addScrollEvent() {
        const onscroll = (e) => {
            const top = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
            const limit = document.documentElement.clientHeight + 300;
            const context = this;
            if (document.documentElement.scrollHeight - top < limit)
            {
                if (context.totalcards < 24) { }
                else { 
                    this.putCardsInPlace(); 
                }
            }
        };
        this.handlescroll = onscroll;
        window.addEventListener("scroll", this.handlescroll, false);
    }

    buildThePage() {
        const container = document.createElement("div");
        container.className = "content-container-temp";

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
        button.addEventListener("click", (e) => { this.search(); }, false);
        field.addEventListener("keydown", (e) => { this.search(); }, false);

        div.style.textAlign = "center";
        container.appendChild(div);

        const cardsDiv = document.createElement("div");
        cardsDiv.className = "cards";

        const backImgInner = document.createElement("div");
        backImgInner.className = "backImgInner";
        cardsDiv.appendChild(backImgInner);

        const backImg = document.createElement("div");
        backImg.className = "backImg";
        container.appendChild(backImg);

        container.appendChild(cardsDiv);
        this.container.appendChild(container);
    }

    initialize() {
        this.buildThePage();

        this.putCardsInPlace();

        this.addScrollEvent();
    }

    destroy() {
        window.removeEventListener("scroll", this.handlescroll);
    }
}