
import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

class Player{
    constructor() {
        this.diceList = [];
        this.score = 0;
        this.wins = 0;
        this.allowRoll = false;
    }
}

createApp({
    data() {
        return {
            player1: new Player(),
            player2: new Player(),
            roundsMax: 3,
            currentRound: 1,
            allowNext: true,
            wonText: "",
        };
    },
    computed: {

    },
    methods: {
        startGame() {
            document.getElementById("startMenu").classList.add("hidden")
            document.getElementById("gameplay").classList.remove("hidden")
            // alert("hi");
            // this.player1.diceList.push([1, 2, 3])
            // this.player1.diceList.push([1, 2])
            // this.player1.diceList.push([1])
        },

        isOdd() {
            if (this.roundsMax % 2 == 0 || this.roundsMax <= 0) {
                alert("Odd rounds required");
            } else {
                this.startGame();
            }
        },

        rollDice(player) {
            let tempArray = [];
            for (let i = 3 - (player.diceList.length); i > 0; i--){
                tempArray.push(Math.floor(Math.random() * 6 + 1));
            } 
            player.score += Math.max.apply(null, tempArray);
            player.diceList.push(tempArray);

            if (player.diceList.length == 3) {
                player.allowRoll = true;
            }

            if (this.player1.diceList.length == 3 && this.player2.diceList.length == 3) {
                this.allowNext = false;
                this.winCheck();
            }
        },

        winCheck() {
            if (this.player1.allowRoll = true)  {
                if (this.player1.score > this.player2.score) {
                    this.wonText = "Player 1 Wins This Round";
                    this.player1.wins++;

                }
                else if (this.player2.score > this.player1.score) {
                    this.wonText = "Player 2 Wins This Round";
                    this.player2.wins++;
                } 
                else {
                    // alert("damn");
                    this.wonText = "Both Players Have Tied!";
                }
            }
        },

        nextRound() {
            this.player1.diceList = [];
            this.player1.score = 0;
            this.player1.allowRoll = false;

            this.player2.diceList = [];
            this.player2.score = 0;
            this.player2.allowRoll = false;
            this.allowNext = true;
            if (this.currentRound <=  this.roundsMax) {

                if ( this.currentRound + 1 > this.roundsMax ) {
                    if (this.player1.wins > this.player2.wins){
                        alert("Player 1 wins the game");
                    } else if (this.player2.wins > this.player1.wins) {
                        alert("Player 2 wins the game")
                    } else{
                        alert("Tied!")
                    }
                    this.reset()
                } else {
                    this.currentRound++;
                    this.wonText = "";
                }

            }
        },

        reset(){
            this.player1 = new Player();
            this.player2 = new Player();
            this.roundsMax = 3;
            this.currentRound = 1;
            this.allowNext =  true;
            this.wonText = "";

            document.getElementById("startMenu").classList.remove("hidden")
            document.getElementById("gameplay").classList.add("hidden")
        },


    }
}).mount('#app')