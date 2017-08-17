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

        div.className = "StartDiv";

        const startButton = document.createElement("button");
        startButton.className = "startButton";
        startButton.addEventListener("click", () => {
            this.startGame(repo);
        });


        startButton.textContent = "Start New Game";

        this.container.appendChild(startButton);
        this.container.appendChild(div);
    }

    startGame(repo) {

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

            this.giveCards(this.playerHand, this.playerDeck);
            this.giveCards(this.aiHand, this.aiDeck);




            let template = `
            <div class="DisplayCard"></div>
            <div class="OpponentHand">
                <div class="Health-Container">
                    <div class = "Health-Fill">
                    </div>
                </div>
               `

            for (let i = 0; i < 10; i++) {
                template += `<div class="OpponentHandCards" style="transform: rotate(${cardAngle}deg)">
                <div class = "FillInDiv">
                </div>
                <div class="OpponentPlayCard" >
                </div>
                </div>`;
                cardAngle += 10;
            }

            template += `
               
                <div class="OpponentMana"></div>
            </div>

            <div class ="Info">
                
                <div class="OpponentDeck"></div>
                <div class="EndTurnButton-Container"><button class="EndTurnButton">End Turn</button></div>
                <div class="PlayerDeck"></div>
                
            </div>
            
            <div class="OpponentField"></div>
        
            <div class="PlayerField">
            
            </div>
            <div class="PlayerHand">`;

            cardAngle = -40;
            for (let i = 0; i < 10; i++) {
                template += `<div class="PlayerHandCards" style="transform: rotate(${cardAngle}deg)">
                <div class="PlayerPlayCard" style=" background: #${Math.floor(Math.random() * 90 + 10)}${Math.floor(Math.random() * 90 + 10)}${Math.floor(Math.random() * 90 + 10)}">
                </div>
                </div>`;
                cardAngle += 10;
            }


            template += `
                

                <div class="PlayerMana"></div>
            </div>
    
        `;

            gameDiv.innerHTML = template;

            this.drawPlayerHand();

            gameDiv.querySelector(".EndTurnButton").addEventListener("click", () => {
                this.switchTurn();
                top += 10;
                left += 10;
                gameDiv.querySelector(".Health-Fill").style.top = top + "px";
                gameDiv.querySelector(".Health-Fill").style.left = left + "px";
            })

            let divs = document.querySelectorAll(".PlayerPlayCard");

            for (let i = 0; i < divs.length; i++) {

                divs[i].addEventListener("mouseenter", () => {
                    let cardContainer = gameDiv.querySelector(".DisplayCard");
                    cardContainer.innerHTML = "";
                    cardContainer.style.display = "block";
                    let card = new Card(cardContainer, cardContainer.width, cardContainer.height, this.playerHand[i].name, this.playerHand[i].cost, this.playerHand[i].damage, this.playerHand[i].health, "fa-trophy"); //this.playerHand[i].img);

                    card.initialize();
                    this.element.querySelector(".DisplayCard")
                })

                divs[i].addEventListener("click", (e) => {
                    if (this.playerCards < 7) {
                        this.playCard(e);
                        divs[i].remove();
                        gameDiv.querySelector(".DisplayCard").style.display = "none";
                    }
                })

                divs[i].addEventListener("mouseleave", () => {
                    gameDiv.querySelector(".DisplayCard").style.display = "none";

                })
            }



        })
    }

    playCard(elem) {
        console.log(elem);
        let field = this.element.querySelector(".PlayerField");
        let fieldCard = document.createElement("div");
        fieldCard.className = "TableCard";
        let card = new Card(fieldCard, fieldCard.style.width, fieldCard.style.height, "OP Card", 2, 4, 5, "fa-trophy");
        card.initialize();
        field.appendChild(fieldCard);
        this.playerCards += 1;

    }

    giveCards(hand, deck) {
        for (let i = 0; i < 3; i++)
            hand.push(deck.pop());
    }

    drawPlayerHand() {

        let card;
        let cardContainer;
        let container;
        let angle = this.playerHand.length;
        if (angle % 2 != 0) {
            angle -= 1;
        }
        angle = (angle * 5) * (-1);
        console.log(angle);

        let handArea = this.element.querySelector(".PlayerHand");
        handArea.innerHTML = "";
        for (let i = 0; i < this.playerHand.length; i++) {

            container = document.createElement("div");
            container.className = "PlayerHandCards";
            container.style.transform = `rotate(${angle}deg)`;

            cardContainer = document.createElement("div");
            cardContainer.className = "PlayerPlayCard";

            card = new Card(cardContainer, cardContainer.width, cardContainer.height, this.playerHand[i].name, this.playerHand[i].cost, this.playerHand[i].damage, this.playerHand[i].health, "fa-trophy"); //this.playerHand[i].img);
            card.initialize();

            container.appendChild(cardContainer);
            handArea.appendChild(container);
            angle += 10;
        }
    }

    makeRandomDeck(deck, cardType) {
        for (let i = 0; i < 30; i++) {
            deck.push(cardType[Math.floor(Math.random() * cardType.length)]);
        }
    }

    switchTurn() {

        this.playerTurn = !this.playerTurn;
        let buton = this.element.querySelector(".EndTurnButton");

        let target = "";
        if (this.playerTurn == true) {
            target += "Player";
            this.turnNum += 1;
            buton.removeAttribute("disabled");
        } else {
            target += "Opponent";
            // buton.setAttribute("disabled", "true");
        }

        this.refreshMana(target);
    }

    arangeHand() {

    }

    refreshMana(target) {
        let manaBar = this.element.querySelector(`.${target + "Mana"}`);
        manaBar.innerHTML = "";
        if (this.turnNum < 10) {
            for (let i = 0; i < this.turnNum; i++) {
                manaBar.innerHTML += `<div class="Mana"></div>`;
            }
        } else {
            for (let i = 0; i < 10; i++) {
                manaBar.innerHTML += `<div class="Mana"></div>`;
            }
        }

    }
    destroy() {}
}