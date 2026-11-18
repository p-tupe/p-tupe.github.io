---
date: Wed Nov 18 13:14:19 EST 2026
title: Rust cross-compiling guide for dummies
---

I've heard great things about Rust's cross-compilation story, but things never worked smoothly for me.

> Btw, I'm on a Mac compiling for Linux (both aarch64).

Using bare [rustup target](https://rust-lang.github.io/rustup/cross-compilation.html) with [cargo build](https://doc.rust-lang.org/cargo/commands/cargo-build.html) would have trouble finding a linker. [cross](https://github.com/cross-rs/cross) couldn't find images for my platform for whatever reason.

I didn't wanna use [zigbuild](https://github.com/rust-cross/cargo-zigbuild) (No shade on the language, just wanted something rust-native). Mostly hacked things together using a `docker` command that kinda worked out.

Of course, I knew this was mostly me being a noob, so I decided to dig deep today and solve this once and for all.

> _Spoiler:_ Didn't have to dig deep. I was just being a dummy.

So here I am, noting this down in case someone else (most likely future me) is wondering how everyone else does it so easily:

## Easy as 1, 2, 3

Let's start with a pure-rust no-brainer program - hello-world:

```bash
cargo new hello-world && cd hello-world
```

make sure it runs:

```bash
cargo run .
```

Good? Now, here's a three step process:

First:

```bash
rustup target add aarch64-unknown-linux-musl && \
find "$(rustc --print sysroot)" -name rust-lld -type f
```

This will download the stuff you need and print out where it is.

Second:

```bash
mkdir .cargo && cat > .cargo/config.toml <<EOF
[target.aarch64-unknown-linux-musl]
linker = "/Users/pritesh/.rustup/toolchains/nightly-aarch64-apple-darwin/lib/rustlib/aarch64-apple-darwin/bin/rust-lld"
rustflags = ["-C", "linker-flavor=ld.lld"]
EOF
```

Make sure to change `linker = "/path/to/rust-lld"` to the output from previous step.

Et dernier:

```bash
cargo build --release --target aarch64-unknown-linux-musl
```

Voila!
