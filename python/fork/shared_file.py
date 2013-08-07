#!/usr/bin/env python
import os

path = os.path.expanduser('~/.bash_history')
global_file = open(path)


def my_fork():
    child_pid = os.fork()
    if child_pid == 0:
        print 'Child Process: PID# %s' % os.getpid()
        for line in global_file:
            print '[child]', line.strip()
    else:
        print 'Parent Process: PID# %s' % os.getpid()
        for line in global_file:
            print '[parent]', line.strip()

if __name__ == '__main__':
    print '__main__: ', os.getpid()
    my_fork()
