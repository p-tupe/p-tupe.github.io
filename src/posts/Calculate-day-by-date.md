---
date: "2018-01-17T00:00:00Z"
title: Simple way to calculate the day for any date
---

_Disclaimer : I found this method on YouTube; I merely wrote it down for convenience (so I can make a program someday) and thought I should share it with you all._

_Here's the source : [Video Link](https://www.youtube.com/watch?v=714LTMNJy5M)_

## Prerequisites

1. Let Sunday = 0, Monday = 1 .... Saturday = 6

2. Doomsdays -

    The day shared by specific dates (day changes by year, dates remain same)
    
    Jan/3(4th in Leap), Feb/28th (29th in leap), Mar/14th, Apr/4th ... can be written as
    
    1/3(4), 2/28(29), 3/14, 4/4, 5/9, 6/6, 7/11, 8/8, 9/5, 10/10, 11/7, 12/12
    
    For even months, it's same date as the month (expect Feb)
    For Feb it's the last day (29 or 28 depending on leap or not)
    For odd months : working 9/5 on 7/11 (reverse holds true), Pie 3/14, Jan is 3rd or 4th (Leap)
    
    Eg : 2018's doomsdays are all Wednesdays

3. Century Code -

    In gregorian calendar, dates repeat every 400 years. so only 4 century codes possible/required
    
    ...
    1500 1600 1700 1800
    1900 2000 2100 2200
    2300 2400 2500 2600
    ...
    
    3(Wed) 2(Tue) 0(Sun) 5(Fri)
    
    Eg : 2000's doomsday = Tuesday => 2000's code = 2

## Algorithm

Input = dd/mm/yyyy

1. Century Code = I (from Prerequisite no 3)
2. 00yy/12 = Quotient (M) + Remainder (R)
3. R/4 = Quotient (L) + Remainder
4. I + M + R + L = X
5. X/7 = Quotient + Remainder (D)  (from Prerequisite no 1)
6. Y = date of doomsday for given mm (from Prerequisite no 2)
7. | dd - Y | / 7 = Quotient + Remainder (T)
8. (D + T) / 7 = Quotient + Remainder (Output/Answer)

## Notes

-> Variable assignment :
    Quotient (A) + Remainder (B) means A = Quotient and B = Remainder

-> These variables represent fingers on the hand (for manual calculations) :
    I = Index, M = Middle, R = Ring, L = Little, T = Thumb

-> All calculations involve whole numbers only

-> D stands for Doomsday; so named by the inventor of this method John H Conway

-> For more (visual) explanation, please refer to the video

## Examples

Eg 1 : Day on 6th Dec 2030

1. I = 2
2. 30/12 = 2 + 5 => M = 2, R = 6
3. 6/4 = 1 + 2 => P = 1
4. 2 + 2 + 6 + 1 = 11 => X = 11
5. 11/7 = 1 + 4 => D = 4 (Thursday)
6. Y = 12 (From mm = 12)
7. | 16 - 12 | / 7 = 0 + 4 => T = 4
8. (4 + 4) / 7 = 1 + 1 => Ans = 1 = Monday

Eg 2 : Day on 23rd Sept 1105

1. I = 3
2. 5/12 = 0 + 5 => M = 0, R = 5
3. 5/4 = 1 + 1 => P = 1
4. 3 + 0 + 5 + 1 = 9 => X = 9
5. 9/7 = 1 + 2 => D = 2 (Tue)
6. Y = 5
7. | 23 - 5 | / 7 = 1 + 4 => T = 4
8. (2 + 4) / 7 = 0 + 6 => Ans = 6 = Saturday
