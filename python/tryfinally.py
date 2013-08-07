def divide(x, y):
    try:
        result = x / y
        print result
    # except ZeroDivisionError:
    #     print "division by zero!"
    #     raise
    # else:
    #     print "result is", result
    finally:
        print "executing finally clause"

print '\nThis works\n'
divide(100, 10)

print '\nThis does not\n'
divide(5, 0)
