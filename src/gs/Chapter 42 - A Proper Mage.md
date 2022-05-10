---
title: Chapter 42 - A Proper Mage
part: 46
---

## Chapter 42 - A Proper Mage

"PETRIFICUS_TOTALUS!" I shouted, and flash-froze a labrador-sized lizard with shark-like teeth. The last of its group that had swarmed me. Of course, I was already aware of them due to my new radar powers and had taken down two before they even realized they were under attack.

The sun was high up in the sky, straight above my head. This was the second group of monsters that I had engaged with since I left the camp in the morning, all on my lonesome. I encountered a lot many of them, but mostly I just hid or detoured.

I took shelter in a nearby tree shade, after making sure no monsters lurked nearby. The trees had grown more numerous and green as I traveled. Pulling the waterskin out, I drank the last of its content. Half the water had been wasted on cleaning some of the grime I accrued from the earlier encounter. Not having Tyee to distract the monsters was leaving me fighting them off in closer range than I would like.

Despite the circumstances, I felt I was making good progress. I did not put my "full-force" behind each attack, starting from attacks with twice their normal mana, then moving up from there as necessary. And I never faced any monster without preparing a set of "Rune Traps" first. I had not revealed this trick in front of Tyee for fear of reprisal. Stupefy was my new favorite trap and also an emergency fall-back Spell if any unlucky monster got close enough. My eyes glanced over the charred remains of the scaly creature that had stepped into my Circle of Stupefy.

The mountains seemed to loom ahead on the horizon as always, giving me little sense of how close I was. GPS and Map would've been very helpful. Hell, even some landmarks and a compass would've been appreciated. I closed my eyes and relaxed, unintentionally letting the waterskin fall from my grasp down into the dirt. 'Right. Water.'

I was not technically tired, simply wanting to get away from the sun. And with nothing to distract me, this seemed like a good opportunity to explore my new abilities in depth. And I would inevitably need more water.

'So... a water spell.'

I pulled up my repository and started with a test function like usual:

```sh
create_water_test =
```

'Alright, I remember watching some documentary about the desert. They were taking water right out of the air when it condensed.'

I already had a spell to lower the temperature, and now I could select any random volume in space. That seemed to fit the bill perfectly for the job.

```sh
create_water_test v = petrificus_slowly v
```

I selected a small golf-ball-sized sphere over my palm and muttered "create_water_test".

Less than a minute later I could feel the cold air grazing my palm. While there was no magical droplet of water in the sphere, it did start condensing on my skin.

I smiled, a step in the right direction. But that was the easy part.

I needed water to drink, and clean myself if I had some leftover. Having a couple of droplets was a start but I needed enough to fill the waterskin at least. And fast. It was unwise to linger in one place for long.

I figured the simplest way to condense more water was to occupy a bigger volume. I had a rough sense of how big a volume I could target - closer to a 10 by 10-meter cube. That restriction would hopefully not be an issue.

'Now, how to pull all the condensed water vapor into the waterskin?'

I thought back to Betty's spell, where she utilized gravity to elevate herself. I figured I'd give it a try.

```sh
pull_down x = while true; do x.gravity--; done;
```

I selected a loose leaf from an overhanging branch. "pull_down" I whispered. The leaf stubbornly stood unmoving. I also verified my mana points, they were regenerating quite well without any noticeable dip.

'That's a bust then. What next? What other environment variables should I try? Elevation worked last time, maybe brute-force it? It might work on a leaf, but I doubt it will work to pull a large volume of gas into the waterskin. Maybe I could move the waterbag through the condensed air instead?'

I briefly considered the documentary again. They had a large plastic sheet that had a stone or some weight in the center to guide the droplets into a mug they placed below it. I was trying to do something similar, but also not. My water vapor would be cold and ready to shift phase, but there wasn't a plastic sheet handy for that to happen. I needed to pull all the air into and through the waterskin, where it would fill up.

'Alright, forget environment variables. What else?'

I was in a simulation. A virtual reality. I remembered some tinkering I had done with a 3d game engine years ago. And the more recent work on browser canvas APIs.

'All objects occupy some space on a co-ordinate system.'

A flood of new ideas was let loose, I let my mind grasp those concepts and apply them in this context.

'Alright, on the canvas at least I knew the absolute coordinates of each entity. Here, I have no clue. Hmm... so relative it is!'

I selected the same leaf again, now swaying in the slight breeze but still clinging on.

'So, if I want to pull it into my hand, I'll set my palm as the origin. x, y, and z coordinate set to zero.'

Starting from my palm up towards the tree, I selected a cone-like volume with the leaf just inside the flat base.

'Oh right, need to update the function!'

```sh
pull_down o = while true; do o.x--; o.y--; o.z--; done;
```

I did not know the esoteric mathematical equations needed to pinpoint the position of the leaf inside the volume, but I did not need them. Since I was reducing its coordinates to zero, it would move to my hand no matter where it was.

