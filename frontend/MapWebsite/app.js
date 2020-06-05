const express = require('express');
const app = new express();
const path = require('path');

app.use(express.static(__dirname));

app.get('/', function(request, response){
    response.sendFile(path.join(__dirname,'index.html'));
});

app.listen(8080, () => console.log("app started"));