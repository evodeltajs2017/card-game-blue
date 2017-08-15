class Dashboard {
    constructor(container) {
        this.container = container;
    }

    initialize() {
        const div = document.createElement("div");
        this.domElement = div;
        div.className = "StartDiv";
        
        const startButton = document.createElement("button");
        startButton.className = "startButton";
        startButton.addEventListener("click",() =>{
            this.startGame();
        });

        
        startButton.textContent = "Start New Game";

        this.container.appendChild(startButton);
        this.container.appendChild(div);
    }

    startGame(){
        
        const gameDiv = document.querySelector(".StartDiv");
        gameDiv.className = "GameDiv";
        document.querySelector(".startButton").remove();

        let template=`
        <div class="OpponentHand">
            <div class="OpponentMana">
                <div class="Mana"></div>
            </div>
        </div>
        <div class ="Info">
            
            <div class="OpponentDeck"></div>
            <div class="EndTurnButton"></div>
            <div class="PlayerDeck"></div>
            
        </div>
        <div class="OpponentField"></div>
    
        <div class="PlayerField"></div>
        <div class="PlayerHand">
            <div class="PlayerMana">
                <div class="Mana"></div>
            </div>
         </div>
    
        `;

        gameDiv.innerHTML = template;
    }

    destroy() {}
}