---
date: "2015-12-24T00:00:00Z"
title: Planning Problem Part 2
---

_So, in the last post, we left of with a bit of code that took input for initial_states, actions and a goal. Here on, we will be adding and modifying the same code. Just a warning, it might get too complicated for those who are not familiar with coding. So, let's go._

### Now we need code to input Conditions and Effect for each Action. But how to initialize arrays of those for each Action, and then bind them to that Action so that they could be linked during the processing?

What I did was to create a new Class OnAction and defined String arrays of Conditions and Effects inside, along with the ability (see Method act() ) to take input (similar to previous arrays).

Code Snippet -

```java
class OnAction {

    String[] effects;
    String[] conditions;

    void act() {
        Scanner ent = new Scanner(System.in);
        int n;
        System.out.print("  Enter number of Conditions : ");
        n = ent.nextInt();
        conditions = new String[n];

        for (int i = 0; i < n; i++) {
            System.out.print("    Enter Condition " + i + " : ");
            conditions[i] = ent.next();
        }

        System.out.print("  Enter number of Effects : ");
        n = ent.nextInt();
        effects = new String[n];

        for (int i = 0; i < n; i++) {
            System.out.print("    Enter Effect " + i + " : ");
            effects[i] = ent.next();
        }
    }

}
```

Next, I defined an array of Objects for Class OnAction and initialized it based on the number of Actions provided by the user. Then, for each Action input, I called on OnAction Object so that corresponding Conditions and Effects materialized. Pretty cool huh?

Code Snippet -

```java
public class Planning {
    ...
    OnAction a[];
    ...
    void run() {
        ...
        System.out.print("\nEnter number of Actions : ");
        n = ent.nextInt();
        a = new OnAction[n];
        actions = new String[n];
        ...
        for (int i = 0; i < n; i++) {
            System.out.print("\n  Enter action " + i + " : ");
            actions[i] = ent.next();
            System.out.println("  For " + actions[i]);
            a[i] = new OnAction();
            a[i].act();
        }
        ...
  }
```

So there we have it, a long darn code just to take a lot of input. As the code currently stands, we can input n number of initial_states, actions, corresponding conditions & effects, and finally, a goal. Yes! With all our inputs in place, now we move to the processing part; the core of our program.

Recall our algorithm (Part 1), We start with the Goal and compare it with the Effects of all Actions. The code would be similar to comparing 2 strings. Let's see how it's done.

First, loop through all the Actions (since our Effects are bound to Actions). Since we don't know the size of Actions array before hand, we use the array.length method to find it at run time. Then, for actions i, we have m effects, which we loop through one by one and check if any equals our Goal.

Code snippet -

```java
        int n = actions.length;
        for (int i = 0; i < n; i++) {

            int m = a[i].effects.length;
            for (int j = 0; j < m; j++) {

                if (goal.equals(a[i].effects[j])) {
                    break; //break out of loop when a match is found.
                }
            }
        }
```

So now, assume we've hit upon an Effect that equals our Goal, what next? Well, just follow the Algorithm -

If a match is found, save the Actions on Stack and Check the Conditions. Now, instead of using stack, I just used another array, and printed it  backwards. Neat trick eh? Hehe, moving on. Define your String array of solutions as a global variable in Planning Class, then save Action i that has an Effect j matching with our Goal into the solutions array.

Code snippet -

```java
public class Planning {
    ...
    String[] solution;
    ...
        int n = actions.length;
        for (int i = 0; i < n; i++) {
            int m = a[i].effects.length;
            for (int j = 0; j < m; j++) {
                if (goal.equals(a[i].effects[j])) {
                    solution[c] = actions[i];
                    c += 1;
                    break;
                }
            }
        }
    ...
}
```

So now, to check the conditions. We have to check ALL the conditions (unlike Effects, which we loop through only until a hit is found) and see if the Condition is an initial one or an Effect of any other Action. This process continues till we hit upon all Conditions being initial_states, until then, we loop through the Actions. Something beautiful struck your mind? Hell yea, Recursion!

So now, our above code snippet is optimal to check for looping through Actions and checking each Effect; we just change the Goal to the Condition we are searching for. Also, to loop through Conditions, we don't need additional code; we can fit it right into our earlier snippet. To check in a Condition is in initial_states, i wrote another method named initial.

Code snippet -

