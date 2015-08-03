function Gui(state) {
	
	this.heart = game.add.sprite(16, 16, 'plants');
	this.heart.width = 64;
	this.heart.height = 64;
	this.heart.animations.add('full', ['heart'], 2, true, false);
	this.heart.animations.add('med', ['heart'], 2, true, false);
	this.heart.animations.add('low', ['heart'], 2, true, false);
	this.heart.animations.play('full', 2, true);
	
	this.sun = game.add.sprite(80, 16, 'plants');
	this.sun.width = 64;
	this.sun.height = 64;
	this.sun.animations.add('idle', ['sun'], 2, true, false);
	this.sun.animations.play('idle', 2, true);
	
	var self = this; var i = 0;
	['peashooter', 'sunflower', 'nut'].map(function(plant){
		
		var sprite = game.add.sprite(64 * i + 128, 16, 'plants');
		
		sprite.width = 64;
		sprite.height = 64;
		sprite.inputEnabled = true;
		
		sprite.animations.add('unselected', [plant + '_0'], 2, true, false);
		sprite.animations.add('selected', [plant + '_1'], 2, true, false);
		sprite.animations.play('unselected', 2, true);
		
		sprite.events.onInputDown.add(function(){
			sprite.animations.play('selected', 2, true);
		}, state);
		
		self[plant] = sprite;
		i++;
	});
	
	this.sunText = game.add.text(96, 128, '#FontFixBecauseExternalFontsDontWorkWellWithPhaser', {
		'font': '40px Arial',
		'fillStyle': 'black'
	});
	
}