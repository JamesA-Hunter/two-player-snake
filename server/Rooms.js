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
                for(i=0;i<this.rooms.length;i++){
                    if (this.searchRooms(code) == true){
                        isDuplicate = true
                    }
                    else {
                    isDuplicate = false
                    }
                }
            }
        }

        let room = new Room(code)
        this.rooms.push(room)
        return code
    }

    searchRooms(code) {
        let doesExist = false;

        /*
        for(i=0;i<this.rooms.length;i++){ // set doesExist to true if room found
            if(this.rooms[i].code == code){
                doesExist = true;
            }
        }
        */

        this.rooms.forEach(o => {
            if(o.code == code){
                doesExist = true;
            }
        })
    
        console.log(this.rooms)
        console.log(code)
        return doesExist;
    }
}

module.exports = Rooms;