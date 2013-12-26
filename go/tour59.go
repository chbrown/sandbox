package main

import (
  //"fmt"
  "image"
  "image/color"
  "tour/pic"
)

type Image struct {
  w int
  h int
  //var rows = [][]int
}

func (img *Image) ColorModel() color.Model {
  return color.RGBAModel
}

func (img *Image) Bounds() image.Rectangle {
  return image.Rect(0, 0, img.w, img.h)
}

func (img *Image) At(x, y int) color.Color {
  r := (float64(x) / float64(img.w)) * 255
  g := (float64(y) / float64(img.h)) * 255
  //fmt.Println("col", r, g)
  return color.RGBA{uint8(r), uint8(g), 255, 255}
}

func main() {
  m := Image{300, 200}
  //fmt.Println("hi")//m)
  pic.ShowImage(&m)
}