const express = require('express')

const app = express()
const api = require('./server/routes/api')
// const path = require('path')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// app.use(express.static('build'));

// app.use('/', api)

// server code is runnable on port 3001
const port = 3001
const server = app.listen(port, function () {
    console.log(`Running server on port ${port}`)
})

const io = require('socket.io')(server, { cors: true });

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
    req.io = io;
    next()
})

io.on('connection', socket => {
    // when create new poll
    // 
    console.log(socket.id)
    socket.emit('stablish-connection', 'Connection established')
})

app.use('/', api)
