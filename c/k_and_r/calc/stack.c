#include <stdio.h>
#include "calc.h"
#define MAXVAL 100

int stack_pointer = 0;
double values[MAXVAL];

void push(double f) {
  if (stack_pointer < MAXVAL)
    values[stack_pointer++] = f;
  else
    printf("error: stack full, can't push %g\n", f);
}

double pop(void) {
  if (stack_pointer > 0) {
    return values[--stack_pointer];
  }
  else {
    printf("error: stack empty\n");
    return 0.0;
  }
}
