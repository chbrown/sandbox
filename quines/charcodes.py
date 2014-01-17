tq = ''.join(chr(39) * 3)
bq = ''.join(chr(92) * 2)
lines = '''
tq = ''.join(chr(39) * 3)
bq = ''.join(chr(92) * 2)
lines = %s
%s
print '\\n'.join((lines %% (tq, tq, bq, bq, bq)).strip().split('\\n')[:3])
print lines.strip().replace('%s', '%s%s')
print '\\n'.join((lines %% (tq, tq, bq, bq, bq)).strip().split('\\n')[3:])
'''
print '\n'.join((lines % (tq, tq, bq, bq, bq)).strip().split('\n')[:3])
print lines.strip().replace('\\', '\\\\')
print '\n'.join((lines % (tq, tq, bq, bq, bq)).strip().split('\n')[3:])
