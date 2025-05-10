---
title: Chapter 4 - Gesture Input
part: 5
---

## Chapter 4 - Gesture Input

Betty took a few steps away from me. Raised her hands with palms towards her torso, then spoke in a clear voice - 'float'. As she rose from the ground, it seemed as if cobwebs were clearing in my mind. I gaped at her as she stabilized herself, but my thoughts were far away.

'Is this how a spell is cast then? You choose your target as an argument with your palms, then call the function - err spell, by name. She passed her own body as the argument, and now she is floating!'

I quickly opened my Status Window and got into the terminal. I erased the float spell with a thought. With another, I modified my fireball spell.

```sh
fireball x = x.
```

Well, I still didn't know how to call fire. I could choose any target into x and ignite it. 'Hmm... Environment variables she says? How about I just raise the temperature of the target to make it seem like it is on fire? Yeah, that could work' After another quick edit,

```sh
fireball x = (( x.temperature++ ))
```

'Wait, increasing temperature by a degree would barely make the thing feverish. I need it to BURNNN. How about I double it?'

```sh
fireball x = (( x.temperature = x.temperature * 2 ))
```

I was itching to test it on something; so I closed my Status Window. Betty was back in her wisp form already. I looked at the ball of light - what if... No. It would be a tragically funny if a powerful Chat Bot went Rambo on me right now. I instead chose a patch of grass about 10 meters away. While the grass was dry, it was thankfully sparse overall. I could fireball it without needing a fire extinguisher. Taking a deep breath, I raised my hand. My palm was pointing towards a clump of a particularly dense patch. I spoke out as serenely as I could - 'fireball'. Nothing happened.

While the test was technically a failure, I did notice one important thing. When I raised my hand to "select" the clump of grass, I could somehow tell that it was too far away. Perhaps my Perception was too low? I lowered my hand, now pointing to a blade of grass a couple of meters away. No sooner had I spoken the magic word that the blade seemed to swoon. Its color had also gotten a bit darker. Test Successful! I cast fireball again on the same blade and its color went pitch black. Even in the dark evening-like ambiance, it stood out from its peers. A slight breeze disintegrated it before my eyes.

As I noticed that, another crazy idea popped into my nugget. Why stop at double? Why not square it? Heck, I could call it recursively until my target is vaporized! Man, I don't care what others say, but the Mage Class is not nerfed AT ALL. In fact, it is way too overpowered! Who cares about some attributes or special effects when you can simply smite stuff into oblivion? I immediately added a multiplier in my spell and cast it on another unfortunate blade of grass nearby. My expectations of utter destruction were betrayed however, as this time, nothing happened at all. Not even a small change in color. I reopened my Status Window and checked to see if I hadn't made any typos with my mind, but the code looked good. 'Oh wait, what is this?'

I had failed to notice it in my excitement earlier, but my Mana Point was down to 240 from the original 800. Did I just use up 560 points of mana to burn a blade of grass? As for why the last spell didn't work, I simply didn't have enough mana left. Guess Mages ain't so overpowered after all.

As I was resting to recover my mana - which according to Betty was quicker for Mages, I thought about the spell I just cast. Impressive as it was, it certainly wasn't what I expected. No literal fiery balls were shot around. How would one go about that, I wondered? Not that it mattered much, I now had an actual attack. Misnomer though it was. 'Hell, why not change it?' It didn't take me long to come up with a pretty original and totally not stolen name -

```sh
incendio x = (( x.temperature = x.temperature * x.temperature ))
```

I was quite proud of myself, as I decided to write another function that went the other way, with a similar naming scheme.

```sh
petrificus_totalus x = (( x.temperature = 0 ))
```

'Boom! Freeze mofo, all the way down to zero!!!'

While waiting for my mana to top off, I tried to remember all sorts of spells that Harry - err, that I could come up with on my own.


<br />
 <p style="text-align:center"><strong>¤ ¤ ¤</strong></p> 
<br />


After maybe an hour or so, I headed back to where the others were. I spent the entire time testing out my abilities and limitations. In between, I had to wait for my mana to recover. Apparently, it was supposed to be slower than Stamina regen of seconds to minutes but faster than Health regen of hours to days. For a Mage, it inched quite close to Stamina. All according to Betty, of course. I couldn't get my Status Window to show actual values. In fact, I had trimmed it further. Removed all attributes - I could feel their effects anyway, and rearranged the status points. I also added a list of spells I had in my repository.

---

### [Novice] Mage - Level 0

| HP      | MP      | SP    | XP    |
|---------|---------|-------|-------|
| 100/100 | 786/800 | 20/20 | 0/100 |

*Spells*

* Incendio
* Petrificus Totalus

*Special Effects*

* Magic Boost - You get extra Intelligence, Perception, and/or Wisdom points on every Class Upgrade

---

Yep, I decided to have only two spells for now. It had been quite a while already. Time flies by when you're having fun. Besides, I was itching to witness my spells "in production". Poor slime balls.

I also learned quite a few things about magic and spell casting. One couldn't directly change the core stats and attributes of a target. Setting HP to zero in one spell would've turned me into the fabled One Spell Man. Too bad. Also, my range was about 2 meters radius, centered around me. Depending on the factors involved, I could either fully cast a spell or not cast it at all. No half measures. I tried freezing a large region of land as an Area Effect attack. No luck. I simply couldn't "select" an area to cast in, just one specific target. Also, all spell-casts took the same amount of mana, irrespective of the target, given that they could be affected. A blade of grass, piece of a boulder and a grain of sand - all took 280 MP on Incendio, even though the effects were dramatically different on each.

As I exited the choke point and traveled across the bridge, I eventually sighted my accomplices. A few colored puddles were splashed about as if a painter had upended his paints in frustration. Up ahead, I saw one unlucky slime being whaled on by Taro, Divin, and Carol with their respective blades. Julie was standing back with the bow in one hand and a loose arrow in another, staring intently but with no apparent intention of firing. Wise choice I suppose, given her aim. Arya was standing beside Julie watching the spectacle. She noticed me as I made my way over and waved her hand awkwardly. I stood silently by their side, becoming a part of the audience. "Any luck with the spell?" she asked. "Oh, you have no idea!" I replied with a smirk.

