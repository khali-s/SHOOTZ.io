function Monster(){
	this.username;
	this.x = 0;
	this.y =0;
	this.xspeed=0;
	this.yspeed= 0;
	this.health=100;
	this.power=0;
	this.dead=0;
	this.points=0;
	

	this.update = function(){
		if (this.dead == 0){
		this.x = this.x + this.xspeed*scl;
		this.y = this.y + this.yspeed*scl;
		this.x = constrain(this.x, 0, width-scl);
		this.y = constrain(this.y, 0, height-scl);
		}
	}
	this.show = function(){
		if (this.dead == 0){
		fill(100,200, 50);
		rect(this.x, this.y, scl,scl);
	}
		else {
		fill(100,200, 50);
		rect(this.x, this.y, scl,scl);
		}
	}
	this.dir = function(x,y){
		this.xspeed = x;
		this.yspeed = y;
	}
	this.shoot = function(){
		
		bull =new Bullet(this.x, this.y);
		
		bull.coord(this.xspeed*3, this.yspeed*3);
		
	}
	this.cart = function(){
		console.log(this.x + ' , ' + this.y);
		var data = {
			x: this.x,
			y: this.y
		}
		socket.emit('player', data);
	}

}

function Bullet(a,b){
	this.x = a;
	this.y = b;
	this.xspeed;
	this.yspeed;

	this.coord = function(a,b){
		this.xspeed = a;
		this.yspeed = b;
	}

	this.update = function(){
		
		this.x = this.x + this.xspeed*scl;
		this.y = this.y + this.yspeed*scl;
		this.x = constrain(this.x, 0, width-scl);
		this.y = constrain(this.y, 0, height-scl);
		console.log("shot");
		
	}
	this.show = function(){
		
		fill(200,0, 50);
		rect(this.x, this.y, 5,5);
	
	}
	this.dir = function(x,y){
		this.xspeed = x;
		this.yspeed = y;
	}
	this.cart = function(){
		console.log(this.x + ' , ' + this.y);
		var data = {
			x: this.x,
			y: this.y
		} 
		socket.emit('shoot', data);
	}
}

function Enemy(){
	this.x = random(width - 15);
	this.y = random(height -15);

	this.show = function(){
		
		fill(21,190, 150);
		rect(this.x, this.y, 15,15);

	
	}
	

	this.cart = function(){
		console.log(this.x + ' , ' + this.y);
		var data = {
			x: this.x,
			y: this.y
		}
		socket.emit('enemy', data);
	}

	
}