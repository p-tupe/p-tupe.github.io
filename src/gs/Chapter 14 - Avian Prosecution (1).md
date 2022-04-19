---
title: Chapter 14 - Avian Prosecution (1)
part: 15
---

## Chapter 14 - Avian Prosecution (1)

I was getting used to the variations in the landscape by now. First the plain fields, then the ruins, finally the hills. I was almost looking forward to seeing what the upcoming level would throw at us. Whatever it was, I did not expect it to be *this*.

Slimes, Chimps, Crocs, and now... Birds? Almost anticlimactic. The terrain was also not that different from the previous level except for fewer hills and more trees. The withered old trees were populated with what looked like vultures to my eyes. They were not even that large!

"This is Level 3 of the Tutorial Dungeon - The Nekhbet Copse!," Betty announced.

"These birds... They are vultures, aren't they?" Taro asserted. 'Damn right they are. Let's just ignore the chatbot and her dramatic naming sense,' I thought.

We were a bit ahead of the entrance. The shock that sneaky crocs had given us made our progress cautious but slow. Seems like it was for naught, as our opponents were out and about, causing a ruckus with their hisses and whines. I have never heard a vulture's sound before but I'm betting they aren't as loud as these.

"Yeah, they look like vultures," Julie stepped up, "There are a lot of them on the tree and below. They might swarm us like the slimes. How should we proceed?"

After some discussion, we decided to let the knights take point. Carol just behind them. Julie went at the end of the formation. Arya and I stood back, deciding to not interfere initially.

Soon, the tree was within shooting distance of the vanguard. Julie notched her arrow and fired at the largest vulture in the group. The birds suddenly went quiet. Her target was near the top of the tree. Her arrow landed about a couple of meters below it. 'Getting good,' I thought. She *was* a fair distance away from her target, so it was impressive.

The birds weren't impressed, however. With a low guttural hiss, the big guy swooped down and headed towards Julie. The rest of the flock of perhaps ten to fifteen followed behind it.

Our four companions admirably stood their ground. Carol intercepted the large bird with her daggers. Just as they were about to pierce the belly, the bird changed directions with a flap of its wings and dodged. The dagger scratched its tail nonetheless, just as its claws scraped past her wrists. Taro and Divin were doing better. Each one was hounded by three or four birds but it didn't seem like a major issue. Their swords had more reach after all. One vulture was already down. I noticed it was hit by Divin's freeze Skill.

Just as the rest of the fowls reached the group, I joined the fight as well. I feared they might outnumber us and we'd have to run away again. The largest was still harassing Carol, while Julie had distanced herself a bit more from the chaos and was now shooting at the dissenters. She got in a hit now and then. Taro and Divin held their ground. I noticed Arya had arrived behind Julie as well, checking if her help was needed.

As for me, I immediately leaped behind Carol and froze the big bird. It was startled and missed its attack. At that moment, I blasted another freezing spell at it. It was in vain though, as Carol's dagger was deep in its heart by then. It barely made a hiss and plunked on the ground. Within seconds, it disappeared in a storm of feathers, leaving behind a tattered cloth that must have been a shirt before it was mutilated.


<br />
 <p style="text-align:center"><strong>¤ ¤ ¤</strong></p> 
<br />


The balance for this level was tilted in our favor. The addition of an extra Knight was nothing to scoff at! Now that I think about it, having 3 front-liners had nothing but helped us all these levels. I wonder what would have happened if instead of a Knight, we had a Craftsman. How would it have affected our fights?

Either way, the vultures did not present any big difficulty. The beaks and claws were sharp, perhaps even more so than the Imps, but that was it. Sure they could fly, but they couldn't attack from the air. They *had* to come down if they wanted to hurt us. And up close, we had better reach and sharper weapons. Their numbers didn't mean much when only a few could attack at a time.

Pretty soon, the rest of the carrion-feeders were gone. I had helped cool down a few more of them after the first. The way their bodies turned into a small tornado of feathers after they died was a sight to behold. There were other tattered clothes dropped. A hat and another shirt, quite past their shelf life.

Everyone had a relaxed smile on their faces. With the sudden-death threat from sneaky 20 feet monsters lifted, we breathed slightly easy. Sure, these guys gave us the most trouble so far, but it was not much danger. Unlike the Imps, their cuts were deeper. They also fought more harmoniously in a group. That was it though. We could take them!

We decided to rest up beneath the tree. Not that we needed shade in the ever-evening. Arya had healed Carol and she moved towards me. "Nah, I'm okay. Heal those two first," I gestured towards Divin and Taro. They took the brunt of the attack and had more cuts than others. "OK," she smiled and moved on to heal Taro.

I, on the other hand, opened up my Status Window to check the gains.

---

### [Novice] Mage - Level 3

| HP      | MP     | SP   | XP      |
|---------|--------|------|---------|
| 103/150 | 34/950 | 2/35 | 136/400 |

---

I already had just under 60 extra from the previous level. 'If I helped kill say, 6 of the birds, then I am getting about 12 or 13 XP per kill', I mused, 'Not bad, I guess'.

After attaining level 3, I could cast Petrificus four times in a row. However, it rarely worked the fourth time. 'I wonder if there is a job I can run that will keep on decreasing the temperature to as low as possible? Or even increase it? Will have to loop on it. I wonder how long it will take to kick in though? Well, no harm in trying out anyway'. I opened up my "spell repository" and quickly added a spell to decrease temperature slowly.

```sh
petrificus_slowly x = while true; do (( x.temperature-- )); done;
```

And my full repo of spells now looked like -

---

```

incendio x = (( x.temperature = x.temperature * 2 ))

petrificus_totalus x = (( x.temperature = x.temperature / 2 ))

identify o = echo o

test = i=0; while [ $i -le 255 ]; do echo "$(get_char $i) $(get_time)" >> password_hack | sudo -S echo; done;

get_char i = printf "\x$(printf %x $i)"

get_time = date +%s%N

petrificus_slowly x = while true; do (( x.temperature-- )); done;

```

---


<br />
 <p style="text-align:center"><strong>¤ ¤ ¤</strong></p> 
<br />


As I was about to add another function to increase the temperature, I heard Divin call out to me. He had sneaked close while I was looking into the window. The rest were still frolicking about below the tree. I was more surprised by the fact that he took initiative to call me out. "Hey, what's up?" I queried.

"What were you and Arya talking about?" he asked with a straight face. I did not understand what he was talking about. Perhaps noticing my befuddlement, he elaborated, "On the last bridge and the one before, when the rest of us were sleeping." 'I guess not all of you were sleeping, eh?' I thought to myself. "Ah that. You see she and I, being a Healer and Mage, can access our editors to create new spells. That is what we were discussing." I replied. "OK" he said impassively and walked away before I could ask anything more. 'What that was about?' I wondered.

I decided to move as well, we had birds to hunt!

