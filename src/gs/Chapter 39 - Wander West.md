---
title: Chapter 39 - Wander West
part: 42
---

## Chapter 39 - Wander West

The Sun was shining high up in the sky like a spiteful overlord. I took another miserable step cursing my dark robe covering me head-to-toe. I wondered if desert rules applied here. I did not dally long, however, as the Centaur set an unrelenting pace.

"Tyee, slow down, please. My human legs can only go so fast!" I called out for the third time since we set off.

"Hmpf," he snorted from up ahead, "Perhaps a small break is in order."

I rejoiced in my head and followed him to a shade under a withered tree nearby. The landscape was scarily similar to the semi-arid levels of the Tutorial, although thankfully absent of any monsters so far.

"Do you think we lost them?" I asked after taking a sip from the leathery water bag.

"Perhaps. The human rangers are as famous for their tracking skills as Centaurs are for their hunting. They will track us until and unless we make it nigh-impossible to do so safely." He replied, declining my motion of the waterbag towards him.

"Is that why we are headed west?" I looked up towards the mountains piercing the clouds far ahead. "Towards the Dragon Peak?"

"Yes," he followed my gaze, "There is a buffer of uncontested land between the Tadako hunting grounds and the Dragon Peak. It is mostly inhabited by various monster species, especially closer to the sierra. We won't head deeper there, only cruising along the edges to make tracking us difficult."

"I see..." 'We will use monsters as our shields.' But one statement struck out. "Hey, why are there more monsters closer to the Peak? Shouldn't they be further away from the Dragons?"

Tyee looked at me. I saw him amused for the first time since last night. "They see the lands in our direction as courting death since our hunting bands frequent these parts. The Dragons, however devastating, rarely come down from their high homes. So that region is relatively safer for the monster population." I opened my mouth to ask another question before he forestalled me with a raised palm. "Rest. We still have a long way ahead."

I acquiesced, sitting down with my back against the sturdy trunk and Tyee trotted off examining the flora around. Before I closed my eyes, I decided to take a look at my Status Window, expecting a level up from the Assassin.

<br />

---

### [Master] Mage - Level 21

| Status     | Points    |
| ---------- | --------- |
| Health     | 965/965   |
| Mana       | 2870/2870 |
| Stamina    | 34/107    |
| Experience | 398/2200  |

| Attributes   | Points |
| ------------ | ------ |
| Strength     | 22     |
| Vitality     | 22     |
| Agility      | 22     |
| Dexterity    | 23     |
| Intelligence | 34     |
| Perception   | 31     |
| Wisdom       | 27     |

_Special Effects:_

- Magic Boost - You get extra Intelligence, Perception, and/or Wisdom points on every Class Upgrade.
- Hero's Boost - You get 100-300% extra experience.
- Test Subject Perk - Unlock special areas.
- Other Worlder Perk - Immune to perpetual illusions and mind control Spells.
- [Master Mage Robe] Augment Perception/Wisdom (active) - You get a major reinforcement to casting and defense.

---

<br />

'Finally, my health is reaching the 4-digit mark now! Far cry from the measly 100 that I started with. Now, how about my spell repo?'

<br />

---

```

# 10 mana
identify o = echo o

# 150 mana
incendio x = (( x.temperature = x.temperature * 2 ))

# 150 mana
petrificus_totalus x = (( x.temperature = x.temperature / 2 ))

# Exponential mana; Deadly! killed the pather within minutes
petrificus_slowly x = while true; do (( x.temperature-- )); done;

# Haven't tried yet
incendio_slowly x = while true; do (( x.temperature++ )); done;

# Exponential; helpers
create_low_point l = while true; do (( l.potential-- )); done;
create_high_point h = while true; do (( h.potential++ )); done;

# High exponential cost; does not damage much but very good distraction
stupefy xs = i=0;
  for x in xs;
    do
      if [ $(( i % 2 )) -eq 0 ];
        then create_high_point x;
        else create_low_point x;
      fi;
      let i++;
    done;

# Low exponential consumption; beautiful to look at.
lumos hr lr = create_high_point hr && create_low_point lr

# Takes far too much mana; no-op so far
hack_pass = i=0;
  while [ $i -le 255 ];
    do
      echo "$(get_char $i) $(get_time)" >> password_hack | sudo -S echo;
      let i--;
    done;

# Helpers
get_char i = printf "\x$(printf %x $i)"
get_time = date +%s%N

```

---

<br />

I bitterly removed the tail-end comment for petrificus_slowly, it didn't seem so deadly anymore. My repo was starting to resemble a hacked-together shell script. 'I wonder if I could modularize things somehow?' That experiment was for another day, however, as I opened my final quest list window that I had mostly neglected.

<br />

---

- Main Quest

  - Escape simulation
    - ~Complete tutorial~
    - Find exit.
      - Related to a dungeon somehow.

- Side Quests
  - Extract core password
  - ~Create new rune~
  - Defeat the calamity?
    - Looks like an infection.

---

<br />

I cleared the completed tasks and added "Study mysterious Key" to the list, which seemed interesting enough to warrant a separate entry. I decided to work on a new water-related spell next, no need to forage around for streams or depend on dwindling stale leather bags while out and about. Maybe add an earth spell to the arsenal as well? 'That will complete all the base elements at least, eh?'

<br />
<p style="text-align:center"><strong>¤ ¤ ¤</strong></p>
<br />

Wondering about how to use water spells had me stumped. Perhaps using the rocks would be easier? I had unfortunately lost the only reference book I carried with all the goings-on. I decided to postpone any deliberation on that, instead choosing to make small talk with Tyee who was gradually starting to speed up ahead. Again.

"Hey!" I called out. He slowed but didn't look back. "So, what did you talk about with Kai yesterday?"

He slowed to crawl, then asked carefully, "What?"

"You know, last night. Kai said she had some words for you. Isn't that how you knew to keep watch on me? What else did you guys discuss?"

He stilled as if trying to maintain his breathing constant. "Why do you ask?"

I was getting a bit weirded out. I just wanted to make a conversation but somehow had stepped on a landmine. "Um, just curious. Never mind."

He exhaled out his breath, shoulders sagging a bit. "We all have our burdens to carry Hero." 'Yes, very mysterious, but doesn't mean much.' "Besides, we're here."

I looked around, hoping to glean some idea of where we were. It was late afternoon, so the Sun wasn't so sweltering anymore. A mild breeze struggled to lift my robes, the sparse vegetation around us swaying slightly. The scene, although pleasing, wasn't different from what I had been seeing ever since dawn.

Tyee snort-chuckled, then pointed in distance at a tall grey-brown tree that had more branches than leaves. 'How does a tree like that even work in this climate?' I wondered but noticed movement among those branches. A beak protruded from the foliage, followed by the rest of the patchy feathered mass. 'A vulture!'

"We have arrived at the edge of untamed lands." He pulled his bow out with a graceful flourish. "Beware" he declared, "For there be monsters here." Then he notched an arrow, a slight smile dancing along his lips, "and it is hunting season!"
