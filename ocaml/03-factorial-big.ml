#load "nums.cma";;
open Num;;

let rec fact n =
    if n =/ Int 0 then Int 1 else n */ fact(n -/ Int 1);;

(* fact Num.(120);; *)

print_endline (string_of_num (fact (Int 500)));;
