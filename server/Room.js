const Player = require('./Player')
const Game = require('./Game')

class Room{
    constructor(theCode){
    this.roomCode = theCode;
    this.players = [];
    this.count = 1;
    this.game = null;
    }

    addPlayer(id){

        let name = null

        if(this.game == null){

            if(this.count > 2){
                name = 4 //too many players
                return name;
            }
            else if(this.count == 1){
                name = 1 //player 1
            }
            else if(this.count == 2){
                name = 2 //player 2
            }

        let player = new Player(id, name);
        this.players.push(player);
        this.count++;
        console.log("all players: " + this.players);
        }
        else if(this.game != null){
            return 3; //game in progress
        }
        return name
    }

    removePlayer(id){
        this.players = this.players.filter(player => player.id !== id);
        this.count--;
        this.sortRoom();
        return true
    }

    getPlayer(id){
        for(let i = 0; i < this.players.length; i++){
            console.log(this.players[i].id)
            if(this.players[i].id == id){
                return i;
            }

        }
        return false;
    }

    getPlayers(){
        return this.players;
    }

    sortRoom(){
        for(let i = 0; i < this.players.length; i++){
            this.players[i].changeName(i + 1)
        }
    }

    createGame(settings){ //settings array passed from postform
        this.game = new Game(settings) // array passed to game object
        console.log(this.game.boardSize + ' ' + this.game.GameSpeed)
    }

    get code() {
        return this.roomCode;
    }

    get playerCount(){
        return this.count
    }

}

module.exports = Room;