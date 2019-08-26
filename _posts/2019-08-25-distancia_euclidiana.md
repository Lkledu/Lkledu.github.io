---
layout: post
title: Distância Euclidiana
author: Eduardo
tag: [IA, pt]
date: 2019-08-25 22:56:00
---

A distância euclidiana pode ser medida utilizando a seguinte expressão:

$$
\sqrt{\left(p_1 - q_1\right)^2 + \left(p_2 - q_2\right)^2 + \left(p_3 - q_3\right)^2 + ... + \left(p_n - q_n\right)^2 + }
$$

Tal que, por exemplo p = {8,5,3} e q = {1,1,2} :
$$
\sqrt{\left(8 - 1\right)^2 + \left(5 - 1\right)^2 + \left(3 - 2\right)^2}

\sqrt{\left(7\right)^2 + \left(4\right)^2 + \left(1\right)^2}

\sqrt{ 49 + 16 + 1}

\sqrt{66}

= 8,1240...
$$

Logo distancia entre estes 2 pontos de dimensão 3 é 8,1240.
A formula pode ser utilizada para pontos com n dimensões, desde que se respeite operação de $$(p_n - p_n)$$ onde n é a posição do valor dentro do vetor.