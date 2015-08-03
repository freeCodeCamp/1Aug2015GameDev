function Cursor(manager, column, row, sprite_x, sprite_y) {
    this.manager = manager;
    
    this.props = new Props({
        column: column,
		row: row
	});
    
    this.sprite = game.add.sprite(sprite_x, sprite_y, 'cursors');
	this.sprite.smoothed = false;
	this.sprite.width = 64;
	this.sprite.height = 64;
	
	this.sprite.animations.add('green', ['cursor_green'], 2, true, false);
	this.sprite.animations.add('red', ['cursor_red'], 2, true, false);
	this.sprite.animations.play('green', 2, true);
}

Cursor.prototype.update = function() {
    
    this.sprite.bringToTop();
    
    var keyboard = game.input.keyboard;
    var mouse_x = game.input.activePointer.x - this.manager.offsets.world_x, 
        mouse_y = game.input.activePointer.y - this.manager.offsets.world_y;
    
    this.props.column = Math.floor(mouse_x / (64 + this.manager.offsets.margin_x));
    this.props.column = Math.max(Math.min(this.props.column, this.manager.width - 1), 0);
    this.props.row    = Math.floor(mouse_y / (64 + this.manager.offsets.margin_y));
    this.props.row    = Math.max(Math.min(this.props.row, this.manager.height - 1), 0);
    
    //Meow - Puuuurfect
    
    //https://www.youtube.com/watch?v=dQw4w9WgXcQ
    // ^ Best song ever ^

    this.sprite.visible = this.manager.gui.plant_selected;

    if(this.manager.getPlantAt(this.props.column, this.props.row) != null) {
        this.sprite.animations.play('red', 2, true);
    }
    else {
        this.sprite.animations.play('green', 2, true);
    }
    
    this.sprite.x = this.props.column * (64 + this.manager.offsets.margin_x) + this.manager.offsets.world_x;
    this.sprite.y = this.props.row * (64 + this.manager.offsets.margin_y) + this.manager.offsets.world_y;
};