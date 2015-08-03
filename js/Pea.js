function Pea(manager, sprite_x, sprite_y, damage, speed) {
	this.manager = manager;
	
	this.props = new Props({
		damage: damage,
		speed: speed,
	});
	
	this.sprite = game.add.sprite(sprite_x, sprite_y, 'plants');
	this.sprite.width = 64;
	this.sprite.height = 64;
	
	this.sprite.animations.add('idle', ['pea'], 2, true, false);
	this.sprite.animations.play('idle', 2, true);
	
	game.physics.arcade.enable(this.sprite);
	this.sprite.body.velocity.x = this.props.speed;
	this.sprite.body.width = 16;
	
	this.sprite.anchor.setTo(0.5, 0);
}

Pea.prototype.update = function() {
	if(this.sprite.x > game.width) {
		this.props.die = true;
	}
};