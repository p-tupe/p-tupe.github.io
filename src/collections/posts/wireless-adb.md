---
date: "2020-09-16T00:00:00Z"
title: Wireless adb
updated: "Fri Feb 28 10:00:49 EST 2025"
---

## How to use adb wirelessly

### Option 1

1. Enable Wireless Debugging in Developer Options
2. In the Wireless Debugging menu, open "Pair device with pairing code"
3. On host machine, enter `adb pair address:port code` from the popup menu
4. Done!

### Option 2

1. Connect your system to the phone via adb using cable (how-to below)
2. Enter the following in shell `adb tcpip 5555`
3. Your adb server should restart; now type the following `adb connect <phone-ip>:5555`
   where phone-ip is the wireless internet address of your phone
4. Enter `adb devices` again, it should show your phone's ip
5. Remove cable. Done!

_Wireless adb will work until you reboot the phone_

_Your phone and laptop/pc should be on the same network_

## How to connect laptop/pc to phone with adb

1. Ensure adb debugging is enabled (how-to below)
2. Attach cable to your system and phone
3. Type `adb devices` in your shell
4. A pop-up will show up on your phone to "Allow USB Debugging", click allow
5. Done! You device string will show up in the shell below the command

## How to enable adb debugging

1. In your android phone, navigate to Settings > About Phone > Software Information
2. You should see your "Build Number", tap on it a few times until you see "Developer mode has been enabled" pop-up
3. Go to Settings again, Developer Options > Toggle USB Debugging
4. Click allow on the pop-up. Done, debugging is now enabled, yay!

_While the overall process is same on all phones, the placement of setting options may be different. You can use the search option in your Settings_

## Useful links

- [Wiki ADB](<https://en.wikipedia.org/wiki/Android_software_development#Android_Debug_Bridge_(ADB)>)
- [Android Docs ADB](https://developer.android.com/studio/command-line/adb)
