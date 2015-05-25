// Are the following definitions valid?

#include <string>

int main()
{
    const std::string exclam = "!";
    const std::string message = "Hello" + ", world" + exclam;
}

/* Explanation
 *
 * The second definition is not valid.
 * Reason: The operator+ is not needed for adding two string literals
 * The C++ compiler will automatically concatenate two adjacent strings
 * with only whitespace in the middle automatically.
 *
 * However if we were to hold a string literal in a variable of type
 * std::string, then the operator+ is defined as:
 * 
 * string operator+ (const string& lhs, const string& rhs);
 * in C++11
 *
 * There is a difference between string literal and string type from the
 * standard library. An important difference is that std::string provides 
 * many useful member functions for string manipulation.
 */