var express = require('express');//Importing Express
var app = express();//Getting App From Express
var fs = require('fs');//Importing File System Module To Access Files
const port = 8000;//Creating A Constant For Providing The Port


//Routing To Public Folder For Any Static Context
//Routing Request : http://localhost:port/
app.get('/',function(request,response){
  //Telling Browser That The File Provided Is A HTML File
  response.writeHead(200,{"Content-Type":"text/html"});
  //Passing HTML To Browser
  response.write(fs.readFileSync("./public/index.html"));
  //Ending Response
  response.end();
})

app.use(express.static(__dirname + '/public'));
console.log("Server Running At:localhost:"+port);

var io = require('socket.io').listen(app.listen(port));//Telling Express+Socket.io App To Listen To Port
io.sockets.on("connection",function(socket){
    socket.on("chat",function(data){
        io.sockets.emit("chat",data);
    });
})
