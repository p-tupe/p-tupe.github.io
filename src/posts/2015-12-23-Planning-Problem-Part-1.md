---
date: "2015-12-23T00:00:00Z"
title: Planning Problem using Backward Chaining in Java Part 1
---

_So, I had this subject called Intelligent Systems for my last semester and we had several hands-on practicals for various modules of this subject. One of those modules was - Planning Problem. We had to implement a simple problem with specific inputs that gave a certain output (see - Spare Tyre Problem). But that was too easy, and didn't really explore the aspect of the module we were expected to learn. So, one fine evening when I had too much time on my hands, I decided to create a code wherein ANY planning problem could be given and a solution for it would be given as output. And for processing, I used the Backward Chaining Technique. The few people who saw the program in action and those who saw the code, all wanted to know how it worked. Now, it's not so easy to give a comprehensive explanation of such a complex code in half a minute. That is the reason why I'm writing this post. A step-by-step implementation of Planning Problem using Backward Chaining in Java. Note that I'm not an advanced programmer or anything, you might find better codes elsewhere. This here is just my two cents. So, here we go._

## Planning Problem

Wikipedia defines Planning as **"A branch of artificial intelligence that concerns the realization of strategies or action sequences, typically for execution by intelligent agents... "**

### Let's take an example of the a planning problem.

Say you have n blocks - A, B, C... and all are of different sizes. Your goal is to pile all the blocks on top of each other such that a smaller block is always on top of the bigger block. So the solution to this problem is a sequence of blocks... X, Y, Z... in order of their size - from biggest to smallest.

### Another example of planning problem is Socks problem.

You have left shoe & sock and right shoe & sock. Your goal is to wear both Shoes, but condition is that you can't wear a shoe unless you wear the corresponding sock. The solution to this problem is a sequence of wearing socks and Shoes.

&nbsp;

In a nutshell, what we have in Planning Problems are following -

**States** - To represent the structure of the world and entities within.
e.g. - Have(leftShoe) is a state of having the left shoe.

**Actions** - Shows what entities can be manipulated and how.
e.g - Put(leftShoe) states the action of putting on the left shoe.

**Conditions** - Prerequisites for completing the Actions.
e.g. - Have(leftShoe) is a Condition for Put(leftShoe) i.e you must HAVE a left shoe before you can PUT it on.

**Effects** - To represent the state of the world and its entities AFTER an Action have been executed.
e.g. - On(leftShoe) is the Effect of Action Put(leftShoe)

**Goal** - The Aim of the problem, also a state.
e.g. - On(leftShoe)

&nbsp;

The solution is a sequence of Actions linking the Goal state to initial States. 

What I did to obtain this sequence was :

1. Start from the Goal State

2. Check if it is an Effect of any Action

3. Store the Action (as on stack)

4. Check the Conditions of that Action

5. For a Condition

    5.1. If Condition is an Initial State, Check next Condition.

    5.1.1. If Next Condition Exists, Repeat from 5.

    5.1.2. If No Next Condition, Go To 6.

    5.2. If Condition is NOT an Initial State, Repeat from 2.

6. Print Stack of Actions.

7. End.

If you see the above algorithm carefully, you'll notice that the processing starts from the Goal State of the problem, checking Actions backwards till a chain is formed to the Initial States. This is, in essence, Backward Chaining. Also note that this algorithm is problem agnostic - it can solve any problem, provided a logical input is given.

## Implementation

Here starts the coding part. I did all the coding part in Net-beans 8.1 using JDK 8u66 x64. Also, note that I haven't used any fancy structures or subroutines and all the code is in single class file, since it would be easily understood that way. So, Let's start!

1. Define your package & main class, import Scanner.

2. Define goal, array of initial_states & actions in main Class.

3. Enter code for initialization and user input of above variables using Scanner.

Code Till Now :-

```java
package planning;

import java.util.Scanner;

public class Planning {

    String goal;
    String[] initial_states;
    String[] actions;

    public static void main(String[] args) {
        Planning p = new Planning();
        p.run();
    }

    void run() {
        Scanner ent = new Scanner(System.in);
        System.out.println("*** Planning Problem ***");

        int n;

        System.out.print("Enter Goal : ");
        goal = ent.next();

        System.out.print("Enter number of Initial States : ");
        n = ent.nextInt();

        initial_states = new String[n];

        for (int i = 0; i < n; i++) {
            initial_states[i] = ent.next();
        }

        System.out.print("Enter number of Actions : ");
        n = ent.nextInt();

        actions = new String[n];

        for (int i = 0; i < n; i++) {
            actions[i] = ent.next();
        }
    }

}
```

## Notes

1. Notice that to use the "public" variables, I had to create a new method run inside the main class; since static variables cannot be accessed from a non-static context.

2. The arrays of initial_states and actions aren't pre-defined. Thus, we have to initialize them at runtime, depending on the number of inputs expected, as provided by the user. This is an essential step since our program can solve ANY problem, thus the States and Actions cannot be predefined, as they vary for each problem.

_Rest of the code continued in Part 2._
