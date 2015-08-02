// Initializes the vector with x and y as its coordinates
function Vector(x, y) {
    'use strict';
    this.x = x;
    this.y = y;
}

// Returns the magnitude or length of the vector.
Vector.prototype.magnitude = function () {
    'use strict';
    return Math.sqrt(this.x * this.x + this.y * this.y);
}

// Returns the square magnitude. Usefull when comparing lenghts of vectors,
// as comparing magnitudes is slower, and comparing square magnitudes has the
// same result.
Vector.prototype.squareMagnitude = function () {
    'use strict';
    return Math.sqrt(this.x * this.x + this.y * this.y);
}

// Returns this vector with a magnitude of 1.
Vector.prototype.normalized = function () {
    'use strict';
    return new Vector(this.x / this.magnitude(), this.y / this.magnitude());
}

// Gives this vector a magnitude of 1
Vector.prototype.normalize = function () {
    'use strict';
    this.x /= this.magnitude();
    this.y /= this.magnitude();
}

// Dot product of two vectors
function dot (a, b) {
    'use strict';
    if (a instanceof Vector && b instanceof Vector) {
        return a.x * b.x + a.y * b.y
    }
    
    return undefined;
}

// Adds two vectors together, component wise.
function add (a, b) {
    'use strict';
    if (a instanceof Vector && b instanceof Vector) {
        return new Vector(a.x + b.x, a.y + b.y);
    }
    
    return undefined
}

// Subtracts two vectors, component wise.
function subtract (a, b) {
    'use strict';
    if (a instanceof Vector && b instanceof Vector) {
        return new Vector(a.x - b.x, a.y - b.y);
    }
    
    return undefined;
}

// Scalar multiplication of two vectors,
function multiply (a, b) {
    'use strict';
    if (a instanceof Vector && b instanceof Vector) {
        return new Vector(a.x * b.x, a.y * b.y);
    }
    
    return undefined;
}

// Divides two vectors.
function divide (a, b) {
    'use strict';
    if (a instanceof Vector && b instanceof Vector) {
        return new Vector(a.x / b.x, a.y / b.y);
    }
    
    return undefined;
}

// TODO: distance calculation function