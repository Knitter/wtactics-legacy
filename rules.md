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

- there is rarely a need to "tap" a card:
	- troops can attack and defend in the same turn
	- you don't "pay" anything to put a card into play (instead your resources limit the amount of troops you can have in play)
- there is no mana of different colors
- troops select what other troops they are attacking 
- if you attack or cast a spell, it's applied immediately. It can't be interrupted/countered. 

Now that you've destroyed all these assumptions, we can explain the rules.


The "table"
-----------

```
-----------------------------------
|   Front row troops  | Graveyard |
-----------------------------------
|    Back row troops  |
-----------------------------------
|       Buildings     | Deck      |
-----------------------------------
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

### Buildings

Buildings can perform a variety of roles:
- produce gold (which limits how many troops you can have deployed)
- provide some bonus (example: `Elven Bowmaker - attack of elven archers is increased by 1`)
- enable the usage of specific troops or spells (example: `Magi Tower - enables you to play Archmages, Armageddon, ...`)
- "fancy effects" (example: `Necrotic Graveyard - each turn, resurrect the topmost undead of cost 1 from your graveyard`)

...it's a combo of MTG lands and artefacts, except that they are limited to 7 maximum, so you have to choose wisely.
It's also up to the player to build decks which provide synergies between buildings and troops.

The goal
--------

You win by destroying all the buildings of the ennemy.

If you can't draw because your deck is empty, destroy one building per card you should draw.

The magic number: 7
-------------------

If you wonder how many "whatever" you can have, it's probably "7".
This is the maximum amount of cards you can have:
- in your hand
- in the front row
- in the back row
- in the buildings

The start
---------

At the beginning, you start with:
- 7 empty houses, represented by face down cards in the "buildings" area
- 5 cards in your hand

The turns
---------

Players play in turns, one after another.

A turn consists of 2 phases.

First, the *attack phase* where you can attack and use spells.

Then, the *reinforcement phase*:

1. draw two cards (except on the first turn of the starting player)
2. play troops / buildings
3. discard excess cards if you have more than 7 cards in your hand

The attack phase
----------------

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
Each attacker troop *not yet engaged* can now target an enemy building and destroy it.
The troops strength doesn't matter. A 7/7 Dragon or a 1/1 Peasan would both destroy a single building each.
The first with a fire breath, the latter with a fire torch. The result is the same.
If all buildings are destroyed, you win the game.
Notice that the enemy can still build new buildings afterwards and might still turn the table.
