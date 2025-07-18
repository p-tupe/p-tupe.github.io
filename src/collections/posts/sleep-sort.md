---
date: "Fri Jul 18 09:11:41 EDT 2025"
title: Sleep Sort
---

## Behold

```javascript
const arr = [1, 5, 9, 7, 2, 8, 4, 3, 6]
arr.forEach((x) => setTimeout(() => console.log(x), x * 1000))
// Output: 1, 2, 3, 4, 5, 6, 7, 8, 9
```

Try it yourself, open a browser console window and paste this code!

## What sorcery is this?

<button id="secrets-btn" onclick="revealSecrets()">Reveal the secrets!</button>

<div id="animation">
    <span id="timer">Time: 0s</span>
    <div class="spacer"> </div>
    <span id="num-1" class="num-box">1</span>
    <span id="num-5" class="num-box">5</span>
    <span id="num-9" class="num-box">9</span>
    <span id="num-7" class="num-box">7</span>
    <span id="num-2" class="num-box">2</span>
    <span id="num-8" class="num-box">8</span>
    <span id="num-4" class="num-box">4</span>
    <span id="num-3" class="num-box">3</span>
    <span id="num-6" class="num-box">6</span>
    <div class="spacer"> </div>
</div>

## More resources for the curious

- [Reddit Link for code inspiration](https://www.reddit.com/r/programminghorror/comments/lgsd18/i_present_sleepsort/)

- [AlgorithmByExamples | Python](https://python.algorithmexamples.com/web/sorts/sleep_sort.html)

## Bonus Example

Here's a `go` code example, just for kicks:

```go
package main

import (
	"fmt"
	"time"
)

func main() {
	arr := []int{1, 5, 9, 7, 2, 8, 4, 3, 6}
	rec := make(chan int)

	for _, n := range arr {
		go (func() {
			time.Sleep(time.Duration(n) * time.Second)
			rec <- n
		})()
	}

	go (func() {
		time.Sleep(10 * time.Second)
		close(rec)
	})()

	for {
		n, ok := <-rec
		if ok {
			fmt.Println(n)
		} else {
			fmt.Println("Voila!")
			break
		}
	}
}
```

<br />

<style>
button#secrets-btn {
    color: white;
    background-color: var(--link-color);
    padding: 1em;
    border-radius: 1em;
    cursor: pointer;
}
button#secrets-btn:disabled {
    color: white;
    background-color: var(--subcontent-color);
}

span.num-box {
    padding: 0.5em;
    border: 2px solid var(--emphasis-color);
    border-radius: 3em;
}

div.spacer {
    margin: 1em;
}
</style>

<script inline>
function revealSecrets() {
    const secretsBtnEle = document.getElementById("secrets-btn")
    const animationDivEle = document.getElementById("animation")
    const timerSpanEle = document.getElementById("timer")

    secretsBtnEle.disabled = true

    const numIds = [null,]
    for (let i = 1; i < 10; i++) {
        const ele = document.getElementById("num-"+i) 
        numIds.push(ele);

        setTimeout(() => {
            animationDivEle.removeChild(numIds[i])
            numIds[i].style.border = "2px solid var(--link-color)"
            numIds[i].style.marginRight = "6px"
            animationDivEle.appendChild(numIds[i])
            timerSpanEle.innerHTML = "Time: " + i +"s"
        }, i * 1000)

        setTimeout(() => {
            timerSpanEle.innerHTML = "Voila!"
        }, 10*1000)
    }
}
</script>
