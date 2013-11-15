def divide(x, y):
    try:
        # This division may raise a variety of errors.
        result = x / y
    except ZeroDivisionError:
        # When something in the `try:` block raises an error,
        # we pattern match through the accompanying `except SpecificError:` blocks.
        print 'Caught ZeroDivisionError'
        return '+/-Infinity'
    except Exception:
        # An `except:` block without an argument or with the root `Exception`
        # error class will catch all errors that aren't caught in the other
        # `except SpecificError:` blocks.
        # No more than one `except:` block will ever be called for a single error.
        print 'Catching some error other than "ZeroDivisionError"'
        # will end up returning 'Default'; since neither the `finally:` block
        # nor this catch-all `except:` block return anything, command
        # execution goes back up to the parent, the divide() function.
    else:
        # The `else:` block runs when NO exceptions run,
        #   IF and ONLY IF the `try:` does not return anything!
        print '--else-- (divided without exception!)'
        # This block inherits the scope of the `try:` block, which will have
        # been executed in its entirety before the interpreter arrives here.
        # Thus, the else block is useful, compared to putting code after the
        # whole `try-finally` block, if you don't want to pay attention to
        # precisely WHERE in your try block the error was raised. Or, maybe,
        # if you want to extend some result payload with a "success" marker.
        # I imagine you can probably get by without needing it most of the time,
        # though, by returning from within the "try:"
        return result
    finally:
        # This ALWAYS runs before we get back to the calling function
        # even if we return inside the other blocks, OR if the error was never
        # caught
        print '--finally-- (cleaning up after divide performance)'
        # We can intercept those returns, if we call return from within this
        # block, e.g.,:
        #return 'Intercepted'
        # But we can't change the return value; this has no effect on the
        # result of sucessful divisions (and it raises an UnboundLocalError
        # for the failures):
        #result *= 2
        # If we really wanted to return that (admittedly confusing) result:
        #return result * 2

    return 'Default'

for numerator, denominator in [(100, 10), (5, 0), ('a', 'b'), (1.0, 11)]:
    print 'Performing division: %s / %s' % (numerator, denominator)
    divide_result = divide(numerator, denominator)
    print 'Back in divide() runner. result = %s' % divide_result
    print

# Related documents:
#   http://docs.python.org/release/2.5/whatsnew/pep-341.html
