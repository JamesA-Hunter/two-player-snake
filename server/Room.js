class Room{
    constructor(theCode){
    this.roomCode = theCode;
    }

    get code() {
        return this.roomCode;
    }
}

module.exports = Room;