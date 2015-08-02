var game = new Phaser.Game(800, 576, Phaser.Auto, 'game');

window.onload = function() {
	game.state.add('gameState', new GameState());
	game.state.start('gameState');
};

function GameState() {
	this.background = null;

	this.manager = {
		offsets: null,
		width: 9,
		height: 6,
		plants: [],
		campers: [],
		peas: [],
		spawn_timer: 0,
		cursor: null,
		setup: function(offsets) {
			this.offsets = offsets;

			for(var y = 0; y < this.height; y++) {
				for(var x = 0; x < this.width; x++) {
					game.add.sprite(
						(64 + this.offsets.margin_x) * x + this.offsets.world_x,
						(64 + this.offsets.margin_y) * y + this.offsets.world_y,
						'spot'
					);
				}
			}
			
			this.cursor = new Cursor(
				this, 0, 0,
				(64 + this.offsets.margin_x) * 0 + this.offsets.world_x,
				(64 + this.offsets.margin_y) * 0 + this.offsets.world_y
			);
			
			game.add.sprite(
				(64
				 )
			);
		},
		getClosestPlant: function(x) {
			var closest = null;
			for(var i = 0; i < this.plants.length; i++) {
				if(closest == null || this.plants[i].sprite.x > closest.sprite.x) {
					closest = this.plants[i];
				}
			}
			return closest;
		},
		campersInRow: function(row) {
			var count = 0;
			for(var i = 0; i < this.campers.length; i++) {
				if(this.campers[i].props.row == row) {
					count++;
				}
			}
			return count;
		},
		getPlantAt: function(column, row) {
			for(var i = 0; i < this.plants.length; i++) {
				if(this.plants[i].props.column == column && this.plants[i].props.row == row) {
					return this.plants[i];
				}
			}
			return null;
		},
		addPlant: function(column, row, type) {
			if(this.getPlantAt(column, row) == null) {

				var mappedClass = Peashooter; // default plant
				switch (type) {
					case 'basic': mappedClass = Peashooter; break;
					case 'sunflower': mappedClass = Sunflower; break;
				}

				this.plants.push(new mappedClass(
					this, column, row,
					(64 + this.offsets.margin_x) * column + this.offsets.world_x - this.offsets.spot_x,
					(64 + this.offsets.margin_y) * row + this.offsets.world_y - this.offsets.spot_y
				));

				return true;
			}
			else {
				return false;
			}
		},
		addCamper: function(row, type) {
			this.campers.push(new Zomper(
				this, row, (64 + this.offsets.margin_y) * row + this.offsets.world_y - this.offsets.spot_y
			));
		},
		shootPea: function(column, row, damage, speed) {
			this.peas.push(new Pea(
				this,
				(64 + this.offsets.margin_x) * column + this.offsets.world_x - this.offsets.spot_x,
				(64 + this.offsets.margin_y) * row + this.offsets.world_y - this.offsets.spot_y,
				damage,
				speed
			));
		}
	};

}

GameState.prototype = {
	preload: function() {
		game.load.image('background', 'assets/textures/background.png');
		game.load.image('spot', 'assets/textures/spot.png');
		game.load.image('cloud', 'assets/textures/cloud.png');
		game.load.atlasJSONHash('cursors', 'assets/textures/cursor.png', 'assets/textures/cursor.json');
		game.load.atlasJSONHash('zombie', 'assets/textures/zombie.png', 'assets/textures/zombie.json');
		game.load.atlasJSONHash('plants', 'assets/textures/plants.png', 'assets/textures/plants.json');
	},
	create: function() {
		
		game.physics.startSystem(Phaser.Physics.ARCADE);
		
		this.background = game.add.sprite(0, 0, 'background');

		game.stage.backgroundColor = '#FFFFFF';

		game.add.text(0, 0, 'Controls - Arrow keys to move cursor', {
			'font': '18px Arial',
			'fillStyle': 'black'
		})

		this.manager.setup({
			world_x: 0,
			world_y: 186,
			margin_x: 16,
			margin_y: 0,
			spot_x: 0,
			spot_y: 0
		});
		
		this.manager.addPlant(0, 0, 'basic');
		this.manager.addPlant(0, 1, 'basic');
		this.manager.addPlant(0, 2, 'basic');
		this.manager.addPlant(0, 3, 'basic');
		this.manager.addPlant(0, 4, 'basic');
	},
	update: function() {
		
		var spawn_timer_difference = game.time.now - this.manager.spawn_timer;

		// spawn a new camper every 2 seconds if theirs less than 10 in the game
		if(this.manager.campers.length < 10 && spawn_timer_difference >= 2000) {
			var row = Math.floor(Math.random() * (this.manager.height - 1));
			this.manager.addCamper(row, 'basic');
			this.manager.spawn_timer = game.time.now;
		}

		// update all the plants
		for(var i = 0; i < this.manager.plants.length; i++) {
			this.manager.plants[i].update();
		}

		// clean up any campers who have died
		var i = 0; while(i < this.manager.campers.length) {
			var camper = this.manager.campers[i];
			
			camper.update();
			
			if(camper.props.die) {
				camper.sprite.destroy();
				this.manager.campers.splice(i, 1);
			}
			
			var c = 0; while(c < this.manager.campers.length) {
				//game.physics.arcade.collide(camper.sprite, this.manager.campers[c].sprite);
				c++;
			}
			
			i++;
		}
		
		// clean up any peas that have died
		var i = 0; while(i < this.manager.peas.length) {
			var pea = this.manager.peas[i];
			
			if(pea.props.die) {
				pea.sprite.destroy();
				this.manager.peas.splice(i, 1);
			}
			
			i++;
		}
		
		// check collisions between peas and campers
		var i = 0; while(i < this.manager.peas.length) {
			var pea = this.manager.peas[i];
			
			for(var c = 0; c < this.manager.campers.length; c++) {
				var camper = this.manager.campers[c];
				
				if(game.physics.arcade.overlap(pea.sprite, camper.sprite)) {
					pea.props.die = true;
					camper.hit(pea.props.damage);
				}
			}
			
			i++;
		}
		
		this.manager.cursor.update();
		
	},
	render: function() {
		//for(var i = 0; i < this.manager.campers.length; i++) game.debug.body(this.manager.campers[i].sprite);
		//for(var i = 0; i < this.manager.peas.length; i++) game.debug.body(this.manager.peas[i].sprite);
	}
};