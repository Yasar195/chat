const express = require('express');
const app = express();
const server = require('http').createServer(app);
const port = process.env.port || 3000;
const io = require('socket.io')(server);
const path = require('path');
const users = [];
let id = 0;

app.get('/', (req, res)=> {
    res.sendFile(path.join(__dirname, '/public', '/login.html'));
})

app.get('/chat', (req, res)=> {
    res.sendFile(path.join(__dirname, '/public', '/chat.html'));
})

app.post('/chat', (req, res)=> {
    console.log('got it');
    console.log(req.body.get('data'));
    res.sendStatus(200);
})

io.on('connection', socket=> {

    socket.on('chat', (message)=> {
        const time = new Date();
        const is = time.getHours>12 ? 'PM': 'AM';
        const current = `${time.getHours()}:${time.getMinutes()}${is}`;
        io.emit('chat', {
            ...message,
            time: current
        });
    })

    socket.on('register', (data)=> {
        users.push(data.name);
    })
})

server.listen(port, ()=> {
    console.log(`server listening on port ${port}`);
})