"use strict";

var arrays = [[1, 2, 3], [4, 5], [6]];

arrays.reduce(function(a, b) {
                  return a.concat(b);
              });
