#include <stdio.h>
#include <ctype.h>

// forward declare out functions (normally to be put in a header file)
// used so that C compiler does not throw an error
int can_print_it(char ch);
void print_letters(char arg[]);

/*
 * Prints the arguments passed through the command line if they are printable.
 */
void print_arguments(int argc, char *argv[]) {
    for (int i = 1; i < argc; i++) {
        print_letters(argv[i]);
    }
}

/*
 * Takes in a sting (array of char) and checks if they are printable
 * and then prints every char and its associate ASCII number alongside
 */
void print_letters(char arg[]) {
    for (int i = 0; arg[i] != '\0'; i++) {
        if (can_print_it(arg[i])) {
            printf("%c == %d ", arg[i], arg[i]);
        }
    }
    printf("\n");
}

/*
 * Returns a boolean int (1 or 0) indicating if the character is printable.
 * printable iff given char is alphabet or blank
 */
int can_print_it(char ch) {
    return isalpha(ch) || isblank(ch);
}

/*
 * prints the arguments passed by the command line
 */
int main(int argc, char *argv[]) {
    print_arguments(argc, argv);
    return 0;
}
