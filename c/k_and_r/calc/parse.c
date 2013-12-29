#include <ctype.h>
#include "calc.h"

// int isdigit(char c) {
//   return c >= '0' && c <= '9';
// }

// int isspace(char c) {
//   return c == ' ' || c == '\t'; // || c == '\n';
// }

double someatof(char string[]) {
  double val, power;
  int i, sign;

  for (i = 0; isspace(string[i]); i++);

  sign = (string[i] == '-') ? -1 : 1;
  if (string[i] == '+' || string[i] == '-')
    i++;

  for (val = 0.0; isdigit(string[i]); i++)
    val = (10.0 * val) + (string[i] - NUMBER);
  if (string[i] == '.')
    i++;
  for (power = 1.0; isdigit(string[i]); i++) {
    val = (10.0 * val) + (string[i] - NUMBER);
    power *= 10.0;
  }

  return (sign * val) / power;
}

