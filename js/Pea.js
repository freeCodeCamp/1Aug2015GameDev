function Pea(manager, column, row) {
	this.manager = manager;
	this.column = column;
	this.row = row;
}

Pea.prototype.update = function() {

	this.sprite.x += this.movement_speed * game.time.elapsed;

};