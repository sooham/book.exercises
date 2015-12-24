#include <stdio.h>

int main(int argc, char *argv[]) {
    int numbers[4] = {0}; // assigning the memory size of the array before hand
    char name[4] = {'a'};

    // first print the contents of numbers raw
    printf("numbers: %d %d %d %d\n", numbers[0], numbers[1], numbers[2], numbers[3]);
    printf("name: %c %c %c %c\n", name[0], name[1], name[2], name[3]);

    printf("name: %s\n", name);

    // setup
    numbers[0] = 1;
    numbers[1] = 2;
    numbers[2] = 3;
    numbers[3] = 4;

    name[0] = 'N';
    name[1] = 'e';
    name[2] = 'l';
    name[3] = '\0';

    // print instantiated
    printf("numbers: %d %d %d %d\n", numbers[0], numbers[1], numbers[2], numbers[3]);
    printf("name: %c %c %c %c\n", name[0], name[1], name[2], name[3]);

    printf("name: %s\n", name);

    // another way to use name
    char *another = "Zed";
    // looks like some pointer stuff above

    // to make string literals use
    // char *another = "Literal" syntax

    printf("another: %s\n", another);

    printf("another elements: %c %c %c %c\n", another[0], another[1], another[2], another[3]);

    return 0;
}
