class Dashboard {
    constructor(container) {
        this.container = container;
        this.playerTurn = false;
        this.turnNum = 0;
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
            let playerDeck = [];
            let playerHand = [];
            let aiHand = [];
            let aiDeck = [];


            this.cardType = receivedObj.items;
            this.makeRandomDeck(playerDeck, this.cardType);
            this.makeRandomDeck(aiDeck, this.cardType);



            let template = `
            <div class="OpponentHand">
                <div class="Health-Container">
                    <div class = "Health-Fill">
                    </div>
                </div>
                
                <div class="OpponentHandCards">
                    <div class = "FillInDiv">
                    </div>
                    <div class="PlayCard">
                    </div>
                </div>

                <div class="OpponentHandCards" style="transform: rotate(5deg)">
                    <div class = "FillInDiv">
                    </div>
                    <div class="PlayCard" style="background=red">
                    </div>
                </div>
                <div class="OpponentMana"></div>
            </div>

            <div class ="Info">
                
                <div class="OpponentDeck"></div>
                <div class="EndTurnButton-Container"><button class="EndTurnButton">End Turn</button></div>
                <div class="PlayerDeck"></div>
                
            </div>
            
            <div class="OpponentField"></div>
        
            <div class="PlayerField"></div>
            <div class="PlayerHand">
                <div class="PlayerHandCards">
                    <div class="PlayCard">
                    </div>
                </div>

                <div class="PlayerMana"></div>
            </div>
    
        `;

            gameDiv.innerHTML = template;


            gameDiv.querySelector(".EndTurnButton").addEventListener("click", () => {
                this.switchTurn();
            })

        })
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