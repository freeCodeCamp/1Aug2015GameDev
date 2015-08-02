function GameObject (name, tag, layer, row, column, components) {
    this.name = name;
    this.tag = tag;
    this.layer = layer;
    this.row = row;
    this.column = column;
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
        attachedComponents[i].update();
    }
}