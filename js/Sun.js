function Sun(manager, sprite_x, sprite_y) {
	this.manager = manager;
	
	this.sprite = game.add.sprite(sprite_x, sprite_y, 'plants');
	this.sprite.width = 64;
	this.sprite.height = 64;
	
	this.props = new Props({
	    speed: 50,
	    cooldown: 1000
	});
	
	this.collecting = false;
	this.speed = 50;
	this.spawnCountdown = 1;
	
	game.physics.arcade.enable(this.sprite);
	this.sprite.body.acceleration = new Phaser.Point(0, 150);
	this.sprite.body.velocity.y = -Math.random() * 50 - 50;
	this.sprite.body.velocity.x = Math.random() * 30 - 10;
	//this.sprite.body.velocity.x = this.props.speed;
	
	this.sprite.animations.add('idle', ['sun'], 2, true, false);
	this.sprite.animations.play('idle', 2, true);
}

Sun.prototype.update = function() {
    //If the sun is getting collected we don't need to check if
    //the player is clicking on it
    var time_since = game.time.now - this.props.cooldown_timer;
    
    if(!this.collecting) {
        
        //Stop moving the sun after about a second
        if(time_since >= this.props.cooldown) {
            this.sprite.body.velocity.x=0;
            this.sprite.body.velocity.y=0;
            this.sprite.body.acceleration = new Phaser.Point(0,0);
        }
        
        var mouseButton = game.input.activePointer.leftButton;
        var mouse_x = game.input.mousePointer.x - this.manager.offsets.world_x; 
        var mouse_y = game.input.mousePointer.y - this.manager.offsets.world_y;
        
        //If the mouse button has been pressed in the last 50ms
        //We're gonna check if this sun got clicked on
        if(mouseButton.isDown && mouseButton.duration < 50) {
            
            if(this.sprite.x<mouse_x && this.sprite.x+this.sprite.width<mouse_x && this.sprite.y<mouse_y && this.sprite.y+this.sprite.height>mouse_y) {
                this.collecting = true;
            }
        }
    }
    else {
        var len = Math.sqrt(this.sprite.x*this.sprite.x+this.sprite.y*this.sprite.y);
        this.sprite.body.velocity.x = this.speed*(-this.sprite.x) / len;
        this.sprite.body.velocity.y = this.speed*(-this.sprite.y) / len;
        if(len<150)
            this.sprite.alpha -= 0.05;
        if(len<50 && this.sprite.alpha<=0)
            this.props.dead = true;
    }
}