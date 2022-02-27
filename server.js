const express = require('express');
const app = express();
const server = require('http').createServer(app);
const port = process.env.PORT || 5000;
const io = require('socket.io')(server);
const path = require('path');
const users = [];

app.get('/', (req, res)=> {
    res.sendFile(path.join(__dirname, '/public', '/login.html'));
})

app.get('/chat', (req, res)=> {
    res.sendFile(path.join(__dirname, '/public', '/chat.html'));
})

io.on('connection', socket=> {

    socket.on('chat', (message)=> {
        io.emit('chat', {
            ...message,
            id: socket.id
        });
    })

    socket.on('disconnect', ()=> {
        let name;
        users.forEach(person => {
            if(person.id === socket.id){
                name = person.name;
                users.splice(users.indexOf(person), 1);
                return;
            }
        });
        io.emit('exit', {
            names: users,
            name: name
        });
    })


    socket.on('register', (data)=> {
        const person = {
            id:socket.id,
            name: data
        }
        io.emit('notice', person);
        users.push(person);
        io.emit('add', users);
    })
})

server.listen(port, '0.0.0.0');
