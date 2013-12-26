package main

import "fmt"

// http://stackoverflow.com/questions/13596186/whats-the-point-of-one-way-channels-in-go
func F() <-chan int {
    // Create a regular, two-way channel.
    c := make(chan int)

    go func() {
        defer close(c)

        // Do stuff
        c <- 123
    }()

    // Returning it, implicitely converts it to read-only,
    // as per the function return value.
    return c
}

func main() {
  m := map[string]string{ "key1": "val1", "key2": "val2" }
  fmt.Println("m =", m)

  for k, v := range m {
    fmt.Println(k, "::", v)
  }

  // for k := range m {
  //   fmt.Println(k)
  // }

  // for _, v := range m {
  //   fmt.Println(v)
  // }

  for i, k := range(range(m)) {
    fmt.Println(k)
  }
}
