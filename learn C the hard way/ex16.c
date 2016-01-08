#include <stdio.h>
#include <assert.h>
#include <stdlib.h>
#include <string.h>


// creating a structure with 4 elements
// a structure is a collection of data types stored in one block
// of memory, where each block can be accessed by name
struct Person {
    char *name;
    int age;
    int height;
    int weight;
};

// returns a struct Person * type
struct Person *Person_create(char *name, int age, int height, int weight) {

    // allocate memory to the person
    struct Person *who = malloc(sizeof(struct Person));

    // a NULL pointer is an invalid pointer
    // a constant called NULL means unset or invalid pointer
    assert(who != NULL);

    // set the field of the struct
    // access the variables memory address through the following
    // pointer syntax
    // struct->field_name
    who->name = strdup(name);
    who->age = age;
    who->height = height;
    who->weight = weight;

    return who;
}

// a function that does the same without malloc
void CreatePersonWOPointers(struct Person p, char *name, int age, int height, int weight) {
    p.name = strdup(name);
    p.age = age;
    p.height = height;
    p.weight = weight;
}

void Person_destroy(struct Person *who) {
    assert(who != NULL);

    // if you don't do this you get a memory leak
    free(who->name);
    free(who);
}

void Person_print(struct Person *who) {
    printf("Name :%s\n", who->name);
    printf("\tAge :%d\n", who->age);
    printf("\tHeight :%d\n", who->height);
    printf("\tWeight :%d\n", who->weight);
}

void PersonPrintWOPointers(struct Person who) {
    printf("Name :%s\n", who.name);
    printf("\tAge :%d\n", who.age);
    printf("\tHeight :%d\n", who.height);
    printf("\tWeight :%d\n", who.weight);
}

int main(int argc, char *argv[]) {
    // make two people
    struct Person *joe = Person_create("Joe Alex", 32, 64, 140);
    struct Person *sooham = Person_create("Sooham Rafiz", 20, 179, 61);

    printf("Joe is at memory location %p:\n", joe);
    Person_print(joe);

    printf("Sooham is at memory location %p:\n", sooham);
    Person_print(sooham);

    // make everyone age some years and print them again
    joe->age += 20;
    joe->height -= 2;
    joe->weight += 40;
    Person_print(joe);

    sooham->age += 1;
    sooham->height += 1;
    sooham->weight += 4;
    Person_print(sooham);

    // destroy both of them to clean up
    Person_destroy(joe);
    Person_destroy(sooham);


    // without pointers
    // make two people

    struct Person loan;
    struct Person alina;

    loan.name = "";
    alina.name = "";
    loan.age = 0;
    alina.age = 0;
    loan.height = 0;
    alina.height = 0;
    loan.weight = 0;
    alina.weight = 0;

    // this passing by value will not change alina or loan structs
    // as we cannot access the struct created outside,
    // since the struct inside the method is created locally on the stack
    // it will be automatically destroyed once the function ends
    CreatePersonWOPointers(loan, "Loan Tran", 19, 160, 50);
    CreatePersonWOPointers(alina, "Alina Khan", 19, 170, 58);

    // print their information
    PersonPrintWOPointers(loan);
    PersonPrintWOPointers(alina);

    // edit some info
    alina.age += 2;
    alina.height += 1;

    // print
    PersonPrintWOPointers(loan);
    PersonPrintWOPointers(alina);

    // I believe that you do not need to free up any memory for this

    return 0;
}
