(* from https://realworldocaml.org/v1/en/html/a-guided-tour.html#ocaml-as-a-calculator *)
(* compile with: corebuild 05-sum.native *)
(* run like: echo {1..50} | tr ' ' '\n' | ./05-sum.native *)
open Core.Std

let rec read_and_accumulate accum =
  let line = In_channel.input_line In_channel.stdin in
  match line with
  | None -> accum
  | Some x -> read_and_accumulate (accum +. Float.of_string x)

let () =
  printf "Total: %F\n" (read_and_accumulate 0.)
