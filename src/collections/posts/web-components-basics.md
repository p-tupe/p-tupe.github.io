---
date: "Thu Sep 18 17:19:38 EDT 2025"
title: Web Components How-To Basics
---

Let's say we want a web component that says "Hello, World!"

> A web component is a custom reusable html tag.

### Here's how we define it

```javascript
class SayHello extends HTMLElement {
  connectedCallback() {
    this.textContent = "Hello, World"
  }
}

customElements.define("say-hello", SayHello)
```

> The name (like `"say-hello"`) must always contain a `"-"` so it does not clash with builtin tags.

### And here's how we use it

```html
<say-hello></say-hello>
<script type="module" src="./say-hello.js"></script>
```

That's all!

### Bonus

You can even style the tag directly by its name:

```css
say-hello {
  color: red;
}
```

### Resources

- [A Complete Introduction to Web Components](https://kinsta.com/blog/web-components/)

- [Another Example](https://github.com/p-tupe/Notes/tree/master/examples/web/web-components)
