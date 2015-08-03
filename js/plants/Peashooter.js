function Peashooter() {
    Character.apply(this, arguments);
}

Peashooter.prototype.init = function (){
	this.props.cooldown = 100;
	this.props.damage = 1;
	this.props.speed = 2;
	
	this.sprite.animations.add('idle', ['peashooter_3', 'peashooter_0'], this.props.speed, false, false);
	this.sprite.animations.add('shoot', ['peashooter_0', 'peashooter_1', 'peashooter_2'], this.props.speed, false, false);
	this.sprite.animations.add('recoil', ['peashooter_2', 'peashooter_1', 'peashooter_0'], this.props.speed, false, false);
	this.sprite.animations.play('idle', this.props.speed, true);
}

Peashooter.prototype.update = function() {

	var time_since = game.time.now - this.props.cooldown_timer;
	
	if(this.manager.campersInRow(this.props.row) > 0) {

		var currentAnim = this.sprite.animations.currentAnim;

		if(currentAnim.name == 'idle' && time_since >= this.props.cooldown) {
			this.sprite.animations.play('shoot', this.props.speed, false);
		}
		else if(currentAnim.isFinished && currentAnim.name == 'shoot'){
			this.manager.shootPea(this.props.column, this.props.row, 1, 200);
			this.sprite.animations.play('recoil', this.props.speed, false);
		}
		else if(currentAnim.isFinished && currentAnim.name == 'recoil'){
			this.props.cooldown_timer = game.time.now;
			this.sprite.animations.play('idle', this.props.speed, true);
		}
	}
	else {
		this.sprite.animations.play('idle', 2, true);
	}

};