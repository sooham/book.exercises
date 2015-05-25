// Logic behind the program
// iterate through the numbers 1 to 100
// if the number is divisible by 15
// print "FizzBuzz"
// if the number is divisble by 5
// xor divisble by 3 print "Fizz" and "Buzz"
// respectively
// otherwise print the number
for (i = 1; i <= 100; i++) {
    var print_word = "";
    if (i % 3 === 0) {
        print_word += "Fizz";
    }
    if (i % 5 === 0) {
        print_word += "Buzz";
    }

    // intelligent use of || logical property
    console.log(print_word || i);
}