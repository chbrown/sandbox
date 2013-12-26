package main

import (
  "fmt"
  "time"
)

func fibonacci(quit chan int) {
  x, y := 0.0, 1.0
  for {
    select {
    case <-quit:
      fmt.Println("quit. sleeping 2s", x)
      time.Sleep(2e9)
      return
      // return x
    default:
      x, y = y, x + y
      fmt.Println("cont <- x", x)
      // return x
      // cont<- x
    }
  }
}

func main() {
  // cont := make(chan int)
  quit := make(chan int)

  go func() {
    fmt.Println("Press enter to stop anytime")
    var s string
    fmt.Scan(&s)

    // var fib int
    // for fib == 0 {
    //   select {
    //   case some_fib := <-cont:
    //     fmt.Println("some_fib", some_fib)
    //     fib = some_fib
    //   default:
    //     continue
    //   }
    // }

    // last_fib := <-cont
    // n2_fib := <-cont
    fmt.Println("s", s)
    quit <- 0
    // for i := 0; i < 10; i++ { }
  }()

  fibonacci(quit)
}
