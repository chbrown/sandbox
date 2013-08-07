#!/usr/bin/env python
import os

print '{os_getpid} = os.getpid(), before os.fork()'.format(os_getpid=os.getpid())
print

os_fork = os.fork()
# parent thread gets the pid of the new thread from os.fork(), but the child gets 0
print '{os_fork} = os.fork(), {os_getpid} = os.getpid()'.format(
    os_fork=os_fork, os_getpid=os.getpid())
