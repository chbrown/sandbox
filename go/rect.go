package main

import (
  "fmt"
  "math"
)

type Vertex struct {
  X, Y float64
}

func (v *Vertex) Scale(f float64) {
  v.X = v.X * f
  v.Y = v.Y * f
}

func (v *Vertex) Length() float64 {
  return math.Sqrt(v.X*v.X + v.Y*v.Y)
}

type Arear interface {
  Area() float64
}

type Rectangle struct {
  BottomLeft, TopRight Vertex
}

func (areable *Rectangle) Area() float64 {
  return areable.Width() * areable.Height()
}

func (rect *Rectangle) Width() float64 {
  return rect.TopRight.X - rect.BottomLeft.X
}

func (rect *Rectangle) Height() float64 {
  return rect.TopRight.Y - rect.BottomLeft.Y
}

func main() {
  screen := new(Rectangle)
  screen.BottomLeft = Vertex{0, 0}
  screen.TopRight = Vertex{3, 4}
  screen.TopRight.Scale(10)
  fmt.Println("screen", screen)
  fmt.Println("screen.Area", screen.Area())
}
