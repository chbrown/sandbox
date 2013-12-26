package main

import (
  "os"
  "fmt"
  // "math"
)

// penalties
const (
  EQ = 1
  INS = 10
  SUB = 5
  DEL = 10
)

type XY struct {
  X int
  Y int
}

func Minimum(a, b int) int {
  if (a < b) {
    return a
  }
  return b
}

func MinEditDistance(source string, target string) int {
  memo := make([][]int, len(source) + 1)
  for s := range memo {
    memo[s] = make([]int, len(target) + 1)
    for t := range memo[s] {
      memo[s][t] = -1
    }
    // initialize the left border, where the origin is at the bottom left.
    memo[s][0] = s
  }
  // initialize the bottom border, where the origin is at the bottom left.
  for t, _ := range target {
    memo[0][t + 1] = t + 1
  }

  var dist func(s int, t int) int
  dist = func(s int, t int) int {
    min := memo[s][t]
    if min == -1 {
      // fmt.Printf("%s[%d] - %s[%d]\n", source, s, target, t)
      if source[s - 1] == target[t - 1] {
        min = dist(s - 1, t - 1) + EQ
      } else {
        // deletion is like removing one from the source
        del := dist(s - 1, t) + DEL
        // insertion is like adding one to the target
        ins := dist(s, t - 1) + INS
        sub := dist(s - 1, t - 1) + SUB
        min = Minimum(del, Minimum(ins, sub))
      }
      memo[s][t] = min
    }
    return min
  }
  return dist(len(source), len(target))
}


func main() {
  source := os.Args[1]
  target := os.Args[2]
  fmt.Println(source + " -> " + target)
  fmt.Printf("MinEditDistance: %d\n", MinEditDistance(source, target))
}
