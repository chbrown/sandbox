import collections


def make_list():
    return [9, 1, 6]


def make_iter():
    yield 9
    yield 1
    yield 6


print 'Doing...'
res = make_iter()

if isinstance(res, collections.Iterable):
    print 'Yay, res is iterable!'

if hasattr(res, '__contains__'):
    print 'Yay, res has __contains__!'

for x in iter(iter(res)):
    print x

print 'Done'
