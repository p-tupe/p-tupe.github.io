---
date: "2021-04-27T00:00:00Z"
title: Regular Expression Group Descriptions
---

Assume we have a string date in yyyy-mm-dd format (year-month-day) like so "2021-04-27"

If we were to apply regex on it to extract year/month/day from it :

```javascript
const d = "2021-04-27";

const r = /(\d{4})-(\d{2})-(\d{2})/;

const e = r.exec(d);

console.log(e); // [..., '2021', '04', '27', ... ]
```

We get a jumble of data back in an array, with our matches somewhere in between. Is there a better way? Why yes, there is :

```javascript
const d = "2021-04-27";

const r = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;

const e = r.exec(d);

console.log(e.groups); //  { year: '2021', month: '04', day: '27' }
```

Whoa! Not only did our code get more readable, but our output is precise. And it is all built-in!

What exactly did we do? Well, we simply added "descriptions" to our regex groups:

```javascript
const e_before = /(\d{4})-(\d{2})-(\d{2})/;

const e_after = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;

// (\d{4}) => (?<year>\d{4})

// ?<desc> inside () group
```

---

I haven't made many blog post recently, been working on [Grand Simulation](/gs) the whole time.

But this tip was much too useful to not share, so here we are.

That's all folks!

---

Due credits :

[Addy Osmani](https://twitter.com/addyosmani/status/1386031624232456194/photo/1)

[David Walsh](https://davidwalsh.name/regular-expression-match-groups)

