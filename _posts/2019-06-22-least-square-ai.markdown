---
layout: post
title: Least Square AI
author: Eduardo
tag: blog
date: 2019-06-22 20:40:00
---

When I was in the class of AI for game development, the teacher propose to us to modify a project who we do in class to improve the genetic algorithm.

I was watching statistical classrooms and learn Linear Regression who is a linear function to approximate a sort of point to a line in the Cartesian plane .

The function is:

ƒ(Y) = a+bx;

where a is:

ƒ(a) = media(Σy) - b \* media(Σx);

and b is:

ƒ(b) = ((N \* Σxy) - (Σ(x) \* Σy)) / (N \* Σx&sup2; - (Σx \* Σx));

for calculate the relative error we have r:

ƒ(r) = (Σxy - ((Σx \* Σy) / N)) / ((√(Σ(x\_square\_table) - Σx&sup2; / N)) \* (√(Σx&sup2; - (Σx)&sup2; / N)));

The implementation can be access in [here](https://github.com/Lkledu/evolve-asteroids/blob/master/Assets/Scripts/LeastSquare.cs).