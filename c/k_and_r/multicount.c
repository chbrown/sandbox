#include <stdio.h>

#define WHITESPACE 10
#define OTHER 11

// "word" equals consecutive non-whitespace

int main() {
  int c;

  long counts[12];
  for (int i = 0; i < 12; ++i)
    counts[i] = 0;

  while ((c = getchar()) != EOF) {
    if (c >= '0' && c <= '9') {
      ++counts[c-'0'];
    }
    else if (c == '\t' || c == ' ' || c == '\n') {
      ++counts[WHITESPACE];
    }
    else {
      ++counts[OTHER];
    }
  }

  for (int i = 0; i < 12; ++i) {
    char* name = sprintf("Digit %d: ", i);
    if (i == WHITESPACE)
      printf("Whitespace: ");
    else if (i == OTHER)
      printf("Other: ");
    else
      printf(name);

    printf("  %ld\n", counts[i]);
  }
}
