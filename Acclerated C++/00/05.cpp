// Is this a valid program?

#include <iostream>
int main() std::cout << "Hello, world!" << std::endl;

// This is not a valid program as the main function lacks
// braces. The compiler will be expecting { } to find the
// std::cout token, resulting in a compilation error.