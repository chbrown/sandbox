#include <stdio.h>

int main() {
  int c, last = -1;
  while ((c = getchar()) != EOF) {
    if (c == '\n' || c == '\t' || c == ' ') {
      c = ' ';
    }
    if (last != c) {
      putchar(c);
    }
    last = c;
  }
}
