function Nut() {
    Character.apply(this, arguments);
}

Nut.prototype.init = function (){
	this.last_action_time = 0;
	this.props.health = 14;
	
	this.sprite.animations.add('idle_1', ['nut_0'], 2, true, false);
	this.sprite.animations.add('idle_2', ['nut_1'], 2, true, false);
	this.sprite.animations.add('idle_3', ['nut_2'], 2, true, false);
	this.sprite.animations.add('idle_4', ['nut_3'], 2, true, false);
	this.sprite.animations.add('idle_5', ['nut_4'], 2, true, false);
	this.sprite.animations.add('idle_6', ['nut_5'], 2, true, false);
	this.sprite.animations.add('idle_7', ['nut_6'], 2, true, false);
	this.sprite.animations.play('idle_0', 2, true);
};

Nut.prototype.update = function() {
	// Update sprite based on health remaining
	var idleAnimationIndex = (8 - (this.props.health / 2)); // maps health in range of 1-7 (1 means full health, 7 means almost no health)
	this.sprite.animations.play('idle_' + idleAnimationIndex.toString(), 1, false);
};