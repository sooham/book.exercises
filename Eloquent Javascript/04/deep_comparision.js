"use strict";

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
