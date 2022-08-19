---
title: Chapter 50 - Area of Effect
part: 55
---

# Chapter 50 - Area of Effect

"One fire spell, one ice spell," I murmured lightly, "one lightning spell, one light spell, one sorta-gravity spell." I wondered if I should count the others. 'Might as well.' "Two curse derivatives, two utility spells, and finally one no-op hack."

I had a total of 7 base attack spells and several variations on how I could use them. I could use them directly or lay 'em series of Rune-traps, I could boost or reduce the effect by controlling the volume of mana supplied. And I could combine the above to multiply my effective repertoire of "Skills". I was approaching parity with what a Mage could achieve without System getting in their way. In fact, I believed I could further eclipse what "normal" Mages could achieve with an increase in level and my understanding of the System.

Was I satisfied with the status quo?

'Hell nawww!'

From my perspective, I had been given free rein over the underlying nature of this reality that no one else currently enjoyed. 'Parity with same level Mage?' I scoffed, 'I should be pawning them to moon and back.'

"Sire?" Carla's voice echoed beside me. She had been keeping close to me since the dawn when we started from the camp on our return journey back to the Lohengramm household. Johnathan had received a communication from his dad, who had received one from Francisa's dad. The search for the keys was considered the highest priority mission, and all Heroes were converging back on the palace intent on setting off to the south to retrieve the "Faerie Key" first.

So the world still behaved according to video-game rules. That was good to know. The Maricha had shaken me enough that I believed our main goal of ending the Calamity would be sidestepped for the other short-term stuff and we'd get lost in innumerable side-quest chains. The main quest was still on. 'Perhaps that would be game-like too, if how many players play it.'

"Nah, just thinking about my options. What Skills do other Mages around my level usually have?" I had my quest list and spell-repo opened side-by-side. Today, after a long absence, I was back to the activity that brought me the most joy. Experimenting on new spells!

Carla gave it some thought. I glanced around, noting the small group I was part of for the past few days. Carl was off scouting far ahead, still visible to me so not _as_ far. Julie and John were a few steps behind us, Julie chatting away excitedly while John nodded every once in a while. Something was going on between them but it _really_ wasn't my business, so I hadn't brought the matter up with Julie. Maybe I should mention it to Carol, she will surely -

"A shield of some kind, I say." Carla interrupted my thoughts. "I've noticed you have quite the firepower Sire, but little means of defending yourself. Most Mages have a rudimentary shield of some manner against most physical and magical attacks."

I nodded. I was working on a defense Circle already, hoping that it could be stitched into clothes or embedded on some artifact. But I barely could get a normal defense Circle to work, let alone a mobile one. Perhaps I was going about it wrong. How would one go about outright blocking attacks? Use the accio spell creatively for physical? That would be deflecting them more than blocking if that would even work. And magical attacks? I'm sure the environment variables had some use-case here but to hell with _that_ waste of time.

"Mayhap a close range attack would've been nice as well when you get surrounded and lack a proper shield." She added, nodding to herself.

Now that, I hadn't thought of it at all. I could use area-of-effect attacks in close range but I would get caught in them as well.

"Hmm... Interesting." I immediately scanned my repo for inspiration. Soon enough, I had it! In fact, I had already thought of such a spell before but more so as a joke than as a serious contender for a concrete implementation.

I waved the quest list away, concentrating on the repo. 'Alrighty, here we go.'

```
test_aoe =
```

I thought about it a bit, more to ensure that I wasn't missing anything crucial. It was as simple as a spell could get.

```
test_aoe targets =
```

That's right. A "universal push" that would punt away everything around me. Well, all the targeted monsters at least. Pushing away a volume of air wouldn't matter. Of course, that meant I was limited to the number of "points" I could select at a time but that was a problem for future Pat.

Now, on to the nitty-gritty:

First, the target would be the center of the blast. Or "origin" as I like to designate it. I would have to consciously target a sphere around myself.

The "targets" would be a list of selected monsters; I'd loop on each and push it further away from me in a direct reverse of accio.

That's all. 'So simple!'

"..Oi!" Julie poked me in the side.

"Oww, what?" I nursed the spot. She hadn't been gentle.

"The carriage is here, you can have your fun inside, yeah? Carla's been trying to bring you back to your senses for a while."

I surged out of the tunnel-vision from my Status Window and noticed the carriage arriving near us, Carl already seated beside the driver. The carriage was supposed to be our ticket to the capital. As I breathed a sigh of relief seeing the lack of visible decorations, I heard Julie gossip behind me: "See, that's how you wake him up. He gets like this sometimes." 'Oi, what new rumors is this woman spreading.' Julie smirked at me, Carla sending a measuring glance my way.

"Come, you can gawk at each other later, our ride's here."

"W-what?" Carla sputtered. I just sent a withering glance at Julie. She really had changed. I hadn't known her to be the teasing type of gal. Guess all that extra energy had to go _somewhere_.

"Let's go." I sighed and got on the carriage. I'll be seeing Arya, Carol, and Francisa soon. Divin and Taro would arrive later as well. I was quite looking forward to how each had progressed.

<br />
<p style="text-align:center"><strong>¤ ¤ ¤</strong></p>
<br />

I had my Status Window open, but my attention was on the shifting scenery outside. The carriage was speeding quite fast on the lonely route, despite the poorly maintained state of the road.

The rapidly moving greenery reminded me of the rides through country roads back home. I held back a sigh, coming back to the task at hand.

'So, for each target "t", increase the distance between it and origin.'

I started off with a simple outer loop to keep it going, then an inner loop through the targets.

```
test_aoe targets = while true; do
  for t in targets;
    do
    # todo push here
    done;
done;
```

Now, for the reverse accio logic:

```
test_aoe targets = while true; do
  for t in targets;
    do
      t.x++;
      t.y++;
      t.z++;
    done;
done;
```

'Aaaaand done!' No need to even check the bounds, they can go to infinity for all I cared. 'Heh, imagine that!'

"Something the matter, Sire?" Carla piped up from beside me.

The carriage was not as large as the Royal one, it had enough room for 6 people to squeeze in. With just the four of us inside, we had spread out comfortably. Carla and I took one seat while Julie and John took the other facing us.

I was momentarily confused by her query. Why would something be the matter? I was just sitting here doing my thing.

"You smiled out of nowhere," Julie helpfully supplied with a smirk of her own.

'Ah.'

"No matter as such," I smiled again gently, "Just finished a -" I stopped. 'Should I tell them I can make new Spells on my own? How will it affect the storyline?' I was glad I managed to shut my mouth before my brain caught up. 'How do I spin this?'

"New Spell, right?" Julie asked innocently.

'Aargh. What the hell, Julie!'

Both John and Carla were looking at me with wide eyes. I had to control this immediately. Now, I couldn't outright lie that I didn't have a new Spell.

"Yeah, a new Spell." A truth. "I got this book about beginner Spells from Neysaa in Capital." Another truth. "I've been experimenting with it." Final truth. And the lie is nicely tied up with a bow on top. 

It was common for new Mages to experiment with their "terminals" or however they saw their Spells. Hell, most of the Mages got their specialized "Skills" from family-heirloom Spellbooks.

I needed to have a talk with Julie about sensitive information. Thankfully, she kept mum as I vaguely explained to Carla what the "test_aoe" was about. I couldn't keep calling it that though. It needed a new name.

"What is this Skill called, Sire Hero?" John asked coincidentally.

I stared at the dipping Sun cresting the tree-line, drowning in the memories long buried. A name rose unbidden to my lips like a blast from the past. With a smile that stretched across my face, I whispered:

"Depulso"

