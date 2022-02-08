const express = require('express');
const app = express();
const server = require('http').createServer(app);
const port = process.env.port || 5000;
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

io.on('connection', socket=> {

    socket.on('chat', (message)=> {
        const time = new Date();
        let current;
        if(time.getHours()>=12){
            const is = 'PM';
            current = `${time.getHours()-12}:${time.getMinutes()}${is}`;
        }
        else{
            const is = 'AM';
            current = `${time.getHours()}:${time.getMinutes()}${is}`;
        }
        io.emit('chat', {
            ...message,
            time: current
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

server.listen(port)