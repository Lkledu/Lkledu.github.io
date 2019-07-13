---
layout: post
title: Least Square AI
author: Eduardo
tag: [AI, Math, Statistic, C#]
date: 2019-06-22 20:40:00
---

When I was in the class of AI for game development, the teacher propose to us to modify a project who we do in class to improve the genetic algorithm.

I was watching statistical classrooms and learn Linear Regression who is a linear function to approximate a sort of point to a line in the Cartesian plane .

The algorithm receive a table with two columns. The first column are the X values, or the value who you want to process. The second are the Y values, they are values related to X. In my project I use two lists, one with the score of the player, and other with the life time of the player. The function return a list of ^Y values. If that returned list are putted in a graph of excel for example, it will create a line graph.

#### The function is:

$$
ƒ(\hat{Y}) = a+bx
$$

The Y is the approximation expected of the line created by a and b

where a is the interception obtained by the function:

$$
ƒ(a) = \bar{\sum y} - b * \bar{\sum x}
$$

and b is the slope obtained by the function:

$$


ƒ(b) = \dfrac{((n * \sum xy) - ((\sum x) * (\sum y))}
        {(n * (\sum x^2) - (\sum x^2))} 
$$

for calculate the relative error we have r²:

$$
ƒ(r^2) = \dfrac{ \bigg( \sum xy - \dfrac{\sum x * \sum y}{n} \bigg)^2}{ \bigg(\sum x^2  - \dfrac{ (\sum x)^2}{n} \bigg) * \bigg(\sum x^2 - \dfrac{(\sum x)^2}{n} \bigg)}
$$

The implementation can be access in [here](https://github.com/Lkledu/evolve-asteroids/blob/master/Assets/Scripts/LeastSquare.cs).

#### The result:

Before:

![Before implementation](/uploads/img-20190523-wa0014.jpeg "Before"){: width="615" height="346"}

After: It's possible to see the great difference in the learn curve produced across the generations. With the algorithm the cromossomes learn more faster, and the learning is maintained.

![After implementation](/uploads/img-20190523-wa0016.jpeg "After"){: width="615" height="346"}

That type of algorithm are most used in optimization process.