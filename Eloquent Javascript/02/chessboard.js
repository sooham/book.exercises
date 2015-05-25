// Logic behind the program
// use a loop inside a loop

var board = "";
var size = 8;

for (var row = 0;row < size; row++) {
    for (var col = row % 2 === 0 ? 0: 1; col < size; col++) {
        if (col % 2 === 0) {
            board += " ";
        } else {
            board += "#";
        }
    }
    board += "\n";
}

console.log(board);