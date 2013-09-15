# makes total sense
# syntax error in Python 2
# works in Python 3

def func(positional, *optional, defaulted='missing'):
    print(positional, optional, defaulted)

func('first', 'second', 'third')
