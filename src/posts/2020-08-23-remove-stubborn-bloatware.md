---
date: "2020-08-23T00:00:00Z"
title: Remove Stubborn Bloatware In Android
---

Yes, you can actually remove all the apps that are hogging the resources on your precious android device - no matter if they cannot be removed or even disabled normally. Just follow the steps below :

## Pre-requisites

1. Laptop
2. Phone
3. Cable connecting the two

## Steps

1 - Connect your phone to laptop; make sure it shows up on *adb devices* in your terminal as below

```sh
$ adb devices
List of devices attached
RZ8M30R4RSF device
```

2 - Start up an **adb shell**

```sh
$ adb shell
beyond0:/ $
```

3 - Enter the following command to disable ***any*** app

```sh
beyond0:/ $ pm disable-user --user 0 com.app.package.name
```

*That's it!* The app is immediately disabled. It carries across restarts and OTA updates as well.

## Extras

To get the package name of an app installed on your phone, simply grep it like so

```sh
beyond0:/ $ pm list packages | grep whatsapp
package:com.whatsapp
```

You can even get a list of all the bloatware present by greping your phone's manufacturer name

```sh
beyond0:/ $ pm list packages | grep samsung
package:com.samsung.android.provider.filterprovider
package:com.samsung.android.app.ledcoverdream
package:com.sec.android.widgetapp.samsungapps
package:com.samsung.android.smartswitchassistant
package:com.samsung.android.app.galaxyfinder
package:com.samsung.android.themestore
package:com.samsung.android.app.aodservice
package:com.samsung.android.app.cocktailbarservice
package:com.samsung.android.beyond.p00.wallpapermulti
package:com.samsung.internal.systemui.navbar.gestural_no_hint_wide_back
package:com.samsung.android.calendar
...
```

Another tip: You can download terminal on your android itself, and run the above commands in it! No need for laptop or cable.

## Sources

I have not gone into deep details of how/why this stuff works. Nor have I explained how to set up adb and so on. That is by intention, to keep the post small and to the point.

If, however, you wish for more details like to re-enable a disabled app or how to set up adb, the following two sources should satiate your curiosity. They also provide additional commands. Enjoy!

[Uninstall Carrier/OEM Bloatware Without Root Access](https://www.xda-developers.com/uninstall-carrier-oem-bloatware-without-root-access/)

[Disable any pre-installed system app](https://www.xda-developers.com/disable-system-app-bloatware-android/)
