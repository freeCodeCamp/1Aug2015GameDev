var game = new Phaser.Game(800, 576, Phaser.AUTO, 'game');

window.onload = function() {
	game.state.add('gameState', new GameState());
	game.state.start('gameState');
};

function GameState() {
	this.background = null;

	var state = this;
	this.manager = {
		offsets: null,
		width: 10,
		height: 6,
		plants: [],
		campers: [],
		peas: [],
		clouds: [],
		suns: [],
		spawn_timer: 0,
		health: 3,
		money: 0,
		gui: null,
		cursor: null,
		gui: null,
		setup: function(offsets) {
			this.offsets = offsets;

			/*for(var y = 0; y < this.height; y++) {
				for(var x = 0; x < this.width; x++) {
					game.add.sprite(
						(64 + this.offsets.margin_x) * x + this.offsets.world_x,
						(64 + this.offsets.margin_y) * y + this.offsets.world_y,
						'spot'
					);
				}
			}*/
			
			this.cursor = new Cursor(
				this, 0, 0,
				(64 + this.offsets.margin_x) * 0 + this.offsets.world_x,
				(64 + this.offsets.margin_y) * 0 + this.offsets.world_y
			);
			
				
			// it'll just create a random amount of clouds
				
			var min = 1;
			var max = 10;
				
			var cloud_count = Math.floor(Math.random() * (max - min + 1)) + min
				
			for(var i = 0; i < cloud_count; i++) {
				this.clouds.push(new Cloud(this));
			}
		},
		getClosestPlant: function(row, x) {
			var closest = null;
			for(var i = 0; i < this.plants.length; i++) {
				if(this.plants[i].props.row == row) {
					if(closest == null || this.plants[i].sprite.x > closest.sprite.x) {
						closest = this.plants[i];
						//console.log(closest);
					}
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

				var plantClass = Peashooter; // default plant
				
				switch (type) {
					case 'peashooter': plantClass = Peashooter; break;
					case 'sunflower': plantClass = Sunflower; break;
					case 'nut': plantClass = Nut; break;
				}

				this.plants.push(new plantClass(this, column, row,
					(64 + this.offsets.margin_x) * column + this.offsets.world_x - this.offsets.spot_x,
					(64 + this.offsets.margin_y) * row + this.offsets.world_y - this.offsets.spot_y
				));

				return true;
			}
			else {
				return false;
			}
		},
		addPlantAtMouse: function(type) {
			var mouse_x = game.input.activePointer.x - this.offsets.world_x, 
        		mouse_y = game.input.activePointer.y - this.offsets.world_y;
    
		    var column = Math.floor(mouse_x / (64 + this.offsets.margin_x));
		    var row    = Math.floor(mouse_y / (64 + this.offsets.margin_y));
		    
		    if(column > -1 && column < this.width && row > -1 && row < this.height) {
		    	return this.addPlant(column, row, type);
		    }
		    
		    return false;
		},
		addCamper: function(row, type) {
			this.campers.push(new Zomper(
				this, row, (64 + this.offsets.margin_y) * row + this.offsets.world_y - this.offsets.spot_y
			));
		},
		addSun: function(x, y) {
			this.suns.push(new Sun(
				this, x, y
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
		},
		spawnSun: function (column, row) {
			this.suns.push(new Sun(
				state,
				(64 + this.offsets.margin_x) * column + this.offsets.world_x - this.offsets.spot_x,
				(64 + this.offsets.margin_y) * row + this.offsets.world_y - this.offsets.spot_y
			));
		},
		cleanup: function() {
			
			var objectArrays = ['plants', 'campers', 'peas', 'suns'];
			
			for(var i = 0; i < objectArrays.length; i++) {
				
				var objectArray = this[objectArrays[i]];
				
				var ii = 0; while(ii < objectArray.length) {
					if(objectArray[ii].props.die) {
						objectArray[ii].sprite.destroy();
						objectArray.splice(ii, 1);
					} ii++;
				}
			}
			
		}
	};

}

GameState.prototype = {
	preload: function() {
		game.load.image('background', 'assets/textures/background.png');
		game.load.image('spot', 'assets/textures/spot.png');
		game.load.image('cloud', 'assets/textures/cloud.png');
		game.load.image('gui', 'assets/textures/gui.png');
		game.load.atlasJSONHash('cursors', 'assets/textures/cursor.png', 'assets/textures/cursor.json');
		game.load.atlasJSONHash('zombie', 'assets/textures/zombie.png', 'assets/textures/zombie.json');
		game.load.atlasJSONHash('plants', 'assets/textures/plants.png', 'assets/textures/plants.json');
	},
	create: function() {
		
		game.physics.startSystem(Phaser.Physics.ARCADE);
		
		this.background = game.add.sprite(0, 0, 'background');

		game.stage.backgroundColor = '#FFFFFF';

		this.manager.setup({
			world_x: 0,
			world_y: 186,
			margin_x: 0,
			margin_y: 0,
			spot_x: 0,
			spot_y: 0
		});
		
		/*for(var i = 0; i < this.manager.height; i++) {
			for(var ii = 0; ii < 8; ii++)
				this.manager.addPlant(ii, i, 'sunflower');
		}*/
		
		this.manager.gui = new Gui(this);
		
		var manager = this.manager;
		window.setTimeout(function(){
			manager.gui.sunText.text = manager.money.toString();
		}, 100);
	},
	update: function() {
		var manager = this.manager;
		
		// spawn a new camper every 2 seconds if theirs less than 10 in the game
		var spawn_timer_difference = game.time.now - manager.spawn_timer;
		if(manager.campers.length < 10 && spawn_timer_difference >= 2000) {
			var row = Math.floor(Math.random() * manager.height);
			manager.addCamper(row, 'basic');
			manager.spawn_timer = game.time.now;
		}

		manager.plants.map(function(plant){ plant.update(); });
		manager.clouds.map(function(cloud){ cloud.update(); });
		manager.suns.map(function(sun){ sun.update(); });

		manager.campers.map(function(camper_a){
			camper_a.update();
			if(!camper_a.dying) {
				manager.campers.map(function(camper_b){
					if(!camper_b.dying) {
						game.physics.arcade.collide(camper_a.sprite, camper_b.sprite);
					}
				});
			}
		});
		
		manager.peas.map(function(pea){
			pea.update();
			manager.campers.map(function(camper){
				if(game.physics.arcade.overlap(pea.sprite, camper.sprite)) {
					pea.props.die = true;
					camper.hit(pea.props.damage);
				}
			});
		});
		
		manager.cursor.update();
		
		manager.cleanup();
	},
	render: function() {
		//for(var i = 0; i < this.manager.campers.length; i++) game.debug.body(this.manager.campers[i].sprite);
		//for(var i = 0; i < this.manager.peas.length; i++) game.debug.body(this.manager.peas[i].sprite);
	}
};