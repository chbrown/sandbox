# command line `paste`

Run this in the current directory:

    paste <(<digits.txt.bz2 bunzip2) letters.txt


## Results

The files were created like this:

    echo {1..26} | tr ' ' '\n' | bzip2 > digits.txt.bz2
    echo {a..z}  | tr ' ' '\n'         > letters.txt

And the output of the `paste` command above should look something like this:

    1   a
    2   b
    3   c
    4   d
    5   e
    6   f
    7   g
    8   h
    9   i
    10  j
    11  k
    12  l
    13  m
    14  n
    15  o
    16  p
    17  q
    18  r
    19  s
    20  t
    21  u
    22  v
    23  w
    24  x
    25  y
    26  z
