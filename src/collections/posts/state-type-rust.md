---
date: "Sat Sep 26 12:22:40 EDT 2026"
title: "State Type Pattern in Rust"
---

<blockquote class="quote">
 Make invalid states unrepresentable <br />
 <a style="color: var(--subcontent-color);text-decoration: none;" href="https://blog.janestreet.com/author/yminsky/">~ Yaron Minsky</a>
</blockquote>

<style>
  .quote {
    position: relative;
    text-align: center;
    font-size: 1.2em;
    font-family: "Brush Script MT", cursive;
    border: none;
    padding: 0;
    margin: 5em;
  }

  @media screen and (min-width: 768px) {
    .quote:before,
    .quote:after {
      position: absolute;
      color: var(--emphasis-color);
      font-size: 4em;
    }

    .quote:before {
      content: "“";
      left: -1rem;
      top: -3.5rem;
    }

    .quote:after {
      content: "”";
      right: -1rem;
      bottom: -4rem;
    }
  }
</style>

State-Type pattern dictates that you have a different type for each state of your value. For example, if you have a "Post" type that must be drafted, reviewed, approved and then published (if not rejected), then each state of that type becomes a new type. Here's a more formal definition:

> The state pattern is a behavioral software design pattern that allows an object to alter its behavior when its internal state changes. This pattern is close to the concept of finite-state machines. The state pattern can be interpreted as a strategy pattern, which is able to switch a strategy through invocations of methods defined in the pattern's interface.
>
> ~ [Wikipedia](https://en.wikipedia.org/wiki/State_pattern)

To contrast with something like Go, where we would have a `status` key inside a mutable struct:

```go
type Post struct {
	status    string
	created_at   time.Time
	inreview_at  time.Time
	approved_at  time.Time
    // ...
}
```

And if we wish to move a post from "draft" to "inreview", we would add a method with a check like so:

```go
func (p *Post) review() (*Post, error) {
	if p.status != "draft" {
		return nil, errors.New("Post not a Draft")
	}

	p.status = "inreview"
	p.inreview_at = time.Now()
	return p, nil
}
```

Of course, we can tighten the "state" by having defining a const enum and so on, but the basic flow remains the same.

In Rust, it would idiomatic to do something like so:

```rust

struct Draft {
    content: String,
    created_at: SystemTime,
}

impl Draft {
    fn new(content: String) -> Draft { /*..*/ }
    fn review(self) -> InReview { /*..*/ }
}

struct InReview {
    content: String,
    created_at: SystemTime,
    inreview_at: SystemTime,
}

impl InReview {
    fn approve(self) -> Approved { /*..*/ }
    fn reject(self) -> Rejected { /*..*/ }
}

// ... and so on for other types/impls
```

Why does this matter? For two reasons:

1. You cannot call functions not available on that type
2. Once a valid function is called, the value is "consumed" and no longer available

Rust functions consume their parameters like so:

```rust
fn main() {
    let some_val = vec![1, 2, 3];
    // add_one consumes some_val
    let another_val = add_one(some_val);
    // so some_val is no longer available
    // this code, when uncommented, will not compile
    // println!("{some_val:?}");
    println!("{another_val:?}");
}

fn add_one(val: Vec<i32>) -> Vec<i32> { val.iter().map(|i| i + 1).collect() }
```

And so, for our Post example:

```rust
fn main() {
    let draft = Draft::new(String::from("some content"));

    // Cannot approve before sending for review - no method `approve` on `Draft`
    // draft.approve();
    let inreview = draft.review();

    // Cannot review again by mistake - `draft` has been "consumed"
    // draft.review();
    let approved = inreview.approve();

    // Cannot reject once approve - no method `reject` on approved
    // approved.reject();
    let published = approved.publish();

    println!(
        "{}, {:?}, {:?}, {:?}, {:?}",
        published.content,
        published.created_at,
        published.inreview_at,
        published.approved_at,
        published.published_at
    );

    // Ideal for shadow binding
    let post = Draft::new(String::from("some content"));
    // Or chaining
    let post = post.review().reject();
    println!(
        "{}, {:?}, {:?}, {:?}",
        post.content, post.created_at, post.inreview_at, post.rejected_at
    );
}
```

Try uncommenting the function calls and compiling to see what errors pop up.

And that's it! The State Pattern. It is possible to implement this in other languages as well, but since they don't naturally consume their variables like Rust, it can get a bit unergonomic and less safe.

Finally, taking this too far in the name of safety means losing a lot on flexibility. In real-world apps, for instance, one might want a Post to be automatically approved if written by an internal team (and skip the "review" phase). It would be trivial to add a conditional in Go's implementation whereas you might have to rethink the whole implementation in our current design.

---

## Further reading:

- [docs.rust-embedded.org](https://docs.rust-embedded.org/book/static-guarantees/typestate-programming.html)
- [farazdagi.com](https://farazdagi.com/posts/2024-04-07-typestate-pattern/)
- [cliffle.com](https://cliffle.com/blog/rust-typestate/)
- [fsharpforfunandprofit](https://fsharpforfunandprofit.com/posts/designing-with-types-making-illegal-states-unrepresentable/)
- [hugotunius](https://hugotunius.se/2020/05/16/making-invalid-state-unrepresentable.html)
