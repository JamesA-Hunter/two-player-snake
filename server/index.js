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

io.on('connection', socket => { 
    console.log("socket created")
    socket.on('code', (data) => {
        console.log(data)
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
    res.end();
    console.log("created")
})

app.get('/api/getRoom/:code', (req, res) => {
    let exists = Rooms.searchRooms(req.params.code)
    res.setHeader('content-type', 'application/json')
    console.log(exists)
    res.send(JSON.stringify(exists))
    res.end();

})

server.listen(port, () => {
    console.log('server listening')
})