"use strict";

var box = {
  locked: true,
  unlock: function() { this.locked = false; },
  lock: function() { this.locked = true;  },
  _content: [],
  get content() {
    if (this.locked) throw new Error("Locked!");
    return this._content;
  }
};

// access to the _contents property is forbidden

function withBoxUnlocked(body) {
    // unlock the box
    var lockedInitially = box.locked;
    if (lockedInitially)
        box.unlock();

    try {
        body();
    } catch (e) {
    } finally {
        if (lockedInitially)
            box.lock();
    }
}
