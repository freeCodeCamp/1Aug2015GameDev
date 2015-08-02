Peashooter.prototype.init = function (){
	this.sprite.animations.add('idle', ['peashooter_3', 'peashooter_0'], 2, true, false);
	this.sprite.animations.add('shoot', ['peashooter_0', 'peashooter_1', 'peashooter_2'], 2, true, false);
	this.sprite.animations.add('recoil', ['peashooter_2', 'peashooter_1', 'peashooter_0'], 2, true, false);
	this.sprite.animations.play('idle', 2, true);
	this.props.damage = 1;
}

Peashooter.prototype.update = function() {

	var time_since = game.time.now - this.props.cooldown_timer;

	if(this.manager.campersInRow(this.props.row) > 0) {

		var currentAnim = this.sprite.animations.currentAnim;

		if(currentAnim.name == 'idle' && time_since >= this.props.cooldown) {
			this.sprite.animations.play('shoot', 4, false);
		}
		else if(currentAnim.isFinished && currentAnim.name == 'shoot'){
			this.manager.shootPea(this.props.column, this.props.row, 1, 200);
			this.sprite.animations.play('recoil', 2, false);
		}
		else if(currentAnim.isFinished && currentAnim.name == 'recoil'){
			this.props.cooldown_timer = game.time.now;
			this.sprite.animations.play('idle', 2, true);
		}
	}
	else {
		this.sprite.animations.play('idle', 2, true);
	}

};