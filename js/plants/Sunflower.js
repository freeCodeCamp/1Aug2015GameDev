function Sunflower(manager, column, row, sprite_x, sprite_y) {

	this.manager = manager;

	this.column = column;
	this.row = row;

	this.last_action_time = 0;

	this.sprite = game.add.sprite(sprite_x, sprite_y, 'plants');
	this.sprite.smoothed = false;
	this.sprite.width = 64;
	this.sprite.height = 64;
	this.sprite.animations.add('idle', [0], 15, false);
	this.sprite.animations.play('idle', 15, false);
}

Sunflower.prototype.update = function() {

	var time_since = game.time.now - this.last_action_time;

	if(time_since >= 2000) {
		this.last_action_time = game.time.now;
		console.log('SHOOTING!');
	}

};