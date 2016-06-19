Simple Rules
============

The objective is a simple ruleset, that could fit on a leaflet,
yet offering a lot of gameplay possibilities and depth.
It's also fairly different than usual MTG-like games.



Read this first!
----------------

Since it's very different than usual CCGs like MTG,
it is important to first understand how the rules differ
in order to avoid misconceptions.

- there are no resources/mana
- attacking troops can also defend afterwards
- troops select what other troops they are attacking 
- if you attack or cast a spell, it's applied immediately. It can't be interrupted/countered. 

Now that you've destroyed all these assumptions, we can explain the rules.


The "table"
-----------

```
-----------------------------
|       Front row troops    |
-----------------------------
|       Back row troops     |
-----------------------------
| Cities | Graveyard | Deck |
-----------------------------
```


Key features
------------

### Front / back rows

The concept behind it is that the back row is "protected" by the front row.
A player can only attack troops from the opposing front row, not the back row, unless it possess a special ability (flying, skirmish, sharpshooter).
Typically, blockers would be placed in front, and more frail units behind.
You also cannot have more troops in the back row than the front row.

### Melee / Ranged

These are basically the two fundamental types of attack.
In melee combat, both units deal damage and get hit simultaneously.
A ranged attacker, on the other hand, only deals damage, but does not get hit.
When a ranged troop *is attacked* in melee, it will do only half damage (rounded down).

### Tactics

The hope is that the "front / back" and "melee / ranged" principles play well together, offering lots of tactical combinations to explore.
For example, ranged troops in the back row could bring down front row troops without taking harm.
However, skirmish/flying/sharpshooter troops could bring down the frail archers easely.
But in both cases, it would be wise to have some tough troops on the front row to protect the others.

### Cities

Your cities deck is a face down deck of 7 cards (or more?), with the first card always turned up, your current city.
When the ennemies attacks and you have no more defending troops, the current city is pillaged. Discard it and turn up the next city.
You loose when your last city has been pillaged.

Cities typically also provide some sort of bonus or effect.

The goal
--------

You win by destroying all the cities of the ennemy.
If you can't draw because your deck is empty, destroy one city.

The start
---------

At the beginning, you start with no cards in your hand, and 7 cities face down.
The first player starts the first turn by drawing a single card.
The second player will draw two cards, like all forthcoming turns.

The turns
---------

Players play in turns, one after another.

A turn consists of 2 phases.

First, the *attack phase* where you can attack and use spells.

Then, the *reinforcement phase*:

1. draw two cards (except on the first turn of the starting player)
2. play troops
3. discard excess cards if you have more than 7 cards in your hand

The attack phase
----------------

### *TODO*

> as it is currently, it feels "not simple enough" and unbalanced in the favor of the attacker and ranged troops.

### Attacking

You can attack with your troops from both front and back row.
You can also select the order and play spells in between.
Unlike MTG, you also select your targets from the enemy front row.

Example:

> It's Alice's turn to attack Bob.
> 
> Alice first attack with her two 1/1 archers, targetting Bob's 2/2 Orc and kills it.
>
> Then, she uses the spell `Cowardice - the target troop flees the battlefield. Put it back in the owner's hand.`, targetting the front row Troll blocker.
>
> Perfect, now Bob's front row is empty, Alice can use her remaing two soldiers to attack Bob's shamans in his back row.
>
> Alice now attacks with her 2/2 soldier the 3/1 Shaman. Since the Shaman is a ranged attacker engaged in melee, it will do only half damage (rounded down).
> In other words, the soldier won't die.

### Spells

Spells can be played any time during the attack phase. But they cannot be countered or interrupt an attack.
Since there is no mana, the cost of powerful spells is either discarding some cards, or requiring a specific building. 

### Blocking

When a troop is attacked, you can also assist it with other troops *that are not engaged*.
The attacker will get damage according to the defending troops combined attacks, and all blockers will get the attacker's damage. It is not "divided".

Example: 

> A 5/5 cavalery attacks a 2/2 orc. If now 2 other "free" orcs assist the defending orc, both the cavalery and the 3 orcs will die.


What happens if many attack a troop, and many block the attackers as well? It follows the same principle.
Each attacker has to choose a target, and each blocker too. 
Each troop will obtain damage according to the sum of the attack of troops targetting it.

### If all enemy troops are cleared...

Then it's time to attack the buildings!
Each attacker troop *not yet engaged* can now target the enemy city.
If their combined strength is greater than its defenses, it's pillaged/destroyed and the owner can draw 2 cards, the fleeing survivors.

Card types
----------

### Cities

### Troops

### Spells

### Promotions

After a troop has successfully attacked or defended, and you have the corresponding promotion card in your hand, you can replace the troop with the promoted one.
