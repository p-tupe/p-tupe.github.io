---
title: Chapter 13 - Timing Attack
part: 14
---

## Chapter 13 - Timing Attack

```sh
test = echo "Hello, World!"
```

"Test," I whispered. A new window opened up.

---

### Hello, World!

---

I was almost certain that it would work but still sighed in relief. Then I quickly modified the program, coming to the crux of the issue.

```sh
test = sudo echo "Hello, World!"
```

I took a deep breath. Crossed my fingers. Whispering with my eyes closed, "Test". I opened a single eye and my lips unconsciously curled into a smile.

---

### Password:

---

'Hallelujah!' I celebrated in my mind. There _is_ a superuser!

"So it worked?" Arya asked out of nowhere. I beamed at her blankly for a moment. "You did your evil smirk again," she clarified.

"Okay, first off, it is a normal smile. And second, yes. I got want I was looking for. As for whether I can use it or not, the jury is still out on that one," I said.

"So, can you tell me now what the spell is?" she beamed back. She had grown peculiarly interested in programming. 'Perhaps she wants to make a powerful resurrection spell or something?'

"Okay. In normal computing, there is a concept of a superuser, who can do stuff normal users cannot. Ummm, for example, think of a corporate building. You have your cleaners, workers, security, and so on. Many people with various roles and access to different rooms and tools. Then there is the owner or an administrator of the building. That one has access to all the rooms and all the stuff of the building. A superuser is something like the administrator. I mean, bad example but close enough. In Windows, the user is called an Administrator; on Unixes it is called a 'root' user," I tried to explain.

"Ah, I understand. So, what has your spell got to do with an administrator?" she asked.

"Hmm, well you must know by now that these spells are nothing but programs, right? If I can get superuser rights, then -"

"Then you can access tools and do stuff that you normally couldn't!" she cut me off and concluded.

"Well, yes," I replied. 'She is quick on the uptake.'

"So how do you become an admin?" she continued.

"That is the problem. You need a password," I said with a bitter smile.

"And how will we get this password?" she prompted unabashed.

'Brute force? Nah, I don't have years to spare for it to complete. I don't have handy dictionary either. Hmm, will it be susceptible to attacks though? Even our Earthly systems are so air-tight for the most part, this is an alien super system we are talking about. Maybe...'

"I'm gonna try something called as timing attack." I paused, rearranging my thoughts. "It works by checking the time of a system's response against different inputs. Imagine you entered a fully wrong password, like all characters incorrect. And the system denies entry after processing for a bit. Now, you enter a wrong password again, but half your characters are matching the real password. System will deny you entry again, but the time it takes to process your input will vary."

"I don't get it, why will the time be different? And how will it give us the password?" she asked.

"Hmm, perhaps an example will help? Assume the real password is 'abcd'. And the system checks each letter of your input against the real one when verifying. Now, if you enter 'wxyz', the system matches 'w' as first input against 'a', which is incorrect, so it immediately denies request. Next, you put in 'axyz'. It will check if letter of input 'a' with real pass 'a', give okay, move on to next letter 'x' and match against 'b'. It denies again here but the time it took to deny was more that of before because it took more time to process the correct input at the start. Thus, you unravel each letter one by one until your 'wxyz' turns into 'abcd' and voila - you have the password!"

"Oh wow, that is some neat trick." She reflected on it for a while. "Hey, my mana is back up, I'm gonna go cast heal. Best of luck with the password." She went back to her grind. I went back to mine.

<br />
 <p style="text-align:center"><strong>¤ ¤ ¤</strong></p> 
<br />

I was pessimistic. Good thing I had nothing but time on my hands - at least until Arya leveled up. I decided to give some random words a try first, you never know.

---

### Password: password

---

I added the password with a thought. The window just vanished. No 'Hello, World!'. I noticed I was down 2 mana. 'Come on, I'm not even doing anything!' I wailed.

More determined than ever, I tried several more variations. No dice.

'I can't manually keep entering a password. A few more and I'll forget what I entered previously. Nor would I be able to cover all the characters.' With that thought, I decided to automate it.

```sh
test = while true; do echo "password" | sudo -S echo "password worked"; done;
```

I cast the spell. One mana point down. I didn't see the window prompting for the password. Another second down, another mana point gone.

'What is this? A background job? I see. Since the system is unable to determine how many resources this spell will consume, it is taking it in as it requires,' I mused. 'Alright, now that we have a loop, let us get our characters in! First, I need a loop going from 0 to 255 to cover all chars. And I need to stream the output into a file.'

```sh
test = i=0; while [ $i -le 255 ]; do echo "$i" >> password_hack | sudo -S echo; done;
```

'Now, instead of numbers, let us feed it characters. Maybe the old printf trick?'

```sh
get_char i = printf "\x$(printf %x $i)"
```

'Alright, this will take a decimal i and return the corresponding character. Next is... Ah right, the "time" function.'

```sh
get_time = date +%s%N
```

'Right, so this will give us time in nanoseconds. Now to put it all together...'

```sh

test = i=0; while [ $i -le 255 ]; do echo "$(get_char $i) $(get_time)" >> password_hack | sudo -S echo; done;

get_char i = printf "\x$(printf %x $i)"

get_time = date +%s%N

```

I ran each function and made sure everything worked. By the time I was done, Arya was looking fixedly at me again. "You were gone for quite a while just now. How's the password hacking going?" she queried. I was getting used to her being a curious cat by now, so I simply replied: "I've got the code down, I think. But I don't have the mana required to run it to the end right now. Maybe later? Quite a shot in the dark though, I don't expect much," I sated her curiosity, "Are you done?" I queried in return. "Yep, I'm level 3 now!" she exclaimed. "Congratulations," I smiled in return. "Should we wake the others now or do you wanna rest some?" "Nah, let's get going," she declared. And so, we woke the others and got going.
