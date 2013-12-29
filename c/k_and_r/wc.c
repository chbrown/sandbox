#include <stdio.h>

#define OUT 0
#define IN 1

// "word" equals consecutive non-whitespace

int main() {
  long numl = 0, numw = 0, numc = 0;
  int c, state = OUT;
  while ((c = getchar()) != EOF) {
    ++numc;
    if (c == '\n') {
      ++numl;
    }
    else if (c == '\t' || c == ' ') {
      state = OUT;
    }
    else if (state == OUT) {
      state = IN;
      ++numw;
    }
  }

  printf("%8ld %8ld %8ld\n", numl, numw, numc);
}
