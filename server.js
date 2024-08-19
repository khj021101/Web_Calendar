const express = require('express')
const app = express();

app.listen(8080, function(){
    console.log('listening on 8080')
})
app.get('/', function(request, response){
    response.sendFile(__dirname + '/index.html')
})