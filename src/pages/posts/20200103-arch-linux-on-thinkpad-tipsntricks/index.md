---
title: "Arch Linux on ThinkPad Tips-N-Tricks"
date: 2020-01-03T16:51:07-05:00
tags: 
  - arch-linux
  - linux
  - thinkpad
  - gnome
summary: New year, new laptop. Some helpful hints and complaints about Arch on a ThinkPad
draft: false
---

As of today, my computing situation is completely Apple free. I sold my last Mac, a 2012 MacBook Pro (a champ of a machine that will be sorely missed) and bought my first non-Apple laptop, a [7th gen ThinkPad X1](https://www.lenovo.com/us/en/laptops/thinkpad/thinkpad-x/X1-Carbon-Gen-7/p/22TP2TXX17G). The model I ordered has a 6 core i7-10710U processor, 16GB of memory, 512GB SSD, and a 1080p touchscreen.

I immediately partitioned the hard drive for dual booting, shrinking Windows 10 down to 128GB and leaving the rest for Arch Linux.

<img src="./arch.svg" style="display: block; margin-left: auto; margin-right:auto" />

This is my first self-maintained Linux laptop (my work laptop runs Red Hat but I can't admin much on it).  Installing and setting up Arch with Gnome was about as pain-free as you could expect, with almost everything working perfectly right out of the box.[^1] This wasn't a surprise though, because I did my research beforehand and it looked like the consensus on the Internet was that Linux and ThinkPads get along well.

Overall, I love this laptop. It's about as light and portable as you can get while still sporting a chonky,  satisfying keyboard. Full stack dev work has been silky smooth so far with 6 cores and 12 threads of multitasking running all my docker containers and build processes. And as a bonus, the touchscreen has been a pleasant surprise as a quality of life improvement. I'm getting between 6 and 8 hours of battery on Linux so far, which is fine especially because it charges quickly.

But of course there have been issues, tweaks, and workarounds to get things as close to perfect as possible. For posterity's sake, here they are in no particular order.

1. My desk sports a 4k 27" monitor. I bought a [USB-C to DisplayPort connector](https://www.amazon.com/gp/product/B075V27G2R/ref=ppx_yo_dt_b_asin_title_o00_s00?ie=UTF8&psc=1) to output at 4k 60hz. Immediately I noticed an input lag in Gnome. Windows felt great though. I experimented and found that it was specifically Gnome with Wayland that suffered from the input lag. Gnome with Xorg feels great. Hopefully Wayland catches up.

2. Speaking of a 4k monitor, switching back and forth between docked and portable mode is something that Gnome doesn't really help you do. I've found that togging `Settings > Universal Access > Large Text` is the easiest way to switch back and forth if you show the Universal Access menu in the Gnome toolbar. It makes menu fonts and most application fonts larger, which is all that's really required to make Gnome usable on my monitor. Frustratingly, Firefox doesn't respect it. My workaround is to manually zoom in and out because I don't want to mess with `about:config > css.devPixelsPerPx` every single time I dock and undock. Or I just use Chromium when I'm docked.

   I would love it if either (A) Firefox would respect my font settings or (B) we could get a way to programmatically change preferences without restarting Firefox, so I could use a systemd event triggered by a monitor being plugged in to run a script and change Firefox's preferences on the fly. Apparently this used to be possible with a Mozilla tool called `gcli`, but [it was removed in Firefox 61](https://mail.mozilla.org/pipermail/firefox-dev/2018-March/006249.html).

3. Scrolling on the touchpad feels too sensitive globally. It's not a deal breaker, but I would love to calm it down.

4. As always, the Arch wiki has been indispensable. I relied on the [X1 Carbon gen 7 page](https://wiki.archlinux.org/index.php/Lenovo_ThinkPad_X1_Carbon_(Gen_7)) and the [Firefox page](https://wiki.archlinux.org/index.php/Firefox) (I spend a lot of time on the Internet!) extensively during installation and post-installation.

5. I boot Windows with Bitlocker through GRUB. When you go through the [Arch installation guide](https://wiki.archlinux.org/index.php/Installation_guide), and eventually install [GRUB](https://wiki.archlinux.org/index.php/GRUB) you'll see references to `os-prober` and [`dislocker`](https://aur.archlinux.org/packages/dislocker/). Install them. It was a piece of cake adding Windows to GRUB using [grub-customizer](https://www.archlinux.org/packages/community/x86_64/grub-customizer/), which found Windows the first time it ran.

[^1]: The only exception being that the fingerprint reader doesn't work yet, though it's in the [works](https://gitlab.freedesktop.org/libfprint/libfprint/issues/181).