'use strict';

for (var i = 1; i <= 100; i++) {
  var printWord = '';
  if (i % 3 === 0) {
    printWord += 'Fizz';
  }
  if (i % 5 === 0) {
    printWord += 'Buzz';
  }

  // intelligent use of || logical property
  console.log(printWord || i);
}
