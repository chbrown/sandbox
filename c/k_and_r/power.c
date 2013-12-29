#include <stdio.h>

double power(int base, int n) {
  double accum = 1;
  for (int i = 0; i < n; i++) {
    accum = accum * base;
  }
  return accum;
}

double fpower(double base, int n) {
  if (n == 0)
    return 1;
  else
    return base * fpower(base, n - 1);
}

int main() {
   for (int i = 0; i < 500; ++i) {
     printf("%d %0.f %0.f\n", i, fpower(2, i), fpower(-3, i));
   }
   return 0;
}
