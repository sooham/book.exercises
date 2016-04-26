"use strict";

/**************** Helper functions ***********/

// return random element from array
function randomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}


// return an instance of element corresponding to char
// according to legend. " " char means null
function elementFromChar(legend, ch) {
  if (ch == " ")
    return null;
  var element = new legend[ch]();
  element.originChar = ch;
  return element;
}

// reverse function of elementFromChar
function charFromElement(element) {
  if (element == null)
    return " ";
  else
    return element.originChar;
}

// takes in a direction and number and direction,
// returns the direction in that turn
function dirPlus(dir, n) {
  var index = directionNames.indexOf(dir);
  return directionNames[(index + n + 8) % 8];
}

// returns the taxicab norm of R^2 vectors a and b
function taxicab_distance(a, b) {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

// deep Equality
function deepEqual(a, b) {
    // return true iff they are the same value
    // or are objects with the same properties
    if (typeof a !== "object" && typeof b !== "object") {
        return a === b;
    } else if (typeof a === typeof b) {
        // both a and b are objects
        if (a instanceof Array && b instanceof Array) {
            if (a.length === b.length) {
                for (var i = 0; i < a.length; i++) {
                    if (!deepEqual(a[i], b[i])) {
                        return false;
                    }
                }
                return true;
            } else {
                return false;
            }
        } else if (a instanceof Object && b instanceof Object) {
            // check if the values are equal
            if (deepEqual(Object.keys(a), Object.keys(b))) {
              for (var key in a) {
                  if (!deepEqual(a[key], b[key])) {
                      return false;
                  }
              }
              return true;
            } else {
              return false;
            }
        } else {
            return false;
        }
    } else {
        return false;
    }
}

function deepContains(array, element) {
    for (var i = 0; i < array.length; i++) {
        if (deepEqual(array[i], element)) {
            return true;
        }
    }
    return false;
}

/**************** main ***********************/
// vector - each vector represents a location on grid
function Vector(x, y) {
  this.x = x;
  this.y = y;
}
Vector.prototype.plus = function(other) {
  return new Vector(this.x + other.x, this.y + other.y);
};
Vector.prototype.toString = function() {
   return "("  + this.x + ", " + this.y + ")";
}

// array of directions
var directionNames = "n ne e se s sw w nw".split(" ");

// map from relative directions to vector
var directions = {
  "n":  new Vector( 0, -1),
  "ne": new Vector( 1, -1),
  "e":  new Vector( 1,  0),
  "se": new Vector( 1,  1),
  "s":  new Vector( 0,  1),
  "sw": new Vector(-1,  1),
  "w":  new Vector(-1,  0),
  "nw": new Vector(-1, -1)
};

// Grid - stores instances of critters in world in a grid
function Grid(width, height) {
  this.space = new Array(width * height);
  this.width = width;
  this.height = height;
}
Grid.prototype.isInside = function(vector) {
  return vector.x >= 0 && vector.x < this.width &&
         vector.y >= 0 && vector.y < this.height;
};
Grid.prototype.get = function(vector) {
  return this.space[vector.x + this.width * vector.y];
};
Grid.prototype.set = function(vector, value) {
  this.space[vector.x + this.width * vector.y] = value;
};

// for each method for grid
Grid.prototype.forEach = function(f, context) {
  for (var y = 0; y < this.height; y++) {
    for (var x = 0; x < this.width; x++) {
      var value = this.space[x + y * this.width];
      if (value != null)
        f.call(context, value, new Vector(x, y));
    }
  }
};

// World constructor
// a world takes in a map (plan) and legend
// and creates the grid filled with the instantiated
// elements
function World(map, legend) {
  var grid = new Grid(map[0].length, map.length);
  this.grid = grid;
  this.legend = legend;

  map.forEach(function(line, y) {
    for (var x = 0; x < line.length; x++)
      grid.set(new Vector(x, y),
               elementFromChar(legend, line[x]));
  });
}

// prints the world
World.prototype.toString = function() {
  var output = "";
  for (var y = 0; y < this.grid.height; y++) {
    for (var x = 0; x < this.grid.width; x++) {
      var element = this.grid.get(new Vector(x, y));
      output += charFromElement(element);
    }
    output += "\n";
  }
  return output;
};

// every critter in the world takes a turn
World.prototype.turn = function() {
  var acted = [];
  this.grid.forEach(function(critter, vector) {
    if (critter.act && acted.indexOf(critter) == -1) {
      acted.push(critter);
      this.letAct(critter, vector);
    }
  }, this);
};

// checks if place facing action.direction from vector
// is inside the grid, if true returns the direction
World.prototype.checkDestination = function(action, vector) {
  if (directions.hasOwnProperty(action.direction)) {
    var dest = vector.plus(directions[action.direction]);
    if (this.grid.isInside(dest))
      return dest;
  }
};

// the world lets the critter at vector act
// view takes in the current position of the critter
World.prototype.letAct = function(critter, vector) {
  var action = critter.act(new View(this, vector));
  if (action && action.type == "move") {
    var dest = this.checkDestination(action, vector);
    if (dest && this.grid.get(dest) == null) {
      this.grid.set(vector, null);
      this.grid.set(dest, critter);
    }
  }
};


// the View in world at vector position
function View(world, vector) {
  this.world = world;
  this.vector = vector;
}

// looks in direction dir in dir and return char there
View.prototype.look = function(dir) {
  var target = this.vector.plus(directions[dir]);
  if (this.world.grid.isInside(target))
    return charFromElement(this.world.grid.get(target));
  else
    return "#";
};


// returns a list of all directions with ch in view
View.prototype.findAll = function(ch) {
  var found = [];
  for (var dir in directions)
    if (this.look(dir) == ch)
      found.push(dir);
  return found;
};


// returns a random direction in view with char or null
View.prototype.find = function(ch) {
  var found = this.findAll(ch);
  if (found.length == 0) return null;
  return randomElement(found);
};


// A more lifelike world with energy
// inherits from World
function LifelikeWorld(map, legend) {
  World.call(this, map, legend);
}
LifelikeWorld.prototype = Object.create(World.prototype);


// actionTypes holds actions
var actionTypes = Object.create(null);


// grow action - called by plants
actionTypes.grow = function(critter) {
  critter.energy += 0.5;
  return true;
};

// move action, this means world, subtracts energy cost
actionTypes.move = function(critter, vector, action) {
  var dest = this.checkDestination(action, vector);
  if (dest == null ||
      critter.energy <= 1 ||
      this.grid.get(dest) != null)
    return false;
  critter.energy -= 1;
  this.grid.set(vector, null);
  this.grid.set(dest, critter);
  return true;
};

// eats at action.direction from vector
actionTypes.eat = function(critter, vector, action) {
  var dest = this.checkDestination(action, vector);
  var atDest = dest != null && this.grid.get(dest);
  if (!atDest || atDest.energy == null)
    return false;
  critter.energy += atDest.energy;
  this.grid.set(dest, null);
  return true;
};

// makes a new critter at action.direction from vector
actionTypes.reproduce = function(critter, vector, action) {
  var baby = elementFromChar(this.legend,
                             critter.originChar);
  var dest = this.checkDestination(action, vector);
  if (dest == null ||
      critter.energy <= 2 * baby.energy ||
      this.grid.get(dest) != null)
    return false;
  critter.energy -= 2 * baby.energy;
  this.grid.set(dest, baby);
  return true;
};

// lets critter at vector act
LifelikeWorld.prototype.letAct = function(critter, vector) {
  var action = critter.act(new View(this, vector));
  var handled = action &&
    action.type in actionTypes &&
    actionTypes[action.type].call(this, critter,
                                  vector, action);
  if (!handled) {
    critter.energy -= 0.2;
    if (critter.energy <= 0)
      this.grid.set(vector, null);
  }
};

// Critter interface
// act - the critter takes in a view and returns
//       a object with type and other properties
function Wall() {}


// Bouncing critter
function BouncingCritter() {
  this.direction = randomElement(directionNames);
};

BouncingCritter.prototype.act = function(view) {
  if (view.look(this.direction) != " ")
    this.direction = view.find(" ") || "s";
  return {type: "move", direction: this.direction};
};

// A wall follower critter
function WallFollower() {
  this.dir = "s";
}

// follows a wall if nearby
WallFollower.prototype.act = function(view) {
  var start = this.dir;
  if (view.look(dirPlus(this.dir, -3)) != " ")
    start = this.dir = dirPlus(this.dir, -2);
  while (view.look(this.dir) != " ") {
    this.dir = dirPlus(this.dir, 1);
    if (this.dir == start) break;
  }
  return {type: "move", direction: this.dir};
};

// plant
function Plant() {
  this.energy = 3 + Math.random() * 4;
}

Plant.prototype.act = function(view) {
  if (this.energy > 15) {
    var space = view.find(" ");
    if (space)
      return {type: "reproduce", direction: space};
  }
  if (this.energy < 20)
    return {type: "grow"};
};

function PlantEater() {
  this.energy = 20;
}

PlantEater.prototype.act = function(view) {
  var space = view.find(" ");
  if (this.energy > 60 && space)
    return {type: "reproduce", direction: space};
  var plant = view.find("*");
  if (plant)
    return {type: "eat", direction: plant};
  if (space)
    return {type: "move", direction: space};
};

// A smart plant eater that isn't greedy
function SmartPlantEater () {
    // keep low energy, most energy should be derived
    // from long growing plants
    this.energy = 30;
}

SmartPlantEater.prototype.act = function(view) {
    // reproduce - costs 60 points
    // eat - gain the plant's energy
    // move - 1 point
    // reproduce when a lot of plants and enough energy
    // eat when hungry
    var hungry = this.energy < 5;
    if (hungry || Math.random() > 0.10) {
        var action = view.find("*") ? "eat": "move";
        var plant = this.findClosestPlant(view);
        if (view.look(plant) !== " " && view.look(plant) !== "*") {
            plant = view.find(" ") || "s";
        }
        return {type: action, direction: plant};
    } else {
        // not hungry
        var space = view.find(" ");
        if (this.energy < 85) {
            return {type: "move", direction: space};
        } else {
            return {type: "reproduce", direction: space};
        }
    }
}

// a breadth first search for finding direction to closest plant
SmartPlantEater.prototype.findClosestPlant = function(view) {
    var start = view.vector;
    var queue = [start];
    var dist = 1;
    while (queue.length != 0) {
        var cur = queue.shift();
        if (taxicab_distance(start, cur) === dist)
            dist++;
        // check if there is a plant at location
        if (charFromElement(view.world.grid.get(cur)) == "*") {
            var closest = "n";
            for (var dir in directions) {
                var target = start.plus(directions[dir]);
                if (view.world.grid.isInside(target) && (charFromElement(view.world.grid.get(target)) === " " || charFromElement(view.world.grid.get(target))))  {
                   if (taxicab_distance(cur, target) < taxicab_distance(cur, start.plus(directions[closest]))) {
                        closest = dir;
                    }
                }
            }
            return closest;
        } else {
            for (var dir in directions) {
                var target = cur.plus(directions[dir]);
                if (!deepContains(queue, target) &&
                    view.world.grid.isInside(target) &&
                    taxicab_distance(start, target) === dist &&
                    charFromElement(view.world.grid.get(target)) !== "#") {
                        queue.push(target);
                }
            }
        }
    }
    // no plant found
    return "s";
};
