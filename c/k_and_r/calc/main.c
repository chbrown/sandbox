#include <stdio.h>
#include <math.h>
#include "calc.h"
#define MAXOP 100

int main() {
  int type;
  double temp;
  char s[MAXOP];
  while ((type = getop(s)) != EOF) {
    switch (type) {
    case NUMBER:
      push(atof(s));
      break;
    case '+':
      push(pop() + pop());
      break;
    case '*':
      push(pop() * pop());
      break;
    case '-':
      temp = pop();
      push(pop() - temp);
      break;
    case '/':
      temp = pop();
      if (temp != 0.0)
        push(pop() / temp);
      else
        printf("error: division by zero is undefined\n");
      break;
    case '%':
      temp = pop();
      push((int)pop() % (int)temp);
      break;
    case '\n':
      printf("\t%.8g\n", pop());
      break;
    default:
      printf("error: unknown command %s\n", s);
      break;
    }
  }
  return 0;
}
