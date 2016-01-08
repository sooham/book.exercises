// pointers

#include <stdio.h>

int main(int argc, char *argv[]) {
    // create two arrays we care about
    int ages[] = {23, 43, 12, 89, 2};
    char *names[] = {
        "Alan", "Frank",
        "Mary", "John", "Lisa"
    };

    // get the size of the arrays
    int count = sizeof(ages) / sizeof(int);

    // pointer way of indexing
    int *cur_age = ages;    // pointer to integer
    char **cur_name = names;    // pointer to pointer to char

    for (int i = 0; i < count; i++) {
        // pointer offsetting
        // the value of pointer plus i
        printf("%s is %d years old.\n", *(cur_name+i), *(cur_age+i));
    }

    // pointers can be whackily added with ints and then pointer operation to get a valid pointer
    // furthermore, they are also indexable, as seen from the example below

    printf("----\n");

    // third way pointers are just arrays
    for (int i = 0; i < count; i++) {
        printf("%s is %d years old again.\n", cur_name[i], cur_age[i]);
    }

    // fourth ways with pointers in a stupid complex way
    for (cur_name = names, cur_age = ages; (cur_age - ages) < count; cur_name++, cur_age++) {
        // sets the pointer to the beginning of names and age
        // respectively
        //
        // test condition: compares the distance of the pointer
        // cur_age to the start of ages. This means arrays are
        // also pointers pointing to the first element
        //
        // access whatever element cur_age is pointing to
        // by the pointer operator *cur_age
        printf("%s lived %d years so far.\n", *cur_name, *cur_age);
    }

    return 0;
}

// array declaration explaination
//
// int array[] - array of integers
// char array[] - an array of char
// char *array[] - an array of char pointers, the start of a char array
//
// pointer explaination
//
// to C arrays (like ages) are locations in memory when all integer in integer array start, it is also an address
// and C compiler will replace ages with the address of very first int in ages. i.e ages is the 'address of the first int in ages"
//
// unlike an index, which is an address relative to the array,
// ages is an address in the entire computer
// hence why we can add ints to it (returning a new address)
//
// C thinks the runtime state is a massive array of bytes
// with according types.
//
// a pointer is simply an address pointing somewhere inside the
// computer's memory with a type specifier
// you can get the value a pointer points to by referencing that
// memory value


// Why do we have pointers?
//
// lets you manually index into blocks or memoty without array
//
// allows you to work with raw block of memory
//
// passing large blocks of memory with pointers


// pointer lexicon
// type *ptr - apointer of type named pointer
// *ptr - the value of the pointer
// *(ptr + i) - value of ptr plus i
// &thing - the memory address of thing
// type *ptr = &thing - a pointer of type name ptr set to address of thing
// ptr++ - increment where pointer points
