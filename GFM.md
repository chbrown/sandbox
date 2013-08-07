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
