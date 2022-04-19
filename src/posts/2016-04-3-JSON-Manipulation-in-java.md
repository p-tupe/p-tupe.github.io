---
date: "2016-04-03T00:00:00Z"
title: JSON Manipulation In Java
---

## Prerequisites :

1. An IDE (I'm doing in Netbeans v8.1)
2. json simple jar
(Download at http://mvnrepository.com/artifact/com.googlecode.json-simple/json-simple/1.1.1)
3. Patience

## Problem Statement :

The example I've used is extraction of info from Twitter Data-set that was in json format. This is a program similar to a mini project that I once did. The program crawls through each tweet and extracts following entities:

1. Hashtags
2. Place name
3. Follower Count
4. Screen Name

These entities are stored in linked-lists and copies of these linked lists are used for processing and information retrieval which consists of :

1. Top n Hashtags that have been tweeted.
2. Top n Places from where the users have tweeted.
3. Top n Users (Screen Name) that have most Follower Count

Where n is User Defined at Run-Time.

## Code Explanation :

### Setup

  a. In Netbeans, create a new project and add the jar file by right clicking on "Libraries" and then "Add Jar"

  b. import following -

```java
import java.io.*;
import java.util.*;
import org.json.simple.*;
import org.json.simple.parser.*;
```

Note :- I won't be explaining the entire code, but just for the hashtag parameter. Rest is easily understandable.

### Create a new JSON Parser object along with variables for parameter processing -

```java
JSONParser parser = new JSONParser();

LinkedList<String> hashtags = new LinkedList();
ArrayList<Integer> count_hash = new ArrayList();
String topHashtags[];
int topHashtagsCount[];
```

### Input your file into the parser (File must be filename.json i.e. in pure json format)

```java
JSONArray a = (JSONArray) parser.parse(new FileReader("src\\bdaminiproject\\twitterData.json"));
```

Note :- I've initialized a JSONArray to parse the file because all my tweets are objects inside an array.
Like this - [ {tweet1}, {tweet2}, {tweet3}, ..., {tweetn} ]

Your json may be just an object instead of array, adjust accordingly.

### Now, for each tweet inside the array, create a new JSONObject of the tweet so as to access the information inside.

```java
for (Object o : a) {
    JSONObject x = (JSONObject) o;
    ...
}
```

### Now, to extract information, we must know the structure of our object. My tweet object is like this (note that text is italics is modified to protect privacy) -

```json
{
    ....
    "user": {
        ...
        "screen_name": "XYZ",
          ....
         "followers_count": 495,
          ....
    },
     ...
    "place": {
        ...
        "name": "PQR",
         ...
    },
     ...
    "entities": {
        "hashtags": ["text" : "hashtag", "text": "hashtag_2"],
         ...
    },
    ...
}
```

So, "hashtags" is an array of values inside object "entities" inside each tweet object x.

### Extract each hashtag and store it in the linked list while adding a new count in arraylist. If the list already contains the hashtag, then increment the corresponding count in arraylist. Given that neither "entities" nor "hashtags" is null.

```java
if (x.get("entities") != null) {
    JSONObject entity = (JSONObject) x.get("entities");
    if (entity.get("hashtags") != null) {
        JSONArray hashtag = (JSONArray) entity.get("hashtags");
        for (Object obj : hashtag) {
            JSONObject y = (JSONObject) obj;
            hash = (String) y.get("text");
            if (hashtags.contains(hash)) {
                int index = hashtags.indexOf(hash);
                count_hash.set(index, count_hash.get(index) + 1);
            } else {
                hashtags.addLast(hash);
                count_hash.add(1);
            }
        }
    }
}
```

a. x = tweet object => x.get("entities") means get entities object from x
b. create  a new JSONObject of "entities"
c. entity = entities object => entity.get("hashtags") means get hashtags array from entity
d. create a new JSONArray of "hashtags"
e. create a JSONObject y of each "text" and get its value using y.get("text"); notice the casting.
f. if the value doesn't exist, add it to linkedlist and add a count to arraylist
g. if the value exists, find its index in linkedlist and increment the corresponding index in arraylist.

### To display top n hastags, get user input for n and initialize the above declared top arrays to value n.

```java
System.out.print("\nGet top n Hashtags, set n to : ");
n = ent.nextInt();
topHashtagsCount = new int[n];
topHashtags = new String[n];
```

### Create copies of hashtag and count lists as new linkedlists l and arraylist a

```java
LinkedList l = new LinkedList();
l.addAll(hashtags Linkedlist);
ArrayList a = new ArrayList();
a.addAll(count Arraylist);
```

for iterations from 0 to n (Since top n)
    a. Get index of max value in arraylist a, add it to topHashtagsCount
    b. Get corresponding indexed item (hashtag) from linkedlist l, add it to topHashtags.
    c. remove values corresponding to that index from both a and l

### Display arrays topHashtags and topHashtagsCount from 0 to n


That's all folks.. Simple, right? ;)

To those who just want the code, here it is :

Code :-

```java
package bdaminiproject;

import java.io.*;
import java.util.*;
import org.json.simple.*;
import org.json.simple.parser.*;

/**
 *
 * @author Pritesh
 */
public class tweet {

    JSONParser parser = new JSONParser();

    long total = 0;

    LinkedList<String> hashtags = new LinkedList();
    ArrayList<Integer> count_hash = new ArrayList();
    LinkedList<String> placename = new LinkedList();
    ArrayList<Integer> count_place = new ArrayList();
    LinkedList<String> username = new LinkedList();
    ArrayList<String> count_follower = new ArrayList();

    String topHashtags[];
    int topHashtagsCount[];
    String topPlaces[];
    int topPlacesCount[];
    String topUsers[];
    int topFollowersCount[];

    public static void main(String[] args) {

        System.out.println("\n\n\t\t\t*** TWITTER BDA MINI PROJECT ***\n");
        tweet t = new tweet();
        t.run();
        t.display();
        System.out.println("\n\n\t\t\t\t--- END ---\n");
        System.exit(0);
    }

    void run() {
        System.out.println("Loading Data, Please Wait...");
        try {

            JSONArray a = (JSONArray) parser.parse(new FileReader("src\\bdaminiproject\\twitterData.json"));
            System.out.print("Data Loaded, Crawling throught it...");

            String hash;
            String city;

            for (Object o : a) {
                JSONObject x = (JSONObject) o;
                total++;

                if (x.get("entities") != null) {
                    JSONObject entity = (JSONObject) x.get("entities");
                    if (entity.get("hashtags") != null) {
                        JSONArray hashtag = (JSONArray) entity.get("hashtags");
                        for (Object obj : hashtag) {
                            JSONObject y = (JSONObject) obj;
                            hash = (String) y.get("text");
                            if (hashtags.contains(hash)) {
                                int index = hashtags.indexOf(hash);
                                count_hash.set(index, count_hash.get(index) + 1);
                            } else {
                                hashtags.addLast(hash);
                                count_hash.add(1);
                            }
                        }
                    }
                }

                if (x.get("place") != null) {
                    JSONObject place = (JSONObject) x.get("place");
                    if (place.get("name") != null) {
                        city = (String) place.get("name");
                        if (placename.contains(city)) {
                            int index = placename.indexOf(city);
                            count_place.set(index, count_place.get(index) + 1);
                        } else {
                            placename.addLast(city);
                            count_place.add(1);
                        }
                    }
                }

                if (x.get("user") != null) {
                    JSONObject user = (JSONObject) x.get("user");
                    if (user.get("followers_count") != null) {
                        if (!username.contains((String) user.get("name"))) {
                            username.add((String) user.get("name"));
                            count_follower.add(user.get("followers_count").toString());
                        }
                    }
                }
            }

        } catch (IOException | ParseException e) {
        }

    }

    void getMax(int n, ArrayList aa, LinkedList la, int flag) {
        LinkedList l = new LinkedList();
        l.addAll(la);
        ArrayList a = new ArrayList();
        a.addAll(aa);
        int t = 0;
        int temp = 0, max, index = 0;
        if (n > a.size()) {
            System.out.println("n is greater tha array size, exiting...");
            System.exit(0);
        }
        while (t < n) {
            max = 0;
            for (int i = 0; i < a.size(); i++) {
                if (flag == 3) {
                    temp = Integer.parseInt((String) a.get(i));
                } else {
                    temp = (int) a.get(i);
                }
                if (temp > max) {
                    max = temp;
                }
            }
            if (flag == 3) {
                String in = Integer.toString(max);
                index = a.indexOf(in);
            } else {
                index = a.indexOf(max);
            }
            switch (flag) {
                case 1:
                    topHashtagsCount[t] = (int) max;
                    topHashtags[t] = (String) l.get(index);
                    break;
                case 2:
                    topPlacesCount[t] = (int) max;
                    topPlaces[t] = (String) l.get(index);
                    break;
                case 3:
                    topUsers[t] = (String) l.get(index);
                    topFollowersCount[t] = (int) max;
                default:
                    break;
            }

            l.remove(index);
            a.remove(index);
            t++;
        }
    }

    void display() {

        Scanner ent = new Scanner(System.in);
        int n = 1;
        System.out.println("DONE");

        System.out.println("\nTotal Tweets Analyzed = " + total + "\n");

        while (n != 0) {

            System.out.println("\n\nTop Categories.... ");

            System.out.print("\nGet top n Hashtags, set n to : ");
            n = ent.nextInt();
            topHashtagsCount = new int[n];
            topHashtags = new String[n];
            getMax(n, count_hash, hashtags, 1);
            System.out.println("\n\n\t# Hashtag --> Count\n");
            for (int i = 0; i < n; i++) {
                System.out.println("\t" + (i + 1) + ". " + topHashtags[i] + " --> " + topHashtagsCount[i]);
            }

            System.out.print("\nGet top n Places, set n to : ");
            n = ent.nextInt();
            topPlacesCount = new int[n];
            topPlaces = new String[n];
            getMax(n, count_place, placename, 2);
            System.out.println("\n\n\t# Place --> Count\n");
            for (int i = 0; i < n; i++) {
                System.out.println("\t" + (i + 1) + ". " + topPlaces[i] + " --> " + topPlacesCount[i]);
            }

            System.out.print("\nGet top n Users with most Followers, set n to : ");
            n = ent.nextInt();
            topFollowersCount = new int[n];
            topUsers = new String[n];
            getMax(n, count_follower, username, 3);
            System.out.println("\n\n\t# Users --> Followers_Count\n");
            for (int i = 0; i < n; i++) {
                System.out.println("\t" + (i + 1) + ". " + topUsers[i] + " --> " + topFollowersCount[i]);
            }

            System.out.print("\nEnter 0 to Exit, 1 to Re-Enter Top Categories : ");
            n = ent.nextInt();

        }
    }

}
```
