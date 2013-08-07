'''
Mostly from http://www.peterbe.com/plog/uniqifiers-benchmark

But with a few additional functions
'''


def f1(seq):
    # not order preserving
    set = {}
    map(set.__setitem__, seq, [])
    return set.keys()


def f2(seq):
    # order preserving
    checked = []
    for e in seq:
        if e not in checked:
            checked.append(e)
    return checked


def f3(seq):
    # Not order preserving
    keys = {}
    for e in seq:
        keys[e] = 1
    return keys.keys()


def f4(seq):
    # order preserving
    noDupes = []
    [noDupes.append(i) for i in seq if not noDupes.count(i)]
    return noDupes


def f5(seq, idfun=None):
    # order preserving
    if idfun is None:
        def idfun(x):
            return x
    seen = {}
    result = []
    for item in seq:
        marker = idfun(item)
        # in old Python versions:
        # if seen.has_key(marker)
        # but in new ones:
        if marker in seen:
            continue
        seen[marker] = 1
        result.append(item)
    return result


def f5a(xs):
    seen = {}
    checked = []
    for x in xs:
        if x in seen:
            continue
        seen[x] = 1
        checked.append(x)
    return checked


def f5b(xs):
    seen = set()
    checked = []
    for x in xs:
        if x in seen:
            continue
        seen.add(x)
        checked.append(x)
    return checked


def f6(seq):
    # Not order preserving
    return list(set(seq))


import random
from timeit import Timer


def ints(n, k):
    # creates an n-long list that contains only k unique items
    uniques = range(k)
    return [x for _ in range(n // k) for x in uniques]

# read_strings


datasets = [
    ('int[100]: 100 uniques', ints(100, 100)),
    ('int[100]: 10 uniques', ints(100, 10)),
    ('int[100]: 1 uniques', ints(100, 1)),

    # ('int[1000]: 1000 uniques', ints(1000, 1000)),
    # ('int[1000]: 100 uniques', ints(1000, 100)),
    # ('int[1000]: 10 uniques', ints(1000, 10)),
    # ('int[1000]: 1 uniques', ints(1000, 1)),

    # ('str[1000]: 1000 unique,', [y for x in range(1) for y in range(1000)]),
    # ('str[1000]: 100 uniques', [y for x in range(10) for y in range(100)]),
    # ('str[1000]: 10 uniques', [y for x in range(100) for y in range(10)]),
    # ('str[1000]: 1 uniques', [y for x in range(1000) for y in range(1)]),
]

for dataset_name, dataset in datasets:
    random.shuffle(dataset)

uniqs = [
    # ('f1', f1),
    # ('f2', f2),
    # ('f3', f3),
    # ('f4', f4),
    ('f5', f5),
    ('f5a', f5a),
    ('f5b', f5b),
    ('f6', f6),
]

for uniq_name, uniq in uniqs:
    for dataset_name, dataset in datasets:
        func = lambda: uniq(dataset)
        times = Timer(func).repeat(repeat=3, number=100000)
        time_strings = ' '.join('%1.5f' % time for time in sorted(times))
        print 'uniq={uniq_name} dataset={dataset_name} {time_strings}'.format(
            time_strings=time_strings, uniq_name=uniq_name, dataset_name=dataset_name)
