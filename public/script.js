const socket = io();
const chat = document.querySelector('.chat-form');
const input = document.querySelector('.chat-input');
const div = document.querySelector('.chat-window');


chat.addEventListener('submit', (event)=> {
    event.preventDefault();
    socket.emit('chat', input.value);
    input.value='';
})

socket.on('personal', (id)=> {
    console.log(`my id is ${id}`);
})

socket.on('chat', (data)=>{
    const h3 = document.createElement('h3');
    h3.textContent = data;
    div.appendChild(h3);
})
