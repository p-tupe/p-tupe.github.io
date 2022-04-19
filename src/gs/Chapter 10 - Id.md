---
title: Chapter 10 - Id
part: 11
---

## Chapter 10 - Id

A few more tussles and all of us reached level 2, Julie and I being the last. No significant changes to my stats, except my mana reached 920. Quite a random increase. First I got 80 mana off single Intelligence point, and now only 40? There wasn't even any change in mana consumption. Still took 230 and 270 mana points for Petrificus and Incendio respectively. I couldn't comprehend the scale. Betty's explanation wasn't any more helpful.

Since we were already at the exit, we decided to march ahead. We were again blessed with a bridge over an abyss. Looking over the railing, Taro asked, "How deep do you think it goes?" "Perhaps it never ends!" I added my two cents.

"It has to end somewhere, right?" he countered. "Well, not necessarily. Maybe it loops back out top from the bottom?" I argued. "It can do that?" he exclaimed, wide-eyed. "Sure, I like to think that is how our real Universe is. When you reach the end, you just portal back. No real end or beginning." Speaking of the "real" world, in however obtuse words, brought a wave of sombreness over us. No one spoke after that, as we crossed the bridge over to level 2.

<br />
 <p style="text-align:center"><strong>¤ ¤ ¤</strong></p> 
<br />

As we graced the entrance of Level 2 we were treated to a landscape filled with hills and caves. I was filled with dread, remembering the movies based on this exact terrain. Hopefully, the denizens of the movie were not haunting these lands. Again, I couldn't see the end. Perhaps this time, it was actually far off. Nor could I see any movement. Not that that was good news.

This time, Carol took the initiative. She decided to silent her footsteps and tentatively went ahead scanning around in all directions. While I wasn't going to suggest the girl go ahead and check for monsters, as a Scout, I guess that was her prerogative. Wise, even. No one spoke out loud but gave their silent consent. She advanced about 10 meters ahead of us. 'Baby steps now, can't have her go out all alone, Scout or not.'

Suddenly Betty announced, "This is Level 2 of the Tutorial Dungeon - The Kin of Sobek." 'The kin of what now? And why did she announce it now? We hadn't even seen anything. Wait. Maybe she doesn't announce it when we see something. Maybe she does it when _somethings sees us_!' We stopped walking. Carol was shaking like a leaf, having come to a similar conclusion, I deduced. Or perhaps she knew what a Sobek was? I wanted to ask Betty what it meant, but I was too busy scanning for the thing, praying it won't come out of the ground or something. Just as I was about to suggest moving on, Julie screamed and took off back to the entrance. Everyone panicked and made a mad dash behind her. Soon enough we were back, poor Carol sweating from head to toe. "What... The... Hell?" she huffed at Julie between quick pants.

<br />
 <p style="text-align:center"><strong>¤ ¤ ¤</strong></p> 
<br />

"A large crocodile!?!" We were all aghast. "Yes, it was looking at us from the shadows in the cave off to the left. I'm sorry, I was just so scared. It looked right at me!" Julie described, now considerably calmer.

"How many did you see?" Divin asked. It certainly wasn't a good idea to be swarmed by large crocodile monsters. "Ah, I saw only one and then I ran. I don't know if there were more" Julie replied.

No one suggested going back to check. We just stood there, perhaps gathering courage. I certainly was in no hurry to become a crocodile hunter. I'd seen on TV how powerful their jaw strength was, bursting watermelons like balloons.

So we decided to take a short break there. We could make a routine of taking short naps on bridges hanging over nothingness. I wasn't in any mood to sleep, my time in Level 1 was more or less relaxed. So I opened up my Status Window and decided to go through my second trial and error session.

<br />
 <p style="text-align:center"><strong>¤ ¤ ¤</strong></p>
<br />

'So, everything in this Simulation is an object and I can directly mutate their values. Of course, there are permissions and privileges, dos and don'ts, but the fact still remains. I wonder if I can print the objects somehow? That would be an awesome push to my progress!'

Since the function definition looked like Haskell, I decided to try out one of its inbuilt function.

```hs
print_object o = id o
```

'OK, let's try this'. I lifted my hand and pointed to a pebble. "Print object," I whispered. Nothing.

'Perhaps it takes in cout or console.log?' I tried out several variations. 'Nope. Hmm, what if...?' I modified the program.

```sh
print_object o = echo o
```

This time, I lost 45 mana. And a new window overlapped my terminal.

---

### Rubble

---

'Of course... Bash... That should've been the first thing I tried!' I was excited beyond measure. I again suppressed my urge to do a victory dance. Arya, however, noticed. "You're doing your weird smile again." She didn't stay quiet this time, opting to mutter her thoughts to me. "Ah, yes. I managed to create a new spell!" I confided. The others were resting, fitfully or otherwise. Arya came over and inquired about the new spell. I deliberated over how to best explain it to her; teaching object-oriented bash would be a pain in the behind, especially since I was learning it myself. I decided to change the name to help my case.

```sh
identify o = echo o
```

"You can get information about a thing using this spell, Identify." I said as she thought-typed the code in her terminal. I didn't expect it to run, but to my surprise, it actually did! Why did identify run, when it has nothing to do with any stats? I immediately called Betty over, hissed my befuddlement, and leveled her with a cold stare. Betty replied guilelessly, "Healer Class cannot directly affect HP, MP or SP. Also, Healers do not have access to parameters that are not effective on HP, MP or SP." A lot to unpack there but it somehow made sense in a convoluted way. So Arya couldn't change temperature because it wasn't really affecting HP directly, at least when it was normal. Perhaps when a victim has a cold or fever? Then she would have to attack the _cause_ of temperature imbalance. Even her 'Heal' Skill worked directly on wounds and bleeds, increasing HP as an after-effect. As for Identify, it was so far out of affecting any attributes, that it was a sort-of "read-only" spell and it didn't matter who cast it. 'I see... I'll think about it some other time though. Gotta experiment with identify!' and so, Arya and I went around identifying random things. Of course, after the pebble, I ran it on her first!


---

### [Novice] Healer - Level 2

_Special Effects_

- Healing Boost - Extra Intelligence and/or Attunement points on every Class Upgrade
- Self-Diagnosis - Healing works 30% faster when target is self

---


'Ah, just this? I should've been able to see things like temperature as well since I can modify it. Perhaps my level is too low? Hey, at least I can see the level, Class and effects. That's a good start.' Arya had her palm pointed at me as well, her eyes glassy. Soon she came back, our eyes met and she smiled at me. "This is one damn good spell for sure!" she praised. "I agree, it is!" I replied, slightly puffing my chest. Identify used up 70 of her mana, where it took only 45 for me. Another interesting discovery. Eventually, I ran out of things to identify around me. Julie did have an eyesight related special effect. Intriguingly, identify didn't work on Betty. It consumed mana, yes, but showed a blank screen.

While I wasn't really sleepy, the run back has sapped my SP. The exhaustion was catching up. So I decided to take a short nap. And that was just what I did.
