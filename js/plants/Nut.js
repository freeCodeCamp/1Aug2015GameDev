Nut.prototype.init = function (){
	this.last_action_time = 0;
	this.props.health = 14;
};

Nut.prototype.update = function() {

	// Update sprite based on health remaining
	var idleAnimationIndex = (8 - (this.props.health / 2)); // maps health in range of 1-7 (1 means full health, 7 means almost no health)
	this.sprite.animations.play('idle' + idleAnimationIndex.toString(), 1, false);

};