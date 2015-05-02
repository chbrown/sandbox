import sys
from datetime import datetime

# use like:
# twilight stream --filter "locations=-180,-90,180,90" | grep --line-buffered -v '^{"delete":' | jq --unbuffered -r .id_str | gstdbuf -o0 head -1000 | python -u /Users/chbrown/github/sandbox/python/twitter_status_ids.py

TWEPOCH = 1288834974657

while True:
    line = sys.stdin.readline()
    if not line: break # EOF

    status_id = int(line)
    ticks = (status_id >> 22) + TWEPOCH

    print ticks
    # print datetime.fromtimestamp(ticks / 1000.0)

    # print out only the milliseconds part
    # print ticks % 1000

    # sys.stdout.write('%d\n' % (ticks % 1000))
    # sys.stdout.flush()
