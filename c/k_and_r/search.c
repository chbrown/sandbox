#include <stdio.h>

int binsearch(int x, int v[], int n) {
  int low = 0, mid, high = n - 1;
  while (low <= high) {
    mid = (low + high) / 2;
    if (x < v[mid])
      high = mid - 1;
    else if (x > v[mid])
      low = mid + 1;
    else
      return mid;
  }
  return -1;
}

// Exercise 3-1, untested
int binsearch2(int x, int v[], int n) {
  int low = 0, mid, high = n - 1;
  while (low <= high) {
    mid = (low + high) / 2;
    if (x < v[mid])
      high = mid - 1;
    else //if (x > v[mid])
      low = mid + 1;
    // else
      // return mid;
  }
  if (x == v[mid])
    return mid;
  return -1;
}
