#include <stdio.h>

int main() {
  int c;
  long total = 0, whitespace = 0;

  while ((c = getchar()) != EOF) {
    if (c == '\n' || c == '\t' || c == ' ') {
      whitespace++;
    }
    total++;
  }

  printf("%ld whitespaces, %ld characters.\n", whitespace, total);
}
