// Plan array of strings with legends
// World - toString - see the state
//       - turn - take turns

function Vector (x, y) {
    this.x = x;
    this.y = y;
}

Vector.prototype.plus = function(other) {
    return new Vector(this.x + other.x, this.y + other.y);
};

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

// Critter - act (takes in view)- returns critter's action this turn
// action - has a type property and extra info
// view

// map from direction name to coordinate offsets
var directions = {
    "n": new Vector(0, -1),
    "ne": new Vector(1, -1),
    "e": new Vector(1, 0),
    "se": new Vector(1, 1),
    "s": new Vector(0, 1),
    "sw": new Vector(-1, 1),
    "w": new Vector(-1, 0),
    "nw": new Vector(-1, -1)
};

// view - look - takes direction and returns legend
// view - find - takes in legend as argument, returns direction in which character can be found
// view - findAll - returns Array containing all directions with vector

function randomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

var directionNames = "n ne e se s sw w nw".split(" ");

function BouncingCritter() {
    this.direction = randomElement(directionNames);
}

BouncingCritter.prototype.act = function(view) {
    if(view.look(this.direction) != " ")
        this.direction = view.find(" ") || "s";
    return {type: "move", direction: this.direction};
};


// making the world object constructor
// legend - object that tells us what each object means in grid

function elementFromChar(legend, ch) {
    if (ch == " ")
        return null;
    var element = new legend[ch]();
    element.originChar = ch;
    return element;
}

function World(map, legend) {
    var grid = new Grid(map[0].length, map.length);
    this.grid = grid;
    this.legend = legend;

    map.forEach(function(line, y) {
        for (var x = 0; x < line.length; x++)
            grid.set(new Vector(x, y), elementFromChar(legend, line[x]));
    });
}

function charFromElement(element) {
    if (element === null)
        return " ";
    else
        return element.originChar;
}

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

// defining objects to be used in legends
function Wall() {}

// define a forEach for grid
Grid.prototype.forEach = function(f, context) {
    for (var y = 0; y < this.height; y++) {
        for (var x = 0; x < this.width; x++) {
            var value = this.space[x + y * this.width];
            if (value !== null)
                f.call(context, value, new Vector(x, y));
        }
    }
};

// Animating life
// Writing a turn method for the world object
World.prototype.turn  = function() {
    var acted = [];
    this.grid.forEach(function(critter, vector) {
        if (critter.act && acted.indexOf(critter) == -1) {
            acted.push(critter);
            this.letAct(critter, vector);
        }
    }, this);
};

World.prototype.letAct = function(critter, vector) {
    var action = critter.act(new View(this, vector));
    if (action && action.type == "move") {
        var dest = this.checkDestination(action, vector);
        if (dest && this.grid.get(dest) === null) {
            this.grid.set(vector, null);
            this.grid.set(dest, critter);
        }
    }
};

World.prototype.checkDestination = function(action, vector) {
    if (direction.hasOwnProperty(action.direction)) {
        var dest = vector.plus(directions[action.direction]);
        if (this.grid.idInside(dest))
            return dest;
    }
};

function View(world, vector) {
    this.world = world;
    this.vector = vector;
}

View.prototype.look = function(dir) {
    var targer = this.vector.plus(directions[dir]);
    if (this.world.grid.isInside(target))
        return charFromElement(this.world.grid.get(target));
    else
        return "#";
};

View.prototype.findAll = function(ch) {
    var found = [];
    for (var dir in firections)
        if (this.look(dir) == ch)
            found.push(dir);
    return found;
};

View.prototype.find = function(ch) {
    var found = this.findAll(ch);
    if (found.length === 0) return null;
    return randomElement(found);
};
