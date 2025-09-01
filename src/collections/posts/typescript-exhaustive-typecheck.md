---
date: "Mon Sep  1 12:20:39 EDT 2025"
title: Exhaustive Typechecking in Typescript
---

Consider an enum:

```typescript
enum Color {
  Red,
  Blue,
  Green,
}
```

that has a switch case:

```typescript
function whichColor(c: Color): string {
  switch (c) {
    case Color.Red:
      return "Red"
    case Color.Blue:
      return "Blue"
    default:
      return "Unknown color"
  }
}
```

where we missed `Color.Green`, and yet no errors!

A simple solution (Typescript 4.9+):

```typescript
function whichColor(c: Color): string {
  switch (c) {
    case Color.Red:
      return "Red"
    case Color.Blue:
      return "Blue"
    default:
      c satisfies never // <-- Magic
      return "Unknown color"
  }
}
```

Which leads to:

```typescript
Error: Type 'Color.Green' does not satisfy the expected type 'never'.
```

Easy peasy!

- [More on stackoverflow](https://stackoverflow.com/questions/39419170/how-do-i-check-that-a-switch-block-is-exhaustive-in-typescript)

- [More Typescript notes](/notes/typescript)
