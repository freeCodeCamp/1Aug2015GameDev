function GameObject (name, tag, layer, row, column, components) {
    
    this.name = name;
    this.tag = tag;
    
    this.props = new Props({
		column: column,
		row: row,
		cooldown: 1000,
		damage: 0,
		speed: 100,
		health: 2
	});
    this.layer = layer;
    var attachedComponents = components;
}


GameObject.prototype.getColumnAndRow = function () {
    return [this.column, this.row];
}

GameObject.prototype.getCoordinates = function () {
    return [this.row * 64, this.column * 64];
}

GameObject.prototype.getComponent = function(component) {
    for (var i = 0; i < this.attachedComponents.length; i++) {
        if (this.attachedComponents[i].type == component) {
            return this.attachedComponents[i];
        }
    }
}

GameObject.prototype.getComponents = function () {
    return this.attachedComponents;
}

GameObject.prototype.addComponent = function (component) {
    for (var i = 0; i < this.attachedComponents[i]; i++) {
        if (this.attachedComponents[i].type === component.type) {
            console.log('Error! Component already attached.');
            return;
        }
    }
    
    this.attachedComponents.push (component);
}

GameObject.prototype.compareTag = function (tag) {
    return this.tag === tag;
}

GameObject.prototype.compareLayer = function (layer) {
    return this.layer === layer;
}

GameObject.prototype.update = function () {
    for (var i = 0; i < this.attachedComponents[i]; i++) {
        if (this.attachedComponents.update) {
            this.attachedComponents[i].update();
        }
    }
}

GameObject.prototype.render = function () {
    for (var i = 0; i < this.attachedComponents[i]; i++) {
        if (this.attachedComponents.render) {
            this.attachedComponents[i].render();
        }
    }
}

function loadScript(url, callback)
{
    // Adding the script tag to the head as suggested before
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    script.onreadystatechange = callback;
    script.onload = callback;

    // Fire the loading
    head.appendChild(script);
}