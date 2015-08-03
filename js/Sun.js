function Sun(state, sprite_x, sprite_y) {
	this.manager = state.manager;
	
	this.sprite = game.add.sprite(sprite_x, sprite_y, 'plants');
	this.sprite.width = 64;
	this.sprite.height = 64;
	
	this.props = new Props({
	    speed: 500,
	    cooldown: 1000
	});
	
	this.props.cooldown_timer = game.time.now;
	
	this.collecting = false;
	
	game.physics.arcade.enable(this.sprite);
	this.sprite.body.acceleration = new Phaser.Point(0, 150);
	this.sprite.body.velocity.y = -Math.random() * 50 - 50;
	this.sprite.body.velocity.x = Math.random() * 30 - 10;
	
	this.sprite.animations.add('idle', ['sun'], 2, true, false);
	this.sprite.animations.play('idle', 2, true);
	
	this.sprite.inputEnabled = true;
		
    //If the mouse button has been pressed in the last 50ms
    //We're gonna check if this sun got clicked on
    var self = this;
	this.sprite.events.onInputDown.add(function(){
	    if(game.input.activePointer.duration < 50) {
	        self.collecting = true;
            self.manager.money++;
            self.manager.gui.sunText.text = self.manager.money.toString();
	    }
	}, state);
}

Sun.prototype.update = function() {
    var time_since = game.time.now - this.props.cooldown_timer;
    
    //If the sun is getting collected we don't need to check if
    //the player is clicking on it
    if(!this.collecting) {
        //Stop moving the sun after about a second
        if(time_since >= this.props.cooldown) {
            this.sprite.body.velocity.x = 0;
            this.sprite.body.velocity.y = 0;
            this.sprite.body.acceleration = new Phaser.Point(0,0);
        }
    }
    else {
        
        var len = this.sprite.position.distance(this.manager.gui.sun.position);
        
        game.physics.arcade.accelerateToXY(
            this.sprite, 
            this.manager.gui.sun.x, 
            this.manager.gui.sun.y, 
            this.props.speed, 999, 999
        );
        
        if(len < 100)
            this.sprite.alpha -= 0.05;
        
        if(len < 10)
            this.props.die = true;
        
    }
}