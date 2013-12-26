package main

import (
  "fmt"
  "io"
  "os"
  "strings"
)

type rot13Reader struct {
  r io.Reader
}

func isAlpha(c byte) bool {
  return ('a' <= c && c <= 'z') || ('A' <= c && c <= 'Z')
}

func rot13(c byte) byte {
  if 'a' <= c && c <= 'z' {
    if c + 13 > 'z' {
      return c - 13
    }
    return c + 13
  } else if 'A' <= c && c <= 'Z' {
    if c + 13 > 'Z' {
      return c - 13
    }
    return c + 13
  }
  return c

}

func (reader *rot13Reader) Read(rotated []byte) (n int, err error) {
  //fmt.Println("rotated len cap", len(rotated), cap(rotated))
  buffer := make([]byte, len(rotated))
  n, err = reader.r.Read(buffer)
  //fmt.Println("Buffered", buffer)
  for i, v := range(buffer) {
    rotated[i] = rot13(v)
    //if isAlpha(v) {
    //  rotated[i] = v + 13
    //}
  }
  //if err != nil {
  //  fmt.Println("Error!", err)
  //}
  return
}

func main() {
  s := strings.NewReader("Lbh penpxrq gur pbqr!")
  r := rot13Reader{s}
  io.Copy(os.Stdout, &r)
  fmt.Println("\nDone!")
}