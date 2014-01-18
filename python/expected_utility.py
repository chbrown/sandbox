# Example for UT's Minds and Machines course
import random


def average(xs):
    return float(sum(xs)) / len(xs)


def flip_a_coin():
    return 'H' if random.random() < 0.5 else 'T'


def play_game(verbose=False):
    flips = ''

    def keep_playing():
        heads_or_tails = flip_a_coin()
        if heads_or_tails == 'H':
            return 'H'
        else:
            return 'T' + keep_playing()

    flips = keep_playing()
    if verbose:
        print flips

    number_of_tails = flips.count('T')
    # if number_of_tails = 0, this will return $1
    # if number_of_tails = 1, this will return $2
    # if number_of_tails = 2, this will return $4
    # if number_of_tails = 3, this will return $8
    return 2**number_of_tails


def play_lots_of_games(how_many, verbose=False):
    for _ in range(how_many):
        print '- I won $%d !' % play_game(verbose)


def how_much_per_game(how_many, verbose=False):
    total = 0
    for _ in range(how_many):
        total += play_game(verbose)
    print 'I won $%0.2f per game!' % (float(total) / how_many)


def running_tally():
    total = 0
    for played_so_far in range(1, 10000000):
        total += play_game()
        print "\rI've played %8d games and won $%4.2f per game!" % (played_so_far, float(total) / played_so_far),
    print

# how_much_per_game(10000, True)
running_tally()
