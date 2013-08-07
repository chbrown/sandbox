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
