function Sunflower() {
    Character.apply(this, arguments);
}

Sunflower.prototype.init = function () {
	
	this.props.cooldown = (Math.random() * 5000) + 5000;

	this.sprite.animations.add('idle', ['sunflower_3', 'sunflower_0'], 2, true, false);
	this.sprite.animations.play('idle', 2, true);
}

Sunflower.prototype.update = function() {
        
	var time_since = game.time.now - this.props.cooldown_timer;

	if (time_since >= this.props.cooldown) {
		this.props.cooldown = (Math.random() * 5000) + 5000;
		this.props.cooldown_timer = game.time.now;
		this.manager.spawnSun(this.props.column, this.props.row);
	}

};