#include <stdio.h>

#define WHITESPACE 10
#define OTHER 11

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

// Exercise 1-19

int getcharline(char to[]) {
  // returns to's length, so you don't have to recheck
  int i = 0, c = -1;
  while (1) {
    c = getchar();
    if (c != EOF) to[i++] = c;
    if (c == EOF || c == '\n') break;
  }
  to[i] = '\0';
  return i;
}

// int charlen(char string[]) {
//   int i;
//   for (i = 0; string[i] != '\0'; i++);
//   return i;
// }

void reverse(char from[], int length, char to[]) {
  int i;
  for (i = 0; i < length; i++) {
    to[i] = from[length-i-1];
  }
  to[i] = '\0';
  // return reversed;
}

int main() {
  for (int i = 0; i < 300; i++) {
    char line[1000];
    int len = getcharline(line);

    // int line_len = charlen(line);
    if (len < 1) break;

    char reversed[1000];
    // char* reversed =
    reverse(line, len, reversed);

    printf("%s", reversed);
  }

}

int atoi(char s[]) {
  int n = 0;
  for (int i = 0; i <
}

