---
date: "2024-06-16T00:00:00Z"
title: MacOS custom break-timer in Hammerspoon
---

## Definition

What exactly is a "break-timer"? For our purposes, let's say it's a timer that runs for 25 minutes and then shows up a notification with a message: "Time to take a break!". After the notification is shown for a few seconds, the screen locks automatically. That should be enough to get us started.

## Pre-requisites

First, get [Hammerspoon](https://www.hammerspoon.org/). Quoted from the site:

> This is a tool for powerful automation of MacOS. At its core, Hammerspoon is just a bridge between the operating system and a Lua scripting engine.

We're going to update our `init.lua` file in `.hammerspoon` directory to implement our timer. As an aside, to quickly reload the changes, can use the following keybinding:

```lua
hs.hotkey.bind({ "alt" }, "r", function()
	hs.reload()
end)
```

## Implementation

To do something at every x seconds interval, we can use the `hs.timer.doEvery` function. The function takes two arguments - time interval and function to execute:

```lua
hs.timer.doevery(60 * 25, function()
    -- Function to execute
end)
```

Notice the `60 * 25` - this is the time interval for 25 min in seconds.

Next, let's show a notification. We can do that using the `hs.alert.show` function:

```lua
hs.timer.doevery(60 * 25, function()
    hs.alert.show("Time to take a break!")
    -- TODO: lock screen
end)
```

And finally, let's lock the screen automatically 5 seconds after the notification is shown. We can do that using the `hs.caffeinate` module, leading to our final break-timer implementation:

```lua
hs.timer.doevery(60 * 25, function()
	hs.alert.show("Time to take a break!")
	hs.timer.doafter(5, function()
		hs.caffeinate.lockscreen()
	end)
end)
```

And there! Make sure you stand up, walk around and actually take a break. Stay healthy!

## Exercise

1. Show a menu bar icon with remaining time left

2. Bind a hotkey to toggle the timer
