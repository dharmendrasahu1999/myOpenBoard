const express = require("express");
const socket = require("socket.io");

const app = express();

app.use(express.static("public"));

let port = process.env.PORT||5000;
let server = app.listen(port, () => {
    console.log("Listening to the port " + port);
})

let io = socket(server);//instance create kiya server ka connection ke liye similar to express
//.on is similar to our addEventListener
io.on("connection", (socket) => {
    console.log("Made socket connection");
    //Recieved Data
    socket.on("beginPath", (data) => {
        //data-> data from frontend
        //now transfer data to all connected computers
        io.sockets.emit("beginPath", data);
    })

    socket.on("drawStroke", (data) => {
        io.sockets.emit("drawStroke", data);
    })

    socket.on("redoUndo", (data) => {
        io.sockets.emit("redoUndo", data);
    })

})