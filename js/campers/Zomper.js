function Zomper(manager, row, sprite_y) {

	// How many times we have to be hit before we go down
	this.maxHealth = 2;
	this.health = 2;
	this.manager = manager;
	this.row = row;
	this.damage = 1;
	this.speed = 100;

	this.sprite = game.add.sprite(800, sprite_y, 'zombie');
	this.sprite.smoothed = false;
	this.sprite.width = 64;
	this.sprite.height = 64;
	
	this.sprite.animations.add('idle', ['zombie_1', 'zombie_2'], 2, true, false);
	this.sprite.animations.add('hurt', ['zombie_3'], 2, true, false);
	this.sprite.animations.add('hit', ['zombie_0'], 2, true, false);
	this.sprite.animations.add('recoil', ['zombie_1'], 2, true, false);
	this.sprite.animations.play('idle', 2, true);
	
	game.physics.arcade.enable(this.sprite);
	this.sprite.body.velocity.x = -this.speed;
	
	this.sprite.anchor.setTo(0.5, 0);
}

Zomper.prototype.hit = function(damage) {
	
	this.sprite.animations.play('hurt', 2, false);
	this.health -= damage;
	
	this.sprite.body.velocity.x += 175;
	
	if (this.health <= 0) {
		this.die = true;
	}
};

Zomper.prototype.update = function() {
	
	if(this.sprite.body.velocity.x < -this.speed) this.sprite.body.velocity.x = -this.speed;
	
	if(this.sprite.body.velocity.x > -this.speed) this.sprite.body.velocity.x -= 2;
	
	var time_since = game.time.now - this.time_since_cooldown;

	var plant = this.manager.getClosestPlant(this.sprite.x);

	// if theres a plant in this row and its 10 pixels away
	if(plant != null && Phaser.Math.difference(plant.sprite.x, this.sprite.x) < 10) {

		var currentAnim = this.sprite.animations.currentAnim;

		if(currentAnim.name == 'idle' && time_since >= this.cooldown) {
			this.sprite.animations.play('hit', 4, false);
		}
		else if(currentAnim.isFinished && currentAnim.name == 'hit'){
			plant.hit(1);
			this.sprite.animations.play('recoil', 2, false);
		}
		else if(currentAnim.isFinished && currentAnim.name == 'recoil'){
			this.time_since_cooldown = game.time.now;
			this.sprite.animations.play('idle', 2, true);
		}
	}
	else {
		this.sprite.animations.play('idle', 2, true);
	}
};