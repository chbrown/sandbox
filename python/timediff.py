import pytz
from datetime import datetime, timedelta

local_timezone = pytz.timezone('US/Central')
# now = local_timezone.localize(datetime.utcnow())
now_local = local_timezone.localize(datetime.now())
# print now_local.isoformat()

fmt = '%Y-%m-%d %H:%M:%S %Z%z'

def print_offsets():
    print 'offsets'
    now_naive = datetime.now()
    for timezone_name in pytz.all_timezones:
        timezone = pytz.timezone(timezone_name)
        print timezone_name, timezone.localize(now_naive).strftime(fmt)
        # timezone.utcoffset(now_naive)

print_offsets()

deadline = datetime(2014, 1, 27, 23, 59, 59)

eod = pytz.timezone('Etc/GMT-12')
deadline_eod = eod.localize(deadline)

hi = pytz.timezone('Pacific/Honolulu')
deadline_hi = hi.localize(deadline)

print 'now', now_local.strftime(fmt)
print 'deadline:'
print '  eod', deadline_eod.strftime(fmt)
print '  hi', deadline_hi.strftime(fmt)

print deadline_eod - now_local
