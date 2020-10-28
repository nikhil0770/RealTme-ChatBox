const socket = io("http://localhost:3000/");
const inputform = document.getElementById('inputfield');
const msgcontainer = document.getElementById('msgcontainer');
const msginput = document.getElementById('chatmsg');

const user = prompt('What is your name?');
appendmsg('You Joined');
socket.emit('newuser',user);

socket.on('msg',data=>{
    appendmsg(`${data.usr} : ${data.message}`); 
});
socket.on('newconnection',name=>{
    appendmsg(`${name} connected.`); 
});

socket.on('user-disconnected',data=>{
    appendmsg(`${data} disconnected.`); 
});

inputform.addEventListener('submit',e=>{
    e.preventDefault();
    const message = msginput.value;
    appendmsg(`You : ${message}`); 
    socket.emit('sendmsg',message);
    msginput.value = '';
})

function appendmsg(message){
    const msgsection = document.createElement('div');
    msgsection.style.color = "white";
    msgsection.style.padding = "5px";
    msgsection.style.margin = "5px";
    msgsection.style.border = "solid";
    msgsection.style.borderRadius = "30px"
    msgsection.innerText = message;
    msgcontainer.append(msgsection);
}