import random
import sys

# infinite python random number generator (RNG)
# rng.py          => rng.py   0  100
# rng.py 1000     => rng.py   0 1000
# rng.py 100 1000 => rng.py 100 1000

# sys.argv[0] == 'rng.py'
args = sys.argv[1:]

bounds = map(int, args)

while True:
    print random.randint(*bounds)
