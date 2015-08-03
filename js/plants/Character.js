function Character(manager, column, row, sprite_x, sprite_y) {
    this.type = 'character';
	this.manager = manager;
	
    this.props = new Props({
		column: column,
		row: row,
		cooldown: 1000,
		damage: 0,
		speed: 100,
		health: 2
	});

	this.sprite = game.add.sprite(sprite_x, sprite_y, 'plants');
	this.sprite.smoothed = false;
	this.sprite.width = 64;
	this.sprite.height = 64;
	
	//Common functions
	
	this.hit = function(damage){
		// Decrease health by the amount of damage, but never allow health to drop below zero
	    this.props.health = Math.max(this.props.health - damage, 0);
	    
	    // If health is zero, mark the plant as dead
		if (this.props.health <= 0) {
			this.props.die = true;
		}
	};
	
	this.init();
}

Character.__proto__ = Component('character');