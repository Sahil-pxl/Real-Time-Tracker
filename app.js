const express = require('express');
const app = express();
const path = require('path');

const http = require('http');
// setup for socketio
const socketio = require("socket.io");
const server = http.createServer(app);
const io = socketio(server);

// setting up ejs
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

io.on("connection", function(socket){
    socket.on('send-location', function(data){
    io.emit('receive-location',{id: socket.id, ...data}); //   using spread operator
    })
    socket.on("disconnect", function(){
        io.emit("user-disconnected",socket.id);
    })

});
//creating routes
app.get("/", function(req,res) {
    res.render("index");
});
server.listen(3000);