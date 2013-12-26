package main

import "fmt"

func main() {
  for pos, char := range "\n日本語abcdef" {
    fmt.Printf("character %c starts at byte position %d\n", char, pos)
  }
}
