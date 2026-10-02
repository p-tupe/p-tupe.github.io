---
date: "Fri Oct  2 18:00:43 EDT 2026"
title: "A beginner's guide to serving a simple website in Rust"
---

## Intro

Hey folks! In a few months, I'll be moving out of my current residence. And so dealing with lots of stuff that needs a new home.

Before I hand it all over to Goodwill however, I figured I'd ask my friends if they want anything. And the best way my programmer brain could cook up to do so was of course to make a website with all the items on it.

And so I decided to do just that, but in Rust!

Why Rust? I've been learning the ins-and-outs of the language and figured this would be a good opportunity to get my hands dirty with a small-sized but actually helpful project. I generally just write up disposable code and move on, but just this once I decided to document my learnings along the way in the form of a blog post and see how it shakes out. Helps me get into the habit of writing more and learning better. And for you dear reader, perhaps this gives a leg up in your own Rusty journey.

Thus, our goal for this post: Build and deploy a full fledged website à la "garage-sale".

It should at a minimum have some way to show off a bunch of photos and descriptions.

Let's move on to the brass tacks then...

## Setup

We'll be doing this in the Rust language/ecosystem, as I mentioned before. We won't be able to avoid web tech like HTML/CSS/JS for the actual site, but for the rest, let's get things set up.

