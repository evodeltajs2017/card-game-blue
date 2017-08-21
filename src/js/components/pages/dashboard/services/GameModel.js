class GameModel {
    constructor(playerDeck, aiDeck) {

        this.playerDeck = playerDeck;
        this.aiDeck = aiDeck;


        this.playerHand = [];
        this.aiHand = [];

        this.playerBoard = [];
        this.aiBoard = [];

        this.playerMana = 0;
        this.aiMana = 0;

        this.playerHp = 30;
        this.aiHp = 30;

        this.turnNumber = 1;
        this.minion = {};
        // this.playerTurn = false;
        this.cantPlay = () => {};

        this.endTheGame = () => {};

        this.drawField = () => {};

        this.drawPlayerHp = () => {};

        this.showHand = () => {};

        this.drawAiMana = () => {};

        this.showAiHand = () => {};

        this.onPlayCard = () => {};

        this.onPlayerManaReset = () => {};

        this.playerDrawMana = () => {};

        this.drawAiHp = () => {};
    }

    initialize() {

        this.giveCards(this.playerHand, this.playerDeck);
        this.giveCards(this.aiHand, this.aiDeck);

        this.startGame();

    }

    startGame() {
        this.showHand();
        this.showAiHand();
        this.playerDrawCard();
        this.drawAiMana();
        //start game - player turn
        // this.switchTurn();
        this.playerResetMana();
        this.verifyIfAbleToPlay();
    }

    verifyIfAbleToPlay() {
        let play = false;
        this.playerHand.forEach(e => {
            if (e.cost <= this.playerMana)
                play = true;
        });
        if (play == false)
            this.cantPlay();
    }

    requestManaDraw(cost) {
        this.requestManaDraw(cost);
    }

    playerResetMana() {
        this.playerMana = this.turnNumber;
        this.onPlayerManaReset();
    }

    playerResetMana() {
        if (this.playerMana < 10) {
            this.playerMana = this.turnNumber;
        } else {
            this.playerMana = 10;
        }
        this.playerDrawMana();
    }

    aiResetMana() {
        if (this.turnNumber < 10) {
            this.aiMana = this.turnNumber;
        } else {
            this.aiMana = 10;
        }
        this.drawAiMana();
        this.turnNumber++;
    }

    playerDrawCard() {
        if (this.playerHand.length < 10 && this.playerDeck.length > 0) {
            this.playerHand.push(this.playerDeck.pop());
            this.showHand();
        }
    }

    aiDrawCard() {
        if (this.aiHand.length < 10 && this.aiDeck.length > 0) {
            this.aiHand.push(this.aiDeck.pop());
            this.showAiHand();
        }
    }

    endTurn() {
        this.aiResetMana();
        this.aiDrawCard();
        this.aiAttackPlayer();
        this.aiPlayCard();
        this.switchTurn();
    }

    switchTurn() {
        this.playerResetMana();
        this.playerDrawCard();
        this.playerBoard.forEach(e => {
            e.isSleeping = false;
        });
        this.verifyIfAbleToPlay();
    }

    playCard(cardIndex, e) {

        if (this.playerBoard.length < 7 && this.playerHand[cardIndex].cost <= this.playerMana) {
            this.playerHand[cardIndex].isSleeping = true;
            this.playerBoard.push(this.playerHand[cardIndex]);
            this.playerMana -= this.playerHand[cardIndex].cost;
            this.playerDrawMana();
            this.onPlayCard(this.playerHand[cardIndex], e, this.playerBoard.length - 1);
            this.playerHand.splice(cardIndex, 1);
            this.showHand();
            this.verifyIfAbleToPlay();
        }
    }

    aiAttackPlayer() {
        let minions = this.aiBoard.length;
        for (let i = 0; i < minions; i++) {
            this.playerHp -= this.aiBoard[i].damage;
            this.drawPlayerHp();
            if (this.playerHp < 1) {
                this.endGame("AI");
                break;
            }
        }
        console.log(this.playerHp);
    }

    endGame(winner) {
        this.endTheGame(winner);
    }

    aiPlayCard() {
        let aiAbleToPlay = true;
        let played = false;
        let i;

        for (i = 0; i < this.aiHand.length; i++) {
            if (this.aiBoard.length < 7 && this.aiHand[i].cost <= this.aiMana) {
                this.aiBoard.push(this.aiHand[i]);
                this.aiMana -= this.aiHand[i].cost;
                this.onAiPlayCard(this.aiHand[i], this.aiBoard.length - 1);
                this.aiHand.splice(i, 1);
                this.showAiHand();
                this.drawAiMana();
                played = true;
            }
        }

    }

    minionAttack(index) {
        if (this.playerBoard[this.minion].isSleeping == false) {
            this.playerBoard[this.minion].health -= this.aiBoard[index].damage;
            this.aiBoard[index].health -= this.playerBoard[this.minion].damage;

            if (this.aiBoard[index].health < 1) {
                this.aiBoard.splice(index, 1);
            }
            if (this.playerBoard[this.minion].health < 1) {
                this.playerBoard.splice(this.minion, 1);
            }

            this.drawField();
            this.minion = {};
        } else
            alert("Shhhh... That minion is Sleeping!");
    }

    minionAttackHero() {
        if (this.playerBoard[this.minion].isSleeping == false) {
            let vechi = this.aiHp;
            this.aiHp -= this.playerBoard[this.minion].damage;
            this.drawAiHp(this.playerBoard[this.minion].damage, vechi);
            if (this.aiHp < 1) {
                this.endGame("Player");
            }
        } else
            alert("Shhhh... That minion is Sleeping!");
    }


    selectMonster(index) {
        this.minion = index;
    }


    giveCards(hand, deck) {
        for (let i = 0; i < 3; i++) {
            hand.push(deck.pop());
        }
    }


    destroy() {}
}