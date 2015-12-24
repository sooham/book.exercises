#include <stdio.h>

int main(int argc, char *argv[]) {
    if (argc != 2) {
        printf("ERROR: You need one argument.\n");
        // abort the program
        return 1;
    }

    for (int i = 0; argv[1][i] != '\0'; i++) {
        char letter = argv[1][i];

        switch(letter) {
            case 'a':
            case 'A':
                printf("Contains vowel a\n");
                break;
            case 'e':
            case 'E':
                printf("Contains vowel e\n");
                break;
            case 'i':
            case 'I':
                printf("Contains vowel I\n");
                break;
            case 'o':
            case 'O':
                printf("Contains vowel o\n");
                break;
            case 'u':
            case 'U':
                printf("Contains vowel u\n");
                break;
            default:
                printf("Not a vowel\n");
        }
    }
    return 0;
}
