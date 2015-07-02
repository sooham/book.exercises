
function MultiplicatorUnitfailure() {}

function primitiveMultiply(a, b) {
    "use strict";
    if (Math.random() < 0.5)
        return a * b;
    else
        throw new MultiplicatorUnitfailure();
}

function reliableMultiply(a, b) {
    "use strict";
    while (true) {
        try {
            return primitiveMultiply(a, b);
        } catch (error) {
            if (!(error instanceof MultiplicatorUnitfailure))
                throw error;
        }
    }
}
