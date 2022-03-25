const { application, json } = require('express')
const url = require('url')
//express
const express = require('express')
const app = express()
const server = require('http').createServer(app)
const port = 3001
//socket.io
const options = {
    origins: ["http://localhost:3000", "http://localhost:3001"]
};
const io = require('socket.io')(server, options)
const rooms = []
const Room = require('./Room')

io.on('connection', socket => { 
    console.log("socket created")
})

app.get('/', (req, res) => {
    res.send('working')
})

app.get('/api/createRoom', (req, res) => {
    let code = 0
    let isDuplicate = true

    if(rooms.length == 0){ //if rooms array is empty skip duplicate check
        code = Math.floor(Math.random()*1000000)
    }
    else{ //check for duplicate room codes and if detected create another code
        while(isDuplicate == true){
        code = Math.floor(Math.random()*1000000)
            for(i=0;i<rooms.length;i++){
                if (rooms[i].code == code){
                    isDuplicate = true
                }
                else {
                isDuplicate = false
                }
            }
        }
    }

    //add room to rooms[] and respond with the code
    rooms.push(new Room(code))
    res.setHeader('content-type', 'application/json')
    res.send(JSON.stringify(code))
    res.end();
    console.log("created")
})

app.get('/api/getRoom/:code', (req, res) => {
    let code = req.params.code;
    let doesExist = false; // does room exist

    res.setHeader('content-type', 'application/json')

    for(i=0;i<rooms.length;i++){ // set doesExist to true if room found
        if(rooms[i].code == code){
            doesExist = true;
        }
    }

    if(doesExist == null){ //return false
        res.send(JSON.stringify(doesExist))
        console.log(doesExist)
    }
    else { //return false
        res.send(JSON.stringify(doesExist))
        console.log(doesExist)
    }

    res.end();

})

server.listen(port, () => {
    console.log('server listening')
})