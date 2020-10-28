const io = require('socket.io')(3000);
const users = {};
io.on('connection',socket=>{
    socket.on('newuser',usr=>{
        users[socket.id] = usr;
        socket.broadcast.emit('newconnection',usr);
    })
    socket.on('sendmsg',message=>{
        socket.broadcast.emit('msg',{message:message,usr:users[socket.id]});
    })
    socket.on('disconnect',()=>{
        socket.broadcast.emit('user-disconnected',users[socket.id]);
        delete users[socket.id];
    })
});
