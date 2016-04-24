"use strict";


function sum(array) {
      return array.reduce(function(a, b) {return a + b;});
}

function range(start, end, step) {
    if (step === undefined)
        step = (start < end) ? 1: -1;
            
    var result = [];
    for (var i = 0; i <= Math.floor((end - start) / step); i += 1) {
        result.push(start + i*step);
    }
                                  
    return result;
}


