var express = require('express');
var path = require('path');
var app = express();

app.listen(8000, function(){
	console.log("Server is running on port 8000 for mini store");
})

app.use(express.static(path.join(__dirname, '/static')));

app.get('/', function(req,res){
	res.render('index');
})
