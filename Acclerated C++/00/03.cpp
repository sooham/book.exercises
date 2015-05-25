// Test how my compiler clang-602.0.53 treats \t escapes
#include <iostream>

int main() {
    std::cout << "a\tb" << std::endl;
    std::cout << "a       b" << std::endl;
    return 0;
}

// RESULTS: The \t is equivalent to 7 space characters
