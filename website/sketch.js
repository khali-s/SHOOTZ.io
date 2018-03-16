var socket;
var s; //make a monster
var scl = 11;
var f ; //makes the enemy
var bull; //make a bullet
var d;
var k;
var boo = {x : -2, y : -2};
var begin = 0;
var tex ="HALL OF HEROES";
var xt = 400;
var zz = 75
var zy= 50;
yt=120;

function setup(){
	socket = io.connect('http://localhost:3000');
	frameRate(20);
	createCanvas(600,400);
	
	s = new Monster();
    f = new Enemy();
    socket.on('player', newDrawing); //gets events
    socket.on('enemy', newDrawing1);
    socket.on('shoot', newDrawing2);
    var button2 = select('#start');
    button2.mousePressed(go);

}
function go(){
	begin = 1;
	var j = document.getElementById("start");
	document.getElementById("intro").innerHTML = "";
	document.getElementById("intro2").innerHTML = "";

    if (j.style.display === "none") {
        j.style.display = "block";
    } else {
        j.style.display = "none";
    }
}

function draw(){
	if(begin == 1){

			background(0,0,0,40);
			textSize(20);
			fill(255);
			text("Score: " + s.points, 250, 60);
			s.update();
			s.show();
			s.cart();
			f.show();//show to screen
			f.cart(); //send to socket
			fill(52,0,200);
			if(bull) {
			 	bull.update();
			 	bull.show();
				 if(abs(bull.x - f.x) < 20){
			 		if(abs (bull.y - f.y ) < 20 ){
			 			//f = new Enemy();
			 			death();
			 			s.points +=10;
			 			console.log(s.points);
			 		}
			 	}
			 	bull.cart();
			}

	}else if(begin == 2){
		background(0,0,0,34);
		textSize(60);
		fill(255);
		text("HALL OF HEROES", zy, zz);
		text(tex, xt, yt);
		zy++
		zz++
		if(zz == 100) zz = 70;
		if(zy == 80) zy = 50;
		yt++;
		xt-= 5;
		if(xt == -5000) xt = 500;
		if(yt == 380) yt =150;

	}

}
function death(){
	noStroke(); //player
	fill(255, 0, 0);
	ellipse(f.x, f.y,80,80);
	f = new Enemy();
}
function death2(x, y){
	noStroke(); //player
	fill(255, 0, 0);
	ellipse(x, y,80,80);
	
}
function newDrawing(data){
	noStroke(); //player
	fill(255);
	ellipse(data.x, data.y,21,21);

}
function newDrawing2(data){
	noStroke(); //bullet
	fill(250);
	rect(data.x, data.y,5,5);

	if(abs(data.x - f.x) < 20){
	 		if(abs (data.y - f.y ) < 20 ){
	 			f = new Enemy();
	 		}
	 	}

}
function newDrawing1(data){
	noStroke(); //target
	fill(0, 99, 199);
	rect(data.x, data.y,15,15);
	if(boo.x != data.x){
		death2(boo.x, boo.y);
		s.points += 10;
		boo.x = data.x;
		boo.y = data.y;
	}
}
	

function keyPressed(){
	if (keyCode === UP_ARROW){
		s.dir(0,-1);
	} else if (keyCode === DOWN_ARROW){
		s.dir(0, 1);
	} else if (keyCode === LEFT_ARROW){
		s.dir(-1,0);
	}else if (keyCode === RIGHT_ARROW){
		s.dir(1,0);
	} else if (keyCode === 32){
		s.shoot();
	} else if (keyCode === ENTER){
		submitScore();

	}

}
function drawData(){
	begin = 0;
	//background(51);
 	loadJSON('/all', dataCb);
}

function dataCb(data){
	begin = 0;
	console.log(data);
	//document.getElementById("intro").innerHTML = "Hall Of Heroes";
	var highscore = " ";
	var keys = data.topScore
	for(var i =keys.length-1; i >= 0; i--){
		console.log(keys[i]);
		var name = keys[i].name;
		var score = keys[i].score;
		highscore =  name + " : " + score + " , " + highscore;
		//alert(highscore);
		begin = 2;
	}

	tex = highscore;
	alert(tex);

	//document.getElementById("intro3").innerHTML = highscore;
}

function submitScore(){
    var name = prompt("Good fight, enter you name into the hall of glory");
    if (name == null || name == "") {
        alert( "your name is invalid");
    } else {
        	var score = s.points;
	        console.log(name,score);
			loadJSON('add/' + name + '/' + score, finished);
    }
   
	


}

function finished(data){
	console.log(data);
	drawData();
	
}


