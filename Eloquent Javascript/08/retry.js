"use strict";

function MultiplicatorUnitFailure() {};

function primitiveMultiply(a, b) {
    if (Math.random() < 0.5)
        return a * b;
    else
        throw new MultiplactorUnitFailure();
}

function reliableMultiply(a, b) {
    var result = null;
    while (!result) {
        try {
            result = primitiveMultiply(a, b);
        } catch (e) {
            if (e instanceof MultiplicatorUnitFailure) {
            // do nothing
            } else {
                throw e;
            }
        }
    }

    return result;
}

console.log(reliableMultiply(8, 8));
