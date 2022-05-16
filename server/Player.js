class Player{
    constructor(id, name){
    this.id = id;
    this.name = name;
    }

    changeName(name){
        this.name = name;
    }
    /*
    get id(){
        return this.id
    }
    */
}

module.exports = Player;