#include <stdlib.h>
#include <stdio.h>

void swap(int v[], int i, int j) {
  int temp = v[i];
  v[i] = v[j];
  v[j] = temp;
}

void myqsort(int v[], int left, int right) {

  // exit if the current list has less than two elements
  if (left >= right)
    return;

  // basically, get the pivot value out of the way; move it to the front.
  int pivot_at = (left + right)/2;
  swap(v, left, pivot_at);

  int pivot = v[left];

  int previous_index = left;

  // start right after we stored the pivot
  for (int i = left + 1; i <= right; i++) {
    int cursor = v[i];
    if (cursor < pivot) {
      swap(v, ++previous_index, i);
    }
  }

  // previous_index ends up such that
  // all the numbers less before previous_index are less than the pivot
  // if we so happened to pick a pivot that was very small,
  swap(v, left, previous_index);

  myqsort(v, left, previous_index - 1);
  myqsort(v, previous_index + 1, right);
}

int main(int argc, char **argv) {
  int vector[argc - 1];
  // int vector_i = 0;
  for (int a = 1; a < argc; a++) {
    vector[a - 1] = atoi(argv[a]);
    // int arg_len = countchars(argv[a], MAXLINE);
    // printf("# Arg %d, %s (%d long), pattern at %d\n", a, argv[a], arg_len, pattern_i);
    // pattern_i = strcopy(argv[a], arg_len, pattern, pattern_i);
    // pattern_i += arg_len;
    // for all but the last arg, add a space
  }

  myqsort(vector, 0, argc - 1);

  for (int a = 1; a < argc; a++) {
    printf("%d ", vector[a - 1]);
  }
  printf("\n");
}
