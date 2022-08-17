const Room = require('./Room')

class Rooms{
    constructor(){
    this.rooms = [];
    }

    createRoom() {
        let code = 0
        let isDuplicate = true
    
        if(this.rooms.length == 0){ //if rooms array is empty skip duplicate check
            code = Math.floor(Math.random()*1000000)
        }
        else{ //check for duplicate room codes and if detected create another code
            while(isDuplicate == true){
            code = Math.floor(Math.random()*1000000)
                    if (this.searchRooms(code) == true){
                        isDuplicate = true
                    }
                    else {
                    isDuplicate = false
                    }
                }
            }

        let room = new Room(code)
        this.rooms.push(room)
        return code
    }

    searchRooms(code) {
        let doesExist = false;

        
        for(let i=0;i<this.rooms.length;i++){ // set doesExist to true if room found
            if(this.rooms[i].code == code){
                doesExist = true;
            }
        }
        
        //console.log(this.rooms)
        //console.log(code)
        return doesExist;
    }

    getRoom(code){
        let index = this.getIndex(code)
        return this.rooms[index]

    }

    getIndex(code){
        let index = null;

        for(let i=0;i<this.rooms.length;i++){ // set doesExist to true if room found
            if(this.rooms[i].code == code){
                index = i;
            }
        }
        
        console.log(index)
        return index;
    }

    addPlayer(code, id){
        let index = this.getIndex(code)
        let name = this.rooms[index].addPlayer(id)
        //console.log(player)
        return name
        }

    removePlayer(id, room){
        //get index of room
        let i = this.getIndex(room)
        if(!id){

        }
        this.rooms[i].removePlayer(id)
        return true
    }

    searchForPlayerInRooms(id){
        for(let i = 0; i< this.rooms.length; i++){
            if(this.rooms[i].getPlayer(id) !== false){
                console.log("found");
                return this.rooms[i].code;
            }
        }
        return false
    }

}

module.exports = Rooms;