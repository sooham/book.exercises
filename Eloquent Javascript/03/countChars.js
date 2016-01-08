'use strict';

function countChar (x, str) {
  var result = 0;
  for (var i = 0; i < str.length; i++) {
    if (str.charAt(i) == x) {
      result++;
    }
  }
  return result;
}

function countBs(str) {
  return countChar('b', str);
}

