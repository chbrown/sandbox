import argparse
import re

parser = argparse.ArgumentParser(description='Change long dates in a file to ISO-compliant date strings')
parser.add_argument('filename')
opts = parser.parse_args()

months = [
    ('January', 1),
    ('February', 2),
    ('March', 3),
    ('April', 4),
    ('May', 5),
    ('June', 6),
    ('July', 7),
    ('August', 8),
    ('September', 9),
    ('October', 10),
    ('November', 11),
    ('December', 12)]

with open(opts.filename, 'w+') as fp:
    content = fp.read()

    for month_name, month_number in months:
        # first search for full date specs, like 'Month 1, 2001'
        def ymd_repl(match):
            day = int(match.group(1))
            year = int(match.group(2))
            return '%04d-%02d-%02d' % (year, month_number, day)
        content = re.sub(r'%s (\d\d?), (\d{4})' % month_name, ymd_repl, content)

        # then search for just month-day phrases, like 'Month 14'
        def md_repl(match):
            day = int(match.group(1))
            return 'XXXX-%02d-%02d' % (month_number, day)
        content = re.sub(r'%s (\d\d?)' % month_name, md_repl, content)

    fp.write(content)
