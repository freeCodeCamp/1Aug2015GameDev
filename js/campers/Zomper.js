function Zomper(manager, row, sprite_y) {

	this.manager = manager;

	this.row = row;

	this.movement_speed = 0.05;
	this.health = 100;
	this.sprite = game.add.sprite(800, sprite_y, 'zombie');
	this.sprite.scale.x = -1;

}

Zomper.prototype.update = function() {

	this.sprite.x -= this.movement_speed * game.time.elapsed;

};