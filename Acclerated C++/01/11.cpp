// Are the following definitions valid? Why or why not?
#include <string>
int main()
{
    const std::string hello = "Hello";
    const std::string message = hello + ", world" + "!";

/* Explanation
 * Both definitions are valid
 */