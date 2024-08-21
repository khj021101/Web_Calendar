const express = require('express')
const app = express();
const port = 8080;
var path = require('path');

app.use(express.static(path.join(__dirname, '/')));

app.listen(port, function(){
    console.log('listening on ${port}')
})
app.get('/', function(request, response){
    response.sendFile(__dirname + '/index.html')
})