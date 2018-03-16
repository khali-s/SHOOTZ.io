var express = require('express');
var app = express();
var fs = require('fs');
var top = fs.readFileSync('highscore.json');
var scores = JSON.parse(top);
var socket = require('socket.io');

console.log(scores);


app.use(express.static('website'));

var server = app.listen(process.env.PORT || 3000, ready()); 
	
 var io = socket(server);
 io.sockets.on('connection', newConnection);

 function newConnection(socket){
 	console.log("socket is " + socket.id);
 	socket.on('player', playerMsg);
 	function playerMsg(data){
 	socket.broadcast.emit('player', data);
 	//console.log(data);
 	}
 	socket.on('enemy', enemyMsg);
 	function enemyMsg(data){
 		socket.broadcast.emit('enemy', data);
 		//console.log(data);
 	}
 	socket.on('shoot', shootMsg);
 	 function shootMsg(data){
 		socket.broadcast.emit('shoot', data);
 		//console.log(data);
 	}
 }
 

app.get('/all', sendAll);

function sendAll(req, res){

	res.send(fs.readFileSync('highscore.json'));
}

function ready(){
		console.log("server deployed");
	}

app.get('/add/:name/:score', addScore);


function addScore(req, res){

	var data = req.params;
	var uname = data.name;
	var scored = Number(data.score);
	var x = { name : uname, score : scored };
	scores.topScore.push(x);
	scores.topScore.sort(function(a, b){return b.score-a.score});
	if(scores.topScore.length > 20) scores.topScore.pop();

	var reply = {
		message : "thank you very much!"
	}

	res.send(reply);
	var data = JSON.stringify(scores);
	fs.writeFile('highscore.json', data, done);
	function done(){ console.log('saved');
	}

}

function sendGame(req, res){

	var type = req.params;

	res.send('game' + type.game + ' is sent');
}
/*
app.post('/', urlencodedParser, function(req,res){
	
	if (!req.body) return res.sendStatus(400);
    res.send('welcome, ' + req.body.username);
});
app.use(morgan('dev'));
var db = 'mongodb://saeed:abc123@ds149495.mlab.com:49495/foodlove';
mongoose.connect(db, function(err){
	if(err){
		console.log('Not connected to the database ' + err);
	} else {
		console.log('database connected');
	}
});
 */