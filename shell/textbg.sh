#!/usr/bin/env bash
# You'll need ImageMagick to run this.
# And the slkscr font in the default location on a Mac.
convert \
  -background black \
  -fill white \
  -font /Users/chbrown/Library/Fonts/slkscr.ttf \
  -pointsize 8 label:"$1" "$2"

