const { application, json } = require('express')
const url = require('url')
//express
const express = require('express')
const app = express()
const server = require('http').createServer(app)
const port = 3001
//cors
const cors = require('cors')
const options = {
    origins: ["http://localhost:3000", "http://localhost:3001"]
};
app.use(cors({options}))
//socketio
const io = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET"]
    }
});

//middlewares
app.use(express.json());

const rooms = require('./Rooms')
const { join } = require('path')
const Rooms = new rooms()

io.on('connection', (socket) => { 
    console.log("socket created")
    socket.on('code', (code) => {
        let roomID = code.toString()
        //returns false if room full
        let joinStatus = Rooms.addPlayer(code, socket.id)
        let reply = ""
        //console.log(socket.rooms)
        //console.log(roomID)
        //console.log(socket.id)
        //console.log(socket.adapter.rooms.get(roomID))
        console.log(joinStatus)

        //if the room is full
        if(joinStatus == 4){
            //console.log("error too many players")
            reply = "4"
            io.in(socket.id).emit("msg", reply)
        }
        else if(joinStatus == 3){
            //console.log("error, game in progress")
            reply = "3"
            io.in(socket.id).emit("msg", reply)
        }
        else{
            socket.join(roomID)
            reply = joinStatus.toString()
        }

        //console.log(reply)
        io.in(socket.id).emit("msg", reply)
    })

    socket.on('disconnect', (reason) => {
        console.log(socket.id + " " + reason)
        //remove player from room with same id
        //Rooms.removePlayerFromRooms(socket.id)
        console.log("socket id disconnecting: " + socket.id)
        let roomCode = Rooms.searchForPlayerInRooms(socket.id)
        if(roomCode == false){
            return true;
        }
        console.log(roomCode)
        if(roomCode !== false){
            if(Rooms.removePlayer(socket.id, roomCode) == true){
                let room = Rooms.getRoom(roomCode)
                let players = room.getPlayers()
                console.log("players array: " + players)
                //io.in(roomCode).emit
                for(let i = 0;i < players.length; i++){
                    io.in(players[i].id).emit("playerDisconnect", players[i].name)
                }
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

app.post('/api/postForm/:code', (req, res) => {

    let code = req.params.code
    let exists = Rooms.searchRooms(code)
    if (exists == false){
        return 0
    }
    let settings = req.body //sanitize this before passing

    //add to game settings of room
    let room = Rooms.getRoom(code)
    room.createGame(settings)
    res.end('response')
    console.log(req.body)

})

server.listen(port, () => {
    console.log('server listening')
})