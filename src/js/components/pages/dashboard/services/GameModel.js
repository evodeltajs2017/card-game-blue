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

        this.turnNumber = 10;

        // this.playerTurn = false;

        this.showHand = () => {};

        this.drawAiMana = () => {};

        this.showAiHand = () => {};

        this.onPlayCard = () => {};

        this.onPlayerManaReset = () => {};

        this.playerDrawMana = () => {};
    }

    initialize() {

        this.giveCards(this.playerHand, this.playerDeck);
        this.giveCards(this.aiHand, this.aiDeck);

        this.showHand();
        this.showAiHand();
        this.playerDrawCard();
        this.drawAiMana();
        //start game - player turn
        // this.switchTurn();
        this.playerResetMana();

    }

    requestManaDraw(cost){
        this.requestManaDraw(cost);
    }

    playerResetMana() {
        this.playerMana = this.turnNumber;
        this.onPlayerManaReset();
    }

    playerResetMana() {
        if(this.playerMana < 10){
            this.playerMana = this.turnNumber;
        }else{
            this.playerMana = 10;
        }
        this.playerDrawMana();
    }

    aiResetMana() {
        this.aiMana = this.turnNumber;
        this.drawAiMana();
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

    switchTurn(){
        this.playerResetMana();
        this.playerDrawCard();
        this.playerBoard.forEach(e => {
            // e.isSleeping = false;
            console.log("Minion sleeps: " + e.isSleeping);
        });
    }

    // aiAttack() {
    //     this.aiBoard.forEach(e => {

    //     });
    // }

    playCard(cardIndex, e) {

        if (this.playerBoard.length < 7 && this.playerHand[cardIndex].cost <= this.playerMana) {
            this.playerHand[cardIndex].isSleeping = true;
            this.playerBoard.push(this.playerHand[cardIndex]);
            this.playerMana -= this.playerHand[cardIndex].cost;
            this.playerDrawMana();
            this.onPlayCard(this.playerHand[cardIndex], e);
            this.playerHand.splice(cardIndex, 1);
            this.showHand();
        }
    }

    aiAttackPlayer(){
        let minions = this.aiBoard.length;
        for(let i=0;i<minions;i++){
            this.playerHp -= this.aiBoard[i].damage;
            if(this.playerHp < 1){
                this.endGameAi();
                break;
            }
        }
        console.log(this.playerHp);
    }

    endGameAi(){
        alert("Ai wins!");
    }

    aiPlayCard() {
        let aiAbleToPlay = true;
        let played = false;
        let i;
     
            for (i = 0; i < this.aiHand.length; i++) {
                if (this.aiBoard.length < 7 && this.aiHand[i].cost <= this.aiMana) {
                    this.aiBoard.push(this.aiHand[i]);
                    this.aiMana -= this.aiHand[i].cost;
                    this.onAiPlayCard(this.aiHand[i]);
                    this.aiHand.splice(i, 1);
                    this.showAiHand();
                    this.drawAiMana();
                    played = true;
                } 
            }
        
    }

    aiAbleToPlay() {
        for (let i = 0; i < this.aiHand.length; i++) {

        }
    }

    monsterAttack() {}

    // switchTurn() {
    //     this.playerTurn = !this.playerTurn;
    //     this.turnNumber += 1;
    // }

    giveCards(hand, deck) {
        for (let i = 0; i < 3; i++)
            hand.push(deck.pop());
    }


    destroy() {}
}