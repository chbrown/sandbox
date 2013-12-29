#include <stdio.h>

// int main(int argcount, char *argvector[]) {
int main() {
  int age = 17;
  int width;
  // puts("Hello y'all");

  printf("I'm %d years old.\n");
  printf("And %d inches wide.\n", width);
  printf("Which is %f inches/year.\n",
    (double)width/age);

  return 0;
}
