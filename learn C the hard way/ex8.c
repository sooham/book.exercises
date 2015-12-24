#include <stdio.h>

int main(int argc, char *argv[]) {
    int areas[] = {10, 12, 12, 14, 20};
    char name[] = "Neel";
    char full_name[] = {
        'S', 'o', 'o', 'h', 'a', 'm', '\0'
    };

    printf("The size of an int: %ld\n", sizeof(int));
    printf("The size of areas (int[]): %ld\n", sizeof(areas));
    printf("The number of int in areas %ld\n", sizeof(areas) / sizeof(int));
    printf("The first area is %d, the 2nd is %d.\n", areas[0], areas[1]);

    printf("The size of char %ld\n", sizeof(char));
    printf("The size of name (char[]): %ld\n", sizeof(name));

    return 0;

}
