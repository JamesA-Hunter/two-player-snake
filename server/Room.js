const Player = require('./Player')

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
                name == false
                return name;
            }
            else if(this.count == 1){
                name = 1
            }
            else if(this.count == 2){
                name = 2
            }

        let player = new Player(id, name);
        this.players.push(player);
        this.count++;
        console.log("all players: " + this.players);
        }
        else if(this.game != null){
            return 3;
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

    get code() {
        return this.roomCode;
    }

    get playerCount(){
        return this.count
    }

}

module.exports = Room;