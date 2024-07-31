const express = require('express');
const app = express();
const path = require("path")

const http = require("http");
const scoketio = require("socket.io");
const server = http.createServer(app);
const io = scoketio(server);

app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")))

io.on("connection",(socket)=>{
    socket.on("send-local",(data)=>{
        io.emit("recieve-location",{id:socket.id, ...data})
    });

    socket.on("disconnect",function(){
io.emit("user-disconnected", socket.id);
    });
});

//app.get("/",(req,res)=>res.render("index"));

app.get("/",function(req,res){
    res.render("index");
});

server.listen(3000);