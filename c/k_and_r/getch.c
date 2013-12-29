#include <stdio.h>

void getter() {
  printf("Gimme letta: ");
  int c = getchar();
  printf("\n[%d] KTHBYE", c);
}

int printer() {
  printf("Got yer lettas:\n");

  for (int i = 0; i < 128; i++) {
    printf("%d = ", i);
    putchar(i);
    printf("\n");
  }
  return 0;
}

void commaer() {
  int c = getchar();
  while (c != EOF) {
    putchar(c);
    if (c != '\n') {
      putchar(',');
    }
    // printf("--%d\n", c);
    c = getchar();
  }
}

int main() {
  printf("EOF: ");
  putchar(EOF);
  printf(" = %d\n", EOF);

  int c = getchar();
  int res = c != EOF;
  while (1) {
    if (res == 0) {
      printf("Got EOF\n");
      putchar(c);
      printf("\n\nExiting\n\n");
      break;
    }
    else {
      putchar(c);
    }

    c = getchar();
    res = c != EOF;
  }
}
