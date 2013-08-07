import random
from timeit import Timer

methods = {
    # bookkeeping
    'seed_0': lambda: random.seed(),
    'seed_1': lambda: random.seed(808),
    'getstate': lambda: random.getstate(),
    # 'setstate': lambda: random.setstate(),
    'jumpahead_1': lambda: random.jumpahead(1),
    # 'jumpahead_1000': lambda: random.jumpahead(1000),
    'getrandbits_1': lambda: random.getrandbits(1),
    'getrandbits_1000': lambda: random.getrandbits(1000),
    # integers
    'randrange_1': lambda: random.randrange(1000),
    'randrange_2': lambda: random.randrange(10, 1000),
    'randrange_3': lambda: random.randrange(10, 10000, 7),
    'randint': lambda: random.randint(1, 100000),
    # real-valued distributions
    'random': lambda: random.random(),
    'uniform': lambda: random.uniform(500, 1000),
    'triangular': lambda: random.triangular(0, 100, 100000),
    'betavariate': lambda: random.betavariate(1, 2),
    'expovariate': lambda: random.expovariate(100),
    'gammavariate': lambda: random.gammavariate(5, 10),
    'gauss': lambda: random.gauss(0, 1),
    'lognormvariate': lambda: random.lognormvariate(5, 10),
    'normalvariate': lambda: random.normalvariate(0, 1),
    'vonmisesvariate': lambda: random.vonmisesvariate(0, 1),
    'paretovariate': lambda: random.paretovariate(10),
    'weibullvariate': lambda: random.normalvariate(5, 100),
}

for name, func in methods.items():
    times = Timer(func).repeat(repeat=3, number=100000)
    # min_time = min(times)
    time_strings = ' '.join('%1.5f' % time for time in sorted(times))
    print '%s (%s)' % (time_strings, name)
