#!/usr/bin/env python
import os
import time
import random


def pproc():
    return 'pgid(0)={pgid} pgrp={pgrp} pid={pid} ppid={ppid}'.format(
        pgid=os.getpgid(0),
        pgrp=os.getpgrp(),
        pid=os.getpid(),
        ppid=os.getppid(),
    )

print 'parent.', pproc()


def parent_work():
    child_pids = []
    for i in range(20):
        child_pid = os.fork()

        if child_pid == 0:
            return child_work()
        else:
            child_pids.append(child_pid)

    for child_pid in child_pids:
        os.waitpid(child_pid, 0)
    # print os.wait()
    print 'parent ended.', pproc()


def child_work():
    pid = os.getpid()
    print 'child started.', pproc()
    with open('/tmp/forktest/%d.txt' % pid, 'w') as fp:
        started = time.time()
        print >> fp, started
        for i in xrange(1000):
            random.seed()
            fp.write(str(i))
            for j in xrange(1000):
                fp.write(str(random.randint(0, 100000)))
                fp.write(' ')
            print >> fp
        ended = time.time()
        print >> fp, ended
        elapsed = ended - started
        print >> fp, elapsed
        print 'child done in %1.5fs' % elapsed
    print 'child ended.', pproc()

parent_work()
