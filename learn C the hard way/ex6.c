#include <stdio.h>

int main(int argc, char *argv[]) {
    int distance = 100;
    float power = 2.345f;
    double super_power = 56789.4532;
    char first_name[] = "Sooham";
    char last_name[] = "Rafiz";

    printf("You are %d miles away/\n", distance);
    printf("You have %f levels of power.\n", power);
    printf("You have %f awesome super powers.\n", super_power);
    printf("I have first name %s.\n", first_name);
    printf("I have last  name %s.\n", last_name);
    printf("My complete name is %s %s", first_name, last_name);

    return 0;
}
