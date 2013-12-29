#include <stdio.h>

int incr(num) {
  printf("incr addr: %lu\n", &num); // warning due to int* not int (haha, because int* == int)
  return num++;
}

void pincr(int* num) {
  printf("pincr addr: %p\n", num);
  ++*num;
}

int main() {
  int a = 100;
  char* test = "This might very well be a very long sentence of inordinate length.";
  char* test2 = "Hello again world its me just wondering about the last time we spoke.";

  // incr(a);
  // printf("1: %d\n", a);

  // a++;
  // pincr(&a);
  // printf("2: %d\n", a);

  printf("a     addr: %p\n", &a); // warning due to int* not int (haha, because int* == int)
  printf("test  addr: %p\n", &test);
  printf("test2 addr: %p\n", &test2);

  for (int i = -100; i < 100; i++) {
    char* c = &a + i;
    printf("%p -> %c\n", c, *c);
  }

  return 0;
}

// 1357004888 -- date +%s
// 1363588984 -- one of the addrs, truncated to int
