function Zomper(manager, row, sprite_y) {

	this.manager = manager;
	
	this.props = new Props({
		row: row,
		cooldown: 1000,
		damage: 1,
		speed: 75,
		health: 2
	});

	this.sprite = game.add.sprite(game.width + 32, sprite_y, 'zombie');
	this.sprite.smoothed = false;
	this.sprite.width = 64;
	this.sprite.height = 64;
	this.dying = false;
	
	this.sprite.animations.add('idle', ['zombie_1', 'zombie_2'], 2, true, false);
	this.sprite.animations.add('hurt', ['zombie_0'], 2, true, false);
	this.sprite.animations.add('hit', ['zombie_hit_down', 'zombie_hit_up'], 2, false, false);
	this.sprite.animations.add('recoil', ['zombie_1'], 2, true, false);
	this.sprite.animations.play('idle', 2, true);
	
	game.physics.arcade.enable(this.sprite);
	this.sprite.body.velocity.x = -this.props.speed;
	
	this.sprite.anchor.setTo(0.5, 0);
}

Zomper.prototype.hit = function(damage) {
	
	this.sprite.body.immovable = false;
	
	this.sprite.animations.play('hurt', 2, false);
	this.props.health -= damage;
	
	this.sprite.body.velocity.x += 175;
	
	if (this.props.health <= 0) {
		this.dying = true;
		this.sprite.body.acceleration = new Phaser.Point(0, 150);
		this.sprite.body.velocity.y = -50;
		this.sprite.alpha = 1;
	}
};

Zomper.prototype.update = function() {

	// this means that they are completely off to the left of the screen
	if(this.sprite.x < -this.sprite.width) {
		this.manager.health -= 1;
		this.props.die = true;
	}

	var plant = this.manager.getClosestPlant(this.props.row, this.sprite.x);

	//If the zomper is dead, but hasn't fuly faded out yet.
	if(this.dying) {
		this.sprite.alpha -= 0.01;
		if(this.sprite.alpha <= 0)
			this.props.die = true;
	}
	// if theres a plant in this row and its 10 pixels away
	else if(plant != null && 
		Phaser.Math.difference(plant.sprite.x, this.sprite.x) <= this.sprite.width + 32) {

		var time_since = game.time.now - this.props.cooldown_timer;

		this.sprite.body.immovable = true;
		this.sprite.body.velocity.x = 0;

		var currentAnim = this.sprite.animations.currentAnim;

		if(currentAnim.name == 'idle' && time_since >= this.props.cooldown) {
			this.sprite.animations.play('hit', 4, false);
		}
		else if(currentAnim.isFinished && currentAnim.name == 'hit'){
			plant.hit(1);
			this.sprite.animations.play('recoil', 2, false);
		}
		else if(currentAnim.isFinished && currentAnim.name == 'recoil'){
			this.props.cooldown_timer = game.time.now;
			this.sprite.animations.play('idle', 2, true);
		}
	}
	else {
		
		this.sprite.body.immovable = false;
		
		this.sprite.animations.play('idle', 2, true);
		
		if(this.sprite.body.velocity.x < -this.props.speed)
			this.sprite.body.velocity.x = -this.props.speed;
	
		if(this.sprite.body.velocity.x > -this.props.speed)
			this.sprite.body.velocity.x -= 2;
	}
};