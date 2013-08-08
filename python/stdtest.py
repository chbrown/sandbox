import sys


def stderr(s):
    sys.stderr.write(s)
    sys.stderr.flush()


def stderrn(s=''):
    stderr('%s\n' % s)


def stdout(s):
    sys.stdout.write(s)
    sys.stdout.flush()


def stdoutn(s=''):
    stdout('%s\n' % s)

o = 1
k = 1000
m = 1000000
b = 1000000000


def upto(num):
    return xrange(int(num))

stderr('askdjhasdkjahslkdajhsdklhajl s')
for index in upto(1e5):
    # if index % 1 == 0:
    stderr('\r' + str(index))
