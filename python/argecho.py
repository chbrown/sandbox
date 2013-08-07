#!/usr/bin/env python
import sys

print 'len(argv) =', len(sys.argv)
for i, arg in enumerate(sys.argv):
    #arg = arg.decode('utf-8')
    print 'argv[%2d] =' % i, arg