First, assuming you have rust [installed](https://rust-lang.org/tools/install/) properly, let's create a project:

```bash
cargo init garage-sale-tutorial
```

Since we'll serve our items as a website, we'll need a web-server to do so. I'm gonna go with the current most popular [axum crate](https://docs.rs/axum/latest/axum/):

```bash
cargo add axum
```

`axum` needs an async runtime to handle all concurrent requests that'll hit our server. Let's add [tokio](https://tokio.rs/):

```bash
cargo add tokio --features full
```

See the docs for [`full`](https://docs.rs/tokio/latest/tokio/#a-tour-of-tokio) features and why.

These two are enough to get a basic web-server up and running, let's go ahead and do that.

## Basic web server

Setup a `main` async function with a `tokio::main` macro:

```rust
#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> { Ok(()) }
```

Notice the `Result` return signature; I like to add it to all my main functions.

Add a route (this code won't compile):

```rust
use axum::{Router, routing::get};

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let route = Router::new().route("/", get("ok"));
    Ok(())
}
```

The reason this code is "incomplete" is because Rust runtime cannot infer the type of `route`. Let's fix that by binding our server to an address and serving this route there.

```rust
use axum::{Router, routing::get};

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let route = Router::new().route("/", get("ok"));
    let listener = tokio::net::TcpListener::bind("127.0.0.1:8080").await?;
    Ok(axum::serve(listener, route).await?)
}
```

And there you have it folks, a spanking new web server ready to serve!

Let's actually see it working. Open up a new terminal (I like to use splits on kitty btw):

```bash
cargo run
```

It should show something like:

```bash
Finished `dev` profile [unoptimized + debuginfo] target(s) in 2.03s
Running `[..]/target/debug/garage-sale-tutorial`
```

In another terminal, do a quick curl check:

```bash
curl -i 127.0.0.1:8080
```

to get some response like:

```bash
HTTP/1.1 200 OK
content-type: text/plain; charset=utf-8
content-length: 2
date: Thu, 01 Oct 2026 14:13:36 GMT

ok
```

Done? Awesome.

We don't want to have to restart the server every time we make some change (it gets annoying fast, esp when you forget to do it and wonder why nothing changed - ask me how I know), so let's go on a little side-quest to get a hot-reloader up:

## Side-questing

Let's go ahead an install a "watcher" for our project, tantalizingly named [bacon](https://crates.io/crates/bacon):

```bash
cargo install --locked bacon
```

Close the previous `cargo run` instance, instead replace it with:

```bash
bacon run-long
```

It should start up our server again with some extra decor attached - ignore it. Try changing the response of `"ok"` to `"ko"` and save the file. Ensure that the server restarted.

> This only works for your source file right now, due to the way defaults are set up. Do a quick `bacon --init` to generate a config for when we add other stuff.

Now, back to the main-quest - let's serve a proper html file.

## Serving html

We know that we're gonna need some form of auto-generating code which will ingest our data of picture links & descriptions and generate a full-formed html we can send over wire.

Sophisticated folks call it "templating", and we're gonna depend on [askama crate](https://askama.rs/en/stable/) to do just that:

```bash
cargo add askama
```

Create a directory named `templates` in our project root (as a sibling of `src` and `Cargo.toml`), and add a file named `root.html` with following content:

```plain
Hello, {{ name }}
```

The dir name `templates` is what `askama` uses to search for templates, so make sure it's correct and well-placed. Let's reference our root file in the rust code:

```rust
use askama::Template;

#[derive(Template)]
#[template(path="root.html")]
struct RootTmpl {
    name: &'static str,
}
```

Save the changes. At this point, the code should compile correctly.

> Add `watch = ["templates"]` to `bacon.toml`'s `job.run-long` for auto-reloading!

To serve this root file on our `/` path, change the `get` like so:

```rust
let route = Router::new().route(
    "/",
    get(RootTmpl { name: "Pat" }
    .render()
    .unwrap_or("ok".to_string())),
);
```

Pretty self-explanatory. We've created a new `RootTmpl` with some name and rendered it. Since it's a fallible operation, we provided a default `"ok"` string as fallback.

Do another curl check to be sure, does it say `hello, Pat`? If yes, you're golden.

Let us move on to the final piece of the puzzle - data ingestion.

## Ingesting data

We're gonna store our data in `data.json` and use [serde_json](https://docs.rs/serde_json/latest/serde_json/) to slurp it in:

```bash
cargo add serde_json
```

Go ahead and create a dummy file in project root with following:

```json
[{ "src": "some source", "desc": "some desc", "name": "some name" }]
```

The keys being image source and item description respectively.

In our `main` function, first we need to read the file using `fs::read(..)` then parse it using `serde_json::from_slice(..)` into a `serde_json::Value`. I combined all this in a single like like so:

```rust
#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let data: serde_json::Value = serde_json::from_slice(&std::fs::read("data.json")?)?;
    println!("{}", data); // <- just for checking
    //..
    Ok(())
}
```

Check the bacon console - does it show the parsed json from file? Restart the server if not.

> You should add `data.json` to `watch` as well.

Remove the `println` if all is good, and then let's connect all the pieces.

## Connecting the pieces

Of course, since we already know what shape our data is going to be like (and to make use of awesome typecheckin'), we create an `Item` for use to use.

```rust
struct Item {
    src: String,
    desc: String,
    name: String,
}
```

We would like to automatically convert our json file into an array of items, aka deserialization. To do this, we need to add a new crate [serde](https://serde.rs/):

```bash
cargo add serde --features derive
```

The `derive` is what we'll use to attach the macro on our `Item`:

```rust
#[derive(serde::Deserialize)]
struct Item {
    src: String,
    desc: String,
    name: String,
}
```

And change our generic `serde_json::Value` to the `Item` type as God intended:

```rust
let data: Vec<Item> = serde_json::from_slice(&std::fs::read("data.json")?)?;
```

Also, let's not go forgetting our template:

```rust
#[derive(Template)]
#[template(path = "root.html")]
struct RootTmpl {
    data: Vec<Item>,
}
```

Which we can consume in our actual `root.html` like so:

```plain
{% for d in data %}
Item {{ d.name }} available at {{ d.src }} with {{ d.desc }}
{% endfor %}
```

Save everything, make sure it compiles, curl (or open in browser) and ensure you see what you expect to see.

Now that our pieces are connected, let add some jazz to our UI.

## Jazzing up UI

Alright, enough curlin' about. Let's put our designer hats on. First, some dummy data to work with; Update `data.json` like so:

```json
[
  {
    "src": "https://placehold.co/600x400",
    "desc": "this is a placeholder image",
    "name": "item-name-1"
  },
  {
    "src": "https://placehold.co/600x400",
    "desc": "this is a placeholder image",
    "name": "item-name-2"
  },
  {
    "src": "https://placehold.co/600x400",
    "desc": "this is a placeholder image",
    "name": "item-name-3"
  },
  {
    "src": "https://placehold.co/600x400",
    "desc": "this is a placeholder image,  this is a placeholder image,",
    "name": "item-name-4"
  }
]
```

Honestly, add a dozen more I'd say. I only stopped at 4 because I didn't wanna fill this post with dummy items list.

_Now_, in the UI, let's add some basic layout:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Garage Sale</title>
    <style>
      main {
        display: flex;
        flex-wrap: wrap;
        gap: 1em;
        align-items: center;
        justify-content: center;
      }
    </style>
  </head>
  <body>
    <main>
      {% for d in data %}
      <div style="max-width: 300px">
        <h3>{{d.name}}</h3>
        <img style="max-width: 100%;" src="{{d.src}}" alt="{{d.name}}" />
        <p>{{d.desc}}</p>
      </div>
      {% endfor %}
    </main>
  </body>
</html>
```

Extra jazz is left as an exercise to the user. This takes care of our data and UI, but if you save and open up the browser, you're likely to see raw html posted there. Why? Mime-Types, 'nuff said.

Jump back into the rust code for a pinch:

```rust
let route = Router::new().route("/",
    get(Html(RootTmpl { data }.render().unwrap_or("ok".to_string()))),
);
```

And make sure you send back prim `Html` that lives deep inside `axum::response::Html`.

Go on, try saving, reloading, and all that. See that nice wall of placeholders? That's the result of your hard work right there - Savour it!

## Savouring it

Well, you can drool over your page all you like, but I plan to share mine with all my friends. That's the whole point we're doing this, desho?

Now, I'll add some secret css spice for zoomin' and stuff, and replace the dummy data with my actual images (make sure your URLs are publicly visible too!).

So, how do we share this with the world? Good question.

At this point, you'd also be asking... "But Pat, wouldn't it be easier to just share the pics directly?" And you would absolutely be right. It would've been easier to whip up a Google Doc and do the same. Or if you were hell bent on a website, a simple html file would've served just as well.

But let me ask you this - would it have been so much _fun_? No, not an iota.

So, I am simply going to cross-compile a binary and punt it onto my server. Perhaps with a systemd minder to keep it in place? Rust is not like that one other language that allows easy cross-compiling - you know the one I'm taking about. It requires you to jump through a few docker hoops.

But wait... If we compile a binary, what happens to our `data.json` and `root.html`? They're left behind. Unless we embed them in the binary, duh.

## Embedding it

First, let's get our `data.json` in; just replace the `fs::read` line with:

```rust
let json_file = include_bytes!("../data.json");
let data: Vec<Item> = serde_json::from_slice(json_file)?;
```

And Voila! Yes, that's all. Feel free to print the `data` if you don't believe me. And don't forget to remove any useless `use` if dangling.

As for our `root.html`? Guess what - `askama` parses templates at compile time! So it's included in the binary by default. Huzzah!

> Note that both `data.json` and `root.html` get set in stone during compile. A proper templating workflow this is not.

So that all we had to do to embed things, marching onwards to deploying it.

## Deploying it

I'm on MacOS and I'll be running the server from my Ubuntu Server. This is the arcane incantation I use to compile a binary for linux:

```bash
docker run --platform linux/arm64 --rm \
    -v "$PWD":/usr/src/app -w /usr/src/app \
    rust:latest cargo build --release
```

> Note the `--platform` value, the `arm64` (aka `aarch64`) is a match for `uname -m` on my server. Yours might be different (like `x86_64`, use `amd64` in that case), so adjust accordingly.

If you're following along, you'll find a pretty little `garage-sale-tutorial` tucked away in your `target/release` sub-dir.

I'm gonna scp it up to my server...

```bash
scp target/release/garage-sale-tutorial my-server:~/
```

...and configure my caddy reverse proxy to route to it:

```nginx
fake.example.com {
    redir /garage-sale /garage-sale/
    handle_path /garage-sale/* {
        reverse_proxy localhost:8080
    }
}
```

I've already got the whole DNS thingamajig set up to point this domain to my server's IP, and I'm not gonna go over it here.

> The entire code is hosted at [github.com/p-tupe/garage-sale-tutorial](https://github.com/p-tupe/garage-sale-tutorial) if you need a looksie.

Since we're working with a binary, let's throw together a quick service file via `sudo vi /etc/systemd/system/garage-sale.service`:

```ini
[Service]
ExecStart=/home/ubuntu/garage-sale-tutorial
User=ubuntu
Restart=on-failure
[Install]
WantedBy=multi-user.target
```

And let's see it purr:

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now garage-sale
systemctl status garage-sale
```

And... That's basically it! Hope it was helpful. Feel free to ping me from the box below if anything is incorrect or not working for you. Cheers :)
