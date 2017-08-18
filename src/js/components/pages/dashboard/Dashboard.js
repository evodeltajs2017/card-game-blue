class Dashboard {
    constructor(container) {
        this.container = container;
        this.playerTurn = false;
        this.turnNum = 0;
        this.playerCards = 0;
        this.aiCards = 0;
        this.playerDeck = [];
        this.playerHand = [];
        this.aiHand = [];
        this.aiDeck = [];
    }

    initialize() {

        const repo = new DashboardRepository();
        let cardType = [];



        const div = document.createElement("div");
        const wrapper = document.createElement("div");
        wrapper.className = "play-wrapper";
        div.className = "StartDiv";

        const startButton = document.createElement("button");
        startButton.className = "startButton";
        startButton.addEventListener("click", () => {
            this.startGame(repo);
        });


        startButton.textContent = "Start New Game";
        wrapper.appendChild(startButton);
        wrapper.appendChild(div);

        this.container.appendChild(wrapper);
    }

    startGame(repo) {

        document.querySelector(".play-wrapper").className += " giveBG";
        const gameDiv = document.querySelector(".StartDiv");
        gameDiv.className = "GameDiv";
        document.querySelector(".startButton").remove();

        this.element = gameDiv;
        this.playGame(repo, gameDiv);
    }

    playGame(repo, gameDiv) {
        repo.getCardTypeList().then((receivedObj) => {

            let top = -30;
            let left = 20;
            let cardAngle = -40;



            this.cardType = receivedObj.items;
            this.makeRandomDeck(this.playerDeck, this.cardType);
            this.makeRandomDeck(this.aiDeck, this.cardType);

            const model = new GameModel(this.playerDeck, this.aiDeck);



            let template = `
            <div class="DisplayCard"></div>
            
            <div class="OpponentHandArea">
            <div class="Health-Container">
            <div class = "Health-Fill">
            </div>
        </div>
            <div class="OpponentHand"></div>
               
               `


            template += `
               
                <div class="OpponentMana"></div>
            </div>
            <div class="OpponentDeck"></div>
            <div class="OpponentField"></div>
            <div class="EndTurnButton-Container"><button class="EndTurnButton">End Turn</button></div>
            <div class="PlayerField"></div>
            <div class="PlayerDeck"></div>
            <div class="PlayerHandArea">
                <div class = "PlayerHand"></div>
                <div class="PlayerMana">
                    <div class = "PlayerManaNumber"><p class="PlayerManaNumberText"></p></div>
                    <div class = "PlayerManaImages"></div>
                </div>
            </div>
    
        `;

            gameDiv.innerHTML = template;


            model.showHand = () => {
                this.drawPlayerHand(model.playerHand, model);
            };

            model.showAiHand = () => {
                this.drawAiHand(model.aiHand);
            }

            model.playerDrawMana = () => {
                this.drawPlayerMana(model.playerMana, model.turnNumber);
            }

            model.onPlayCard = (card, e) => {
                this.drawPlayerBoard(card);
                e.target.remove();
            };

            model.onAiPlayCard = (card, e) => {
                this.drawAiBoard(card);
                // e.target.remove();
            };

            model.onPlayerManaReset = () => {
                this.refreshPlayerMana(model.playerMana);
            };
            model.initialize();

            gameDiv.querySelector(".EndTurnButton").addEventListener("click", () => {
                model.endTurn();
                // top += 10;
                // left += 10;
                // gameDiv.querySelector(".Health-Fill").style.top = top + "px";
                // gameDiv.querySelector(".Health-Fill").style.left = left + "px";
            })

        })
    }



    drawPlayerBoard(card) {
        let board = this.element.querySelector(".PlayerField");
        let fieldCard = document.createElement("div");
        fieldCard.className = "TableCard";
        let carte = new Card(fieldCard, fieldCard.style.width, fieldCard.style.height, card.name, card.cost, card.damage, card.health, "fa-trophy" /* card.img*/ );
        carte.initialize();
        board.appendChild(fieldCard);
    }

    drawAiBoard(card) {
        let board = this.element.querySelector(".OpponentField");
        let fieldCard = document.createElement("div");
        fieldCard.className = "AITableCard";
        let carte = new Card(fieldCard, fieldCard.style.width, fieldCard.style.height, card.name, card.cost, card.damage, card.health, "fa-trophy" /* card.img*/ );
        carte.initialize();
        board.appendChild(fieldCard);
    }


    drawAiHand(playerHand) {

        let angle = playerHand.length;
        let cardContainer;
        let container;
        let fillIn;


        if (angle % 2 != 0) {
            angle -= 1;

        }

        angle = (angle * 5 - 8) * (-1);

        let handArea = this.element.querySelector(".OpponentHand");
        handArea.innerHTML = "";
        for (let i = 0; i < playerHand.length; i++) {

            container = document.createElement("div");
            container.className = "OpponentHandCards";
            container.style.transform = `rotate(${angle}deg)`;

            fillIn = document.createElement("div");
            fillIn.className = "FillInDiv";

            cardContainer = document.createElement("div");
            cardContainer.className = "OpponentPlayCard";

            container.appendChild(fillIn);
            container.appendChild(cardContainer);

            handArea.appendChild(container);
            angle += 10;
        }
    }

    drawPlayerHand(playerHand, model) {

        let card;
        let cardContainer;
        let container;
        let angle = playerHand.length;
        console.log("Player: " + angle);
        if (angle % 2 != 0) {
            angle -= 1;
        }
        angle = (angle * 5 - 8) * (-1);

        let handArea = this.element.querySelector(".PlayerHand");
        handArea.innerHTML = "";
        for (let i = 0; i < playerHand.length; i++) {

            container = document.createElement("div");
            container.className = "PlayerHandCards";
            container.style.transform = `rotate(${angle}deg)`;

            cardContainer = document.createElement("div");
            cardContainer.className = "PlayerPlayCard";

            cardContainer.addEventListener("mouseenter", () => {
                let cardContainerEvent = this.element.querySelector(".DisplayCard");
                cardContainerEvent.innerHTML = "";
                cardContainerEvent.style.display = "block";
                let card = new Card(cardContainerEvent, cardContainerEvent.width, cardContainerEvent.height, playerHand[i].name, playerHand[i].cost, playerHand[i].damage, playerHand[i].health, "fa-trophy"); //playerHand[i].img);

                card.initialize();
                this.element.querySelector(".DisplayCard")
            })

            cardContainer.addEventListener("mouseleave", () => {
                this.element.querySelector(".DisplayCard").style.display = "none";

            })

            cardContainer.addEventListener("click", (e) => {
                model.playCard(i, e);
                // e.target.remove();
                this.element.querySelector(".DisplayCard").style.display = "none";

            })

            card = new Card(cardContainer, cardContainer.width, cardContainer.height, playerHand[i].name, playerHand[i].cost, playerHand[i].damage, playerHand[i].health, "fa-trophy"); //playerHand[i].img);
            card.initialize();

            container.appendChild(cardContainer);
            handArea.appendChild(container);
            angle += 10;
        }

        // let divs = document.querySelectorAll(".PlayerPlayCard");

        // for (let j = 0; j < divs.length; j++) {
        //     divs[j].addEventListener("click", () => {
        //         model.playCard(divs[j]);
        //         divs[j].remove();
        //         this.element.querySelector(".DisplayCard").style.display = "none";

        //     })
        // }


    }

    makeRandomDeck(deck, cardType) {
        for (let i = 0; i < 30; i++) {
            deck.push(cardType[Math.floor(Math.random() * cardType.length)]);
        }
    }

    drawPlayerMana(mana, totalMana) {
        let manaBar = this.element.querySelector(".PlayerManaImages");
        let manaText = this.element.querySelector(".PlayerManaNumberText");
        manaBar.innerHTML = "";
        for (let i = 0; i < mana; i++) {
            manaBar.innerHTML += `<div class="Mana"></div>`;

        }
        for (let i = mana; i < totalMana; i++) {
            manaBar.innerHTML += `<div class="DepletedMana"></div>`;
        }
        manaText.innerHTML = `${mana}/${totalMana}`;
    }

    refreshPlayerMana(mana) {
        let manaBar = this.element.querySelector(".PlayerMana");
        manaBar.innerHTML = "";
        for (let i = 0; i < mana; i++) {
            manaBar.innerHTML += `<div class="Mana"></div>`;
        }
    }

    arangeHand() {

    }

    destroy() {}
}