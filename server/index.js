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

const rooms = require('./Rooms')
const Rooms = new rooms()

io.on('connection', (socket) => { 
    console.log("socket created")
    socket.on('code', (code) => {
        let roomID = code.toString()
        //returns false if room full
        let player = Rooms.addPlayer(code, socket.id)
        let reply = ""
        //console.log(socket.rooms)
        //console.log(roomID)
        //console.log(socket.id)
        //console.log(socket.adapter.rooms.get(roomID).size)

        //if the room is full
        if(player == false){
            //console.log("error too many players")
            reply = "error too many players"
            io.in(socket.id).emit("msg", reply)
        }
        else{
            socket.join(roomID)
            reply = player.toString()
        }

        io.in(socket.id).emit("msg", reply)
    })

    socket.on('disconnect', (reason) => {
        console.log(socket.id + " " + reason)
        //remove player from room with same id
        //Rooms.removePlayerFromRooms(socket.id)
        console.log("socket id disconnecting: " + socket.id)
        let roomCode = Rooms.searchForPlayerInRooms(socket.id)
        if(roomCode == false){
            console.log("done nothing")
            return true;
        }
        console.log(roomCode)
        if(roomCode !== false){
            if(Rooms.removePlayer(socket.id, roomCode) == true){
                let room = Rooms.getRoom(roomCode);
                let players = room.getPlayers()
                console.log(players)
                //io.in(roomCode).emit
                //for(let i = 0;i< players.length)
            }
        }

    })
})

app.get('/', (req, res) => {
    res.send('working')
})

app.get('/api/createRoom', (req, res) => {
    //add room to rooms[] and respond with the code
    let code = Rooms.createRoom()
    res.setHeader('content-type', 'application/json')
    res.send(JSON.stringify(code))
    res.end()
    console.log("created")
})

app.get('/api/getRoom/:code', (req, res) => {
    let exists = Rooms.searchRooms(req.params.code)
    res.setHeader('content-type', 'application/json')
    //console.log(exists)
    res.send(JSON.stringify(exists))
    res.end()

})

server.listen(port, () => {
    console.log('server listening')
})