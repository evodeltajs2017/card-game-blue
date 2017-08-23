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
        this.selectedCard = undefined;
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
            <div class="EndTurnButton-Container"><button class="EndTurnButton yellowButton"></button></div>
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

            model.requestManaDrawNew = (cost) => {
                if (model.turnNumber < 10) {
                    this.requestManaDraw(model.playerMana, model.turnNumber, cost);
                } else {
                    this.requestManaDraw(model.playerMana, 10, cost);
                }
            }

            model.drawAiHp = (damage) => {
                this.drawAiHp(model.aiHp, damage);
            }

            model.animateAttackHero = (target) => {
                this.animateAttackHero(target);
            };

            model.drawField = () => {
                this.drawField(model.playerBoard, model.aiBoard, model);

            }

            model.animateAiAttack = (index) => {
                this.animateAiAttack(index);
            }

            model.endTheGame = (winner) => {
                this.endTheGame(winner);
            }

            model.drawPlayerHp = (damage) => {
                this.drawPlayerHp(model.playerHp, damage);
            }

            model.showHandAnimated = () => {
                this.drawPlayerHandAnimated(model.playerHand, model);
            };

            model.showAiHandAnimated = () => {
                this.drawAiHandAnimated(model.aiHand);
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

            model.animateAttack = (source, target, playerDead, aiDead) => {
                this.animateAttack(source, target, playerDead, aiDead);
            }

            model.colorEndTurnButton = () => {
                gameDiv.querySelector(".EndTurnButton").className = "EndTurnButton yellowButton";
                gameDiv.querySelector(".EndTurnButton").removeAttribute("disabled");
                this.element.querySelector(".OpponentField").style.zIndex = "0";
            }

            model.onPlayCard = (card, e, index) => {
                e.currentTarget.style.opacity = "0";
                e.currentTarget.children[0].style.top = "-100px";
                setTimeout(() => {
                    e.target.remove();
                    this.drawPlayerBoard(card, model, index);
                }, 500);
            };

            model.onAiPlayCard = (card, index) => {

                this.animateAiPlayCard();
                this.drawAiBoardAnimated(card, model, index);
            };

            model.initialize();

            gameDiv.querySelector(".EndTurnButton").addEventListener("click", (e) => {
                if (this.selectedCard) {
                    this.selectedCard.className = "CardComponent";
                };
                this.selectedCard = undefined;
                e.target.className = "EndTurnButton greyButton";
                e.target.setAttribute("disabled", "true");
                this.element.querySelector(".OpponentField").style.zIndex = "1000";
                model.endTurn();
            })
        })
    }

    animateAiPlayCard() {
        let field = this.element.querySelector(".OpponentHand");
        let index = Math.floor(Math.random() * field.children.length);
        let card = field.children[index].children[1];
        card.style.opacity = "0";
        card.style.top = "100px";
        card.style.transform = "scale(1)";
        card.style.zIndex = "1000";
    }

    animateAttack(source, target, playerDead, aiDead) {
        let calc = -source.parentElement.offsetLeft + target.offsetLeft;
        let differance = { top: (source.parentElement.offsetTop - target.offsetTop), left: (target.offsetLeft - source.parentElement.offsetLeft) };
        source.className = "CardComponent";
        source.style.top = -80 + "px";
        source.style.left = calc + "px";
        source.style.transform = "scale(1.5)";
        source.style.zIndex = "20";

        setTimeout(() => {
            target.style.top = differance.top * 0.2 + "px";
            target.style.left = differance.left * 0.2 + "px";
        }, 150)

        setTimeout(() => {
            target.style.top = 0 + "px";
            target.style.left = 0 + "px";
            if (aiDead)
                target.style.opacity = "0";
        }, 400)


        setTimeout(() => {
            source.style.top = 0 + "px";
            source.style.left = 0 + "px";

            source.style.transform = "scale(1)";
            if (playerDead)
                source.style.opacity = "0";

        }, 400)
        setTimeout(() => { source.style.zIndex = "10"; }, 500)
    }

    animateAiAttack(index) {
        let board = this.element.querySelector(".OpponentField");
        let source = board.children[index].children[0];
        let calc = -source.parentElement.offsetLeft + 500;
        let target = this.element.querySelector(".PlayerChar");
        source.style.top = 320 + "px";
        source.style.left = calc + "px";
        source.style.transform = "scale(1.5)";
        source.style.zIndex = "20";


        setTimeout(() => {
            source.style.top = 0 + "px";
            source.style.left = 0 + "px";
            target.style.top = -206 + "px";
            source.style.transform = "scale(1)";
        }, 400)

        setTimeout(() => {
            target.style.top = -186 + "px";
        }, 150)


        setTimeout(() => { source.style.zIndex = "10"; }, 500)
    }

    animateAttackHero(source) {
        let target = this.element.querySelector(".AiChar");
        let saved = { top: target.offsetTop, left: target.offsetLeft };
        let differance = { top: (source.parentElement.offsetTop - target.offsetTop), left: (target.offsetLeft - source.parentElement.offsetLeft) };
        let calc = -source.parentElement.offsetLeft + 500;
        source.className = "CardComponent";
        source.style.top = -240 + "px";
        source.style.left = calc + "px";
        source.style.transform = "scale(1.5)";

        setTimeout(() => {
            target.style.top = -70 + "px";
        }, 150)

        setTimeout(() => {
            target.style.top = -50 + "px";
        }, 400)


        setTimeout(() => {
            source.style.top = 0 + "px";
            source.style.left = 0 + "px";
        }, 400)

        setTimeout(() => {
            source.style.transform = "scale(1)";
        }, 400)

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
        fieldCard.addEventListener("click", (e) => {
            model.selectMonster(index, e.currentTarget.querySelector(".CardComponent"));

            if (this.selectedCard) {
                this.selectedCard.className = "CardComponent";
            };
            this.selectedCard = e.currentTarget.querySelector(".CardComponent")
            this.selectedCard.className += " isActive";
        });
    }

    drawPlayerBoardAnimated(card, model, index) {
        let board = this.element.querySelector(".PlayerField");
        let fieldCard = document.createElement("div");
        fieldCard.className = "TableCard";
        let carte = new Card(fieldCard, fieldCard.style.width, fieldCard.style.height, card.name, card.cost, card.damage, card.health, card.imageid);
        carte.initialize();
        fieldCard.style.transform = "scale(0.1)";
        fieldCard.style.opacity = "0";
        board.appendChild(fieldCard);
        setTimeout(() => {
            fieldCard.style.opacity = "1";
            fieldCard.style.transform = "scale(0.8)";
            fieldCard.addEventListener("click", (e) => {
                model.selectMonster(index, e.currentTarget.querySelector(".CardComponent"));
                if (this.selectedCard) {
                    this.selectedCard.className = "CardComponent";
                };
                this.selectedCard = e.currentTarget.querySelector(".CardComponent")
                this.selectedCard.className += " isActive";
            });
        }, 100)

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
        fieldCard.addEventListener("click", (e) => {
            model.minionAttack(index, e.currentTarget);
        });
    }

    drawAiBoardAnimated(card, model, index) {
        let board = this.element.querySelector(".OpponentField");
        let fieldCard = document.createElement("div");
        fieldCard.className = "AITableCard";
        let carte = new Card(fieldCard, fieldCard.style.width, fieldCard.style.height, card.name, card.cost, card.damage, card.health, card.imageid);
        carte.initialize();
        fieldCard.style.transform = "scale(0.1)";
        fieldCard.style.opacity = "0";
        setTimeout(() => {
            board.appendChild(fieldCard);
            setTimeout(() => {
                fieldCard.style.opacity = "1";
                fieldCard.style.transform = "scale(0.8)";
                fieldCard.addEventListener("click", (e) => {
                    model.minionAttack(index, e.currentTarget);
                });
            }, index * 100)
        }, index * 400)


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

    drawAiHandAnimated(playerHand) {

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
            if (i == playerHand.length - 1) {
                cardContainer.style.top = "120px";
                cardContainer.style.left = "570px";
                cardContainer.style.opacity = "0";
                cardContainer.style.transform = "scale(0.1)";

                setTimeout(() => {
                    cardContainer.style.top = "0px";
                    cardContainer.style.left = "0px";
                    cardContainer.style.opacity = "1";
                    cardContainer.style.transform = "scale(0.6)";
                }, 100)

            }
        }
    }

    drawPlayerHandAnimated(playerHand, model) {

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
                e.currentTarget.style.pointerEvents = "none";
                model.playCard(i, e);
                this.element.querySelector(".DisplayCard").style.display = "none";

            })

            card = new Card(cardContainer, cardContainer.width, cardContainer.height, playerHand[i].name, playerHand[i].cost, playerHand[i].damage, playerHand[i].health, playerHand[i].imageid);
            card.initialize();

            container.appendChild(cardContainer);
            handArea.appendChild(container);
            angle += 10;

            if (i == playerHand.length - 1) {
                cardContainer.style.top = "-400px";
                cardContainer.style.left = "360px";
                cardContainer.style.opacity = "0";
                cardContainer.style.transform = "scale(0.1)";

                setTimeout(() => {
                    cardContainer.style.top = "0px";
                    cardContainer.style.left = "0px";
                    cardContainer.style.opacity = "1";
                    cardContainer.style.transform = "scale(1)";
                }, 1000)

            }

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
                e.currentTarget.style.pointerEvents = "none";
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
        this.element.querySelector(".EndTurnButton").className = "EndTurnButton greenButton";
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