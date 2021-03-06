# Relative indentation:

---
Input:

```markdown
* First item
  - Inner item
  - Inner item two
    No retreat
* Second outside item
```

---
Output:

* First item
  - Inner item
  - Inner item two
    No retreat
* Second outside item


# Relative indentation 2:

---
Input:

```markdown
* First item
  - `Some inner code`
  Back to the same level
* Second outside item
```

---
Output:

* First item
  - `Some inner code`
  Back to the same level
* Second outside item


# Relative indentation 3:

---
Input:

```markdown
* Item A
  - `python -c 'import this'`

  Skip and then back to the same level
* Item B
```

---
Output:

* Item A
  - `python -c 'import this'`

  Skip and then back to the same level
* Item B


# Code indentation 1:

---
Input:

```markdown
* Item A
    Four spaces right after
* Item B

    Newline and then four spaces
* Item C (no break before)
    `indentation and then backticks`
```

---
Output:

* Item A
    Four spaces right after
* Item B

    Newline and then four spaces
* Item C (no break before)
    `indentation and then backticks`


# Code indentation 2:

---
Input:

    1. First
    ```
    # Fenced block at far left
    console.log('Hello');
    ```
    2. Second after no break
    ```
    # Another fenced block at far left
    console.log('world');
    ```

    3. Third after newline break
        ```
        # Indented fenced block right after
        console.log('welcome');
        ```

    4. Fourth after newline
            No break, eight spaces in.
    5. Fifth, right after

            # Newline before, eight spaces in.
            console.log('again');
    6. Sixth, right after that, too.

          # Newline before, six spaces in.
          console.log('again');

    7. Seventh, newline break before six-spaced indentation, too.

        # 4-space indented, with space before.
        console.log('almost done');

    8. This should be the end (newline before).

---
Output:

1. First
```
# Fenced block at far left
console.log('Hello');
```
2. Second after no break
```
# Another fenced block at far left
console.log('world');
```

3. Third after newline break
    ```
    # Indented fenced block right after
    console.log('welcome');
    ```

4. Fourth after newline
        No break, eight spaces in.
5. Fifth, right after

        # Newline before, eight spaces in.
        console.log('again');
6. Sixth, right after that, too.

      # Newline before, six spaces in.
      console.log('again');

7. Seventh, newline break before six-spaced indentation, too.

    # 4-space indented, with space before.
    console.log('almost done');

8. This should be the end.


# Code block 1:

---
Output:

```javascript
javascript:console.log('bookmarklet'); console.log('bookmarklet'); console.log('bookmarklet'); console.log('bookmarklet'); console.log('bookmarklet');
```

    javascript:console.log('bookmarklet'); console.log('bookmarklet'); console.log('bookmarklet'); console.log('bookmarklet'); console.log('bookmarklet');

* Lone bullet item:
        javascript:console.log('bookmarklet'); console.log('bookmarklet'); console.log('bookmarklet'); console.log('bookmarklet'); console.log('bookmarklet');

> javascript:console.log('bookmarklet'); console.log('bookmarklet'); console.log('bookmarklet'); console.log('bookmarklet'); console.log('bookmarklet');

> `javascript:console.log('bookmarklet'); console.log('bookmarklet'); console.log('bookmarklet'); console.log('bookmarklet'); console.log('bookmarklet');`

> ```javascript:console.log('bookmarklet'); console.log('bookmarklet'); console.log('bookmarklet'); console.log('bookmarklet'); console.log('bookmarklet');```

- Another bullet:

  > javascript:console.log('bookmarklet'); console.log('bookmarklet'); console.log('bookmarklet'); console.log('bookmarklet'); console.log('bookmarklet');

Literal HTML:

<div class="plain">
  <pre>javascript:console.log('bookmarklet'); console.log('bookmarklet'); console.log('bookmarklet'); console.log('bookmarklet'); console.log('bookmarklet');</pre>
</div>

# Dashes:

---
Input:

    This is what they sometimes call---well, em-dashes.

    There are also en-dashes, which look--say, a little bit like that.

    And we can do em-dashes for pauses --- if you have nothing else to say.

    As well as en-dashes -- like this.

    And maybe a song: with Artist - Title

---
Output:

This is what they sometimes call---well, em-dashes.

There are also en-dashes, which look--say, a little bit like that.

And we can do em-dashes for pauses --- if you have nothing else to say.

As well as en-dashes -- like this.

And maybe a song: with Artist - Title


# EOF
