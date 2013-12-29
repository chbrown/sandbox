#include <stdio.h>
#define BUFFERSIZE 100

char buffer[BUFFERSIZE];
int buffer_pointer = 0;

int getch(void) {
  return buffer_pointer > 0 ? buffer[--buffer_pointer]  : getchar();
}

void ungetch(int c) {
  if (buffer_pointer >= BUFFERSIZE)
    printf("ungetch: too many characters\n");
  else
    buffer[buffer_pointer++] = c;
}
