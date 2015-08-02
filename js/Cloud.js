//The cloud class should be self contained and describe a single cloud
//If you want to describe multiple clouds with one object you can make a separate
//clouds class to handle that

// Got it! That was the original intent of the cloud class.. I was still working
// out how to manage them
function Cloud(manager) {
    this.manager = manager;
    
    this.speed = 100;
    
    this.sprite = game.add.sprite(0, 0, 'cloud');
    
    this.direction = Math.floor(Math.random() * 1);
}

Cloud.prototype.update = function() {
    if (this.direction == 0) {
        this.sprite.x += this.speed;
    } else if (this.direction == 1) {
        this.sprite.x -= this.speed;
    }
};
