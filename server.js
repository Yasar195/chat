const express = require('express');
const app = express();
const server = require('http').createServer(app);
const port = process.env.port || 3000;
const io = require('socket.io')(server);
const path = require('path');
const ids = [];
let id = 0;

app.get('/', (req, res)=> {
    res.sendFile(path.join(__dirname, '/public', '/login.html'));
})

io.on('connection', socket=> {
    id = id + 1;
    ids.push(id);
    socket.emit('personal', id);

    socket.on('chat', (message)=> {
        io.emit('chat', message);
    })
})

server.listen(port, ()=> {
    console.log(`server listening on port ${port}`);
})