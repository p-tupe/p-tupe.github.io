---
date: "2020-04-28T00:00:00Z"
title: Free Ebooks - Haskell Webcrawler
---
 

_So I've been learning a new language "Haskell" during this quarantine period; a couple of days ago, my uncle sent me a pdf with links to ebooks apparently worth thousands of dollars, that springer.com is hosting for free during the quarantine. I opened the pdf and saw a list of about 400 books; an idea immediately struck my mind - what if I wanted to download them all? Click on each link and open the page then download from there? Meh, who'd do that. This was a good challenge to write a web-scraper using Haskell; I'd learn a lot of new stuff and get some job done as well. So I did. Then, I thought I'd share the stuff with y'all. So here is this post._

## TLDR; I wrote a program to download free ebooks. Link here : [Source code](https://github.com/EMPAT94/haskell-practice/tree/master/web-crawler)

First things first, we need links to download the books. The links are inside a pdf. So, we need to extract them from there. I wrote another small program to do the same and got the links into a separate text file. Also, since all the links are same with only the isbn number changing, I removed the redundant part and kept only the isbn number in the file. If you want, you may use this file or write your own parser. Since this process isn't part of crawling, I'll omit the explaining part as well.

## Ebooks Links pdf :  [Link](https://github.com/EMPAT94/haskell-practice/blob/master/web-crawler/ebooks.pdf)

Next, the crawler. If you click on the link inside the pdf, you'll find yourself on a web page providing the actual download link, which is different from the link in the pdf. So we have the following steps to follow to get the ebook on our drive from the pdf link : 

1. Open download page using provided link
2. Parse the download page and get download link for pdf
3. Use the pdf download link to fetch the actual book

I won't go into explaining the actual code. The above 3 steps are pretty much all that is needed to understand the flow. See the source for the internal working.

## [Source code](https://github.com/EMPAT94/haskell-practice/tree/master/web-crawler)

## Note :

I should emphasize that I have _just_ started learning the language - I am maybe about a week or two into it. So, do not use my code as a "proper" reference. There are better references. In fact, if there is something that I can improve in it, please let me know. 

## Note 2 :

I doubt any of you would read all 400 of those books. Most of them seems to be related to science and tech but span a wide range of fields. Might I suggest taking a look at the ebooks.pdf document, note the isbn numbers of the books you'd like to have, then keep only those in the ebook-isbns.txt file and run the program. You'll download only those books you want, no need to waste disk space or network bandwidth.

## Note 3 :

Actually, there is no note 3. Hahaha. Enjoy Reading!

