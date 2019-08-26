---
layout: post
title: Tipos de Aprendizagem de Máquina
author: Eduardo
tag: [IA, pt]
date: 2019-06-22 20:40:00
---

Dentro do assunto Machine Learning, há quatro tipos de aprendizagem de máquina. Estes são a forma como um algoritmo opera para descobrir por meio estatístico a melhor resposta para seu algoritmo.

Aprendizado Supervisionado:
    No aprendizado supervisionado, o dataset é uma coleção de exemplos rotulados. É como se o algoritmo recebesse o gabarito com as respostas de varios exercícios de soma, e os usasse como exemplo para descobrir o resultado de um novo input não rotulado.
    Uma forma simples de se pensar nesta coleção é uma matriz, onde cada lina (ou vetor) desta matriz representa uma pessoa, e para cara campo da linha há um valor referente a esta pessoa (altura, peso em kg, idade):

    --PESSOA---------------
    -----------------------
    ---Altura-Peso-Idade---
    --- 1,60 - 55 - 20  ---
    -----------------------
    --- 1,54 - 53 - 22  ---
    -----------------------
    --- 1,48 - 49 - 18  ---
    -----------------------
    --- 1,76 - 69 - 30  ---
    -----------------------

    Através destes dados, o algoritmo pode receber um novo input como [1,50 - 52 - X] e tentar adivinhar o valor de X (idade)

Aprendizado Não Supervisionado:
    No caso de algoritmos não supervisionados, eles funcionam como o caso dos supervisionados, com a diferença que o dataset não é rotulado.
Aprendizado Semi-Supervisionado:
Aprendizado por Reforço:

fonte: "The Hundred-Page Machine Learning Book"(BURKOV'S, Andriy, 2019, p.1-3)