I had a pretty good feeling about this one. The system seemed to consider "intent" when parsing functions, and since my functional logic was flawless, I did not expect to fail.

"pull_down," I spoke up, keeping my palm as steady as possible.

The leaf stopped swaying. I noticed my mana regeneration slow down but overall mana kept increasing. The spell didn't seem so mana hungry but was taking far too long to produce any effect. So I forced it along by adding 100 mana to the process.

The leaf immediately tugged free of the branch and slapped down into the ground beside me instead of my hand. So much for "flawless" logic. But it didn't diminish the joy in my heart. The system may have kept the abstraction of environment variables hidden from me, but I was not above getting my hands dirty with some low-level hacking. "Heh, take that!" I kicked the leaf at the imaginary creators. It merely tumbled away, free of my magic.

"Right, back to the main task! Need to account for negative co-ordinates."

I modified the water function to pull condensed vapors in at the point.

```sh

pull_down o = while true; do
  if [[ o.x > 0 ]]; then o.x--; fi;
  if [[ o.y > 0 ]]; then o.y--; fi;
  if [[ o.z > 0 ]]; then o.z--; fi;
done;

create_water_test v = petrificus_slowly v | pull_down

```

My mana was above 3000 now, I decided to go all out. Picking up the waterskin from the ground, I stood up and held it in my hand, then selected a conical area again, but now as big as I possibly could.

"create_water_test," I almost shouted, and poured a thousand mana into the spell. It was perhaps a tad bit too much, as immediately, super-cooled air squeezed into the waterskin and threatened to blow it away like an errant balloon. I used my other hand to support it from below, and it stood safe despite making a whining noise from all the air whooshing in.

It went on for several seconds, and I noticed my hands numb from the cold. So numb that I had missed the glistening drops of water falling from them, forming a damp circle in the dirt below. It slowed down after a while, and I activated my Circle of Protection as well. 'Next time, I should activate it _before_ starting the experiment like a sane person.'

My hands warmed down pretty fast after that. And I noticed a heft to the waterskin I was holding. It was perhaps quarter filled. I took a cold sip. I wasn't thirsty but boy that felt good! Sweet rewards of hard work.

Of course, the next step was to change the names of the functions, something I dreaded and loved in equal measure. It was easier this time, as I actually remembered something related.

First, I renamed my "pull_down" function, then used it with the Latin word for water to make a cool sounding spell:

```sh

accio o = while true; do o.x--; o.y--; o.z--; done;

accio_aqua v = petrificus_slowly v | accio

```

I could already imagine the scary reusable utility of accio. There was already a half-formed idea of using it to hurl huge molten boulders at monsters. 'Perhaps something to "push" as well?' Instead of reducing coordinates to zero, I would simply increase them, moving all objects in a volume away from whatever I designate as the origin. Not unlike a "Universal Push". I snickered. 'Perhaps stick to a single naming theme?' A thought for the future anyway.

I tied the waterskin to a rope that I had fastened around my waist, as a belt of sorts. The sun had slid slightly ahead and to the right. Still unceasingly hot and right in front of my eyes. I deactivated the Circle of Protection, my mana stooping below 1000. But without any active spell, I watched it climb back up in great strides. I pulled the hood over my eyes and settled in the now lengthy shadow of the tree.

Alone. Truly alone for the first time. I wasn't _scared_ per se. But I was loath to take even a light nap. Having people around did wonders for anxiety. Not that I was anxious yet. But I knew time was not on my side. Sure, the water situation was resolved, but food was still an issue. I had enough rations to last me a couple of days, four if I stretched. Hunger would hold me then. 'If only there was a way to magic food!'

I couldn't rest as I had hoped. I kept scanning the landscape actively every few seconds for magical movement, fearing I might miss it if I wasn't paying attention. All a monster had to do was get in range to bite me. And not all monsters need a bite to be lethal. Even with all the power I had, the situation was quite ridiculous. 'I need a shield spell or something.' For now, I did plan to have the place wherever I camped absolutely packed with Circles from all sides, but that didn't seem like a sustainable strategy. 'Maybe something that could create a dome of protection or a barrier? Perhaps an instant escape route as well, like teleport or something?'

The new ability was letting my inner nerd out. I already knew teleport was possible, having done it once. But it likely messed with numerous environment variables and required privileges not accessible to me. I touched briefly on the other tele-like spells. Telepathy I discarded, for now, something like the message crystals would be useful instead. Another thought occurred. 'Holy... am I capable of telekinesis now?' Technically, I could only pull and push stuff. But since I could specify in which direction that would happen, that might as well be the real deal. The smile on my face returned. I was resembling a proper mage now. I decided to abandon the idea of resting and got up, continuing my solo travel. Hopefully heading in the right direction.
