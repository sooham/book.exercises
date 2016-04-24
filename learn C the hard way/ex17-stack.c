#include <errno.h>
#include <stdio.h>
#include <stdlib.h>

#define REALLOC_FACTOR 2

struct Stack {
    int *contents;
    int capacity;
    int pos;
};

struct Stack *create_stack(int capacity) {
    struct Stack *s;

    if (!(s = malloc(sizeof(struct Stack)))) {
        return NULL;
    }

    if (!(s->contents = malloc(sizeof(capacity * sizeof(int))))) {
        return NULL;
    }

    s->capacity = capacity;
    s->pos = 0;
    return s;
}

int is_empty(struct Stack *stack) {
    return !stack->pos;
}

struct Stack *push(struct Stack *stack, int obj) {
    if (!stack || obj < 0) {
        return NULL;
    }

    if (stack->pos == stack->capacity) {
        int *new = realloc(stack->contents, stack->capacity * REALLOC_FACTOR);
        if (!new) return NULL;
        stack->contents = new;
        stack->capacity *= REALLOC_FACTOR;
    }

    stack->contents[stack->pos++] = obj;
    return stack;
}

int pop(struct Stack *stack) {
    if (!stack || is_empty(stack)) {
        return -1;
    }
    return stack->contents[--stack->pos];
}

void destroy_stack(struct Stack *stack) {
    free(stack->contents);
    free(stack);
}

int main() {/* testing tbd*/}