```java
    void find() {
        int n = actions.length;
        for (int i = 0; i < n; i++) {
            int m = a[i].effects.length;
            int o = a[i].conditions.length;
            for (int j = 0; j < m; j++) {
                if (goal.equals(a[i].effects[j])) {
                    solution[c] = actions[i];
                    c += 1;
                    for (int k = 0; k < o; k++) {
                        if (!initial(a[i].conditions[k])) {
                            goal = a[i].conditions[k];
                            find();
                        }
                    }
                    break;
                }
            }
        }

    }

    boolean initial(String s) {
        for (int i = 0; i < initial_states.length; i++) {
            if (s.equals(initial_states[i])) {
                return true;
            }
        }
        return false;
    }
```

So, there we have it, a neat way to implement our algorithm. The output of this will be an array of solutions consisting of sequence of actions required to complete the goal given the initial_states.

BUT WAIT! Where is the code to print the output, you ask? Well, here it is -

```java
   void show() {
        System.out.println("\n\nOutput Sequencce : ");

        for (int i = solution.length - 1; i >= 0; i--) {
            if(solution[i] != null) {
                System.out.println(solution[i]);
            }
        }

    }
```

Now, you can link these methods through each other, or just call them one after other from the main using Object p. Also, note that I've used if(solution[i] != null) condition while printing. This is because, our solutions array is initialized with the size of actions, but a Goal may require fewer Actions than those given by the user, which means rest of the values in solutions would be null. To avoid printing null, I've added that condition. Also, check out the order in which the results are getting printed. They go Forward, from initial_states actions linking to the Goal.

For those stubborn enough to have read till here and wish for more pain... well, here is my entire code for ya'll kindred spirits ;)

```java
/*
 *Class Planning is a simulation on Total 
 *Order Planning Problem solution
 *using backward chaining technique.
 */
package planning;

import java.util.Scanner;

/**
 *
 * @author Pritesh
 */
public class Planning {

    String goal;
    String[] initial_states;
    String[] actions;
    String[] solution;
    OnAction a[];
    int c = 0;

    public static void main(String[] args) {
        Planning p = new Planning();
        p.run();
        p.find();
        p.show();
        System.out.print("\n\n*** END ***\n");
        System.exit(0);
    }

    void run() {
        Scanner ent = new Scanner(System.in);
        int n;

        System.out.println("*** Planning Problem ***");

        System.out.print("Enter number of Initial States : ");
        n = ent.nextInt();

        initial_states = new String[n];

        for (int i = 0; i < n; i++) {
            System.out.print("  Enter Initial States " + i + " : ");
            initial_states[i] = ent.next();
        }

        System.out.print("\nEnter number of Actions : ");
        n = ent.nextInt();
        a = new OnAction[n];
        actions = new String[n];
        solution = new String[n];

        for (int i = 0; i < n; i++) {
            System.out.print("\n  Enter action " + i + " : ");
            actions[i] = ent.next();
            System.out.println("  For " + actions[i]);
            a[i] = new OnAction();
            a[i].act();
        }

        System.out.print("\nEnter Goal : ");
        goal = ent.next();

    }

    void find() {
        int n = actions.length;
        for (int i = 0; i < n; i++) {
            int m = a[i].effects.length;
            int o = a[i].conditions.length;
            for (int j = 0; j < m; j++) {
                if (goal.equals(a[i].effects[j])) {
                    solution[c] = actions[i];
                    c += 1;
                    for (int k = 0; k < o; k++) {
                        if (!initial(a[i].conditions[k])) {
                            goal = a[i].conditions[k];
                            find();
                        }
                    }
                    break;
                }
            }
        }
    }

    boolean initial(String s) {
        for (int i = 0; i < initial_states.length; i++) {
            if (s.equals(initial_states[i])) {
                return true;
            }
        }
        return false;
    }

    void show() {
        System.out.println("\n\nOutput Sequencce : ");

        for (int i = solution.length - 1; i >= 0; i--) {
            if (solution[i] != null) {
                System.out.println(solution[i]);
            }
        }
    }
}

class OnAction {

    String[] effects;
    String[] conditions;

    void act() {
        Scanner ent = new Scanner(System.in);
        int n;
        System.out.print("  Enter number of Conditions : ");
        n = ent.nextInt();
        conditions = new String[n];

        for (int i = 0; i < n; i++) {
            System.out.print("    Enter Condition " + i + " : ");
            conditions[i] = ent.next();
        }

        System.out.print("  Enter number of Effects : ");
        n = ent.nextInt();
        effects = new String[n];

        for (int i = 0; i < n; i++) {
            System.out.print("    Enter Effect " + i + " : ");
            effects[i] = ent.next();
        }
    }
}
```

_I leave the output to you all. Since this program solves any type of planning problem, you can find popular problems on the net or even create your own. Just give it a spin and let me know how you fare. Cheers!_
