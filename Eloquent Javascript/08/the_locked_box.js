"use strict";

var box = {
    locked: true,
    unlock: function() { this.locked = false;},
    lock: function() { this.locked = true;},
    _content: [],
    get content() {
        if (this.locked) throw new Error("Locked!");
            return this._content;
    }
}

function withBoxUnlocked(body) {
    var start_state = box.locked;
    box.unlock();
    try {
        body();
    } finally {
        if (box.locked)
            box.lock();
    }
}
