package main
// exercise 69

import (
  "fmt"
  "tour/tree"
  )

// Walk walks the tree t sending all values
// from the tree to the channel ch.
func Walk(t *tree.Tree, ch chan int) {
  if t.Left != nil {
    Walk(t.Left, ch)
  }
  ch<- t.Value
  if t.Right != nil {
    Walk(t.Right, ch)
  }
}

// Same determines whether the trees
// t1 and t2 contain the same values.
func Same(t1, t2 *tree.Tree) bool {
  c1 := make(chan int)
  c2 := make(chan int)
  go Walk(t1, c1)
  go Walk(t2, c2)

  for i := 0; i < 10; i++ {
    v1, v2 := <-c1, <-c2
    if v1 != v2 {
      return false
    }
  }

  return true
}

func printWalk() {
  ch := make(chan int)
  go Walk(tree.New(2), ch)
  for i := 0; i < 10; i++ {
    //select {
    node_val := <-ch
    fmt.Println(node_val)
  }
  fmt.Println("Done!")
}

func main() {
  are_same := Same(tree.New(1), tree.New(1))
  fmt.Println("Should be:", are_same)
  are_not_same := Same(tree.New(1), tree.New(3))
  fmt.Println("Should not be:", are_not_same)
}
