---
date: "Fri Jun  5 18:26:47 EDT 2026"
title: Actor Model Pattern in Rust
---

## Introduction

[Actor Model Pattern](https://en.wikipedia.org/wiki/Actor_model) is when the logical architecture of a program is based around "actors". An actor is an entity that holds some state, and accepts messages to act on said state, sometimes returning a response in turn.

I will not be going deep into the pattern itself; there are resources out there that express it better than I ever could. What I plan to elaborate upon however, is a certain problem that cropped up during my development of [tio](https://github.com/p-tupe/talk-it-out) and how I naturally converged on Actor Model as a solution.

> Udate: I have since moved from Rust to Go for TIO; however, you can reference this [commit](https://github.com/p-tupe/talk-it-out/commit/7d5dfd5e5293c46e157e829aa68fbc84bb5494ea) for the purpose of this blog post.

## The Problem

[Talk it out](https://github.com/p-tupe/talk-it-out) is (or will be soon) an easy-to-deploy binary that takes in a URL as an input and streams it back as audio.

One of the steps, after fetching the page at the URL, is to clean it up for audio processing.

I'm using this wonderful crate called [readability-js](https://docs.rs/readability-js/latest/readability_js/) based on Mozilla's own `readability.js` to extract the meat of the document.

However, this involves starting up a JavaScript engine. Which takes time. So I cannot (or rather, should not) do it for every request. Nor can I trivially share it across each request (because they are both multi-threaded and asynchronous) and the core engine is neither `Send` nor `Sync` safe.

So I needed some way to have requests send their content to a single long-lived instance of this engine and get some content back in an async thread-safe manner.

Sounds like we need a readability-js actor!

## The Solution

Here, it gets a bit tricky. There are some canonical places where this information is already written down (and helped me a lot), like [rust-lang-nursery](https://rust-lang-nursery.github.io/rust-cookbook/concurrency/actor.html) and [Alice Rhyl's blog](https://ryhl.io/blog/actors-with-tokio/)

But those can be a bit overwhelming for a beginner who's still trying to get a hang of things. So, here is my understanding of it, distilled down to it's essence:

### First, The Actor

We "spawn" a readability-js actor function that, when called, returns a "sender" channel - a channel where you can only send messages on. It's the result of an [`mpsc::channel()`](https://doc.rust-lang.org/std/sync/mpsc/fn.channel.html) where mpsc stands for multiple producers single consume i.e. multiple requests can send to a single receiver inside the actor.

> I'm using std mspc (thread-safe) instead of tokio's mpsc (thread/await-safe) for brevity. Core idea is same regardless.

It looks something like so:

```rust
fn spawn_readability_parser() -> mpsc::Sender<_> {
    let (tx, rx) = mpsc::channel();

    tx
}
```

We create a readability-js instance and spawn a thread inside that waits for some message.

```rust
fn spawn_readability_parser() -> mpsc::Sender<_> {
    let (tx, rx) = mpsc::channel();

    std::thread::spawn(move || {
        let readability = Readability::new().unwrap();
        let mut itr = rx.iter();

        loop {
            let _ = itr.next().unwrap();
        }
    });

    tx
}
```

Now, we can just `tx.send(...)` and whatever payload we send will be received inside this loop. For this case, I'm sending my html dump so readability-js can return the relevant part of it. The question then is, how we we return said part?

I was stuck on this point for a while, and granted I should have just read those blogs more carefully, but I kinda did arrive at the solution by myself (which, no lie, I'm slightly proud of).

It's pretty simple once you know it - in the payload, you send a channel to reply back on!

There's this [`oneshot`](https://docs.rs/tokio/latest/tokio/sync/oneshot/) channel that seems tailor-made for this use case. Let's see what the code looks like with that in -

```rust
struct Payload {
    response_tx: oneshot::Sender<_>
    // ...
}

fn spawn_readability_parser() -> mpsc::Sender<Payload> {
    // changed var name to distinguish b/w request/response channels
    let (request_tx, request_rx) = mpsc::channel();

    std::thread::spawn(move || {
        let readability = Readability::new().unwrap();
        let mut itr = request_rx.iter();

        loop {
            let Some(Payload {
                response_tx,
                // ...
            }) = itr.next() else {
                break
            };

            // do the parsing with readability.parse(),
            // then respond

            response_tx.send(/* whatever */).unwrap();
        }
    });

    request_tx
}

// assuming somewhere else you're creating a oneshot channel and 
// sending the data on tx; here's a contrived example:
fn main() {
    let parser = spawn_readability_parser();
    let (response_tx, response_rx) = oneshot::channel();
    parser.send(Payload { response_tx, /* message */ }).unwrap(); // Send message
    let _ = response_rx.await.unwrap(); // Received message
}
```

And that's all there is to it basically. Simple, eh?

Happy Hacking!
