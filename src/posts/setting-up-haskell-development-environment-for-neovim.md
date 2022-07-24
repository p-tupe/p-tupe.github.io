---
date: "2022-07-24T00:00:00Z"
title: Setting up Haskell development environment for Neovim (2022)
---

> This is mostly for my sake in case I need it again but may help others avoid the pitfalls I faced, so sharing here.

## In shell (I'm on Manjaro Linux)

> Do NOT install stack, cabal, ghc, ghci, ghcid and what have you separately.

1. Install ghcup `yay -S ghcup-hs-bin`, check this link [haskell.org/ghcup](https://www.haskell.org/ghcup/install/) for other platforms.

2. Install ghc, stack and cabal using `ghcup tui`. DO NOT INSTALL HLS YET!

   1. [I]nstall recommended versions. Make sure hls supports that version [here](https://haskell-language-server.readthedocs.io/en/latest/supported-versions.html).

   1. [S]et them as default. `ghc`, `stack`, and `cabal` should be available on path.

_Note: one tick = installed, another tick = default_

## In neovim

> I'm using built-in LSP along with nvim-lsp-installer plugin for convenience. Check [this file](https://github.com/EMPAT94/dotfiles/blob/main/nvim/.config/nvim/lua/plugins/lsp-installer.lua) full setup.

1. Open a `temp.hs` file

2. `:LspInstallInfo` should show a green `hls` available

3. [I]nstall, drink your coffee, close and reopen file.

4. Profit!

## Some plugin links to avoid lots of googling:

[nvim-lspconfig](https://github.com/neovim/nvim-lspconfig)
[nvim-lsp-installer](https://github.com/williamboman/nvim-lsp-installer/)
[nvim-cmp](https://github.com/hrsh7th/nvim-cmp)

---

_Yes these simple steps took me almost a day of stumbling around. Hopefully, next time it'll be done in minutes._
