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
        this.aileft = 20;
        this.aitop = -124;
        this.playertop = -124;
        this.playerleft = 20;
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
            <div class="Ai-Health-Container"><p class ="AiHpText">30</p>
            <div class = "Ai-Health-Fill">
            </div>
        </div>
            <div class="OpponentHand"></div>
         
                <div class="OpponentMana"><p class="OpponentManaText"></p></div>
            </div>
            <div class="OpponentDeck"></div>
            <div class = "AiChar"></div>
            <div class="OpponentField"></div>
            <div class="EndTurnButton-Container"><button class="EndTurnButton">End Turn</button></div>
            <div class="PlayerField"></div>
            <div class="PlayerDeck"></div>
            <div class= "PlayerChar"></div>
            <div class="PlayerHandArea">
            <div class="Player-Health-Container"><p class ="PlayerHpText">30</p>
            <div class = "Player-Health-Fill"></div></div>
                <div class = "PlayerHand"></div>
                <div class="PlayerMana">
                    <div class = "PlayerManaNumber"><p class="PlayerManaNumberText"></p></div>
                    <div class = "PlayerManaImages"></div>
                </div>
            </div>
    
        `;

            gameDiv.innerHTML = template;

            this.element.querySelector(".AiChar").addEventListener("click", () => {
                model.minionAttackHero();
            });

            model.requestManaDraw = (cost) => {
                if (model.playerMana < 10) {
                    this.requestManaDraw(model.playerMana, model.turnNumber, cost);
                } else {
                    this.requestManaDraw(model.playerMana, 10, cost);
                }
            }

            model.drawAiHp = (damage) => {
                this.drawAiHp(model.aiHp, damage);
            }

            model.drawField = () => {
                this.drawField(model.playerBoard, model.aiBoard, model);

            }

            model.endTheGame = (winner) => {
                this.endTheGame(winner);
            }

            model.drawPlayerHp = (damage) => {
                this.drawPlayerHp(model.playerHp, damage);
            }

            model.showHand = () => {
                this.drawPlayerHand(model.playerHand, model);
            };

            model.showAiHand = () => {
                this.drawAiHand(model.aiHand);
            }

            model.drawAiMana = () => {
                if (model.turnNumber < 10) {
                    this.drawAiMana(model.aiMana, model.turnNumber);
                } else {
                    this.drawAiMana(model.aiMana, 10);
                }
            }

            model.playerDrawMana = () => {
                if (model.turnNumber < 10) {
                    this.drawPlayerMana(model.playerMana, model.turnNumber);
                } else {
                    this.drawPlayerMana(model.playerMana, 10);
                }

            }

            model.cantPlay = () => {
                this.cantPlay();
            }

            model.onPlayCard = (card, e, index) => {
                this.drawPlayerBoard(card, model, index);
                e.target.remove();
            };

            model.onAiPlayCard = (card, index) => {
                this.drawAiBoard(card, model, index);
            };

            model.initialize();

            gameDiv.querySelector(".EndTurnButton").addEventListener("click", (e) => {
                e.target.style.background = "white";
                model.endTurn();
            })

        })
    }

    drawField(player, ai, model) {
        let playerBoard = this.element.querySelector(".PlayerField");
        let aiBoard = this.element.querySelector(".OpponentField");
        playerBoard.innerHTML = "";
        for (let i = 0; i < player.length; i++) {
            if (player.length > 0)
                this.drawPlayerBoard(player[i], model, i);
        }
        aiBoard.innerHTML = "";
        for (let i = 0; i < ai.length; i++) {
            if (ai.length > 0)
                this.drawAiBoard(ai[i], model, i);
        }
    }

    drawPlayerBoard(card, model, index) {
        let board = this.element.querySelector(".PlayerField");
        let fieldCard = document.createElement("div");
        fieldCard.className = "TableCard";
        let carte = new Card(fieldCard, fieldCard.style.width, fieldCard.style.height, card.name, card.cost, card.damage, card.health, card.imageid);
        carte.initialize();
        board.appendChild(fieldCard);
        fieldCard.addEventListener("click", () => {
            model.selectMonster(index);
        });
    }

    drawAiHp(hp, damage) {
        this.element.querySelector(".AiHpText").innerHTML = hp;
        let bara = this.element.querySelector(".Ai-Health-Fill");
        this.aitop += (damage * 30 / 100) * 10;
        this.aileft += (damage * 30 / 100) * 10;
        bara.style.top = this.aitop + "px";
        bara.style.left = this.aileft + "px";
    }

    drawPlayerHp(hp, damage) {
        this.element.querySelector(".PlayerHpText").innerHTML = hp;
        let bara = this.element.querySelector(".Player-Health-Fill");
        this.playertop += (damage * 30 / 100) * 10;
        this.playerleft += (damage * 30 / 100) * 10;
        bara.style.top = this.playertop + "px";
        bara.style.left = this.playerleft + "px";
    }

    drawAiBoard(card, model, index) {
        let board = this.element.querySelector(".OpponentField");
        let fieldCard = document.createElement("div");
        fieldCard.className = "AITableCard";
        let carte = new Card(fieldCard, fieldCard.style.width, fieldCard.style.height, card.name, card.cost, card.damage, card.health, card.imageid);
        carte.initialize();
        board.appendChild(fieldCard);
        fieldCard.addEventListener("click", () => {
            model.minionAttack(index);
        });
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
                let card = new Card(cardContainerEvent, cardContainerEvent.width, cardContainerEvent.height, playerHand[i].name, playerHand[i].cost, playerHand[i].damage, playerHand[i].health, playerHand[i].imageid);

                card.initialize();
                model.requestManaDraw(playerHand[i].cost);
            })

            cardContainer.addEventListener("mouseleave", () => {
                this.element.querySelector(".DisplayCard").style.display = "none";
                model.requestManaDraw(0);
            })

            cardContainer.addEventListener("click", (e) => {
                model.playCard(i, e);
                this.element.querySelector(".DisplayCard").style.display = "none";

            })

            card = new Card(cardContainer, cardContainer.width, cardContainer.height, playerHand[i].name, playerHand[i].cost, playerHand[i].damage, playerHand[i].health, playerHand[i].imageid);
            card.initialize();

            container.appendChild(cardContainer);
            handArea.appendChild(container);
            angle += 10;
        }

    }

    makeRandomDeck(deck, cardType) {
        for (let i = 0; i < 30; i++) {
            const a = cardType[Math.floor(Math.random() * cardType.length)];
            const b = Object.assign({}, a);
            deck.push(b);
        }
    }

    drawAiMana(mana, totalMana) {
        let manaText = this.element.querySelector(".OpponentManaText");
        manaText.innerHTML = `${mana}/${totalMana}`;
    }


    drawPlayerMana(mana, totalMana) {
        let manaBar = this.element.querySelector(".PlayerManaImages");
        let manaText = this.element.querySelector(".PlayerManaNumberText");
        manaBar.innerHTML = "";
        for (let i = 1; i <= mana; i++) {
            manaBar.innerHTML += `<div class="Mana"></div>`;

        }
        for (let i = mana; i < totalMana; i++) {
            manaBar.innerHTML += `<div class="DepletedMana"></div>`;
        }
        manaText.innerHTML = `${mana}/${totalMana}`;
    }

    requestManaDraw(mana, totalMana, cost) {
        if (cost <= mana) {
            let manaBar = this.element.querySelector(".PlayerManaImages");
            let manaText = this.element.querySelector(".PlayerManaNumberText");
            manaBar.innerHTML = "";
            for (let i = 0; i < mana - cost; i++) {
                manaBar.innerHTML += `<div class="Mana"></div>`;

            }
            for (let i = mana - cost; i < mana; i++) {
                manaBar.innerHTML += `<div class = "GlowMana"></div>`;
            }
            for (let i = mana; i < totalMana; i++) {
                manaBar.innerHTML += `<div class="DepletedMana"></div>`;
            }
            manaText.innerHTML = `${mana}/${totalMana}`;
        }
    }

    cantPlay() {
        this.element.querySelector(".EndTurnButton").style.background = "green";
    }

    endTheGame(winner) {
        const wrap = document.querySelector(".play-wrapper");
        const gameDiv = document.querySelector(".GameDiv");
        gameDiv.innerHTML = "";
        gameDiv.className = "StartDiv";
        const text = document.createElement("p");
        text.className = "EndGameText";
        text.innerHTML = `${winner} wins!`;
        wrap.appendChild(text);
    }

    destroy() {}
}