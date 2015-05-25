// Compile and execute the programs in chapter 1

// 1.1 (pg. 22)

// ask for a person's name, and greet the person
#include <iostream>
#include <string>

int main()
{
    // ask for the person's name
    std::cout << "Please enter your first name: ";
    // read the name
    std::string name;   // initialized as empty string. This is a definition
    std::cin >> name;   // write the contents of the ostream obj. into name

    // write a greeting
    std::cout << "Hello, " << name << "!" << std::endl;
    return 0;
}

/* Explanation
 * When the following program is executed
 * The reader is prompted for his / her first name via the overload of
 * the >> operator. Finally a greeting is presented to the console.
 *
 * The >> discards all whitespace from input until it reads a valid character.
 * Extraction terminates when the return button is pressed or we encounter invalid
 * input.
 *
 * In general, all output in C++ is saved to a buffer. As writing regularly to
 * an output device is expensive, C++ IO library will optimize by flushing (writing out)
 * when absolutely necessary (i.e buffer is full, called called std::endl or
 * std::cout or block is terminated).
 */

// 1.2 (pg 26)

// ask for a person's name, and generate a framed greeting

int main()
{
    std::cout << "Please enter your first name: ";
    std::string name;
    std::cin >> name;

    // build the message that we intend to write
    const std::string greeting = "Hello, " + name + "!";

    // build the second and the fourth lines of the output
    const std::string spaces(greeting.size(), ' ');
    const std::string second = "* " + spaces + " *";

    // build the first and fifth lines of the output
    const std::string first(second.size(), '*');

    // write it all
    std::cout << std::endl;
    std::cout << first << std::endl;
    std::cout << second << std::endl;
    std::cout << "* " << greeting << " *" << std::endl;
    std::cout << second << std::endl;
    std::cout << first << std::endl;

    return 0;
}

/* Explanation 
 * The code above contains the usual IO operations. I shall explain the
 * meaning of the const prefix and different initialization of variables
 * in C++.
 *
 * When a variable is declared as const in C++, it means that the C++
 * expects the value of the variable to be constant throughout compile-time
 * and runtime. A corollary of this is that all const variables must be
 * initialized on first appearance (unless the user wants the init value).
 *
 * In C++, there are three ways to initialize a variable 
 * 
 * type name = value;
 * type name (initial value);
 * type name {initial value};
 */