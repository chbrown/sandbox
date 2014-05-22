import sys
import mmh3

# run like:
# python rng.py 1 10000000000 | python count.py

seen = 0
max_trailing_zeros = 0

for line in sys.stdin:
    seen += 1
    hashed = mmh3.hash(line)
    # convert to 2's complement
    if hashed < 0:
        hashed += 1 << 32

    hashed_str = '{:032b}'.format(hashed)
    # print hashed_str
    leading_zeros = hashed_str.index('1')
    if leading_zeros > max_trailing_zeros:
        max_trailing_zeros = leading_zeros
        print 'seen {:d}, estimated cardinality: {:d}'.format(seen, 2**max_trailing_zeros)
