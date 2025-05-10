---
date: "2020-08-27T00:00:00Z"
title: IP on tap
---

There are times when you need to know what ip your system holds, be it public (WAN) or private (DHCP in LAN)

Every time, I had to dig through ifconfig output for the router-assigned ip, or open up the browser and search the net for my public one.

That is all in the past though. I added a couple of lines to my shell config that reduced this process to less than a second. You can append these to your bashrc or zshrc.

```sh
alias show-private-ip="ipconfig getifaddr en0";
alias show-public-ip="curl ipecho.net/plain; echo";
```

While the **show-private-ip** command is I assume, macOS specific, the **show-public-ip** works universally; as long as you have curl installed.
