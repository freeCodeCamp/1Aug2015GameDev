function Props(options) {
    this.column         = options.column;
    this.row            = options.row;
    this.cooldown       = options.cooldown;
	this.damage         = options.damage;
	this.speed          = options.speed;
	this.health         = options.health;
	this.cooldown_timer = 0;
	this.die            = false;
}