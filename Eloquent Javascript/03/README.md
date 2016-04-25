# Breif overview of Functions

- In javascript, functions can be treated as variables themseleves,
  they can be passed to other functions as callbacks, be a return value
  of another function etc.
- **function name(args) {}** or **function(args) {}**
- Only functions in javascript create a new scope
- In javascript, you can pass a function arbitrary number of arguments
  regardless of the functions prototype. All missing parameters are given
  the value undefined.
- The only way to detect the correct number of variables being passed is
  to look at the functions arguments list.
- Closures are allowed in javascript.
- Recursion is slow in javascript (don't take this at face value though; test it first).

