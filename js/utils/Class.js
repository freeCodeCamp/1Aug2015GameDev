var PvZ = PvZ || {};


// *** Example of creating a simple class within the PvZ namespace ! (PS: we should have namespaces Plants Vs Zombies === PvZ)

// var Game = PvZ.Class.create('PvZ.Game', function Game(options, dependencies) {

//     this.dependencies = dependencies;
//     this.options = PvZ.Utils.extend({}, this.options, options);
//     this.config = PvZ.Config;

//     this.init();
// });

// *** this is how you extend a random class lets say you want to make a new player class

// var Player = PvZ.Class.extend(PvZ.Game.Entity, 'PvZ.Game.Entity.Player', PvZ.Game.Entity); <--- assuming you have entities i think you guys call them characters

// 	    Player.prototype.init = function() {
// 		    this.controller = new O.Game.Controller;
// 		    PvZ.Logger.log("Player Created");

// 		    this.x = this.canvas.width / 2;
//          this.y = this.canvas.height / 2;

//          this.radius = 70;
//          this.speed = 10;
//      }

PvZ.Class = (function() {
	function makeNameSpace(namespace, constructor){
		var parts = namespace.split('.');
		var parent = window;

		//loop thorugh namespace parts
		var part;
		for (var i = 0; i < parts.length; i++) {
			part = parts[i];
			if (typeof parent[part] === 'undefined') {
				if(i === parts.length - 1 && typeof constructor === 'function' ){
					parent[part] = constructor;
				}else{
					parent[part] = {};
				}
			}
			parent = parent[part];
		};

		return parent;
	}

	return {
		create: function(namespace, constructor) {
			var newClass = makeNameSpace(namespace, constructor);
			newClass = constructor;
			newClass.prototype.fullClassName = namespace;
			newClass.prototype.toString = function() {
				return namespace;
			}

			return newClass;
		},
		extend: function(parent, namespace, constructor) {
			
			var F = function() {};
			try{
				F.prototype = parent.prototype;
			} catch (e){
				throw new Error('Parent class does not exist..');
			}

			constructor.prototype = new F();
			constructor.prototype.parent = parent;
			constructor.prototype.constructor = constructor;
			return PvZ.Class.create(namespace, constructor);
		}
	}

})();