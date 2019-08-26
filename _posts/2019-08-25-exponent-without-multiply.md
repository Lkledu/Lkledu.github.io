---
layout: post
title: Exponentiation without multiplication
author: Eduardo
tag: [Math, en]
date: 2019-08-25 20:40:00
---

It's possible to do Exponentiation without multiply the number X times by it self.
But will be necessary to convert the number for another base.

It's simple, imagine I'll search for the exponent of 3 by n, the log of the log of 3 can be found by:
[=============================================================================]
 n       - 1 -  2 - 3  - 4   -  5   -  6   -   7   -  8    -  9
[=============================================================================]
 base 10 - 3 -  9 - 27 - 81  - 243  - 729  - 2187  - 6561  - 19683
[=============================================================================]
 base 6  - 3 - 13 - 43 - 213 - 1043 - 3213 - 14043 - 50213 - 231043

if we do 81/2 = 40.5 in base 10 = 104.3 in base 6

the logic is to get the number in number base 10, divide him by 2 and convert the result in the number base that is equal the base number times 2 (in our case 3 * 2 = 6).

 - $$Base_6 $$  - $$Base_10$$ -
 -   3      -  3/2     = 1.5    = 1.3      = 13
 -   13     -  9/2     = 4.5    = 4.3      = 43
 -   43     -  27/2    = 13.5   = 21.3     = 213
 -   213    -  81/2    = 40.5   = 104.3    = 1043
 -   1043   -  243/2   = 121.5  = 321.3    = 3213
 -   3213   -  729/2   = 364.5  = 1404.3   = 14043
 -   14043  -  2187/2  = 1093.5 = 5021.3   = 50213
 -   50213  -  6561/2  = 3280.5 = 23104.3  = 231043
 -   231043 -  19683/2 = 9841.5 = 113321.3 = 1133213

 it's important to remember of remove the dot and include the decimal number as part of the natural number