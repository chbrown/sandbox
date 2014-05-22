To enable multiline in ghci:

    :set +m

Helpful: http://www.haskell.org/haskellwiki/Haskell_Tutorial_for_C_Programmers

# 1

Prelude> sum [x | x <- [1..999], x `mod` 5 == 0 || x `mod` 3 == 0]
233168

# 2

Prelude> let fibs = 0 : 1 : [a + b | (a, b) <- zip fibs (tail fibs)]
Prelude> sum $ filter even $ takeWhile (< 4000000) fibs
4613732

-- careful not to say something like [x | x <- fibs, x < 4000000],
-- since that will test all infinite elements of fibs, never stopping.

# 3 https://projecteuler.net/problem=3

let empty :: [a] -> Bool
    empty (x:xs) = False
    empty [] = True

let factors :: Integer -> [Integer]
    factors n = [x | x <- [2..n - 1], n `mod` x == 0]

let revfactors :: Integer -> [Integer]
    revfactors n = [x | x <- reverse [2..n - 1], n `mod` x == 0]

let isprime :: Integer -> Bool
    isprime x = empty $ factors x


--let isnotprime :: Integer -> Bool
--    isnotprime x = factors(x) != []

// the annoying thing with isnotprime here is that I'm not sure if Haskell will exit l != [] quickly once l contains an element
-- Oh, can show that `or`, at least, exits quickly.
--   or [x > 1000 | x <- [1..]]


last [x | x <- factors(600851475143), isprime(x)]

let revprimefactors n = [x | x <- reverse [2..n], n `mod` x == 0, isprime(x)]

last [x | x <- factors(600851475143), isprime(x)]


-- cheating a bit: http://en.literateprograms.org/Sieve_of_Eratosthenes_%28Haskell%29

merge :: (Ord a) => [a] -> [a] -> [a]
merge xs@(x:xt) ys@(y:yt) =
  case compare x y of
    LT -> x : (merge xt ys)
    EQ -> x : (merge xt yt)
    GT -> y : (merge xs yt)

diff :: (Ord a) => [a] -> [a] -> [a]
diff xs@(x:xt) ys@(y:yt) =
  case compare x y of
    LT -> x : (diff xt ys)
    EQ -> diff xt yt
    GT -> diff xs yt

primes, nonprimes :: [Integer]
primes    = [2, 3, 5] ++ (diff [7, 9 ..] nonprimes)
nonprimes = foldr1 f $ map g $ tail primes
  where
    f (x:xt) ys = x : (merge xt ys)
    g p         = [ n * p | n <- [p, p + 2 ..]]

slowprimes :: [Integer]
slowprimes = sieve [2..]
  where
    sieve (p:xs) = p : sieve [x | x <- xs, x `mod` p > 0]

-- end wikipedia cheating

--let candidates = [2..]

-- for each number from 2.. onward, check all the primes lower than that number,
-- if any divide the number cleanly, continue

let numbers = [(n, not $ or [n `mod` x == 0 | (x, prime) <- takeWhile (\ (x, _) -> x < n - 1) numbers, prime]) | n <- [2..]]

--let primes = [x | (x, prime) <- statuses, prime]

let primefactors n = [x | (x, prime) <- takeWhile (\ (x, _) -> x < n - 1) numbers, prime, n `mod` x == 0]

