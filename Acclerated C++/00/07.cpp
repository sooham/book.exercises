// Is this a valid program?

#include <iostream>

int main()
{
    /* This is a comment that extends over several lines
        because it uses /* and */ as its starting and ending delimiters */
    std::cout << "Does this work?" << std::endl;
    return 0;
}

/* This program is not valid. C++ does not allow nested multiline comments.
 * There is no need for them as a nested /* comments are idempotent.
 */
