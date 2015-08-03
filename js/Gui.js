function Gui(state) {
	
	this.manager = state.manager;
	
	this.plant_selected = false;
	
	//14
	
	this.heart = game.add.sprite(48, 48, 'plants');
	this.heart.width = 32;
	this.heart.height = 32;
	this.heart.animations.add('full', ['heart'], 2, true, false);
	this.heart.animations.add('med', ['heart'], 2, true, false);
	this.heart.animations.add('low', ['heart'], 2, true, false);
	this.heart.animations.play('full', 2, true);
	
	this.guiSprite = game.add.sprite(32, 32, 'gui');
	this.guiSprite.smoothed = false;
	this.guiSprite.width = 296;
	this.guiSprite.height = 128;
	
	this.sun = game.add.sprite(this.guiSprite.x + 22, this.guiSprite.y + 22, 'plants');
	this.sun.width = 32;
	this.sun.height = 32;
	this.sun.animations.add('idle', ['sun'], 2, true, false);
	this.sun.animations.play('idle', 2, true);
	
	var self = this; var i = 0;
	['peashooter', 'sunflower', 'nut'].map(function(plant){
		
		// this doesn't do anything, it just sits there
		var placeholder_sprite = game.add.sprite(64 * i + 115, 60, 'plants');
		placeholder_sprite.width = 64;
		placeholder_sprite.height = 64;
		placeholder_sprite.smoothed = false;
		placeholder_sprite.animations.add('idle', [plant + '_0'], 2, true, false);
		placeholder_sprite.animations.play('idle', 2, true);
		
		var sprite = game.add.sprite(placeholder_sprite.x, placeholder_sprite.y, 'plants');
		
		sprite.width = 64;
		sprite.height = 64;
		sprite.smoothed = false;
		sprite.inputEnabled = true;
		sprite.input.enableDrag();
		
		sprite.animations.add('idle', [plant + '_0'], 2, true, false);
		sprite.animations.play('idle', 2, true);
		
		sprite.events.onInputDown.add(function(){
			self.plant_selected = true;
		}, state);
		
		sprite.events.onInputUp.add(function(){
			self.plant_selected = false;
			sprite.x = placeholder_sprite.x;
			sprite.y = placeholder_sprite.y;
			self.manager.addPlantAtMouse(plant);
		}, state);
		
		self[plant] = sprite;
		i++;
	});
	
	this.sunText = game.add.text(this.sun.x - 2 + this.sun.width / 2, this.sun.y + 48 + this.sun.height / 2, '#FontFixBecauseExternalFontsDontWorkWellWithPhaser', {
		font: '20px Arial',
		fillStyle: 'black',
		align: 'center'
	});
	
	this.sunText.anchor.set(0.5);
	
}