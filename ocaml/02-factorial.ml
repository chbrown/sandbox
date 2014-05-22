let rec fact n = if n=0 then 1 else n * fact(n - 1);;

#let rec fact = function
#  | 0 -> 1
#  | n -> n * fact(n - 1);;

print_endline "fact(6)";;
print_endline fact 6;;
