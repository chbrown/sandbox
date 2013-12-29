#include <stdio.h>

// Exercise 1-19

#define MAXLINE 1000

// char* getcharline() {
//   int i = 0, c = -1;
//   char line[10000];
//   while (1) {
//     c = getchar();
//     if (c != EOF) line[i++] = c;
//     if (c == EOF || c == '\n') break;
//   }
//   line[i] = '\0';
//   return line;
// }


int getchars(char destination[], int limit) {
  // returns to's length, so you don't have to recheck
  int i = 0, c = -1;
  while (--limit > 0 && (c=getchar()) != EOF && c != '\n') {
    // putchar(c);
    destination[i++] = c;
  }
  if (c == '\n') {
    destination[i++] = '\n';
  }
  destination[i] = '\0';
  return i; // return total length
}

int strindex(char haystack[], char needle[]) {
  int h, h_i, n;
  for (h = 0; haystack[h] != '\0'; h++) {
    for (h_i = h, n = 0; needle[n] != '\0' && haystack[h_i] == needle[n]; h_i++, n++);
    if (n > 0 && needle[n] == '\0')
      return h;
  }
  return -1;
}

int countchars(char string[], int limit) {
  int i;
  for (i = 0; i < limit && string[i] != '\0'; i++);
  return i;
}

int strcopy(char from[], int from_end, char to[], int to_start) {
  int to_end = from_end + to_start;
  to[to_end] = '\0';
  while (--from_end > -1) {
    to[from_end + to_start] = from[from_end];
  }
  return to_end;
}


int main(int argc, char **argv) {
  char line[MAXLINE];
  int matches = 0;

  char pattern[MAXLINE];
  int pattern_i = 0;
  for (int a = 1; a < argc; a++) {
    int arg_len = countchars(argv[a], MAXLINE);
    // printf("# Arg %d, %s (%d long), pattern at %d\n", a, argv[a], arg_len, pattern_i);
    pattern_i = strcopy(argv[a], arg_len, pattern, pattern_i);
    // pattern_i += arg_len;
    // for all but the last arg, add a space
    if (a + 1 < argc)
      pattern[pattern_i++] = ' ';
  }
  if (pattern_i == 0) {
    pattern[pattern_i++] = ';';
  }
  pattern[pattern_i] = '\0';
  // printf("# Searching for: \"%s\"\n", pattern);

  while (getchars(line, MAXLINE) > 0) {
    if (strindex(line, pattern) > -1) {
      printf(line);
      matches++;
    }
  }
  return matches;
}
