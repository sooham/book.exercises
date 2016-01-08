function range(start, end, step) {
  step = step || 1;
  var result = [];
  if (start <= end) {
    for (; start <= end; start += step) {
      result.push(start);
    }
  } else if (start >= end) {
    for (; start >= end; start += step) {
      result.push(start);
    }
  }
  return result;
}

function sum(ary) {
  var total = 0;
  for (var i = 0; i < ary.length; i++) {
    total += ary[i];
  }
  return total;
}

/* Solution:
 * The sum function simply adds the elements of the array together.
 *
 */
