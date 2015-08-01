function Peashooter(manager, column, row, sprite_x, sprite_y) {

	this.manager = manager;

	this.column = column;
	this.row = row;

	this.last_action_time = 0;

	this.sprite = game.add.sprite(sprite_x, sprite_y, 'plants');
	this.sprite.smoothed = false;
	this.sprite.width = 64;
	this.sprite.height = 64;
	this.sprite.animations.add('idle', [
		'peashooter_3', 'peashooter_0'
	], 2, true, false);
	this.sprite.animations.add('shoot', [
		'peashooter_0', 'peashooter_1', 'peashooter_2'
	], 2, true, false);
	this.sprite.animations.play('idle', 2, true);
}

Peashooter.prototype.update = function() {

	var time_since = game.time.now - this.last_action_time;

	if(this.manager.campersInRow(this.row) > 0) {

		if(time_since >= 2000) {
			this.last_action_time = game.time.now;
			this.sprite.animations.play('shoot', 4, true);
		}
	}
	else {
		this.sprite.animations.play('idle', 2, true);
	}

};