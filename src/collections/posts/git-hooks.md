---
date: "2024-01-13T00:00:00Z"
title: A quick look at Git Hooks
---

## What are git hooks?

Straight from the horse's mouth:

> Hooks are programs you can place in a hooks directory to trigger actions at certain points in git’s execution.
>
> - [git-scm.com](https://git-scm.com/docs/githooks)

## How to quickly add a git hook?

Inside your git repository:

1. Open `.git/hooks/pre-commit`.

2. Add the following sample script:

```sh
#!/usr/bin/env bash

echo -e "\n\nPre-commit hook has been triggered\n\n"
```

3. Make is executable (if it isn't already).

```sh
$ chmod u+x .git/hooks/pre-commit
```

4. Profit! _Try running the `git commit` command in that repo._

## A more useful example maybe?

Sure, I have a pre-commit git hook written that... Well, let me just show you:

```sh
#!/bin/sh

set -euo pipefail

STAGED=$(git diff --cached --name-only | xargs)

# Lint
yarn eslint --fix $STAGED
# Format
yarn prettier --write $STAGED
# Type check
yarn tsc --noEmit
# Test
yarn jest
# Re-stage
git add $STAGED
```

This little script does linting, formatting, type checking, and unit testing before the staged files are ready to commit. As a side note, see line 5 to get only staged files. The `pipefail` command runs the script in "strict mode"; see [Shell Notes](/notes/shell/) for more details.

## What's this `core.hooksPath`?

As above, by default, hooks are placed in `.git/hooks` directory. We can have them hooks in another directory inside the repo (e.g. ./hooks) and as such ensure that everyone gets a copy of it when they clone a repo. Then you can have an initialization script (like 'preinstall' for package.json) that does the `git config core.hooksPath hooks` and voila! hooks installed just like that.

## Must they always be bash scripts?

NO. You can have _any_ script that executes. Here's another example of pre-commit in Nodejs:

```javascript
#!/usr/bin/env node

console.log("\n\nPre-commit hook in Nodejs has been triggered\n\n")
```

And Python:

```python
#!/usr/bin/env python

print("\n\nPre-commit hook in Python has been triggered\n\n")
```

## Alright, where can I learn more?

Here ya go:

- [git-scm](https://git-scm.com/docs/githooks)

- [githooks](https://githooks.com/)

- [Atlassian tutorial](https://www.atlassian.com/git/tutorials/git-hooks)

Thanks for reading and happy hacking!
