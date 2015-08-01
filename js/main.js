var game = new Phaser.Game(800, 600, Phaser.Auto, 'game');

window.onload = function() {
	game.state.add('gameState', new GameState());
	game.state.start('gameState');
};

function GameState() {
	this.background = null;
	this.mario = null;

	this.manager = {
		offsets: null,
		width: 9,
		height: 6,
		plants: [],
		campers: [],
		peas: [],
		types: {
			basic : {

				animations: {
					idle: [0]
				},
				update: function() {

				}
			}
		},
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
		},
		campersInRow: function(row) {
			var count = 0;
			for(var i = 0; i < this.campers.length; i++) {
				if(this.campers[i].row == row) {
					count++;
				}
			}
			return count;
		},
		getPlantAt: function(column, row) {
			for(var i = 0; i < this.plants.length; i++) {
				if(this.plants[i].column == column && this.plants[i].row == row) {
					return this.plants[i];
				}
			}
			return null;
		},
		addPlant: function(column, row, type) {
			if(this.getPlantAt(column, row) == null) {

				this.plants.push(new Peashooter(
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
		addPea: function(column, row) {
			this.peas.push(new Pea(
				(64 + this.offsets.margin_x) * column + this.offsets.world_x - this.offsets.spot_x,
				(64 + this.offsets.margin_y) * row + this.offsets.world_y - this.offsets.spot_y
			));
		}
	};

}

GameState.prototype = {
	preload: function() {
		game.load.image('background', 'assets/textures/background.png');
		game.load.image('zombie', 'assets/textures/zombie_scaled.png');
		game.load.image('spot', 'assets/textures/spot.png');
		game.load.atlasJSONHash('plants', 'assets/textures/plants.png', 'assets/textures/plants.json');
	},
	create: function() {
		this.background = game.add.sprite(0, 0, 'background');

		game.stage.backgroundColor = '#FFFFFF';
		this.mario = game.add.sprite(0, 0, 'zombie');
		this.mario.width = 64;
		this.mario.height = 64;

		this.manager.setup({
			world_x: 0,
			world_y: 224,
			margin_x: 16,
			margin_y: 0,
			spot_x: 0,
			spot_y: 16
		});
		this.manager.addPlant(0, 0, 'basic');
		this.manager.addPlant(1, 1, 'basic');
		this.manager.addCamper(1, 'basic');

	},
	update: function() {

		//if(this.campers.length < 10) {
		//}

		for(var i = 0; i < this.manager.plants.length; i++) {
			this.manager.plants[i].update();
		}

		for(var i = 0; i < this.manager.campers.length; i++) {
			this.manager.campers[i].update();
		}

	}
};